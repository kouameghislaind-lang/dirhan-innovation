import type { Metadata } from "next";
import { metaPage } from "@/lib/seo";
import Link from "next/link";
import Apparition from "@/components/Apparition";
import GrilleRealisations from "@/components/GrilleRealisations";
import { realisations, services } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Réalisations",
  "Découvrez les projets réalisés par DIRHAN INNOVATION : sites web, applications mobiles, logiciels, branding, marketing digital et intelligence artificielle.",
  "/realisations",
);

export default function PageRealisations() {
  const aDesProjets = realisations.length > 0;

  return (
    <>
      {/* ===== En-tête ===== */}
      <section className="relative overflow-hidden pt-40 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-0 h-[30rem] w-[30rem] rounded-full bg-or/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Apparition immediat>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">Réalisations</p>
            <h1 className="mt-4 max-w-4xl font-titre text-5xl font-bold leading-[1.05] sm:text-6xl">
              Des projets qui <span className="texte-or italic">font la différence.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gris">
              Découvrez nos projets internes, prototypes et concepts : le laboratoire où DIRHAN
              INNOVATION imagine et construit les solutions digitales de demain.
            </p>
          </Apparition>

          {/* Légende honnête des statuts */}
          <Apparition immediat delai={0.1}>
            <p className="mt-8 inline-flex max-w-2xl items-start gap-3 rounded-2xl border border-or/15 bg-noir-carte/60 px-5 py-4 text-sm leading-relaxed text-gris">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-or" />
              Les projets présentés ici sont des initiatives internes de DIRHAN INNOVATION. Leur
              statut (en développement, prototype ou concept) est indiqué sur chaque projet.
            </p>
          </Apparition>
        </div>
      </section>

      {/* ===== Projets ===== */}
      <section className="pb-28">
        <div className="mx-auto max-w-7xl px-6">
          {aDesProjets ? (
            <GrilleRealisations projets={realisations} />
          ) : (
            <Apparition immediat>
              <div className="rounded-3xl border border-or/20 bg-noir-carte p-10 text-center sm:p-16">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">
                  Portfolio en préparation
                </p>
                <h2 className="mx-auto mt-6 max-w-2xl font-titre text-3xl font-bold sm:text-4xl">
                  Nos études de cas arrivent très bientôt.
                </h2>
                <p className="mx-auto mt-6 max-w-xl leading-relaxed text-gris">
                  Nous préparons la présentation détaillée de nos projets. En attendant, nous
                  pouvons vous présenter des exemples adaptés à votre secteur lors d&apos;un
                  échange.
                </p>
                <Link
                  href="/contact"
                  className="mt-10 inline-block rounded-full bg-or px-8 py-4 font-semibold text-noir transition-colors hover:bg-or-clair"
                >
                  Demander des exemples
                </Link>
              </div>
            </Apparition>
          )}
        </div>
      </section>

      {/* ===== Ce que nous pouvons réaliser pour vous ===== */}
      <section className="border-t border-or/10 bg-noir-clair py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Apparition>
            <h2 className="max-w-2xl font-titre text-4xl font-bold sm:text-5xl">
              Ce que nous pouvons réaliser pour vous.
            </h2>
          </Apparition>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-or/15 bg-or/15 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Apparition key={s.slug} delai={(i % 3) * 0.1} className="bg-noir">
                <Link
                  href={`/services#${s.slug}`}
                  className="group block h-full p-8 transition-colors hover:bg-noir-carte"
                >
                  <span className="font-titre text-sm text-or">{s.numero}</span>
                  <h3 className="mt-4 font-titre text-xl font-semibold transition-colors group-hover:text-or">
                    {s.titre}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gris">
                    {s.prestations.slice(0, 3).join(" · ")}
                  </p>
                </Link>
              </Apparition>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Appel à l'action ===== */}
      <section className="border-t border-or/10 py-24">
        <Apparition className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-titre text-4xl font-bold sm:text-5xl">
            Votre projet sera <span className="texte-or italic">le prochain.</span>
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
