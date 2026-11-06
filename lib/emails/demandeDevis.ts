// Modèle de l'e-mail « Nouvelle demande de devis » envoyé à DIRHAN INNOVATION.
//
// Utilisé UNIQUEMENT côté serveur, par app/contact/actions.ts.
// Règles de construction, pour être compatible avec Gmail, Outlook et les messageries mobiles :
//   - mise en page en tableaux (<table>), styles écrits directement sur chaque élément ;
//   - largeur maximale de 600 px, qui s'adapte aux petits écrans ;
//   - aucune police externe ni script ; image du logo en adresse absolue ;
//   - TOUTES les données saisies par le visiteur passent par echapper() (aucune injection HTML).

import { site } from "@/lib/site";

export type DemandeDevis = {
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  service: string;
  message: string;
};

// Couleurs de la marque
const NOIR = "#080808";
const NOIR_DOUX = "#151515";
const OR = "#D4AF37";
const OR_FONCE = "#A8862A";
const BLANC = "#FFFFFF";
const GRIS_TEXTE = "#5C5C5C";
const GRIS_FILET = "#E8E4D8";
const FOND = "#F4F2EC";

const POLICE = "Arial, 'Helvetica Neue', Helvetica, sans-serif";
const POLICE_TITRE = "Georgia, 'Times New Roman', serif";

/** Empêche qu'un texte saisi dans le formulaire soit interprété comme du HTML. */
export function echapper(texte: string) {
  return texte
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Remplace les retours à la ligne et espaces multiples par une seule espace. */
export function surUneLigne(texte: string) {
  return texte.replace(/\s+/g, " ").trim();
}

/** Date de réception, à l'heure d'Abidjan (ex. : « vendredi 6 novembre 2026 à 10:15 »). */
export function dateDeReception(date = new Date()) {
  const jour = new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeZone: "Africa/Abidjan" }).format(date);
  const heure = new Intl.DateTimeFormat("fr-FR", { timeStyle: "short", timeZone: "Africa/Abidjan" }).format(date);
  return `${jour} à ${heure} (heure d'Abidjan)`;
}

/** Objet de l'e-mail, toujours sur une seule ligne et limité à 150 caractères. */
export function objetDemande(d: DemandeDevis) {
  return surUneLigne(`Nouvelle demande de devis : ${d.nom}${d.service ? ` (${d.service})` : ""}`).slice(0, 150);
}

// Une ligne « étiquette / valeur » de la fiche prospect
function ligneFiche(etiquette: string, valeurHtml: string, derniere = false) {
  const filet = derniere ? "" : `border-bottom:1px solid ${GRIS_FILET};`;
  return `
          <tr>
            <td valign="top" width="38%" class="colonne etiquette" style="padding:14px 12px 14px 0;${filet}font-family:${POLICE};font-size:12px;line-height:18px;letter-spacing:1px;text-transform:uppercase;color:${OR_FONCE};font-weight:bold;">${etiquette}</td>
            <td valign="top" class="colonne" style="padding:14px 0;${filet}font-family:${POLICE};font-size:15px;line-height:22px;color:${NOIR};">${valeurHtml}</td>
          </tr>`;
}

const nonRenseigne = `<span style="color:#9A9A9A;font-style:italic;">Non renseigné</span>`;

