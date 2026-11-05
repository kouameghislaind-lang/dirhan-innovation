import type { MetadataRoute } from "next";
import { estSitePublic, site } from "@/lib/site";

// Règles pour les robots des moteurs de recherche : disponible à l'adresse /robots.txt
// Les versions de test Vercel (« preview ») sont bloquées pour ne pas être indexées.
export default function robots(): MetadataRoute.Robots {
  if (!estSitePublic) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
