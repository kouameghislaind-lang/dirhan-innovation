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
    "Agence digitale et technologique ivoirienne aux standards internationaux : sites web, applications mobiles, logiciels, branding, marketing digital et intelligence artificielle.",
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
  titre: "Nous transformons vos idées en solutions digitales innovantes.",
  sousTitre:
    "Agence digitale et technologique basée à Abidjan, DIRHAN INNOVATION conçoit des sites, des applications, des logiciels et des contenus aux standards internationaux, pour faire grandir votre entreprise.",
  // Les 5 services mis en avant sur l'accueil. "lien" renvoie vers le détail sur la page Services.
  services: [
    {
      icone: "web" as IconeNom,
      titre: "Création de sites web",
      texte: "Sites vitrines, boutiques en ligne et plateformes sur mesure, rapides, élégants et bien référencés.",
      lien: "/services#sites-web",
    },
    {
      icone: "mobile" as IconeNom,
      titre: "Applications web et mobiles",
      texte: "Applications iOS, Android et web, fluides et intuitives, pensées pour vos utilisateurs.",
      lien: "/services#applications-mobiles",
    },
    {
      icone: "logiciel" as IconeNom,
      titre: "Développement de logiciels",
      texte: "Outils métiers et solutions sur mesure qui centralisent vos données et simplifient votre travail.",
      lien: "/services#logiciels",
    },
    {
      icone: "contenu" as IconeNom,
      titre: "Création de contenus digitaux",
      texte: "Visuels, vidéos et contenus pour les réseaux sociaux qui captent l'attention et valorisent votre marque.",
      lien: "/services#marketing-digital",
    },
    {
      icone: "identite" as IconeNom,
      titre: "Identité visuelle et communication digitale",
      texte: "Logo, charte graphique et communication en ligne cohérente pour une image forte et professionnelle.",
      lien: "/services#branding",
    },
  ],
  piliers: [
    {
      icone: "innovation" as IconeNom,
      titre: "Innovation",
      texte: "Des technologies modernes et des solutions pensées pour durer, au service de vos ambitions.",
    },
    {
      icone: "creativite" as IconeNom,
      titre: "Créativité",
      texte: "Un design soigné et des idées originales pour vous démarquer de la concurrence.",
    },
    {
      icone: "accompagnement" as IconeNom,
      titre: "Accompagnement",
      texte: "Un interlocuteur unique, à l'écoute, de la première idée jusqu'au lancement et au-delà.",
    },
    {
      icone: "qualite" as IconeNom,
      titre: "Qualité",
      texte: "Un travail exigeant, testé et livré avec le souci du détail, aux standards internationaux.",
    },
  ],
};

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
  directeurPublication: "", // Nom et fonction du responsable du site
  hebergeur: {
    nom: "", // ex. : Vercel Inc.
    adresse: "",
    site: "",
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
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    numero: "01",
    icone: "web" as IconeNom,
    slug: "sites-web",
    titre: "Création de sites web",
    description:
      "Sites vitrines, e-commerce et plateformes sur mesure, rapides, élégants et pensés pour convertir.",
    detail:
      "Votre site est souvent le premier contact avec vos clients. Nous créons des sites rapides, beaux sur tous les écrans et bien référencés sur Google, pour transformer vos visiteurs en clients.",
    prestations: [
      "Sites vitrines et sites institutionnels",
      "Boutiques en ligne (e-commerce)",
      "Plateformes et portails sur mesure",
      "Référencement naturel (SEO) intégré",
      "Hébergement, maintenance et évolutions",
    ],
  },
  {
    numero: "02",
    icone: "mobile" as IconeNom,
    slug: "applications-mobiles",
    titre: "Applications mobiles",
    description:
      "Applications iOS et Android fluides et intuitives, de la conception à la publication sur les stores.",
    detail:
      "En Afrique, tout passe par le téléphone. Nous concevons des applications simples à utiliser et performantes, même avec une connexion limitée.",
    prestations: [
      "Applications iOS et Android",
      "Design d'interface (UI/UX)",
      "Intégration des paiements mobiles",
      "Publication sur l'App Store et Google Play",
      "Suivi et mises à jour",
    ],
  },
  {
    numero: "03",
    icone: "logiciel" as IconeNom,
    slug: "logiciels",
    titre: "Développement de logiciels",
    description:
      "Outils métiers, ERP et solutions SaaS robustes, adaptés aux processus de votre entreprise.",
    detail:
      "Fini les fichiers Excel éparpillés. Nous développons des outils sur mesure qui centralisent vos données et simplifient le travail de vos équipes.",
    prestations: [
      "Logiciels de gestion sur mesure",
      "ERP, CRM et tableaux de bord",
      "Plateformes SaaS",
      "Gestion de flotte, de stock et de facturation",
      "Connexion à vos outils existants",
    ],
  },
  {
    numero: "04",
    icone: "identite" as IconeNom,
    slug: "branding",
    titre: "Branding & design graphique",
    description:
      "Identités visuelles fortes, logos et chartes graphiques qui donnent du prestige à votre marque.",
    detail:
      "Une marque forte inspire confiance. Nous construisons une identité visuelle cohérente et mémorable, du logo jusqu'à vos supports de communication.",
    prestations: [
      "Création de logo",
      "Charte graphique complète",
      "Supports print et digitaux",
      "Visuels pour réseaux sociaux",
      "Présentations et plaquettes commerciales",
    ],
  },
  {
    numero: "05",
    icone: "marketing" as IconeNom,
    slug: "marketing-digital",
    titre: "Marketing digital",
    description:
      "Stratégie, réseaux sociaux, référencement et publicité en ligne pour accélérer votre croissance.",
    detail:
      "Être en ligne ne suffit pas : il faut être vu par les bonnes personnes. Nous élaborons et pilotons des stratégies qui génèrent de vrais résultats.",
    prestations: [
      "Stratégie digitale",
      "Gestion des réseaux sociaux",
      "Publicité Facebook, Instagram, Google et TikTok",
      "Création de contenus et vidéos",
      "Analyse des résultats et rapports",
    ],
  },
  {
    numero: "06",
    icone: "ia" as IconeNom,
    slug: "ia-automatisation",
    titre: "IA & automatisation",
    description:
      "Assistants intelligents, chatbots et automatisation des tâches pour gagner en efficacité.",
    detail:
      "L'intelligence artificielle n'est plus réservée aux géants. Nous l'intégrons dans votre activité pour gagner du temps et mieux servir vos clients.",
    prestations: [
      "Chatbots et assistants WhatsApp",
      "Automatisation des tâches répétitives",
      "Génération de contenus par IA",
      "Analyse intelligente de données",
      "Formation de vos équipes à l'IA",
    ],
  },
];

