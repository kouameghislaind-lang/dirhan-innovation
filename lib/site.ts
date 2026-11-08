// Toutes les informations de l'entreprise au même endroit.
// Pour changer un texte du site, c'est souvent ici qu'il faut regarder.

// Adresse officielle du site, utilisée pour le SEO (sitemap, robots.txt, partages...).
// Ordre de priorité :
//   1. NEXT_PUBLIC_SITE_URL : ton nom de domaine, à définir sur Vercel (ex. https://www.dirhan-innovation.com)
//   2. Sur Vercel, l'adresse de production fournie automatiquement (ex. dirhan-innovation.vercel.app)
//   3. Sur ton ordinateur : http://localhost:3000
function adresseDuSite() {
  const choisie = process.env.NEXT_PUBLIC_SITE_URL;
  if (choisie) return choisie.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

// Vrai uniquement sur le site public final (et en local). Faux sur les versions
// de test (« preview ») de Vercel, pour que Google ne les indexe pas.
export const estSitePublic = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

export const site = {
  nom: "DIRHAN INNOVATION",
  signature: "L'excellence digitale, née en Côte d'Ivoire.",
  description:
    "Agence digitale et technologique à Abidjan : communication digitale, sites web, applications, création graphique, logiciels et contenus sur mesure.",
  url: adresseDuSite(),

  // ===== Coordonnées officielles (NAP : nom, adresse, téléphone) =====
  // Ces valeurs sont la SEULE source : pages, pied de page, menu, SEO et Schema.org les réutilisent.
  // Pas d'adresse de rue ni de coordonnées GPS tant qu'elles ne sont pas confirmées.
  adresse: {
    quartier: "Cocody",
    ville: "Abidjan",
    pays: "Côte d'Ivoire",
    codePays: "CI",
  },
  ville: "Cocody, Abidjan, Côte d'Ivoire", // adresse complète affichée
  localisationCourte: "Cocody, Abidjan", // version courte (badge de l'accueil)
  telephone: "+225 01 41 95 95 97", // format affiché
  // Numéro WhatsApp : même numéro, format international sans espace ni "+"
  whatsapp: "2250141959597",
  email: "", // à compléter
  facebook: {
    pageId: "218946911938291",
    // Adresse canonique de la page (vérifiée : facebook.com/218946911938291 redirige ici)
    url: "https://www.facebook.com/dirhaninnovation/",
  },
};

// Liens prêts à l'emploi, fabriqués à partir des coordonnées ci-dessus
export const liensContact = {
  // tel:+2250141959597 (sans espaces, pour lancer l'appel sur mobile)
  telephone: `tel:${site.telephone.replace(/\s/g, "")}`,
  // Numéro au format international strict (E.164), utilisé par Schema.org
  telephoneE164: site.telephone.replace(/\s/g, ""),
  whatsapp: (message?: string) =>
    `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`,
};

// Messages préremplis lorsqu'un visiteur ouvre WhatsApp depuis le site
export const messagesWhatsApp = {
  general: `Bonjour ${site.nom}, je souhaite échanger avec vous au sujet d'un projet.`,
  devis: `Bonjour ${site.nom}, je souhaite obtenir un devis pour un projet.`,
  service: (service: string) =>
    `Bonjour ${site.nom}, je suis intéressé(e) par votre offre « ${service} ». Pouvons-nous en parler ?`,
};

// L'action principale du site : un seul libellé partout, pour ne pas faire hésiter le visiteur
export const actionPrincipale = { label: "Demander un devis", href: "/contact" };

// ===== Page d'accueil =====
export type IconeNom =
  | "web"
  | "mobile"
  | "logiciel"
  | "contenu"
  | "identite"
  | "marketing"
  | "ia"
  | "innovation"
  | "creativite"
  | "accompagnement"
  | "qualite";

export const accueil = {
  // SECTION 1 — Hero
  titre: "Nous transformons vos idées en expériences digitales innovantes.",
  sousTitre:
    "Communication, création web, applications et solutions numériques sur mesure pour accompagner votre croissance.",

  // SECTION 2 — Introduction
  introduction: {
    accroche:
      "Une agence digitale et technologique née à Abidjan, qui réunit stratégie, design et technologie au service de votre croissance.",
    paragraphes: [
      "DIRHAN INNOVATION accompagne les entreprises, institutions et entrepreneurs d'Abidjan et de Côte d'Ivoire qui veulent exister avec force dans le monde numérique.",
      "Création de sites web, développement d'applications et de logiciels sur mesure, communication digitale et contenus numériques : nous concevons des solutions digitales pour entreprises, exigeantes dans le détail et pensées pour les usages du marché ivoirien et africain.",
    ],
  },

  // SECTION 3 — Nos expertises : générée à partir de la liste des services (lib/services.ts)

  // SECTION 5 — Notre approche
  approche: [
    { titre: "Découverte", texte: "Nous écoutons votre activité, vos objectifs et vos contraintes." },
    { titre: "Stratégie", texte: "Nous définissons la bonne réponse : priorités, planning et budget clairs." },
    { titre: "Conception", texte: "Nous dessinons l'expérience et l'identité, validées avec vous avant de produire." },
    { titre: "Développement", texte: "Nous réalisons votre projet et vous montrons l'avancement à chaque étape." },
    { titre: "Lancement", texte: "Nous mettons en ligne, vérifions chaque détail et formons vos équipes." },
    { titre: "Accompagnement", texte: "Nous restons à vos côtés pour suivre, maintenir et faire évoluer votre projet." },
  ],

  // SECTION 7 — Pourquoi DIRHAN INNOVATION (engagements réellement proposés)
  avantages: [
    { titre: "Un interlocuteur unique", texte: "Une seule équipe, de la première idée au lancement, puis pour faire évoluer votre projet." },
    { titre: "Du sur-mesure", texte: "Chaque solution est conçue pour votre activité, pas copiée d'un modèle générique." },
    { titre: "Une proposition claire", texte: "Un devis détaillé, un planning et un budget expliqués simplement, sans surprise." },
    { titre: "Premier échange sans engagement", texte: "Nous prenons le temps de comprendre votre besoin avant toute proposition." },
    { titre: "Les usages locaux", texte: "Nous connaissons le marché ivoirien : le mobile, WhatsApp et les paiements locaux." },
    { titre: "L'exigence internationale", texte: "Des méthodes et des technologies modernes, un soin du détail à chaque étape." },
  ],
};

// ===== Le dirigeant =====
// Portraits dans public/equipe/ (photos authentiques, non retouchées par le site) :
//   - dirigeant-02.jpg : portrait couleur, portrait PRINCIPAL (accueil)
//   - dirigeant.jpg    : portrait noir et blanc, présentation institutionnelle (À propos)
// Ne jamais inventer d'informations personnelles (diplômes, parcours, dates…).
export const dirigeant = {
  nom: "Didier Ghislain KOUAME",
  fonction: "Fondateur & Directeur Général – DIRHAN INNOVATION",
  // Texte de présentation : centré sur son rôle dans l'agence
  presentation: [
    "Fondateur et Directeur Général de DIRHAN INNOVATION, Didier Ghislain KOUAME porte une conviction : l'innovation digitale doit être un levier concret de croissance pour les entreprises ivoiriennes et africaines.",
    "Sous sa direction, l'agence conçoit des solutions numériques sur mesure (sites web, applications, logiciels et communication digitale) pensées pour répondre aux besoins réels de chaque organisation.",
    "Sa priorité : accompagner chaque client avec écoute, exigence et transparence, de la première réflexion jusqu'au lancement, puis dans l'évolution de ses projets.",
  ],
  citation: "", // phrase du dirigeant, entre guillemets sur le site (à fournir)
};

// ===== Équipe (autres membres) =====
// Une personne s'affiche dans la section « Notre équipe » de l'accueil UNIQUEMENT
// quand son nom ET sa photo sont renseignés. Photos dans public/equipe/.
export const equipe: { nom: string; role: string; photo: string; presentation: string }[] = [
  { nom: "", role: "Commerciale", photo: "", presentation: "" }, // ex. photo : "/equipe/commerciale.jpg"
];

// ===== Informations légales =====
// Utilisées par les pages "Mentions légales" et "Politique de confidentialité".
// Tant qu'un champ est vide, la page affiche « À compléter ».
// Ces informations figurent sur tes documents officiels (registre de commerce, DGI...).
export const entreprise = {
  raisonSociale: "DIRHAN INNOVATION",
  formeJuridique: "", // ex. : SARL, SARLU, SAS, Entreprise individuelle...
  capital: "", // ex. : 1 000 000 FCFA (laisser vide si non applicable)
  rccm: "", // Numéro au Registre du Commerce et du Crédit Mobilier (ex. : CI-ABJ-...)
  ncc: "", // Numéro de Compte Contribuable (DGI)
  siege: "", // Adresse complète du siège (commune, quartier, rue...)
  directeurPublication: "Didier Ghislain KOUAME, Fondateur & Directeur Général", // Nom et fonction du responsable du site
  hebergeur: {
    nom: "Vercel Inc.", // hébergeur réel du site (confirmé : déploiement Vercel)
    adresse: "", // adresse postale de Vercel : à recopier depuis vercel.com/legal
    site: "https://vercel.com",
  },
  // Durée de conservation des messages reçus via le formulaire (à valider)
  dureeConservation: "3 ans à compter du dernier échange",
  dateMiseAJour: "5 novembre 2026",
};

export const liensLegaux = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
  { label: "Gestion des cookies", href: "/cookies" },
  { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
];

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Équipe", href: "/equipe" },
  { label: "Contact", href: "/contact" },
];