/** Construit l'objet, la version HTML et la version texte de l'e-mail. */
export function emailDemandeDevis(d: DemandeDevis, recuLe = new Date()) {
  const date = dateDeReception(recuLe);
  const objet = objetDemande(d);
  const logo = `${site.url}/logo-dirhan.png`;

  // Lien « Répondre au prospect » : ouvre la messagerie avec l'adresse et l'objet préremplis
  const objetReponse = `Votre demande de devis – ${site.nom}`;
  // L'adresse est déjà validée par le serveur ; on retire par sécurité les caractères qui casseraient le lien
  const adresseReponse = d.email.replace(/[?#&\s]/g, "");
  const lienReponse = `mailto:${adresseReponse}?subject=${encodeURIComponent(objetReponse)}`;

  // Téléphone cliquable s'il est renseigné (on ne garde que les chiffres et le +)
  const telephoneLien = d.telephone.replace(/[^\d+]/g, "");
  const telephoneHtml = d.telephone
    ? `<a href="tel:${echapper(telephoneLien)}" style="color:${NOIR};text-decoration:none;">${echapper(d.telephone)}</a>`
    : nonRenseigne;

  const fiche = [
    ligneFiche("Nom et prénom", `<strong>${echapper(d.nom)}</strong>`),
    ligneFiche(
      "Adresse e-mail",
      `<a href="mailto:${echapper(d.email)}" style="color:${OR_FONCE};text-decoration:underline;">${echapper(d.email)}</a>`,
    ),
    ligneFiche("Téléphone / WhatsApp", telephoneHtml),
    ligneFiche("Entreprise", d.entreprise ? echapper(d.entreprise) : nonRenseigne),
    ligneFiche("Service souhaité", d.service ? echapper(d.service) : nonRenseigne, true),
  ].join("");

  // Les retours à la ligne du message sont conservés (<br>) après échappement
  const messageHtml = echapper(d.message).replace(/\r?\n/g, "<br>");

  // Texte d'aperçu (affiché à côté de l'objet dans la boîte de réception, invisible dans l'e-mail)
  const apercu = echapper(surUneLigne(`${d.nom} vous contacte${d.service ? ` pour : ${d.service}` : ""}. ${d.message}`).slice(0, 140));

  const html = `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light only">
  <title>${echapper(objet)}</title>
  <style>
    @media only screen and (max-width: 620px) {
      .conteneur { width: 100% !important; }
      .marge { padding-left: 22px !important; padding-right: 22px !important; }
      .colonne { display: block !important; width: 100% !important; }
      .etiquette { padding-bottom: 2px !important; border-bottom: 0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${FOND};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${FOND};">${apercu}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${FOND}" style="background-color:${FOND};">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" class="conteneur" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${BLANC};border-radius:14px;overflow:hidden;">

          <!-- En-tête noir avec le logo -->
          <tr>
            <td bgcolor="${NOIR}" align="left" class="marge" style="background-color:${NOIR};padding:28px 36px 24px 36px;">
              <img src="${logo}" width="190" height="47" alt="${echapper(site.nom)}" style="display:block;border:0;outline:none;width:190px;height:auto;max-width:190px;font-family:${POLICE};font-size:18px;font-weight:bold;color:${OR};">
            </td>
          </tr>
          <tr>
            <td bgcolor="${OR}" height="3" style="background-color:${OR};height:3px;line-height:3px;font-size:0;">&nbsp;</td>
          </tr>

          <!-- Titre -->
          <tr>
            <td class="marge" style="padding:34px 36px 8px 36px;">
              <p style="margin:0 0 10px 0;font-family:${POLICE};font-size:12px;line-height:16px;letter-spacing:3px;text-transform:uppercase;color:${OR_FONCE};font-weight:bold;">Nouvelle demande de devis</p>
              <h1 style="margin:0;font-family:${POLICE_TITRE};font-size:26px;line-height:32px;color:${NOIR};font-weight:bold;">${echapper(d.nom)} souhaite échanger avec vous</h1>
              <p style="margin:12px 0 0 0;font-family:${POLICE};font-size:13px;line-height:20px;color:${GRIS_TEXTE};">Reçue le ${echapper(date)}, via le formulaire de contact du site.</p>
            </td>
          </tr>

          <!-- Fiche du prospect -->
          <tr>
            <td class="marge" style="padding:22px 36px 6px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${fiche}
              </table>
            </td>
          </tr>

          <!-- Description du projet -->
          <tr>
            <td class="marge" style="padding:22px 36px 8px 36px;">
              <p style="margin:0 0 10px 0;font-family:${POLICE};font-size:12px;line-height:18px;letter-spacing:1px;text-transform:uppercase;color:${OR_FONCE};font-weight:bold;">Description du projet</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="#FAF8F2" style="background-color:#FAF8F2;border-left:3px solid ${OR};padding:18px 20px;font-family:${POLICE};font-size:15px;line-height:24px;color:${NOIR};">${messageHtml}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bouton « Répondre au prospect » (compatible Outlook) -->
          <tr>
            <td align="left" class="marge" style="padding:26px 36px 36px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="${OR}" style="background-color:${OR};border-radius:999px;">
                    <a href="${echapper(lienReponse)}" target="_blank" style="display:inline-block;padding:14px 30px;font-family:${POLICE};font-size:15px;line-height:18px;font-weight:bold;color:${NOIR};text-decoration:none;border-radius:999px;">Répondre au prospect &rarr;</a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0 0;font-family:${POLICE};font-size:12px;line-height:18px;color:${GRIS_TEXTE};">Vous pouvez aussi simplement cliquer sur « Répondre » : la réponse partira directement à ${echapper(d.email)}.</p>
            </td>
          </tr>

          <!-- Pied noir -->
          <tr>
            <td bgcolor="${NOIR_DOUX}" class="marge" style="background-color:${NOIR_DOUX};padding:22px 36px;">
              <p style="margin:0;font-family:${POLICE_TITRE};font-size:14px;line-height:20px;font-style:italic;color:${BLANC};">${echapper(site.signature)}</p>
              <p style="margin:6px 0 0 0;font-family:${POLICE};font-size:12px;line-height:18px;color:#A3A3A3;">${echapper(site.nom)} · ${echapper(site.ville)} · ${echapper(site.telephone)}</p>
            </td>
          </tr>

        </table>
        <p style="margin:16px 0 0 0;font-family:${POLICE};font-size:11px;line-height:16px;color:#9A9A9A;">E-mail automatique envoyé par le formulaire de contact de ${echapper(site.url.replace(/^https?:\/\//, ""))}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Version texte (pour les messageries qui n'affichent pas le HTML, et pour la délivrabilité)
  const texte = [
    `NOUVELLE DEMANDE DE DEVIS — ${site.nom}`,
    `Reçue le ${date}`,
    "",
    `Nom et prénom      : ${d.nom}`,
    `Adresse e-mail     : ${d.email}`,
    `Téléphone/WhatsApp : ${d.telephone || "Non renseigné"}`,
    `Entreprise         : ${d.entreprise || "Non renseignée"}`,
    `Service souhaité   : ${d.service || "Non précisé"}`,
    "",
    "Description du projet :",
    d.message,
    "",
    `Répondre au prospect : ${d.email}`,
  ].join("\n");

  return { objet, html, texte };
}