// ===== Page Réalisations =====
// Pour ajouter un projet, copie un des projets ci-dessous et modifie-le.
// - categorie : sert aux filtres de la page (une nouvelle catégorie crée un nouveau filtre)
// - statut : "developpement", "prototype", "concept" ou "livre" (projet terminé et livré)
// - service : le "slug" du service lié (sites-web, applications-mobiles, logiciels,
//   branding, marketing-digital, ia-automatisation)
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
    "Trop souvent, il faut choisir entre un prestataire local qui comprend le marché et une agence étrangère qui maîtrise les standards internationaux. Nous avons créé DIRHAN pour réunir les deux.",
    "Aujourd'hui, nous accompagnons nos clients de l'idée jusqu'au lancement : sites web, applications, logiciels, identité de marque, marketing et intelligence artificielle.",
  ],
};

// Manifeste affiché en grand sur la page À propos
export const manifeste = {
  texte:
    "Nous croyons que l'excellence n'a pas de frontières. Qu'une idée née à Abidjan peut rivaliser avec les meilleures du monde. Et que chaque entreprise africaine mérite des outils digitaux à la hauteur de ses ambitions.",
  // Mots du manifeste mis en valeur en or
  motsCles: ["excellence", "Abidjan", "ambitions"],
};

// Fondateur : la section s'affiche automatiquement sur la page À propos dès que "nom" est rempli.
// Photo : place le fichier dans public/ (ex. public/fondateur.jpg) et écris "/fondateur.jpg".
export const fondateur = {
  nom: "",
  role: "", // ex. : Fondateur & directeur général
  photo: "",
  citation: "",
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

// Points de réassurance affichés sur la page Contact (à adapter à tes engagements réels)
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
