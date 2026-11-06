"use server";

// Ce fichier tourne UNIQUEMENT sur le serveur, jamais dans le navigateur.
// Les visiteurs ne peuvent donc pas voir la clé secrète qui sert à envoyer les e-mails.

import { headers } from "next/headers";
import { autoriserEnvoi, identifierVisiteur } from "@/lib/limiteEnvois";
import { LIMITES_FORMULAIRE } from "@/lib/limitesFormulaire";
import { services, site } from "@/lib/site";

// Délai maximal accordé à Resend pour répondre (en millisecondes)
const DELAI_RESEND = 10_000;

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

// Empêche qu'un texte tapé dans le formulaire soit interprété comme du code dans l'e-mail
function echapper(texte: string) {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
    console.error("[Formulaire de contact] RESEND_API_KEY ou CONTACT_EMAIL_DESTINATION manquant.");
    return {
      statut: "erreur",
      message: "L'envoi est momentanément indisponible. Merci de réessayer plus tard.",
      erreurs: {},
      valeurs,
    };
  }

  const lignes: [string, string][] = [
    ["Nom", valeurs.nom],
    ["E-mail", valeurs.email],
    ["Téléphone", valeurs.telephone || "Non renseigné"],
    ["Entreprise", valeurs.entreprise || "Non renseignée"],
    ["Service souhaité", valeurs.service || "Non précisé"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;color:#080808">
      <h2 style="color:#a8862a">Nouveau message depuis le site DIRHAN INNOVATION</h2>
      <table cellpadding="6">${lignes
        .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${echapper(v)}</td></tr>`)
        .join("")}</table>
      <h3>Message</h3>
      <p style="white-space:pre-wrap">${echapper(valeurs.message)}</p>
    </div>`;

  // Version texte de l'e-mail (améliore la délivrabilité et l'affichage sur certaines messageries)
  const texte = [
    "Nouveau message depuis le site DIRHAN INNOVATION",
    "",
    ...lignes.map(([k, v]) => `${k} : ${v}`),
    "",
    "Message :",
    valeurs.message,
  ].join("\n");

  // Objet sur une seule ligne : les retours à la ligne éventuels sont remplacés par des espaces
  const surUneLigne = (t: string) => t.replace(/\s+/g, " ").trim();
  const objet = surUneLigne(
    `Nouveau projet : ${valeurs.nom}${valeurs.service ? ` (${valeurs.service})` : ""}`,
  ).slice(0, 150);

  try {
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

    if (!reponse.ok) {
      console.error("[Formulaire de contact] Erreur Resend :", reponse.status, await reponse.text());
      throw new Error("Envoi refusé");
    }
  } catch (erreur) {
    const delaiDepasse = erreur instanceof Error && erreur.name === "TimeoutError";
    console.error(
      delaiDepasse
        ? `[Formulaire de contact] Resend n'a pas répondu en ${DELAI_RESEND / 1000} s.`
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
