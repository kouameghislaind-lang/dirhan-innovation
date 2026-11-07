"use client";

// Grille des projets, avec des boutons pour filtrer par catégorie.

import { useState } from "react";
import Image from "next/image";
import Bouton from "@/components/ui/Bouton";
import { AnimatePresence, motion } from "framer-motion";
import BadgeStatut from "@/components/BadgeStatut";
import IllustrationProjet from "@/components/IllustrationProjet";
import type { Realisation } from "@/lib/site";

const TOUS = "Tous les projets";

export default function GrilleRealisations({ projets }: { projets: Realisation[] }) {
  const [filtre, setFiltre] = useState<string>(TOUS);

  // Les catégories sont déduites automatiquement des projets
  const categories = [...new Set(projets.map((p) => p.categorie))];
  const visibles =
    filtre === TOUS
      ? [...projets].sort((a, b) => Number(Boolean(b.vedette)) - Number(Boolean(a.vedette)))
      : projets.filter((p) => p.categorie === filtre);
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
                className={`relative inline-flex h-10 items-center rounded-full border px-5 text-sm font-medium transition-colors ${
                  actif ? "border-or text-noir" : "border-ligne-forte text-blanc/80 hover:border-or hover:text-or"
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

      <motion.ul layout className="mt-12 grid gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visibles.map((p) => {
            // Le projet vedette s'affiche en grand, sur toute la largeur, quand aucun filtre n'est actif
            const enVedette = filtre === TOUS && Boolean(p.vedette);
            return (
            <motion.li
              key={p.slug}
              layout
              className={enVedette ? "md:col-span-2" : ""}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={`carte carte-interactive group relative flex h-full flex-col overflow-hidden ${
                  enVedette ? "lg:flex-row" : ""
                }`}
              >
                {/* Visuel */}
                <div className={`relative aspect-[16/10] overflow-hidden ${enVedette ? "lg:aspect-auto lg:min-h-[26rem] lg:w-3/5" : ""}`}>
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={`Aperçu du projet ${p.titre}`}
                        fill
                        sizes={enVedette ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                        className="object-cover"
                      />
                    ) : p.illustration ? (
                      <IllustrationProjet type={p.illustration} remplir className="h-full w-full" />
                    ) : null}
                  </div>
                  {/* Reflet doré au survol */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-or/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
                  />
                  <BadgeStatut statut={p.statut} className="absolute left-4 top-4" />
                  {!p.image && (
                    <span className="absolute bottom-3 right-4 rounded-full bg-noir/70 px-3 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-blanc/60 backdrop-blur-sm">
                      Illustration de concept
                    </span>
                  )}
                </div>

                {/* Texte */}
                <div className={`flex flex-1 flex-col ${enVedette ? "p-8 sm:p-10 lg:justify-center" : "p-7"}`}>
                  <p className="surtitre">{enVedette ? `À la une · ${p.categorie}` : p.categorie}</p>
                  <h3 className={`mt-3 transition-colors group-hover:text-or ${enVedette ? "titre-bloc" : "titre-carte"}`}>
                    {p.titre}
                  </h3>
                  <p className="mt-1 text-sm text-gris">{p.client}</p>
                  <p className={`mt-4 leading-relaxed text-blanc/80 ${enVedette ? "text-lg lg:flex-none" : "flex-1"}`}>{p.resume}</p>

                  {/* Les axes du projet en étiquettes (tous sur le projet vedette, 3 sinon) */}
                  {p.axes.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {(enVedette ? p.axes : p.axes.slice(0, 3)).map((axe) => (
                        <li key={axe} className="rounded-full border border-ligne px-3 py-1 text-xs text-blanc/70">
                          {axe}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Bouton
                      href={`/realisations/${p.slug}`}
                      variante="accent"
                      taille="compact"
                      fleche="droite"
                      etirer
                    >
                      Découvrir le projet
                    </Bouton>
                    {/* Lien externe uniquement s'il existe (au-dessus du lien étiré) */}
                    {p.lien && (
                      <a
                        href={p.lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lien-anime relative z-10 text-sm font-semibold text-or hover:text-or-clair"
                      >
                        Voir en ligne ↗<span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
