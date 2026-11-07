import Link from "next/link";
import { site } from "@/lib/site";

// Fil d'Ariane : « Accueil › Services › Création de sites web ».
// Il aide le visiteur à se repérer et indique à Google la place de la page dans le site
// (données structurées BreadcrumbList).
//
// Utilisation : <FilAriane etapes={[{ label: "Services", href: "/services" }, { label: "Sites web" }]} />
// La dernière étape (page actuelle) n'a pas de lien.

export type EtapeAriane = { label: string; href?: string };

export default function FilAriane({ etapes, className = "" }: { etapes: EtapeAriane[]; className?: string }) {
  const toutes: EtapeAriane[] = [{ label: "Accueil", href: "/" }, ...etapes];

  const donnees = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: toutes.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.label,
      ...(e.href ? { item: `${site.url}${e.href === "/" ? "" : e.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Fil d'Ariane" className={`text-sm text-gris ${className}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {toutes.map((e, i) => {
          const derniere = i === toutes.length - 1;
          return (
            <li key={`${e.label}-${i}`} className="flex items-center gap-2">
              {e.href && !derniere ? (
                <Link href={e.href} className="inline-block py-1.5 transition-colors hover:text-blanc">
                  {e.label}
                </Link>
              ) : (
                <span aria-current="page" className="py-1.5 text-blanc/80">
                  {e.label}
                </span>
              )}
              {!derniere && (
                <span aria-hidden className="text-or/60">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees).replace(/</g, "\\u003c") }}
      />
    </nav>
  );
}
