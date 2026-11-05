import type { Metadata } from "next";
import { metaPage } from "@/lib/seo";
import Link from "next/link";
import Apparition from "@/components/Apparition";
import { methode, services } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Services",
  "Création de sites web, applications mobiles, logiciels sur mesure, branding, marketing digital et intelligence artificielle : découvrez les expertises de DIRHAN INNOVATION à Abidjan.",
  "/services",
);

export default function PageServices() {
  return (
    <>
      {/* ===== En-tête de page ===== */}
      <section className="relative overflow-hidden pt-40 pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-or/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Apparition immediat>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">Nos services</p>
            <h1 className="mt-4 max-w-4xl font-titre text-5xl font-bold leading-[1.05] sm:text-6xl">
              Tout le digital,{" "}
              <span className="texte-or italic">sous un même toit.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gris">
              De l&apos;identité de votre marque à l&apos;intelligence artificielle, nous réunissons
              toutes les compétences pour faire grandir votre entreprise.
            </p>
          </Apparition>

          {/* Raccourcis vers chaque service */}
          <Apparition immediat delai={0.1}>
            <nav aria-label="Aller à un service" className="mt-12 flex flex-wrap gap-3">
              {services.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="rounded-full border border-or/25 px-4 py-2 text-sm text-blanc/80 transition-colors hover:border-or hover:bg-or hover:text-noir"
                >
                  {s.titre}
                </a>
              ))}
            </nav>
          </Apparition>
        </div>
      </section>

      {/* ===== Détail des 6 services ===== */}
      <section className="border-t border-or/10">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className={`scroll-mt-20 border-b border-or/10 py-20 sm:py-24 ${
              i % 2 === 1 ? "bg-noir-clair" : ""
            }`}
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
              <Apparition className="lg:col-span-5">
                <span className="font-titre text-6xl font-bold text-or/25 sm:text-7xl">
                  {s.numero}
                </span>
                <h2 className="mt-4 font-titre text-3xl font-bold sm:text-4xl">{s.titre}</h2>
                <p className="mt-6 text-lg leading-relaxed text-gris">{s.detail}</p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-or transition-colors hover:text-or-clair"
                >
                  Parler de mon projet
                  <span aria-hidden>→</span>
                </Link>
              </Apparition>

              <Apparition delai={0.1} className="lg:col-span-6 lg:col-start-7">
                <div className="rounded-2xl border border-or/15 bg-noir-carte p-8 sm:p-10">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-or">
                    Ce que nous faisons
                  </h3>
                  <ul className="mt-6 divide-y divide-blanc/10">
                    {s.prestations.map((p) => (
                      <li key={p} className="flex items-center gap-4 py-4 text-blanc/90">
                        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-or" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Apparition>
            </div>
          </article>
        ))}
      </section>

      {/* ===== Notre méthode ===== */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Apparition>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">Notre méthode</p>
            <h2 className="mt-4 max-w-2xl font-titre text-4xl font-bold sm:text-5xl">
              Un projet clair, du premier échange au lancement.
            </h2>
          </Apparition>

          <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methode.map((etape, i) => (
              <li key={etape.titre}>
                <Apparition delai={i * 0.1} className="h-full rounded-2xl border border-or/15 p-8">
                  <span className="font-titre text-sm text-or">Étape {i + 1}</span>
                  <p className="mt-4 font-titre text-2xl font-semibold">{etape.titre}</p>
                  <p className="mt-3 leading-relaxed text-gris">{etape.texte}</p>
                </Apparition>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Appel à l'action ===== */}
      <section className="border-t border-or/10 bg-noir-clair py-24">
        <Apparition className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-titre text-4xl font-bold sm:text-5xl">
            Un projet en tête ? <span className="texte-or italic">Parlons-en.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gris">
            Décrivez votre besoin : nous vous proposons la solution la plus adaptée.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full bg-or px-10 py-4 font-semibold text-noir transition-colors hover:bg-or-clair"
          >
            Demander un devis
          </Link>
        </Apparition>
      </section>
    </>
  );
}
