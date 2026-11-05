import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Permet d'"installer" le site sur l'écran d'accueil d'un téléphone : /manifest.webmanifest
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.nom,
    short_name: "DIRHAN",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    lang: "fr",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
