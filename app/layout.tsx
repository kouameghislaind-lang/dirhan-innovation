import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Animations from "@/components/Animations";
import EffetsInteractifs from "@/components/EffetsInteractifs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { estSitePublic, services, site } from "@/lib/site";
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
    "création site web Côte d'Ivoire",
    "application mobile Abidjan",
    "développement logiciel",
    "branding",
    "marketing digital",
    "intelligence artificielle",
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
  // Les versions de test Vercel ne sont pas indexées par Google
  robots: estSitePublic ? { index: true, follow: true } : { index: false, follow: false },
};

// Couleur de la barre du navigateur sur mobile
export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

// Fiche "entreprise" pour Google (données structurées)
const donneesStructurees = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.nom,
  slogan: site.signature,
  description: site.description,
  url: site.url,
  logo: `${site.url}/icon.png`,
  image: `${site.url}/opengraph-image.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  areaServed: ["Côte d'Ivoire", "Afrique"],
  knowsAbout: services.map((s) => s.titre),
  ...(site.email ? { email: site.email } : {}),
  ...(site.telephone ? { telephone: site.telephone } : {}),
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
        </Animations>
      </body>
    </html>
  );
}
