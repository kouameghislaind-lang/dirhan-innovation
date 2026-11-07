// Mesure d'audience : événements commerciaux du site.
//
// AUCUN outil de mesure n'est installé aujourd'hui : ces fonctions ne font rien
// (aucune donnée n'est envoyée, aucun cookie n'est déposé).
// Elles sont prêtes pour le jour où Google Analytics 4 sera ajouté, APRÈS :
//   1. la mise en place d'un bandeau de consentement aux cookies ;
//   2. la mise à jour de la politique de confidentialité et de la page Cookies.
// Les événements ne seront alors transmis qu'aux visiteurs ayant accepté.
//
// Événements prévus :
//   - clic_whatsapp      : clic sur un lien WhatsApp
//   - clic_telephone     : clic sur le numéro de téléphone
//   - clic_devis         : clic vers la page Contact (demande de devis)
//   - formulaire_envoye  : demande envoyée avec succès
// Les consultations des pages Services et Réalisations sont mesurées automatiquement
// par Google Analytics (pages vues), sans code supplémentaire.

type Parametres = Record<string, string | number>;

type FenetreAvecGtag = Window & { gtag?: (commande: "event", nom: string, parametres?: Parametres) => void };

export function suivreEvenement(nom: string, parametres: Parametres = {}) {
  if (typeof window === "undefined") return;
  const { gtag } = window as FenetreAvecGtag;
  if (typeof gtag === "function") gtag("event", nom, parametres);
}
