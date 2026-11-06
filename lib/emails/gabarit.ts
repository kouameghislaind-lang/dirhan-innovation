// Gabarit commun à tous les e-mails de DIRHAN INNOVATION (demande de devis, confirmation au prospect…).
//
// Utilisé UNIQUEMENT côté serveur. Règles pour être compatible avec Gmail, Outlook et le mobile :
//   - mise en page en tableaux (<table>), styles écrits directement sur chaque élément ;
//   - largeur maximale de 600 px, adaptée aux petits écrans ;
//   - aucune police externe ni script ; logo en adresse absolue ;
//   - TOUTE donnée saisie par un visiteur doit passer par echapper() avant d'être insérée.

import { liensContact, site } from "@/lib/site";

// ===== Couleurs et polices de la marque =====
export const COULEURS = {
  noir: "#080808",
  noirDoux: "#151515",
  or: "#D4AF37",
  orFonce: "#A8862A",
  blanc: "#FFFFFF",
  texte: "#080808",
  texteDoux: "#5C5C5C",
  filet: "#E8E4D8",
  fond: "#F4F2EC",
  encadre: "#FAF8F2",
};
export const POLICE = "Arial, 'Helvetica Neue', Helvetica, sans-serif";
export const POLICE_TITRE = "Georgia, 'Times New Roman', serif";

// ===== Outils de sécurité et de mise en forme =====

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

/** Texte saisi → HTML sûr, en conservant les retours à la ligne. */
export function paragraphesSurs(texte: string) {
  return echapper(texte).replace(/\r?\n/g, "<br>");
}

/** Date à l'heure d'Abidjan (ex. : « vendredi 6 novembre 2026 à 10:15 »). */
export function dateAbidjan(date = new Date()) {
  const jour = new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeZone: "Africa/Abidjan" }).format(date);
  const heure = new Intl.DateTimeFormat("fr-FR", { timeStyle: "short", timeZone: "Africa/Abidjan" }).format(date);
  return `${jour} à ${heure} (heure d'Abidjan)`;
}

// ===== Blocs réutilisables =====

/** Petit titre doré en capitales. */
export function surtitre(texte: string) {
  return `<p style="margin:0 0 10px 0;font-family:${POLICE};font-size:12px;line-height:16px;letter-spacing:3px;text-transform:uppercase;color:${COULEURS.orFonce};font-weight:bold;">${texte}</p>`;
}

/** Grand titre (Georgia). Le texte doit déjà être échappé. */
export function titre(texteHtml: string) {
  return `<h1 style="margin:0;font-family:${POLICE_TITRE};font-size:26px;line-height:32px;color:${COULEURS.texte};font-weight:bold;">${texteHtml}</h1>`;
}

/** Paragraphe courant. Le texte doit déjà être échappé. */
export function paragraphe(texteHtml: string, marge = "0 0 16px 0") {
  return `<p style="margin:${marge};font-family:${POLICE};font-size:15px;line-height:24px;color:${COULEURS.texte};">${texteHtml}</p>`;
}

/** Bouton doré compatible Outlook. L'adresse doit déjà être sûre. */
export function boutonOr(href: string, libelle: string) {
  return `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="${COULEURS.or}" style="background-color:${COULEURS.or};border-radius:999px;">
                    <a href="${echapper(href)}" target="_blank" style="display:inline-block;padding:14px 30px;font-family:${POLICE};font-size:15px;line-height:18px;font-weight:bold;color:${COULEURS.noir};text-decoration:none;border-radius:999px;">${libelle}</a>
                  </td>
                </tr>
              </table>`;
}

/** Encadré crème à bordure dorée (description du projet, récapitulatif…). Contenu déjà échappé. */
export function encadre(contenuHtml: string) {
  return `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="${COULEURS.encadre}" style="background-color:${COULEURS.encadre};border-left:3px solid ${COULEURS.or};padding:18px 20px;font-family:${POLICE};font-size:15px;line-height:24px;color:${COULEURS.texte};">${contenuHtml}</td>
                </tr>
              </table>`;
}

/** Une section de contenu avec les marges standard. */
export function section(contenuHtml: string, marges = "22px 36px 8px 36px") {
  return `
          <tr>
            <td class="marge" style="padding:${marges};">${contenuHtml}
            </td>
          </tr>`;
}

