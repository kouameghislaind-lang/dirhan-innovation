import type { MetadataRoute } from "next";
import { realisations, services, site } from "@/lib/site";

// Plan du site pour Google : disponible à l'adresse /sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { chemin: "", priorite: 1 },
    { chemin: "/services", priorite: 0.9 },
    ...services.map((s) => ({ chemin: `/services/${s.slug}`, priorite: 0.8 })),
    { chemin: "/realisations", priorite: 0.8 },
    { chemin: "/a-propos", priorite: 0.7 },
    { chemin: "/equipe", priorite: 0.6 },
    { chemin: "/contact", priorite: 0.8 },
    { chemin: "/mentions-legales", priorite: 0.3 },
    { chemin: "/politique-de-confidentialite", priorite: 0.4 },
    { chemin: "/cookies", priorite: 0.3 },
    { chemin: "/conditions-utilisation", priorite: 0.3 },
    ...realisations.map((p) => ({ chemin: `/realisations/${p.slug}`, priorite: 0.6 })),
  ];

  return pages.map((p) => ({
    url: `${site.url}${p.chemin}`,
    changeFrequency: "monthly",
    priority: p.priorite,
  }));
}
