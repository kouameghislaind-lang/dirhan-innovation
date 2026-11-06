import type { Metadata } from "next";
import Apparition from "@/components/Apparition";
import HeroVisuel from "@/components/HeroVisuel";
import Icone from "@/components/Icone";
import IllustrationProjet from "@/components/IllustrationProjet";
import BandeDefilante from "@/components/BandeDefilante";
import AppelAction from "@/components/ui/AppelAction";
import Bouton from "@/components/ui/Bouton";
import EnTeteSection from "@/components/ui/EnTeteSection";
import Section from "@/components/ui/Section";
import { accueil, actionPrincipale, site } from "@/lib/site";

// L'accueil garde le titre principal du site ; on précise juste son adresse officielle.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

// Mosaïque « bento » des 5 services (ordinateur) :
//   [ 1 vedette (4 col., 2 lignes) ][ 2 ]
//   [                             ][ 3 ]
//   [     4 (3 col.)    ][    5 (3 col.)    ]
const placeCarte = ["sm:col-span-2 lg:col-span-4 lg:row-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];

export default function Accueil() {
  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
        {/* Fond : halo, grille fine et filet doré */}
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
              <p className="inline-flex items-center gap-3 rounded-full border border-ligne bg-noir/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-or backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-or" />
                Agence digitale · {site.localisationCourte}
              </p>
            </Apparition>

            <Apparition immediat delai={0.1}>
              <h1 className="titre-affiche mt-6 sm:mt-8">
                Nous transformons vos idées en{" "}
                <span className="texte-or italic">solutions digitales innovantes.</span>
              </h1>
            </Apparition>

            <Apparition immediat delai={0.2}>
              <p className="texte-intro mt-6 sm:mt-8">{accueil.sousTitre}</p>
            </Apparition>

            <Apparition immediat delai={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-4">
                <Bouton href="#services" fleche="bas">
                  Découvrir nos services
                </Bouton>
                <Bouton href={actionPrincipale.href} variante="secondaire">
                  {actionPrincipale.label}
                </Bouton>
              </div>
            </Apparition>
          </div>

          {/* Visuel doré animé : en fond discret sur mobile, à droite sur ordinateur */}
          <div className="pointer-events-none absolute -right-28 top-10 w-[26rem] opacity-25 sm:-right-16 sm:w-[30rem] lg:pointer-events-auto lg:relative lg:right-auto lg:top-auto lg:col-span-5 lg:w-full lg:opacity-100">
            <HeroVisuel />
          </div>
        </div>
      </section>

      {/* ===== Bande défilante des expertises ===== */}
      <BandeDefilante />

      {/* ===== 2. SERVICES ===== */}
      <Section id="services">
        <EnTeteSection
          surtitre="Nos services"
          titre="Des solutions complètes pour réussir en ligne."
          action={
            <Bouton href="/services" variante="lien" fleche="droite">
              Tous nos services
            </Bouton>
          }
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {accueil.services.map((s, i) => {
            const vedette = i === 0;
            return (
              <Apparition key={s.titre} delai={(i % 3) * 0.08} className={placeCarte[i]}>
                <article
                  className={`carte carte-interactive group relative flex h-full flex-col overflow-hidden hover:-translate-y-1 ${
                    vedette ? "p-8 sm:p-10" : "p-8"
                  }`}
                >
                  {/* Lueur dorée au survol */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-or/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-petit)] border border-ligne bg-noir-eleve text-or transition-colors duration-500 group-hover:border-or/40 group-hover:bg-or group-hover:text-noir">
                      <Icone nom={s.icone} className="h-7 w-7" />
                    </span>
                    <span className="font-titre text-sm text-blanc/35">0{i + 1}</span>
                  </div>
                  <h3 className={`mt-8 transition-colors group-hover:text-or ${vedette ? "titre-bloc" : "titre-carte"}`}>
                    {s.titre}
                  </h3>
                  <p className={`mt-4 leading-relaxed text-gris ${vedette ? "max-w-md text-lg" : ""}`}>{s.texte}</p>

                  {/* Carte vedette : aperçu illustré */}
                  {vedette && (
                    <div className="relative mt-10 hidden overflow-hidden rounded-[var(--radius-petit)] border border-ligne sm:block">
                      <IllustrationProjet
                        type="boutique"
                        className="aspect-[16/9] w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  )}

                  <div className="mt-auto pt-8">
                    <Bouton href={s.lien} variante="accent" taille="compact" fleche="droite" etirer>
                      En savoir plus
                    </Bouton>
                  </div>
                </article>
              </Apparition>
            );
          })}
        </div>
      </Section>

      {/* ===== 3. POURQUOI DIRHAN ===== */}
      <Section
        fond="alterne"
        filet
        className="border-b border-ligne"
        decor={
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-or/5 blur-[120px]"
          />
        }
      >
        <EnTeteSection
          surtitre="Pourquoi DIRHAN"
          titre="Quatre engagements, une même exigence."
          intro="Choisir DIRHAN INNOVATION, c'est choisir un partenaire qui allie l'ambition des standards internationaux à la connaissance du terrain ivoirien."
          alignement="centre"
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {accueil.piliers.map((p, i) => (
            <li key={p.titre}>
              <Apparition delai={i * 0.1} className="carte carte-interactive group h-full p-8 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-ligne bg-noir-eleve text-or transition-transform duration-500 group-hover:scale-110">
                  <Icone nom={p.icone} className="h-8 w-8" />
                </span>
                <h3 className="titre-carte mt-6">{p.titre}</h3>
                <p className="mt-3 leading-relaxed text-gris">{p.texte}</p>
              </Apparition>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== 4. APPEL À L'ACTION ===== */}
      <AppelAction
        titre={
          <>
            Vous avez un projet ? <span className="texte-or italic">Parlons-en.</span>
          </>
        }
      />
    </>
  );
}
