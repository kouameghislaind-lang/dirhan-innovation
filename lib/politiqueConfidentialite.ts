// Texte de la politique de confidentialité, affiché sur /politique-de-confidentialite.
//
// Rédigé à partir de ce que le site fait RÉELLEMENT (vérifié dans le code) :
//   - seul le formulaire de contact collecte des données personnelles ;
//   - envoi des e-mails par Resend, hébergement par Vercel ;
//   - aucun cookie, aucun traceur, aucune mesure d'audience ;
//   - aucune intégration technique Meta (Facebook, Instagram, WhatsApp Business) : de simples liens.
// Les points juridiques à faire vérifier sont marqués « à valider » (aValider: true).
//
// Blocs disponibles :
//   - "paragraphe" : texte ; "liste" : liste à puces ; "sousTitre" : intertitre ;
//   - "fiche" : tableau étiquette / valeur (une valeur vide affiche « À compléter »).
// Une section avec `composant: "suppression"` affiche la section « suppression des données ».
// Le texte est affiché tel quel (aucun HTML n'est interprété).

import { entreprise, liensContact, site } from "@/lib/site";

export type BlocPolitique =
  | { type: "paragraphe"; texte: string; aValider?: boolean }
  | { type: "liste"; elements: string[]; aValider?: boolean }
  | { type: "sousTitre"; texte: string }
  | { type: "fiche"; lignes: [string, string][] };

export type SectionPolitique = {
  titre: string;
  blocs: BlocPolitique[];
  composant?: "suppression";
};

// Date affichée en haut de la page (« Dernière mise à jour »)
export const dateMiseAJourPolitique = "7 novembre 2026";

const nom = site.nom;

