import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Animations from "@/components/Animations";
import BoutonWhatsApp from "@/components/BoutonWhatsApp";
import SuiviEvenements from "@/components/SuiviEvenements";
import EffetsInteractifs from "@/components/EffetsInteractifs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { dirigeant, estSitePublic, liensContact, services, site } from "@/lib/site";
import "./globals.css";

// Police élégante pour les titres
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

// Police moderne et très lisible pour le texte
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Informations lues par Google, Facebook, WhatsApp, LinkedIn... (SEO et partage)
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nom} | Agence digitale à Abidjan`,
    template: `%s | ${site.nom}`,
  },
  description: site.description,
  applicationName: site.nom,
  keywords: [
    "agence digitale Abidjan",
    "agence digitale Cocody",
    "application web et mobile",
    "développement logiciel",
    "création site web Côte d'Ivoire",
    "communication digitale",
    "création graphique",
    "création de contenus",
    "logiciel professionnel",
    "solutions numériques entreprises",
  ],
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: site.nom,
    title: `${site.nom} | Agence digitale à Abidjan`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
  },
  // Validation de la propriété du site dans Google Search Console (balise meta).
  // Renseigner GOOGLE_SITE_VERIFICATION sur Vercel avec le code fourni par Google.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  // Les versions de test Vercel ne sont pas indexées par Google
  robots: estSitePublic ? { index: true, follow: true } : { index: false, follow: false },
};

// Couleur de la barre du navigateur sur mobile
export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

// Fiche "entreprise" et "site" pour Google (données structurées Schema.org).
// ProfessionalService est un type d'Organization : une seule fiche suffit pour l'entreprise.
// Uniquement des informations confirmées (aucun RCCM, adresse précise, avis ou note inventés).
const idEntreprise = `${site.url}/#entreprise`;
const entrepriseSchema = {
  "@type": "ProfessionalService",
  "@id": idEntreprise,
  name: site.nom,
  slogan: site.signature,
  description: site.description,
  url: site.url,
  logo: `${site.url}/icon.png`,
  image: `${site.url}/opengraph-image.png`,
  // Adresse : commune (Cocody) et district (Abidjan) uniquement, sans rue ni GPS non confirmés
  address: {
    "@type": "PostalAddress",
    addressLocality: site.adresse.quartier,
    addressRegion: site.adresse.ville,
    addressCountry: site.adresse.codePays,
  },
  areaServed: ["Côte d'Ivoire", "Afrique"],
  knowsAbout: services.map((s) => s.titre),
  telephone: liensContact.telephoneE164,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: liensContact.telephoneE164,
    contactType: "customer service",
    areaServed: "CI",
    availableLanguage: ["French"],
  },
  // Profils officiels de l'entreprise (relie la page Facebook au site pour Google)
  sameAs: [site.facebook.url],
  ...(site.email ? { email: site.email } : {}),
  // Dirigeant (nom et fonction validés)
  founder: { "@type": "Person", name: dirigeant.nom, jobTitle: "Fondateur & Directeur Général" },
};

const donneesStructurees = {
  "@context": "https://schema.org",
  "@graph": [
    entrepriseSchema,
    {
      "@type": "WebSite",
      "@id": `${site.url}/#site`,
      url: site.url,
      name: site.nom,
      inLanguage: "fr",
      publisher: { "@id": idEntreprise },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-noir font-sans text-blanc">
        {/* Lien caché, visible au clavier : permet de sauter directement au contenu */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-or focus:px-5 focus:py-3 focus:font-semibold focus:text-noir"
        >
          Aller au contenu
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(donneesStructurees).replace(/</g, "\\u003c"),
          }}
        />
        {/* Fine barre dorée qui indique la progression de lecture */}
        <div aria-hidden className="barre-lecture" />
        <EffetsInteractifs />
        <Animations>
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
          <BoutonWhatsApp />
          <SuiviEvenements />
        </Animations>
      </body>
    </html>
  );
}
