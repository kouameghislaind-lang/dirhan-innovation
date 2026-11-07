// ===== Les 6 services de DIRHAN INNOVATION =====
// Chaque service a sa propre page : /services/<slug>
// Pour modifier un texte, change-le ici : la page Services, la page dédiée,
// le menu du pied de page et la liste du formulaire de contact se mettent à jour.
//
// Règles de rédaction : aucune promesse de résultat chiffré, aucun positionnement Google
// garanti, aucune référence client inventée.

import type { IconeNom } from "@/lib/site";

export type Service = {
  numero: string;
  slug: string;
  icone: IconeNom;
  titre: string;
  // Titre de la page pour Google (sans « | DIRHAN INNOVATION », ajouté automatiquement)
  titreSeo: string;
  // Phrase courte (cartes, menus)
  description: string;
  // Sous-titre du haut de la page dédiée
  accroche: string;
  // Description pour Google (150 à 160 caractères environ)
  metaDescription: string;
  // Présentation du service (2 paragraphes)
  presentation: string[];
  prestations: string[];
  problemes: string[];
  solutions: { titre: string; texte: string }[];
  processus: { titre: string; texte: string }[];
  avantages: { titre: string; texte: string }[];
  faq: { question: string; reponse: string }[];
};

export const services: Service[] = [
  // ---------------------------------------------------------------- A
  {
    numero: "01",
    slug: "communication-digitale",
    icone: "marketing",
    titre: "Communication digitale",
    titreSeo: "Communication digitale à Abidjan",
    description:
      "Stratégie, présence en ligne et accompagnement de marque pour être vu par les bonnes personnes.",
    accroche:
      "Une communication claire, cohérente et régulière pour faire connaître votre marque et gagner la confiance de vos clients.",
    metaDescription:
      "Stratégie de communication, gestion de présence digitale et création de contenus à Abidjan : DIRHAN INNOVATION accompagne votre marque en ligne.",
    presentation: [
      "Être présent en ligne ne suffit plus : il faut un message clair, une image cohérente et une présence régulière là où se trouvent vos clients.",
      "Nous construisons avec vous une stratégie de communication adaptée à vos objectifs et à votre budget, puis nous vous aidons à la faire vivre au quotidien.",
    ],
    prestations: [
      "Stratégie de communication",
      "Gestion de présence digitale",
      "Création de contenus",
      "Accompagnement de marques",
    ],
    problemes: [
      "Vos réseaux sociaux sont peu actifs ou publiés sans ligne directrice.",
      "Votre message n'est pas le même d'un support à l'autre.",
      "Vous manquez de temps ou de compétences pour communiquer régulièrement.",
      "Vous ne savez pas quels canaux privilégier pour toucher vos clients.",
    ],
    solutions: [
      { titre: "Une stratégie sur mesure", texte: "Objectifs, cibles, messages et canaux définis ensemble, dans un plan simple à suivre." },
      { titre: "Une présence animée", texte: "Un calendrier de publications et des contenus préparés pour vos pages et réseaux." },
      { titre: "Une image cohérente", texte: "Un ton, des visuels et des messages harmonisés sur tous vos supports." },
    ],
    processus: [
      { titre: "Diagnostic", texte: "Nous analysons votre présence actuelle, votre marché et vos objectifs." },
      { titre: "Stratégie", texte: "Nous définissons messages, cibles, canaux et calendrier." },
      { titre: "Production", texte: "Nous créons les contenus et les préparons pour la publication." },
      { titre: "Suivi", texte: "Nous faisons le point régulièrement et ajustons la stratégie." },
    ],
    avantages: [
      { titre: "Un regard extérieur", texte: "Un avis professionnel sur votre image et votre message." },
      { titre: "Du temps gagné", texte: "Vous vous concentrez sur votre activité, nous préparons la communication." },
      { titre: "De la cohérence", texte: "Une marque reconnaissable, du réseau social au document commercial." },
    ],
    faq: [
      {
        question: "Gérez-vous directement nos réseaux sociaux ?",
        reponse: "Oui, si vous le souhaitez. Nous pouvons aussi préparer les contenus et vous laisser les publier : la formule est définie ensemble.",
      },
      {
        question: "Faut-il un gros budget pour commencer ?",
        reponse: "Non. Nous adaptons la stratégie à vos moyens et commençons par les actions les plus utiles pour votre activité.",
      },
      {
        question: "Garantissez-vous un nombre d'abonnés ou de ventes ?",
        reponse: "Non, aucune agence sérieuse ne peut le garantir. Nous nous engageons sur la qualité du travail, la régularité et un suivi transparent.",
      },
    ],
  },
  // ---------------------------------------------------------------- B
  {
    numero: "02",
    slug: "sites-web",
    icone: "web",
    titre: "Création de sites web",
    titreSeo: "Création de sites web en Côte d'Ivoire",
    description:
      "Sites vitrines, institutionnels et landing pages rapides, élégants et bien référencés.",
    accroche:
      "Des sites rapides, élégants et faciles à utiliser, sur ordinateur comme sur téléphone, pour transformer vos visiteurs en clients.",
    metaDescription:
      "Création de sites vitrines, institutionnels, landing pages et refonte de sites à Abidjan. Sites rapides, responsive et optimisés pour Google.",
    presentation: [
      "Votre site est souvent le premier contact entre votre entreprise et vos futurs clients. Il doit inspirer confiance en quelques secondes.",
      "Nous concevons des sites sur mesure, pensés d'abord pour le téléphone, rapides à charger et construits selon les bonnes pratiques du référencement naturel.",
    ],
    prestations: [
      "Sites vitrines",
      "Sites institutionnels",
      "Landing pages",
      "Sites professionnels",
      "Refonte de sites",
    ],
    problemes: [
      "Vous n'avez pas encore de site, ou il ne reflète plus votre entreprise.",
      "Votre site est lent ou mal affiché sur téléphone.",
      "Les visiteurs ne savent pas comment vous contacter.",
      "Votre site est difficile à trouver sur Google.",
    ],
    solutions: [
      { titre: "Un design sur mesure", texte: "Une identité unique, fidèle à votre marque, loin des modèles génériques." },
      { titre: "Pensé pour le mobile", texte: "Un affichage parfait sur tous les écrans, d'abord sur téléphone." },
      { titre: "Prêt pour Google", texte: "Structure, vitesse et contenus conçus selon les bonnes pratiques du référencement." },
    ],
    processus: [
      { titre: "Cadrage", texte: "Objectifs, pages, contenus et fonctionnalités définis ensemble." },
      { titre: "Maquettes", texte: "Vous validez le design avant tout développement." },
      { titre: "Développement", texte: "Nous construisons le site et vous montrons l'avancement." },
      { titre: "Mise en ligne", texte: "Tests, mise en ligne et prise en main du site." },
    ],
    avantages: [
      { titre: "Rapidité", texte: "Des pages légères qui s'affichent vite, même avec une connexion moyenne." },
      { titre: "Contact facilité", texte: "Formulaire, appel et WhatsApp accessibles en un clic." },
      { titre: "Évolutif", texte: "Un site qui peut grandir avec votre activité." },
    ],
    faq: [
      {
        question: "Combien de temps faut-il pour créer un site ?",
        reponse: "Cela dépend du nombre de pages et des fonctionnalités. Un planning précis vous est communiqué avec le devis.",
      },
      {
        question: "Mon site sera-t-il premier sur Google ?",
        reponse: "Personne ne peut garantir une position sur Google. Nous construisons un site conforme aux bonnes pratiques, ce qui lui donne de bonnes bases pour être bien référencé.",
      },
      {
        question: "Pouvez-vous refaire mon site actuel ?",
        reponse: "Oui. Nous analysons votre site existant, conservons ce qui fonctionne et modernisons le reste.",
      },
    ],
  },
  // ---------------------------------------------------------------- C
  {
    numero: "03",
    slug: "applications-web-mobiles",
    icone: "mobile",
    titre: "Applications web et mobiles",
    titreSeo: "Développement d'applications web et mobiles",
    description:
      "Applications métiers et interfaces fluides, pensées pour vos utilisateurs et leur téléphone.",
    accroche:
      "Des applications simples à utiliser et performantes, conçues autour des besoins réels de vos utilisateurs.",
    metaDescription:
      "Conception d'applications web et mobiles sur mesure à Abidjan : applications métiers, interfaces web et solutions mobiles par DIRHAN INNOVATION.",
    presentation: [
      "En Côte d'Ivoire, l'essentiel des usages numériques passe par le téléphone. Une bonne application doit être claire, rapide et fiable.",
      "Nous concevons des applications web et mobiles sur mesure, de l'expérience utilisateur jusqu'au développement et à la mise en service.",
    ],
    prestations: [
      "Applications métiers",
      "Interfaces web",
      "Solutions mobiles",
      "Applications sur mesure",
    ],
    problemes: [
      "Vos équipes ou vos clients utilisent des outils mal adaptés au téléphone.",
      "Vous avez une idée d'application mais ne savez pas par où commencer.",
      "Les solutions existantes ne correspondent pas à votre façon de travailler.",
    ],
    solutions: [
      { titre: "Une expérience claire", texte: "Des écrans simples, pensés pour être compris sans formation." },
      { titre: "Sur mesure", texte: "Des fonctionnalités construites autour de votre activité." },
      { titre: "Une base solide", texte: "Des technologies modernes, sécurisées et faciles à faire évoluer." },
    ],
    processus: [
      { titre: "Découverte", texte: "Nous comprenons vos utilisateurs et leurs besoins." },
      { titre: "Prototype", texte: "Vous testez les écrans principaux avant le développement." },
      { titre: "Développement", texte: "Nous développons par étapes, avec des démonstrations régulières." },
      { titre: "Lancement", texte: "Mise en service, accompagnement et évolutions." },
    ],
    avantages: [
      { titre: "Adapté au terrain", texte: "Conçu pour les usages mobiles et les connexions variables." },
      { titre: "Progressif", texte: "Une première version utile rapidement, enrichie ensuite." },
      { titre: "Accompagné", texte: "Un suivi après le lancement pour corriger et améliorer." },
    ],
    faq: [
      {
        question: "Faut-il une application mobile ou une application web ?",
        reponse: "Cela dépend de vos utilisateurs et de votre budget. Nous vous conseillons la solution la plus adaptée lors du premier échange.",
      },
      {
        question: "Pouvez-vous partir d'une simple idée ?",
        reponse: "Oui. Nous vous aidons à préciser l'idée, à définir les fonctionnalités prioritaires et à construire un premier prototype.",
      },
      {
        question: "Assurez-vous le suivi après la livraison ?",
        reponse: "Oui, un accompagnement après le lancement peut être prévu pour la maintenance et les évolutions.",
      },
    ],
  },
  // ---------------------------------------------------------------- D
  {
    numero: "04",
    slug: "creation-graphique",
    icone: "identite",
    titre: "Création graphique",
    titreSeo: "Création graphique et identité visuelle",
    description:
      "Identités visuelles, logos et supports qui donnent à votre marque une image forte et cohérente.",
    accroche:
      "Une identité visuelle forte et mémorable, déclinée avec cohérence sur tous vos supports.",
    metaDescription:
      "Création d'identité visuelle, de logos, de supports de communication et de visuels publicitaires à Abidjan par DIRHAN INNOVATION.",
    presentation: [
      "Une marque forte inspire confiance avant même le premier échange. Votre logo et vos visuels doivent refléter votre sérieux et votre personnalité.",
      "Nous créons des identités visuelles cohérentes et des supports soignés, du logo jusqu'aux visuels publicitaires.",
    ],
    prestations: [
      "Identité visuelle",
      "Logos",
      "Supports de communication",
      "Visuels publicitaires",
    ],
    problemes: [
      "Votre logo ne reflète plus votre entreprise ou n'existe pas encore.",
      "Vos supports n'ont pas d'unité visuelle.",
      "Vos visuels ne se distinguent pas de ceux de vos concurrents.",
    ],
    solutions: [
      { titre: "Une identité complète", texte: "Logo, couleurs, typographies et règles d'utilisation." },
      { titre: "Des supports cohérents", texte: "Cartes de visite, plaquettes, présentations et documents commerciaux." },
      { titre: "Des visuels percutants", texte: "Des créations publicitaires pour le web et l'impression." },
    ],
    processus: [
      { titre: "Écoute", texte: "Votre histoire, vos valeurs et votre public." },
      { titre: "Pistes créatives", texte: "Plusieurs propositions pour choisir une direction." },
      { titre: "Affinage", texte: "Ajustements jusqu'à la version finale." },
      { titre: "Livraison", texte: "Fichiers prêts à l'emploi et guide d'utilisation." },
    ],
    avantages: [
      { titre: "Une image professionnelle", texte: "Une marque qui inspire confiance dès le premier regard." },
      { titre: "Reconnaissable", texte: "Une identité que vos clients retiennent." },
      { titre: "Prête à l'emploi", texte: "Des fichiers adaptés au web comme à l'impression." },
    ],
    faq: [
      {
        question: "Combien de propositions de logo recevrai-je ?",
        reponse: "Le nombre de pistes et d'allers-retours est précisé dans le devis, avant le début du travail.",
      },
      {
        question: "Serai-je propriétaire de mon logo ?",
        reponse: "Les conditions de cession des droits sont précisées dans le devis et le contrat.",
      },
      {
        question: "Pouvez-vous moderniser mon logo actuel ?",
        reponse: "Oui, nous pouvons faire évoluer une identité existante tout en conservant ce qui fait sa reconnaissance.",
      },
    ],
  },
  // ---------------------------------------------------------------- E
  {
    numero: "05",
    slug: "logiciels",
    icone: "logiciel",
    titre: "Développement de logiciels",
    titreSeo: "Création de logiciels professionnels",
    description:
      "Logiciels métiers, outils de gestion et automatisation qui simplifient le travail de vos équipes.",
    accroche:
      "Des outils sur mesure qui centralisent vos données, automatisent les tâches répétitives et simplifient le travail de vos équipes.",
    metaDescription:
      "Développement de logiciels métiers, outils de gestion, automatisation et solutions personnalisées à Abidjan par DIRHAN INNOVATION.",
    presentation: [
      "Fichiers éparpillés, saisies en double, informations difficiles à retrouver : beaucoup d'entreprises perdent un temps précieux à cause d'outils inadaptés.",
      "Nous développons des logiciels construits autour de vos processus pour centraliser l'information, automatiser ce qui peut l'être et vous donner une vision claire de votre activité.",
    ],
    prestations: [
      "Logiciels métiers",
      "Automatisation",
      "Outils de gestion",
      "Solutions personnalisées",
    ],
    problemes: [
      "Vos données sont dispersées entre plusieurs fichiers et outils.",
      "Vos équipes répètent chaque jour les mêmes tâches manuelles.",
      "Vous manquez d'indicateurs fiables pour piloter votre activité.",
    ],
    solutions: [
      { titre: "Un outil unique", texte: "Toutes vos informations au même endroit, accessibles aux bonnes personnes." },
      { titre: "Des tâches automatisées", texte: "Moins de saisies manuelles et moins d'erreurs." },
      { titre: "Des tableaux de bord", texte: "Des indicateurs clairs pour décider plus vite." },
    ],
    processus: [
      { titre: "Analyse", texte: "Nous étudions vos processus et vos outils actuels." },
      { titre: "Conception", texte: "Fonctionnalités, écrans et priorités validés avec vous." },
      { titre: "Développement", texte: "Livraison par étapes avec des démonstrations régulières." },
      { titre: "Déploiement", texte: "Mise en service, formation et accompagnement." },
    ],
    avantages: [
      { titre: "Adapté à vous", texte: "Le logiciel suit votre organisation, et non l'inverse." },
      { titre: "Du temps gagné", texte: "Des tâches répétitives réduites ou automatisées." },
      { titre: "Évolutif", texte: "De nouvelles fonctionnalités ajoutées selon vos besoins." },
    ],
    faq: [
      {
        question: "Un logiciel sur mesure est-il réservé aux grandes entreprises ?",
        reponse: "Non. Nous pouvons commencer par un outil simple qui répond à un besoin précis, puis l'enrichir progressivement.",
      },
      {
        question: "Pouvez-vous reprendre nos données existantes ?",
        reponse: "Dans la plupart des cas, oui : la reprise des données est étudiée lors de l'analyse de votre projet.",
      },
      {
        question: "Nos équipes seront-elles formées ?",
        reponse: "Oui, une prise en main est prévue lors de la mise en service.",
      },
    ],
  },
  // ---------------------------------------------------------------- F
  {
    numero: "06",
    slug: "creation-de-contenus",
    icone: "contenu",
    titre: "Création de contenus",
    titreSeo: "Création de contenus digitaux à Abidjan",
    description:
      "Visuels et contenus digitaux qui captent l'attention et racontent votre marque.",
    accroche:
      "Des visuels et des contenus soignés qui captent l'attention, valorisent votre offre et racontent votre marque.",
    metaDescription:
      "Création visuelle, contenus digitaux et supports de communication pour vos réseaux sociaux, votre site et vos campagnes, par DIRHAN INNOVATION à Abidjan.",
    presentation: [
      "Sur les réseaux sociaux comme sur votre site, la qualité de vos contenus fait la différence entre un visiteur qui passe et un client qui s'intéresse.",
      "Nous créons des visuels et des contenus adaptés à chaque support, fidèles à votre identité et pensés pour votre public.",
    ],
    prestations: [
      "Création visuelle",
      "Contenus digitaux",
      "Supports de communication",
    ],
    problemes: [
      "Vos publications manquent de qualité ou de régularité.",
      "Vos visuels ne reflètent pas le niveau de votre offre.",
      "Vous ne savez pas quoi publier.",
    ],
    solutions: [
      { titre: "Des visuels soignés", texte: "Des créations aux couleurs de votre marque, adaptées à chaque format." },
      { titre: "Des contenus utiles", texte: "Des textes et des idées de publication qui parlent à vos clients." },
      { titre: "Des supports prêts", texte: "Des documents et visuels prêts à être partagés ou imprimés." },
    ],
    processus: [
      { titre: "Brief", texte: "Vos objectifs, votre public et vos messages." },
      { titre: "Création", texte: "Nous produisons les contenus selon le calendrier prévu." },
      { titre: "Validation", texte: "Vous validez ou demandez des ajustements." },
      { titre: "Diffusion", texte: "Contenus livrés prêts à publier." },
    ],
    avantages: [
      { titre: "Qualité constante", texte: "Une image professionnelle à chaque publication." },
      { titre: "Régularité", texte: "Un rythme de publication tenu dans la durée." },
      { titre: "Cohérence", texte: "Des contenus fidèles à votre identité visuelle." },
    ],
    faq: [
      {
        question: "Quels types de contenus créez-vous ?",
        reponse: "Visuels pour réseaux sociaux, supports de communication et contenus digitaux pour votre site ou vos campagnes. Le détail est défini selon votre besoin.",
      },
      {
        question: "Puis-je valider les contenus avant publication ?",
        reponse: "Oui, chaque contenu vous est soumis pour validation avant d'être livré ou publié.",
      },
      {
        question: "Travaillez-vous avec notre charte graphique ?",
        reponse: "Oui. Si vous n'en avez pas encore, nous pouvons aussi la créer avec vous.",
      },
    ],
  },
];

// Anciennes ancres de la page Services (avant la création des pages dédiées)
export const anciensSlugs: Record<string, string> = {
  "marketing-digital": "communication-digitale",
  "applications-mobiles": "applications-web-mobiles",
  branding: "creation-graphique",
  "ia-automatisation": "logiciels",
};
