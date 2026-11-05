import type { Metadata } from "next";
import Link from "next/link";
import Apparition from "@/components/Apparition";
import HeroVisuel from "@/components/HeroVisuel";
import Icone from "@/components/Icone";
import { accueil, site } from "@/lib/site";

// L'accueil garde le titre principal du site ; on précise juste son adresse officielle.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

// Disposition des 5 cartes services : 3 en haut, 2 plus larges en bas (sur ordinateur)
const largeurCarte = (i: number) => (i < 3 ? "lg:col-span-2" : "lg:col-span-3");

export default function Accueil() {
  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
        {/* Fond : halo, grille fine et filets dorés */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-or/10 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#d4af37_1px,transparent_1px),linear-gradient(90deg,#d4af37_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-or/40 to-transparent"
        />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-10 sm:py-20 lg:grid-cols-12 lg:py-24">
          <div className="relative z-10 lg:col-span-7">
            <Apparition immediat>
              <p className="inline-flex items-center gap-3 rounded-full border border-or/30 bg-noir/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-or backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-or" />
                Agence digitale · {site.ville}
              </p>
            </Apparition>

            <Apparition immediat delai={0.1}>
              <h1 className="mt-6 font-titre text-[2.15rem] font-bold leading-[1.1] sm:mt-8 sm:text-6xl lg:text-[3.3rem] xl:text-[4rem]">
                Nous transformons vos idées en{" "}
                <span className="texte-or italic">solutions digitales innovantes.</span>
              </h1>
            </Apparition>

            <Apparition immediat delai={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-gris sm:mt-8 sm:text-lg">{accueil.sousTitre}</p>
            </Apparition>

            <Apparition immediat delai={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-4">
                <Link
                  href="#services"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-or px-8 py-4 font-semibold text-noir transition-colors hover:bg-or-clair"
                >
                  Découvrir nos services
                  <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-blanc/25 px-8 py-4 font-semibold text-blanc transition-colors hover:border-or hover:text-or"
                >
                  Demander un devis
                </Link>
              </div>
            </Apparition>
          </div>

          {/* Visuel doré animé : en fond discret sur mobile, à droite sur ordinateur */}
          <div className="pointer-events-none absolute -right-28 top-10 w-[26rem] opacity-25 sm:-right-16 sm:w-[30rem] lg:pointer-events-auto lg:relative lg:right-auto lg:top-auto lg:col-span-5 lg:w-full lg:opacity-100">
            <HeroVisuel />
          </div>
        </div>
      </section>

      {/* ===== 2. SERVICES ===== */}
      <section id="services" className="scroll-mt-20 py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Apparition className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">Nos services</p>
              <h2 className="mt-4 max-w-2xl font-titre text-4xl font-bold sm:text-5xl">
                Des solutions complètes pour <span className="texte-or italic">réussir en ligne.</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-2 self-start py-2 font-semibold text-or transition-colors hover:text-or-clair md:self-auto"
            >
              Tous nos services <span aria-hidden>→</span>
            </Link>
          </Apparition>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {accueil.services.map((s, i) => (
              <Apparition
                key={s.titre}
                delai={(i % 3) * 0.08}
                className={`${largeurCarte(i)} ${i === 4 ? "sm:col-span-2 lg:col-span-3" : ""}`}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-or/15 bg-noir-carte p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-or/50 hover:shadow-[0_24px_60px_-24px_rgba(212,175,55,0.4)] sm:p-9">
                  {/* Lueur dorée au survol */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-or/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-or/30 bg-or/5 text-or transition-colors duration-500 group-hover:bg-or group-hover:text-noir">
                      <Icone nom={s.icone} className="h-7 w-7" />
                    </span>
                    <span className="font-titre text-sm text-or/60">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-titre text-2xl font-semibold transition-colors group-hover:text-or">
                    {s.titre}
                  </h3>
                  <p className="mt-4 flex-1 leading-relaxed text-gris">{s.texte}</p>
                  <Link
                    href={s.lien}
                    className="mt-8 inline-flex items-center gap-2 self-start rounded-full border border-or/40 px-5 py-2.5 text-sm font-semibold text-or transition-colors after:absolute after:inset-0 hover:bg-or hover:text-noir"
                  >
                    En savoir plus
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </article>
              </Apparition>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. POURQUOI DIRHAN ===== */}
      <section className="relative overflow-hidden border-y border-or/10 bg-noir-clair py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-or/5 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Apparition className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">Pourquoi DIRHAN</p>
            <h2 className="mt-4 font-titre text-4xl font-bold sm:text-5xl">
              Quatre engagements, <span className="texte-or italic">une même exigence.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gris">
              Choisir DIRHAN INNOVATION, c&apos;est choisir un partenaire qui allie l&apos;ambition
              des standards internationaux à la connaissance du terrain ivoirien.
            </p>
          </Apparition>

          <ul className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {accueil.piliers.map((p, i) => (
              <li key={p.titre}>
                <Apparition
                  delai={i * 0.1}
                  className="group h-full rounded-2xl border border-or/15 bg-noir p-8 text-center transition-colors duration-500 hover:border-or/40"
                >
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-or/30 text-or transition-transform duration-500 group-hover:scale-110">
                    <Icone nom={p.icone} className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-titre text-2xl font-semibold">{p.titre}</h3>
                  <p className="mt-3 leading-relaxed text-gris">{p.texte}</p>
                </Apparition>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== 4. APPEL À L'ACTION ===== */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Apparition>
            <div className="relative overflow-hidden rounded-[2rem] border border-or/30 bg-noir-carte px-6 py-20 text-center sm:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-or/20 blur-[100px]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#d4af37_1px,transparent_1px),linear-gradient(90deg,#d4af37_1px,transparent_1px)] [background-size:48px_48px]"
              />
              <div className="relative">
                <h2 className="mx-auto max-w-3xl font-titre text-4xl font-bold sm:text-6xl">
                  Vous avez un projet ? <span className="texte-or italic">Parlons-en.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gris">
                  Décrivez-nous votre idée en quelques lignes : nous revenons vers vous rapidement
                  avec une proposition claire et adaptée.
                </p>
                <Link
                  href="/contact"
                  className="group mt-10 inline-flex items-center gap-3 rounded-full bg-or px-10 py-4 font-semibold text-noir transition-colors hover:bg-or-clair"
                >
                  Contactez-nous
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Apparition>
        </div>
      </section>
    </>
  );
}
