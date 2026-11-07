// E-mail de CONFIRMATION envoyé au prospect après sa demande de devis.
// Utilisé uniquement côté serveur. La mise en page commune est dans ./gabarit.ts.

import { site } from "@/lib/site";
import {
  coordonneesTexte,
  COULEURS,
  echapper,
  encadre,
  gabaritEmail,
  paragraphe,
  paragraphesSurs,
  POLICE,
  POLICE_TITRE,
  section,
  surtitre,
  titre,
} from "./gabarit";
import type { DemandeDevis } from "./demandeDevis";

export const OBJET_CONFIRMATION = `Confirmation de réception de votre demande – ${site.nom}`;

/**
 * Prénom affiché dans « Bonjour … », déduit du nom complet saisi.
 * En Côte d'Ivoire, le nom de famille est souvent écrit en premier et en majuscules
 * (« KOUAME Ghislain ») : on prend donc le premier mot qui n'est pas entièrement en majuscules.
 * À défaut (ex. : « Aïcha Koné », « jean »), on prend le premier mot, avec une majuscule initiale.
 */
export function prenomDe(nomComplet: string) {
  const mots = nomComplet.trim().split(/\s+/).filter(Boolean);
  if (mots.length === 0) return "";
  const enMajuscules = (m: string) => m === m.toUpperCase() && m !== m.toLowerCase();
  const choisi = mots.find((m) => !enMajuscules(m)) ?? mots[0];
  return choisi.charAt(0).toUpperCase() + choisi.slice(1);
}

/** Construit l'objet, la version HTML et la version texte de la confirmation. */
export function emailConfirmationProspect(d: DemandeDevis) {
  const prenom = prenomDe(d.nom);
  // Le type de projet est affiché en clair ; sinon le sujet, sinon « votre projet »
  // Sans type de projet choisi, on reprend le sujet saisi par le visiteur
  const intitule = d.service || d.sujet;
  const sujetHtml = intitule ? `« <strong>${echapper(intitule)}</strong> »` : "votre projet";
  const sujetTexte = intitule ? `« ${intitule} »` : "votre projet";

  // Extrait du message rappelé au prospect (limité pour rester lisible)
  const extrait = d.message.length > 600 ? `${d.message.slice(0, 600).trim()}…` : d.message;

  const contenu = [
    section(
      `
              ${surtitre("Demande bien reçue")}
              ${titre(`Merci, ${echapper(prenom)} !`)}`,
      "34px 36px 4px 36px",
    ),
    section(
      `
              ${paragraphe(`Bonjour ${echapper(prenom)},`)}
              ${paragraphe(`Nous vous remercions pour votre intérêt envers <strong>${echapper(site.nom)}</strong>.`)}
              ${paragraphe(`Nous avons bien reçu votre demande concernant ${sujetHtml}.`)}
              ${paragraphe("Notre équipe analysera votre projet et vous contactera dans les meilleurs délais.", "0")}`,
      "18px 36px 8px 36px",
    ),
    section(`
              ${surtitre("Récapitulatif de votre message")}
              ${encadre(paragraphesSurs(extrait))}`),
    section(
      `
              <p style="margin:0;font-family:${POLICE};font-size:15px;line-height:24px;color:${COULEURS.texte};">Bien cordialement,</p>
              <p style="margin:6px 0 0 0;font-family:${POLICE_TITRE};font-size:18px;line-height:24px;font-weight:bold;color:${COULEURS.texte};">L'équipe ${echapper(site.nom)}</p>
              <p style="margin:14px 0 0 0;font-family:${POLICE};font-size:13px;line-height:20px;color:${COULEURS.texteDoux};">Une question urgente ? Appelez-nous ou écrivez-nous sur WhatsApp grâce aux coordonnées ci-dessous.</p>`,
      "22px 36px 32px 36px",
    ),
  ].join("");

  const html = gabaritEmail({
    titrePage: OBJET_CONFIRMATION,
    apercu: `Bonjour ${prenom}, nous avons bien reçu votre demande concernant ${sujetTexte}.`,
    contenu,
    coordonneesDetaillees: true,
    mention: `Vous recevez cet e-mail car vous avez envoyé une demande via le formulaire de contact de ${site.url.replace(/^https?:\/\//, "")}.`,
  });

  const texte = [
    `Bonjour ${prenom},`,
    "",
    `Nous vous remercions pour votre intérêt envers ${site.nom}.`,
    `Nous avons bien reçu votre demande concernant ${sujetTexte}.`,
    "Notre équipe analysera votre projet et vous contactera dans les meilleurs délais.",
    "",
    "Récapitulatif de votre message :",
    extrait,
    "",
    "Bien cordialement,",
    `L'équipe ${site.nom}`,
    "",
    "—",
    coordonneesTexte(),
  ].join("\n");

  return { objet: OBJET_CONFIRMATION, html, texte };
}