// Les 6 services (contenus complets) sont dans lib/services.ts
export { services, type Service } from "@/lib/services";

// ===== Page Réalisations =====
// Pour ajouter un projet, copie un des projets ci-dessous et modifie-le.
// - categorie : sert aux filtres de la page (une nouvelle catégorie crée un nouveau filtre)
// - statut : "developpement", "prototype", "concept" ou "livre" (projet terminé et livré)
// - service : le "slug" du service lié (communication-digitale, sites-web, applications-web-mobiles,
//   creation-graphique, logiciels, creation-de-contenus)
// - illustration : "boutique", "flotte" ou "restaurant" (dessins originaux du site)
// - image (facultatif) : une vraie capture dans public/realisations/, elle remplace l'illustration
// - client : "Projet interne DIRHAN" ou le nom d'un client (uniquement avec son accord)

export type StatutProjet = "developpement" | "prototype" | "concept" | "livre";

export const statuts: Record<StatutProjet, string> = {
  developpement: "En développement",
  prototype: "Prototype",
  concept: "Concept",
  livre: "Livré",
};

// Explication de chaque statut (légende de la page Réalisations)
export const statutsDescription: Record<StatutProjet, string> = {
  concept: "Idée étudiée et mise en forme, pas encore développée.",
  prototype: "Première version fonctionnelle, en cours de test.",
  developpement: "Projet en cours de réalisation.",
  livre: "Projet terminé et mis en service.",
};

