"use server";

// Ce fichier tourne UNIQUEMENT sur le serveur, jamais dans le navigateur.
// Les visiteurs ne peuvent donc pas voir la clé secrète qui sert à envoyer les e-mails.

import { headers } from "next/headers";
import { autoriserEnvoi, identifierVisiteur } from "@/lib/limiteEnvois";
import { emailDemandeDevis } from "@/lib/emails/demandeDevis";
import { LIMITES_FORMULAIRE } from "@/lib/limitesFormulaire";
import { services, site } from "@/lib/site";

// Délai maximal accordé à Resend pour répondre (en millisecondes)
const DELAI_RESEND = 10_000;

// ===== DIAGNOSTIC TEMPORAIRE =====
// Passe à false (ou supprime ce bloc) une fois l'envoi d'e-mails réparé.
const DIAGNOSTIC_ACTIF = true;

// Décrit la configuration SANS révéler aucune valeur : uniquement des oui/non,
// le domaine de l'expéditeur (non secret) et l'environnement Vercel.
function journaliserConfiguration(cle?: string, destinataire?: string, expediteur?: string) {
  const formatEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
  const adresseExpediteur = expediteur?.match(/<([^>]+)>/)?.[1] ?? expediteur ?? "";
  console.info(
    "[Formulaire de contact][diagnostic]",
    JSON.stringify({
      environnementVercel: process.env.VERCEL_ENV ?? "(hors Vercel)",
      versionDuCode: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "(inconnue)",
      RESEND_API_KEY: {
        presente: cle !== undefined,
        nonVide: Boolean(cle && cle.trim()),
        commenceParRe_: Boolean(cle?.trim().startsWith("re_")),
        espacesEnTrop: Boolean(cle && cle !== cle.trim()),
      },
      CONTACT_EMAIL_DESTINATION: {
        presente: destinataire !== undefined,
        nonVide: Boolean(destinataire && destinataire.trim()),
        formatEmailValide: formatEmail.test(destinataire?.trim() ?? ""),
        espacesEnTrop: Boolean(destinataire && destinataire !== destinataire.trim()),
      },
      expediteur: {
        personnalise: Boolean(process.env.CONTACT_EMAIL_EXPEDITEUR),
        domaine: adresseExpediteur.split("@")[1] ?? "(invalide)",
      },
    }),
  );
}

export type ChampsContact = {
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  service: string;
  message: string;
};

export type EtatContact = {
  statut: "initial" | "succes" | "erreur";
  message: string;
  erreurs: Partial<Record<keyof ChampsContact, string>>;
  valeurs: ChampsContact;
  // Horodatage de la réponse : rend chaque réponse unique, pour que le message
  // de confirmation s'affiche à nouveau même s'il est identique au précédent
  horodatage?: number;
};

const champsVides: ChampsContact = {
  nom: "",
  email: "",
  telephone: "",
  entreprise: "",
  service: "",
  message: "",
};

function lire(formData: FormData, cle: string, max: number) {
  const valeur = formData.get(cle);
  return typeof valeur === "string" ? valeur.trim().slice(0, max) : "";
}

// Point d'entrée appelé par le formulaire
export async function envoyerMessage(
  etatPrecedent: EtatContact,
  formData: FormData,
): Promise<EtatContact> {
  const resultat = await traiterMessage(etatPrecedent, formData);
  return { ...resultat, horodatage: Date.now() };
}

