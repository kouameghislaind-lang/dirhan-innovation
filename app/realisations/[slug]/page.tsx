import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Apparition from "@/components/Apparition";
import BadgeStatut from "@/components/BadgeStatut";
import IllustrationProjet from "@/components/IllustrationProjet";
import { metaPage } from "@/lib/seo";
import { realisations, services } from "@/lib/site";

// Une page par projet, créée automatiquement à partir de la liste dans lib/site.ts
export function generateStaticParams() {
  return realisations.map((p) => ({ slug: p.slug }));
}

function trouverProjet(slug: string) {
  return realisations.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const projet = trouverProjet(slug);
  if (!projet) return { title: "Projet introuvable", robots: { index: false } };
  return metaPage(projet.titre, projet.resume, `/realisations/${projet.slug}`);
}

export default async function PageProjet({ params }: PageProps<"/realisations/[slug]">) {
  const { slug } = await params;
  const projet = trouverProjet(slug);
  if (!projet) notFound();

  const service = services.find((s) => s.slug === projet.service);
  const autres = realisations.filter((p) => p.slug !== projet.slug);

  return (
    <>
      {/* ===== En-tête ===== */}
      <section className="relative overflow-hidden pt-36 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[30rem] w-[30rem] rounded-full bg-or/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Apparition immediat>
            <nav aria-label="Fil d'Ariane" className="text-sm text-gris">
              <Link href="/realisations" className="inline-block py-2 transition-colors hover:text-or">
                ← Toutes les réalisations
              </Link>
            </nav>
          </Apparition>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
            <Apparition immediat delai={0.05}>
              <div className="flex flex-wrap items-center gap-3">
                <BadgeStatut statut={projet.statut} />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-or">
                  {projet.categorie}
                </span>
              </div>
              <h1 className="mt-6 font-titre text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
                {projet.titre}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gris">{projet.resume}</p>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-or/15 pt-8 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-or">Statut</dt>
                  <dd className="mt-2 text-blanc/90">{projet.statutDetail}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-or">Type</dt>
                  <dd className="mt-2 text-blanc/90">{projet.client}</dd>
                </div>
                {service && (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.25em] text-or">Expertise</dt>
                    <dd className="mt-2">
                      <Link
                        href={`/services#${service.slug}`}
                        className="-my-1 inline-block py-1 text-blanc/90 underline decoration-or/40 underline-offset-4 hover:text-or"
                      >
                        {service.titre}
                      </Link>
                    </dd>
                  </div>
                )}
                {projet.annee && (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.25em] text-or">Année</dt>
                    <dd className="mt-2 text-blanc/90">{projet.annee}</dd>
                  </div>
                )}
              </dl>
            </Apparition>

            <Apparition immediat delai={0.15}>
              <div className="relative overflow-hidden rounded-3xl border border-or/25 shadow-[0_30px_80px_-30px_rgba(212,175,55,0.35)]">
                <div className="relative aspect-[16/10]">
                  {projet.image ? (
                    <Image
                      src={projet.image}
                      alt={`Aperçu du projet ${projet.titre}`}
                      fill
                      preload
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : projet.illustration ? (
                    <IllustrationProjet type={projet.illustration} className="h-full w-full" />
                  ) : null}
                </div>
              </div>
              {!projet.image && (
                <p className="mt-3 text-center text-xs text-gris">Illustration de concept</p>
              )}
            </Apparition>
          </div>
        </div>
      </section>

      {/* ===== Axes du projet ===== */}
      <section className="border-t border-or/10 bg-noir-clair py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Apparition>
            <h2 className="font-titre text-3xl font-bold sm:text-4xl">Les axes du projet</h2>
          </Apparition>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projet.axes.map((axe, i) => (
              <li key={axe}>
                <Apparition delai={i * 0.08} className="h-full rounded-2xl border border-or/15 bg-noir p-6">
                  <span className="font-titre text-sm text-or">0{i + 1}</span>
                  <p className="mt-3 font-titre text-xl font-semibold">{axe}</p>
                </Apparition>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-gris">
            Ce projet est une initiative interne de DIRHAN INNOVATION ({projet.statutDetail.toLowerCase()}).
            Sa présentation sera enrichie au fil de son avancement.
          </p>
        </div>
      </section>

      {/* ===== Autres projets ===== */}
      {autres.length > 0 && (
        <section className="border-t border-or/10 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-titre text-3xl font-bold">Autres projets</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {autres.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/realisations/${p.slug}`}
                    className="group flex items-center justify-between gap-6 rounded-2xl border border-or/15 bg-noir-carte p-6 transition-colors hover:border-or/50"
                  >
                    <div>
                      <BadgeStatut statut={p.statut} />
                      <p className="mt-4 font-titre text-xl font-semibold transition-colors group-hover:text-or">
                        {p.titre}
                      </p>
                      <p className="mt-1 text-sm text-gris">{p.categorie}</p>
                    </div>
                    <span aria-hidden className="text-2xl text-or transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ===== Appel à l'action ===== */}
      <section className="border-t border-or/10 bg-noir-clair py-24">
        <Apparition className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-titre text-4xl font-bold sm:text-5xl">
            Un projet similaire ? <span className="texte-or italic">Parlons-en.</span>
          </h2>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full bg-or px-10 py-4 font-semibold text-noir transition-colors hover:bg-or-clair"
          >
            Démarrer un projet
          </Link>
        </Apparition>
      </section>
    </>
  );
}
