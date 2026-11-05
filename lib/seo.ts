import type { Metadata } from "next";
import { site } from "@/lib/site";

// Fabrique les informations SEO d'une page (titre, description, adresse officielle,
// aperçu lors d'un partage sur WhatsApp, Facebook, LinkedIn...).
export function metaPage(titre: string, description: string, chemin: string): Metadata {
  return {
    title: titre,
    description,
    alternates: { canonical: chemin },
    openGraph: {
      type: "website",
      locale: "fr_CI",
      siteName: site.nom,
      title: `${titre} | ${site.nom}`,
      description,
      url: chemin,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${site.nom} - ${site.signature}`,
        },
      ],
    },
  };
}
