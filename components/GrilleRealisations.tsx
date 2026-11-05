"use client";

// Grille des projets, avec des boutons pour filtrer par catégorie.

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import BadgeStatut from "@/components/BadgeStatut";
import IllustrationProjet from "@/components/IllustrationProjet";
import type { Realisation } from "@/lib/site";

const TOUS = "Tous les projets";

export default function GrilleRealisations({ projets }: { projets: Realisation[] }) {
  const [filtre, setFiltre] = useState<string>(TOUS);

  // Les catégories sont déduites automatiquement des projets
  const categories = [...new Set(projets.map((p) => p.categorie))];
  const visibles = filtre === TOUS ? projets : projets.filter((p) => p.categorie === filtre);
  const boutons = [
    { nom: TOUS, nombre: projets.length },
    ...categories.map((c) => ({ nom: c, nombre: projets.filter((p) => p.categorie === c).length })),
  ];

  return (
    <div>
      {categories.length > 1 && (
        <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-3">
          {boutons.map((b) => {
            const actif = filtre === b.nom;
            return (
              <button
                key={b.nom}
                type="button"
                onClick={() => setFiltre(b.nom)}
                aria-pressed={actif}
                className={`relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                  actif ? "border-or text-noir" : "border-or/25 text-blanc/80 hover:border-or hover:text-or"
                }`}
              >
                {actif && (
                  <motion.span
                    layoutId="filtre-actif"
                    className="absolute inset-0 rounded-full bg-or"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {b.nom} <span className={actif ? "text-noir/60" : "text-gris"}>({b.nombre})</span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <motion.ul layout className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibles.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-or/15 bg-noir-carte transition-[border-color,box-shadow] duration-500 hover:border-or/50 hover:shadow-[0_24px_60px_-20px_rgba(212,175,55,0.35)]"
              >
                {/* Visuel */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={`Aperçu du projet ${p.titre}`}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : p.illustration ? (
                      <IllustrationProjet type={p.illustration} className="h-full w-full" />
                    ) : null}
                  </div>
                  {/* Reflet doré au survol */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-or/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
                  />
                  <BadgeStatut statut={p.statut} className="absolute left-4 top-4" />
                </div>

                {/* Texte */}
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-or">{p.categorie}</p>
                  <h3 className="mt-3 font-titre text-2xl font-semibold transition-colors group-hover:text-or">
                    {p.titre}
                  </h3>
                  <p className="mt-1 text-sm text-gris">{p.client}</p>
                  <p className="mt-4 flex-1 leading-relaxed text-blanc/80">{p.resume}</p>

                  <Link
                    href={`/realisations/${p.slug}`}
                    className="mt-7 inline-flex items-center gap-3 self-start rounded-full border border-or/40 px-5 py-2.5 text-sm font-semibold text-or transition-colors after:absolute after:inset-0 hover:bg-or hover:text-noir"
                  >
                    Découvrir le projet
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </motion.article>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