export type Realisation = {
  slug: string;
  titre: string;
  categorie: string;
  statut: StatutProjet;
  statutDetail: string;
  client: string;
  service: string;
  resume: string;
  axes: string[];
  illustration?: "boutique" | "flotte" | "restaurant";
  image?: string;
  lien?: string;
  annee?: string;
  // Mis en avant en grand en tête du portfolio (un seul projet à la fois)
  vedette?: boolean;
};

export const realisations: Realisation[] = [
  {
    slug: "dirhan-store-by-k",
    titre: "DIRHAN STORE BY K",
    categorie: "E-commerce",
    statut: "developpement",
    statutDetail: "Projet en développement",
    client: "Projet interne DIRHAN",
    service: "sites-web",
    resume:
      "Projet de boutique digitale spécialisée dans la mode et les accessoires pour toute la famille.",
    axes: ["Boutique digitale", "Mode et accessoires", "Une offre pour toute la famille"],
    illustration: "boutique",
  },
  {
    slug: "dirhan-fleet-management",
    titre: "DIRHAN FLEET MANAGEMENT",
    categorie: "Applications & Logiciels",
    statut: "prototype",
    statutDetail: "Prototype en développement",
    client: "Projet interne DIRHAN",
    service: "logiciels",
    resume:
      "Conception d'une solution digitale de gestion de flotte automobile intégrant le suivi des véhicules, les maintenances, les alertes et les indicateurs de performance.",
    axes: [
      "Suivi des véhicules",
      "Gestion des maintenances",
      "Alertes",
      "Indicateurs de performance",
    ],
    illustration: "flotte",
    vedette: true,
  },
  {
    slug: "dirhan-resto-plus",
    titre: "DIRHAN RESTO+",
    categorie: "Applications & Logiciels",
    statut: "concept",
    statutDetail: "Projet conceptuel",
    client: "Projet interne DIRHAN",
    service: "logiciels",
    resume: "Concept de solution digitale dédiée au secteur de la restauration.",
    axes: ["Solution digitale", "Secteur de la restauration"],
    illustration: "restaurant",
  },
];

