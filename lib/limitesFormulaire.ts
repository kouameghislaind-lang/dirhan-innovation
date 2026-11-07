// Longueurs maximales des champs du formulaire de contact.
// Une seule source, utilisée par le formulaire (attribut maxLength) ET par le serveur
// (app/contact/actions.ts) : rien n'est donc coupé sans que le visiteur le voie.
export const LIMITES_FORMULAIRE = {
  nom: 100,
  email: 150,
  telephone: 30,
  sujet: 150,
  entreprise: 120,
  service: 80,
  message: 5000,
} as const;