async function traiterMessage(
  _etatPrecedent: EtatContact,
  formData: FormData,
): Promise<EtatContact> {
  // 1. Piège anti-robots : ce champ est invisible pour les humains.
  //    S'il est rempli, c'est un robot : on fait semblant que tout va bien.
  if (lire(formData, "site_web", 200) !== "") {
    return { statut: "succes", message: "Merci, votre message a bien été envoyé.", erreurs: {}, valeurs: champsVides };
  }

  // 2. Récupération des champs (avec une longueur maximale pour éviter les abus)
  const valeurs: ChampsContact = {
    nom: lire(formData, "nom", LIMITES_FORMULAIRE.nom),
    email: lire(formData, "email", LIMITES_FORMULAIRE.email),
    telephone: lire(formData, "telephone", LIMITES_FORMULAIRE.telephone),
    entreprise: lire(formData, "entreprise", LIMITES_FORMULAIRE.entreprise),
    service: lire(formData, "service", LIMITES_FORMULAIRE.service),
    message: lire(formData, "message", LIMITES_FORMULAIRE.message),
  };

  // 3. Vérifications
  const erreurs: EtatContact["erreurs"] = {};
  if (valeurs.nom.length < 2) erreurs.nom = "Indiquez votre nom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeurs.email))
    erreurs.email = "Indiquez une adresse e-mail valide.";
  if (valeurs.telephone && !/^[+\d][\d\s().-]{6,}$/.test(valeurs.telephone))
    erreurs.telephone = "Ce numéro ne semble pas valide.";
  if (valeurs.service && !services.some((s) => s.titre === valeurs.service) && valeurs.service !== "Autre")
    erreurs.service = "Choisissez un service dans la liste.";
  if (valeurs.message.length < 10)
    erreurs.message = "Décrivez votre projet en quelques mots (10 caractères minimum).";

  if (Object.keys(erreurs).length > 0) {
    return { statut: "erreur", message: "Merci de corriger les champs indiqués.", erreurs, valeurs };
  }

  // 3 bis. Limite d'envois : pas plus de 5 messages par heure et par visiteur (voir lib/limiteEnvois.ts)
  if (!autoriserEnvoi(identifierVisiteur(await headers()))) {
    console.warn("[Formulaire de contact] Limite d'envois atteinte.");
    return {
      statut: "erreur",
      message: `Vous avez envoyé plusieurs messages récemment. Merci de réessayer un peu plus tard, ou de nous appeler au ${site.telephone}.`,
      erreurs: {},
      valeurs,
    };
  }

  // 4. Envoi de l'e-mail via le service Resend (https://resend.com)
  const cleApi = process.env.RESEND_API_KEY;
  const destinataire = process.env.CONTACT_EMAIL_DESTINATION;
  const expediteur = process.env.CONTACT_EMAIL_EXPEDITEUR ||"Site DIRHAN <onboarding@resend.dev>";

  // DIAGNOSTIC TEMPORAIRE (à retirer une fois le problème résolu) :
  // décrit la configuration dans les journaux Vercel SANS jamais afficher les valeurs secrètes.
  if (DIAGNOSTIC_ACTIF) journaliserConfiguration(cleApi, destinataire, expediteur);

  if (!cleApi || !destinataire) {
    if (process.env.NODE_ENV === "development") {
      // Mode test : pas encore de clé configurée, on affiche le message dans le terminal.
      console.log("\n[Formulaire de contact] Message reçu (mode test, aucun e-mail envoyé) :", valeurs, "\n");
      return {
        statut: "succes",
        message: "Merci, votre message a bien été envoyé. (Mode test : aucun e-mail réel n'est parti.)",
        erreurs: {},
        valeurs: champsVides,
      };
    }
    const manquantes = [!cleApi && "RESEND_API_KEY", !destinataire && "CONTACT_EMAIL_DESTINATION"].filter(Boolean);
    console.error(`[Formulaire de contact] Variable(s) manquante(s) ou vide(s) : ${manquantes.join(", ")}.`);
    return {
      statut: "erreur",
      message: "L'envoi est momentanément indisponible. Merci de réessayer plus tard.",
      erreurs: {},
      valeurs,
    };
  }

  // E-mail « Nouvelle demande de devis » : objet, version HTML premium et version texte
  // (modèle et échappement des données dans lib/emails/demandeDevis.ts)
  const { objet, html, texte } = emailDemandeDevis(valeurs);

  const debutEnvoi = Date.now();
  try {
    if (DIAGNOSTIC_ACTIF) console.info("[Formulaire de contact][diagnostic] Appel de Resend…");
    const reponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      // Au-delà de 10 secondes sans réponse, on abandonne et on prévient le visiteur
      signal: AbortSignal.timeout(DELAI_RESEND),
      headers: {
        Authorization: `Bearer ${cleApi}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: expediteur,
        to: [destinataire],
        reply_to: valeurs.email,
        subject: objet,
        html,
        text: texte,
      }),
    });

    if (DIAGNOSTIC_ACTIF) {
      console.info(
        `[Formulaire de contact][diagnostic] Réponse de Resend reçue : code HTTP ${reponse.status} en ${Date.now() - debutEnvoi} ms`,
      );
    }

    if (!reponse.ok) {
      // La réponse d'erreur de Resend ne contient jamais la clé : on peut la journaliser
      const corps = await reponse.text();
      let detail: { name?: string; message?: string } = {};
      try {
        detail = JSON.parse(corps);
      } catch {
        detail = { message: corps.slice(0, 300) };
      }
      console.error(
        "[Formulaire de contact] Erreur Resend :",
        JSON.stringify({ codeHttp: reponse.status, type: detail.name, message: detail.message }),
      );
      throw new Error("Envoi refusé");
    }

    if (DIAGNOSTIC_ACTIF) {
      const { id } = (await reponse.json().catch(() => ({}))) as { id?: string };
      console.info("[Formulaire de contact][diagnostic] E-mail accepté par Resend, identifiant :", id ?? "(inconnu)");
    }
  } catch (erreur) {
    const delaiDepasse = erreur instanceof Error && erreur.name === "TimeoutError";
    console.error(
      delaiDepasse
        ? `[Formulaire de contact] Resend n'a pas répondu en ${DELAI_RESEND / 1000} s (arrêt après ${Date.now() - debutEnvoi} ms).`
        : "[Formulaire de contact] Échec de l'envoi :",
      delaiDepasse ? "" : erreur,
    );
    return {
      statut: "erreur",
      message: `Votre message n'a pas pu être envoyé. Merci de réessayer dans quelques instants, ou de nous appeler au ${site.telephone}.`,
      erreurs: {},
      valeurs,
    };
  }

  return {
    statut: "succes",
    message: "Merci, votre message a bien été envoyé. Nous vous répondons très vite.",
    erreurs: {},
    valeurs: champsVides,
  };
}
