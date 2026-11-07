import type { Metadata } from "next";
import { site } from "@/lib/site";

// Image de partage par défaut (générée à partir de app/opengraph-image.png)
const imagePartage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: `${site.nom} - ${site.signature}`,
};

// Fabrique les informations SEO d'une page (titre, description, adresse officielle,
// aperçu lors d'un partage sur WhatsApp, Facebook, LinkedIn, X...).
// options.titreAbsolu : utilise le titre tel quel, sans ajouter « | DIRHAN INNOVATION ».
export function metaPage(
  titre: string,
  description: string,
  chemin: string,
  options: { titreAbsolu?: boolean } = {},
): Metadata {
  const titreComplet = options.titreAbsolu ? titre : `${titre} | ${site.nom}`;
  return {
    title: options.titreAbsolu ? { absolute: titre } : titre,
    description,
    alternates: { canonical: chemin },
    openGraph: {
      type: "website",
      locale: "fr_CI",
      siteName: site.nom,
      title: titreComplet,
      description,
      url: chemin,
      images: [imagePartage],
    },
    twitter: {
      card: "summary_large_image",
      title: titreComplet,
      description,
      images: [imagePartage.url],
    },
  };
}
