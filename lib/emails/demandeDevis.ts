// E-mail INTERNE « Nouvelle demande de devis », envoyé à DIRHAN INNOVATION (CONTACT_EMAIL_DESTINATION).
// Utilisé uniquement côté serveur. La mise en page commune est dans ./gabarit.ts.

import { site } from "@/lib/site";
import {
  boutonOr,
  COULEURS,
  dateAbidjan,
  echapper,
  encadre,
  gabaritEmail,
  paragraphesSurs,
  POLICE,
  section,
  surtitre,
  surUneLigne,
  titre,
} from "./gabarit";

export type DemandeDevis = {
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  entreprise: string;
  service: string;
  message: string;
};

/** Objet de l'e-mail, toujours sur une seule ligne et limité à 150 caractères. */
export function objetDemande(d: DemandeDevis) {
  return surUneLigne(`Nouvelle demande de devis : ${d.nom}${d.sujet ? ` – ${d.sujet}` : d.service ? ` (${d.service})` : ""}`).slice(0, 150);
}

// Une ligne « étiquette / valeur » de la fiche prospect
function ligneFiche(etiquette: string, valeurHtml: string, derniere = false) {
  const filet = derniere ? "" : `border-bottom:1px solid ${COULEURS.filet};`;
  return `
          <tr>
            <td valign="top" width="38%" class="colonne etiquette" style="padding:14px 12px 14px 0;${filet}font-family:${POLICE};font-size:12px;line-height:18px;letter-spacing:1px;text-transform:uppercase;color:${COULEURS.orFonce};font-weight:bold;">${etiquette}</td>
            <td valign="top" class="colonne" style="padding:14px 0;${filet}font-family:${POLICE};font-size:15px;line-height:22px;color:${COULEURS.texte};">${valeurHtml}</td>
          </tr>`;
}

const nonRenseigne = `<span style="color:#9A9A9A;font-style:italic;">Non renseigné</span>`;

/** Construit l'objet, la version HTML et la version texte de l'e-mail interne. */
export function emailDemandeDevis(d: DemandeDevis, recuLe = new Date()) {
  const date = dateAbidjan(recuLe);
  const objet = objetDemande(d);

  // Lien « Répondre au prospect » : ouvre la messagerie avec l'adresse et l'objet préremplis.
  // L'adresse est déjà validée par le serveur ; on retire par sécurité les caractères qui casseraient le lien.
  const adresseReponse = d.email.replace(/[?#&\s]/g, "");
  const lienReponse = `mailto:${adresseReponse}?subject=${encodeURIComponent(`Votre demande de devis – ${site.nom}`)}`;

  // Téléphone cliquable s'il est renseigné (on ne garde que les chiffres et le +)
  const telephoneHtml = d.telephone
    ? `<a href="tel:${echapper(d.telephone.replace(/[^\d+]/g, ""))}" style="color:${COULEURS.texte};text-decoration:none;">${echapper(d.telephone)}</a>`
    : nonRenseigne;

  const fiche = [
    ligneFiche("Nom et prénom", `<strong>${echapper(d.nom)}</strong>`),
    ligneFiche(
      "Adresse e-mail",
      `<a href="mailto:${echapper(adresseReponse)}" style="color:${COULEURS.orFonce};text-decoration:underline;">${echapper(d.email)}</a>`,
    ),
    ligneFiche("Téléphone / WhatsApp", telephoneHtml),
    ligneFiche("Entreprise", d.entreprise ? echapper(d.entreprise) : nonRenseigne),
    ligneFiche("Sujet", d.sujet ? echapper(d.sujet) : nonRenseigne),
    ligneFiche("Type de projet", d.service ? echapper(d.service) : nonRenseigne, true),
  ].join("");

  const contenu = [
    section(
      `
              ${surtitre("Nouvelle demande de devis")}
              ${titre(`${echapper(d.nom)} souhaite échanger avec vous`)}
              <p style="margin:12px 0 0 0;font-family:${POLICE};font-size:13px;line-height:20px;color:${COULEURS.texteDoux};">Reçue le ${echapper(date)}, via le formulaire de contact du site.</p>`,
      "34px 36px 8px 36px",
    ),
    section(
      `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fiche}
              </table>`,
      "22px 36px 6px 36px",
    ),
    section(`
              ${surtitre("Description du projet")}
              ${encadre(paragraphesSurs(d.message))}`),
    section(
      `
              ${boutonOr(lienReponse, "Répondre au prospect &rarr;")}
              <p style="margin:14px 0 0 0;font-family:${POLICE};font-size:12px;line-height:18px;color:${COULEURS.texteDoux};">Vous pouvez aussi simplement cliquer sur « Répondre » : la réponse partira directement à ${echapper(d.email)}.</p>`,
      "26px 36px 36px 36px",
    ),
  ].join("");

  const html = gabaritEmail({
    titrePage: objet,
    apercu: `${d.nom} vous contacte${d.sujet ? ` : ${d.sujet}` : d.service ? ` pour : ${d.service}` : ""}. ${d.message}`,
    contenu,
    mention: `E-mail automatique envoyé par le formulaire de contact de ${site.url.replace(/^https?:\/\//, "")}`,
  });

  // Version texte (pour les messageries qui n'affichent pas le HTML, et pour la délivrabilité)
  const texte = [
    `NOUVELLE DEMANDE DE DEVIS — ${site.nom}`,
    `Reçue le ${date}`,
    "",
    `Nom et prénom      : ${d.nom}`,
    `Adresse e-mail     : ${d.email}`,
    `Téléphone/WhatsApp : ${d.telephone || "Non renseigné"}`,
    `Entreprise         : ${d.entreprise || "Non renseignée"}`,
    `Sujet              : ${d.sujet || "Non précisé"}`,
    `Type de projet     : ${d.service || "Non précisé"}`,
    "",
    "Description du projet :",
    d.message,
    "",
    `Répondre au prospect : ${d.email}`,
  ].join("\n");

  return { objet, html, texte };
}