// ===== Pied de page =====

function piedSimple() {
  return `<p style="margin:6px 0 0 0;font-family:${POLICE};font-size:12px;line-height:18px;color:#A3A3A3;">${echapper(site.nom)} · ${echapper(site.ville)} · ${echapper(site.telephone)}</p>`;
}

function piedCoordonnees() {
  const lien = (href: string, texte: string) =>
    `<a href="${echapper(href)}" target="_blank" style="color:${COULEURS.or};text-decoration:none;">${texte}</a>`;
  const lignes = [
    echapper(site.ville),
    `Téléphone : ${lien(liensContact.telephone, echapper(site.telephone))}`,
    `${lien(liensContact.whatsapp(), "WhatsApp")} &nbsp;·&nbsp; ${lien(site.facebook.url, "Facebook")} &nbsp;·&nbsp; ${lien(site.url, echapper(site.url.replace(/^https?:\/\//, "")))}`,
  ];
  return lignes
    .map(
      (l) =>
        `<p style="margin:6px 0 0 0;font-family:${POLICE};font-size:13px;line-height:20px;color:#D9D9D9;">${l}</p>`,
    )
    .join("");
}

// ===== Gabarit complet =====

type OptionsGabarit = {
  titrePage: string; // titre du document (déjà sûr ou non : il est échappé ici)
  apercu: string; // texte d'aperçu dans la boîte de réception (échappé ici)
  contenu: string; // lignes <tr> du corps de l'e-mail (déjà construites de façon sûre)
  coordonneesDetaillees?: boolean; // pied avec téléphone, WhatsApp, Facebook et site cliquables
  mention?: string; // petite phrase sous l'e-mail (échappée ici)
};

export function gabaritEmail({ titrePage, apercu, contenu, coordonneesDetaillees, mention }: OptionsGabarit) {
  const logo = `${site.url}/logo-dirhan.png`;
  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light only">
  <title>${echapper(titrePage)}</title>
  <style>
    @media only screen and (max-width: 620px) {
      .conteneur { width: 100% !important; }
      .marge { padding-left: 22px !important; padding-right: 22px !important; }
      .colonne { display: block !important; width: 100% !important; }
      .etiquette { padding-bottom: 2px !important; border-bottom: 0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${COULEURS.fond};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${COULEURS.fond};">${echapper(surUneLigne(apercu).slice(0, 140))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COULEURS.fond}" style="background-color:${COULEURS.fond};">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" class="conteneur" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${COULEURS.blanc};border-radius:14px;overflow:hidden;">

          <!-- En-tête noir avec le logo -->
          <tr>
            <td bgcolor="${COULEURS.noir}" align="left" class="marge" style="background-color:${COULEURS.noir};padding:28px 36px 24px 36px;">
              <img src="${logo}" width="190" height="47" alt="${echapper(site.nom)}" style="display:block;border:0;outline:none;width:190px;height:auto;max-width:190px;font-family:${POLICE};font-size:18px;font-weight:bold;color:${COULEURS.or};">
            </td>
          </tr>
          <tr>
            <td bgcolor="${COULEURS.or}" height="3" style="background-color:${COULEURS.or};height:3px;line-height:3px;font-size:0;">&nbsp;</td>
          </tr>
${contenu}

          <!-- Pied noir -->
          <tr>
            <td bgcolor="${COULEURS.noirDoux}" class="marge" style="background-color:${COULEURS.noirDoux};padding:22px 36px;">
              <p style="margin:0;font-family:${POLICE_TITRE};font-size:14px;line-height:20px;font-style:italic;color:${COULEURS.blanc};">${echapper(site.signature)}</p>
              ${coordonneesDetaillees ? piedCoordonnees() : piedSimple()}
            </td>
          </tr>

        </table>
        ${mention ? `<p style="margin:16px 0 0 0;font-family:${POLICE};font-size:11px;line-height:16px;color:#9A9A9A;">${echapper(mention)}</p>` : ""}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Coordonnées officielles en version texte (pour les versions texte des e-mails). */
export function coordonneesTexte() {
  return [
    site.nom,
    site.ville,
    `Téléphone : ${site.telephone}`,
    `WhatsApp : ${liensContact.whatsapp()}`,
    `Facebook : ${site.facebook.url}`,
    `Site : ${site.url}`,
  ].join("\n");
}