// ===== Page À propos =====
export const aPropos = {
  mission:
    "Donner aux entreprises, institutions et entrepreneurs africains des outils digitaux du même niveau que ceux des meilleures agences internationales.",
  vision:
    "Faire de la Côte d'Ivoire une référence de l'excellence digitale en Afrique, et prouver que l'innovation de classe mondiale peut naître à Abidjan.",
  histoire: [
    "DIRHAN INNOVATION est née à Abidjan d'une conviction simple : les entreprises africaines méritent des solutions digitales aussi exigeantes que celles des plus grandes agences du monde.",
    "Trop souvent, il faut choisir entre un prestataire local qui comprend le marché et une agence étrangère qui maîtrise les standards internationaux. Nous avons créé DIRHAN INNOVATION pour réunir les deux.",
    "Aujourd'hui, nous accompagnons nos clients de l'idée jusqu'au lancement : communication digitale, sites web, applications, création graphique, logiciels et contenus.",
  ],
};

// Manifeste affiché en grand sur la page À propos
export const manifeste = {
  texte:
    "Nous croyons que l'excellence n'a pas de frontières. Qu'une idée née à Abidjan peut rivaliser avec les meilleures du monde. Et que chaque entreprise africaine mérite des outils digitaux à la hauteur de ses ambitions.",
  // Mots du manifeste mis en valeur en or
  motsCles: ["excellence", "Abidjan", "ambitions"],
};

export const valeurs = [
  {
    titre: "Excellence",
    texte: "Chaque détail compte. Nous livrons un travail dont nous sommes fiers, sans compromis sur la qualité.",
  },
  {
    titre: "Innovation",
    texte: "Nous suivons les technologies de pointe pour vous proposer des solutions modernes et durables.",
  },
  {
    titre: "Transparence",
    texte: "Des devis clairs, des délais tenus et une communication honnête à chaque étape.",
  },
  {
    titre: "Proximité",
    texte: "Nous sommes à Abidjan, disponibles et à l'écoute. Votre réussite est notre priorité.",
  },
];

// Points de réassurance affichés sur les pages Contact et À propos (à adapter à tes engagements réels)
export const reassurance = [
  { titre: "Premier échange sans engagement", texte: "Nous prenons le temps de comprendre votre besoin avant toute proposition." },
  { titre: "Une proposition claire", texte: "Un devis détaillé, un planning et un budget expliqués simplement." },
  { titre: "Vos informations protégées", texte: "Vos données servent uniquement à vous répondre." },
];

export const methode = [
  {
    titre: "Écoute",
    texte: "Nous comprenons votre activité, vos objectifs et vos contraintes.",
  },
  {
    titre: "Conception",
    texte: "Nous proposons une solution claire, avec maquettes, planning et budget.",
  },
  {
    titre: "Réalisation",
    texte: "Nous développons votre projet et vous montrons l'avancement à chaque étape.",
  },
  {
    titre: "Lancement & suivi",
    texte: "Nous mettons en ligne, formons vos équipes et restons à vos côtés.",
  },
];

export const engagements = [
  {
    titre: "Standards internationaux",
    texte:
      "Des méthodes et des technologies utilisées par les meilleures agences du monde.",
  },
  {
    titre: "Ancrage ivoirien",
    texte:
      "Nous connaissons le marché africain et ses usages, notamment le mobile et le paiement local.",
  },
  {
    titre: "Accompagnement complet",
    texte:
      "Un seul interlocuteur, de l'idée au lancement, puis pour faire évoluer votre projet.",
  },
];
