"use client";

// Sommaire fixe de la page Services (ordinateur) : il suit le défilement
// et met en évidence le service actuellement à l'écran.

import { useEffect, useState } from "react";
import Icone from "@/components/Icone";
import type { IconeNom } from "@/lib/site";

type Element = { slug: string; titre: string; numero: string; icone: IconeNom };

export default function NavigationServices({ elements }: { elements: Element[] }) {
  const [actif, setActif] = useState(elements[0]?.slug);

  useEffect(() => {
    const cibles = elements
      .map((e) => document.getElementById(e.slug))
      .filter((el): el is HTMLElement => el !== null);

    // Le service "actif" est le dernier dont le haut a dépassé le milieu de l'écran
    const calculer = () => {
      const repere = window.innerHeight * 0.45;
      let courant = cibles[0]?.id;
      for (const c of cibles) {
        if (c.getBoundingClientRect().top <= repere) courant = c.id;
      }
      if (courant) setActif(courant);
    };

    calculer();
    window.addEventListener("scroll", calculer, { passive: true });
    window.addEventListener("resize", calculer);
    return () => {
      window.removeEventListener("scroll", calculer);
      window.removeEventListener("resize", calculer);
    };
  }, [elements]);

  return (
    <nav aria-label="Sommaire des services" className="sticky top-28">
      <p className="surtitre">Sommaire</p>
      <ol className="mt-6 space-y-1 border-l border-ligne">
        {elements.map((e) => {
          const estActif = actif === e.slug;
          return (
            <li key={e.slug}>
              <a
                href={`#${e.slug}`}
                aria-current={estActif ? "true" : undefined}
                className={`-ml-px flex items-center gap-3 border-l py-2.5 pl-5 text-sm transition-colors ${
                  estActif ? "border-or text-blanc" : "border-transparent text-gris hover:text-blanc"
                }`}
              >
                <Icone nom={e.icone} className={`h-4 w-4 shrink-0 ${estActif ? "text-or" : "text-blanc/35"}`} />
                {e.titre}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