export const sectionsPolitique: SectionPolitique[] = [
  // 1
  {
    titre: "Qui sommes-nous ? Responsable du traitement",
    blocs: [
      {
        type: "paragraphe",
        texte: `${nom} est une agence digitale et technologique basée à Abidjan (Côte d'Ivoire). Elle est responsable du traitement des données personnelles collectées sur ce site, au sens de la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel.`,
      },
      {
        type: "fiche",
        lignes: [
          ["Organisme", nom],
          ["Forme juridique", entreprise.formeJuridique],
          ["RCCM", entreprise.rccm],
          ["Adresse du siège", entreprise.siege],
          ["Localisation", site.ville],
          ["Téléphone / WhatsApp", site.telephone],
          ["E-mail", site.email],
          ["Site internet", site.url],
        ],
      },
    ],
  },
  // 2
  {
    titre: "Les données que nous collectons",
    blocs: [
      {
        type: "paragraphe",
        texte: "Nous collectons uniquement les données nécessaires pour répondre à votre demande. Le site ne propose ni création de compte, ni espace client, ni paiement en ligne.",
      },
      { type: "sousTitre", texte: "Données que vous nous transmettez" },
      {
        type: "paragraphe",
        texte: "Lorsque vous utilisez le formulaire de contact, nous recevons :",
      },
      {
        type: "liste",
        elements: [
          "obligatoires : votre nom complet, votre adresse e-mail et la description de votre projet ;",
          "facultatives : votre numéro de téléphone ou WhatsApp, le nom de votre entreprise et le service qui vous intéresse.",
        ],
      },
      {
        type: "paragraphe",
        texte: "Nous vous invitons à ne communiquer aucune donnée sensible (santé, opinions politiques ou religieuses, données bancaires…) dans votre message.",
      },
      { type: "sousTitre", texte: "Données techniques" },
      {
        type: "liste",
        elements: [
          "Adresse IP : utilisée uniquement, et temporairement, pour limiter le nombre de messages envoyés depuis une même connexion (protection contre le spam). Elle est conservée en mémoire pendant une heure au plus et n'est enregistrée dans aucun fichier.",
          "Journaux techniques : comme tout hébergeur, notre hébergeur Vercel enregistre automatiquement des informations techniques sur les visites (adresse IP, date, page consultée, type de navigateur), pour assurer le fonctionnement et la sécurité du site.",
        ],
      },
      {
        type: "paragraphe",
        texte: "Nous n'utilisons aucun outil de mesure d'audience, aucun cookie publicitaire et aucun traceur (voir la section « Cookies et technologies similaires »).",
      },
    ],
  },
  // 3
  {
    titre: "Pourquoi nous utilisons vos données et sur quelle base",
    blocs: [
      {
        type: "liste",
        elements: [
          "Répondre à votre demande et échanger avec vous sur votre projet — base : votre consentement, exprimé lorsque vous envoyez le formulaire, et les démarches préalables à un éventuel contrat que vous sollicitez.",
          "Vous envoyer une proposition ou un devis, si vous le souhaitez — base : les démarches préalables à un contrat.",
          "Vous confirmer la bonne réception de votre demande par e-mail — base : votre demande de contact.",
          "Protéger le site contre le spam et les abus — base : notre intérêt légitime à assurer la sécurité du service.",
        ],
        aValider: true,
      },
      {
        type: "paragraphe",
        texte: `Vos données ne sont jamais vendues, louées ni utilisées pour vous envoyer de la publicité ou de la prospection sans votre accord. ${nom} ne prend aucune décision automatisée à votre sujet.`,
      },
    ],
  },
  // 4
  {
    titre: "Le formulaire de contact et l'envoi des e-mails (Resend)",
    blocs: [
      {
        type: "paragraphe",
        texte: "Lorsque vous envoyez le formulaire, vos informations sont transmises de façon sécurisée (HTTPS) à notre serveur, qui les met en forme dans un e-mail adressé à l'équipe de DIRHAN INNOVATION.",
      },
      {
        type: "paragraphe",
        texte: "Cet e-mail est envoyé par l'intermédiaire de Resend (Resend, Inc., États-Unis), un service spécialisé dans l'envoi d'e-mails, qui agit uniquement pour notre compte. Il est ensuite reçu dans la messagerie électronique de DIRHAN INNOVATION, actuellement fournie par Google (Gmail).",
        aValider: true,
      },
      {
        type: "paragraphe",
        texte: "Lorsque ce service est activé, un e-mail de confirmation de réception vous est également envoyé, par le même intermédiaire, à l'adresse que vous avez indiquée.",
      },
      {
        type: "paragraphe",
        texte: "Resend et Google conservent ces e-mails selon leurs propres politiques et durées de conservation.",
        aValider: true,
      },
    ],
  },
  // 5
  {
    titre: "L'hébergement du site (Vercel)",
    blocs: [
      {
        type: "paragraphe",
        texte: "Le site est hébergé par Vercel Inc. (États-Unis). Vercel fournit les serveurs qui affichent les pages et traitent l'envoi du formulaire, et enregistre les journaux techniques mentionnés plus haut, pendant une durée limitée fixée par son offre d'hébergement.",
      },
      {
        type: "paragraphe",
        texte: "Vercel agit en tant que prestataire technique et n'utilise pas ces données pour son propre compte à des fins commerciales.",
        aValider: true,
      },
    ],
  },
  // 6
  {
    titre: "Cookies et technologies similaires",
    blocs: [
      {
        type: "paragraphe",
        texte: "À ce jour, le site ne dépose aucun cookie et n'utilise aucune technologie similaire de suivi (stockage local du navigateur, pixel, traceur de réseau social, outil de mesure d'audience). C'est pourquoi aucun bandeau de consentement ne vous est présenté.",
      },
      {
        type: "paragraphe",
        texte: "Les polices de caractères et les images sont servies directement par notre site : aucun service tiers n'est contacté lorsque vous naviguez. Le détail figure dans notre page « Gestion des cookies ».",
      },
    ],
  },
  // 7
  {
    titre: "Liens vers les réseaux sociaux et WhatsApp",
    blocs: [
      {
        type: "paragraphe",
        texte: "Le site contient de simples liens vers notre page Facebook et vers WhatsApp. Ces liens ne transmettent aucune donnée à Meta tant que vous ne cliquez pas dessus.",
      },
      {
        type: "paragraphe",
        texte: "Lorsque vous cliquez, vous quittez notre site : Facebook et WhatsApp, services de Meta Platforms, appliquent alors leurs propres politiques de confidentialité. Si vous nous écrivez sur WhatsApp ou par Messenger, vos messages sont traités dans ces applications et reçus par l'équipe de DIRHAN INNOVATION, qui les utilise uniquement pour vous répondre.",
      },
      {
        type: "fiche",
        lignes: [
          ["Page Facebook", site.facebook.url],
          ["WhatsApp", liensContact.whatsapp()],
        ],
      },
    ],
  },
  // 8
  {
    titre: "Intégrations Meta (Facebook, Instagram) et WhatsApp Business",
    blocs: [
      { type: "sousTitre", texte: "Fonctionnalités actuellement actives" },
      {
        type: "liste",
        elements: [
          "Liens vers notre page Facebook et vers WhatsApp (décrits à la section précédente).",
          "Échanges que vous engagez vous-même avec nous sur WhatsApp ou Messenger.",
        ],
      },
      {
        type: "paragraphe",
        texte: "Le site n'intègre actuellement AUCUNE fonctionnalité technique de Meta : pas de connexion avec Facebook (« Facebook Login »), pas de pixel Meta, pas de boutons de partage intégrés, pas d'accès à l'API de Facebook, d'Instagram ou de WhatsApp Business. Nous ne recevons, ne lisons et ne conservons aucune donnée provenant de votre compte Facebook, Instagram ou WhatsApp.",
      },
      { type: "sousTitre", texte: "Fonctionnalités susceptibles d'être activées ultérieurement" },
      {
        type: "paragraphe",
        texte: "DIRHAN INNOVATION pourra proposer à l'avenir des services utilisant les plateformes de Meta, par exemple :",
      },
      {
        type: "liste",
        elements: [
          "la réception et la réponse aux messages par WhatsApp Business (plateforme WhatsApp Business de Meta) ;",
          "la gestion des messages reçus sur notre page Facebook ou notre compte Instagram professionnel ;",
          "la publication de contenus sur nos propres pages.",
        ],
      },
      {
        type: "paragraphe",
        texte: "Ces fonctionnalités ne sont PAS actives aujourd'hui. Avant toute activation, nous nous engageons à :",
      },
      {
        type: "liste",
        elements: [
          "mettre à jour la présente politique en indiquant précisément les données concernées (par exemple : nom de profil, numéro de téléphone, contenu des messages), leur finalité et leur durée de conservation ;",
          "ne demander à Meta que les autorisations strictement nécessaires au service proposé ;",
          "n'utiliser ces données que pour le service demandé, sans les vendre ni les partager à des fins publicitaires ;",
          "permettre la suppression de ces données selon la procédure décrite dans la section « Comment demander la suppression de vos données ».",
        ],
      },
    ],
  },
  // 9
  {
    titre: "Combien de temps conservons-nous vos données ?",
    blocs: [
      {
        type: "fiche",
        lignes: [
          ["Messages du formulaire", `${entreprise.dureeConservation}, sauf si une relation commerciale s'établit (les données nécessaires sont alors conservées pendant la durée de cette relation et des obligations légales qui en découlent).`],
          ["Adresse IP (anti-spam)", "Une heure au plus, en mémoire uniquement."],
          ["Journaux techniques de l'hébergeur", "Durée limitée fixée par l'offre de Vercel."],
          ["Copies chez Resend et Google", "Selon les durées de conservation de ces prestataires."],
        ],
      },
      {
        type: "paragraphe",
        texte: "À l'issue de ces durées, les données sont supprimées.",
        aValider: true,
      },
    ],
  },
  // 10
  {
    titre: "Qui a accès à vos données ?",
    blocs: [
      {
        type: "paragraphe",
        texte: "Vos données sont accessibles uniquement aux personnes de DIRHAN INNOVATION chargées de traiter votre demande, ainsi qu'à nos prestataires techniques, dans la stricte limite de leur mission :",
      },
      {
        type: "liste",
        elements: [
          "Vercel Inc. : hébergement du site ;",
          "Resend, Inc. : envoi des e-mails ;",
          "Google : messagerie électronique de réception.",
        ],
      },
      {
        type: "paragraphe",
        texte: "Nous ne communiquons vos données à aucun autre tiers, sauf obligation légale ou demande d'une autorité compétente.",
      },
    ],
  },
  // 11
  {
    titre: "Transferts de données hors de Côte d'Ivoire",
    blocs: [
      {
        type: "paragraphe",
        texte: "Nos prestataires Vercel, Resend et Google peuvent traiter vos données sur des serveurs situés hors de Côte d'Ivoire, notamment aux États-Unis et en Europe.",
      },
      {
        type: "paragraphe",
        texte: "Conformément à la loi n° 2013-450, ces transferts ne sont effectués que vers des prestataires offrant un niveau de protection suffisant, et DIRHAN INNOVATION accomplit les formalités requises auprès de l'Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire (ARTCI).",
        aValider: true,
      },
    ],
  },
  // 12
  {
    titre: "La sécurité de vos données",
    blocs: [
      { type: "paragraphe", texte: "Nous mettons en œuvre des mesures adaptées pour protéger vos données :" },
      {
        type: "liste",
        elements: [
          "connexion chiffrée (HTTPS) imposée sur tout le site ;",
          "clés d'accès aux services techniques conservées uniquement sur le serveur, jamais dans votre navigateur ;",
          "protection du formulaire contre les robots et limitation du nombre d'envois ;",
          "neutralisation de tout code éventuellement saisi dans le formulaire avant son affichage dans nos e-mails ;",
          "accès aux messages réservé aux personnes habilitées de DIRHAN INNOVATION.",
        ],
      },
      {
        type: "paragraphe",
        texte: "Aucun système n'étant infaillible, nous vous informerons, ainsi que l'ARTCI lorsque la loi l'exige, en cas d'incident de sécurité susceptible de porter atteinte à vos données.",
        aValider: true,
      },
    ],
  },
  // 13
  {
    titre: "Vos droits",
    blocs: [
      {
        type: "paragraphe",
        texte: "Conformément à la loi n° 2013-450, vous disposez à tout moment des droits suivants sur vos données :",
      },
      {
        type: "liste",
        elements: [
          "droit d'information : savoir comment vos données sont utilisées (objet de cette page) ;",
          "droit d'accès : obtenir la confirmation que nous détenons des données vous concernant et en recevoir une copie ;",
          "droit de rectification : faire corriger des données inexactes ou incomplètes ;",
          "droit d'opposition : vous opposer, pour des motifs légitimes, à l'utilisation de vos données ;",
          "droit de suppression : demander l'effacement de vos données (voir la section suivante) ;",
          "retrait du consentement : retirer à tout moment votre consentement, sans remettre en cause les traitements déjà effectués.",
        ],
        aValider: true,
      },
      {
        type: "paragraphe",
        texte: "Pour exercer ces droits, contactez-nous par l'un des moyens indiqués dans la section « Nous contacter ». Nous vous répondrons dans les meilleurs délais.",
      },
    ],
  },
  // 14 — section dédiée (composant SuppressionDonnees)
  {
    titre: "Comment demander la suppression de vos données",
    blocs: [],
    composant: "suppression",
  },
  // 15
  {
    titre: "Nous contacter",
    blocs: [
      {
        type: "paragraphe",
        texte: "Pour toute question relative à vos données personnelles ou à cette politique, vous pouvez nous joindre :",
      },
      {
        type: "fiche",
        lignes: [
          ["Formulaire", "/contact"],
          ["Téléphone / WhatsApp", site.telephone],
          ["E-mail", site.email],
          ["Adresse", site.ville],
        ],
      },
      {
        type: "paragraphe",
        texte: "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à l'Autorité de Régulation des Télécommunications/TIC de Côte d'Ivoire (ARTCI), autorité de protection des données personnelles en Côte d'Ivoire.",
      },
    ],
  },
  // 16
  {
    titre: "Modifications de cette politique",
    blocs: [
      {
        type: "paragraphe",
        texte: "Cette politique peut évoluer, notamment en cas d'activation de nouvelles fonctionnalités (par exemple les intégrations Meta décrites plus haut) ou d'évolution de la réglementation. La date de dernière mise à jour figure en haut de cette page. En cas de changement important, nous l'indiquerons clairement sur le site.",
      },
    ],
  },
];
