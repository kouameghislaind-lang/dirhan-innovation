import type { Metadata } from "next";
import { metaPage } from "@/lib/seo";
import Link from "next/link";
import Apparition from "@/components/Apparition";
import GrilleRealisations from "@/components/GrilleRealisations";
import AppelAction from "@/components/ui/AppelAction";
import Bouton from "@/components/ui/Bouton";
import EnTeteSection from "@/components/ui/EnTeteSection";
import Section from "@/components/ui/Section";
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
      <Section
        rythme="entete"
        decor={
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-0 h-[30rem] w-[30rem] rounded-full bg-or/10 blur-[120px]"
          />
        }
      >
        <EnTeteSection
          niveau={1}
          surtitre="Réalisations"
          titre={
            <>
              Des projets qui <span className="texte-or italic">font la différence.</span>
            </>
          }
          intro="Découvrez nos projets internes, prototypes et concepts : le laboratoire où DIRHAN INNOVATION imagine et construit les solutions digitales de demain."
        />

        {/* Légende honnête des statuts */}
        <Apparition immediat delai={0.1}>
          <p className="carte mt-8 inline-flex max-w-2xl items-start gap-3 rounded-[var(--radius-petit)] px-5 py-4 text-sm leading-relaxed text-gris">
            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-or" />
            Les projets présentés ici sont des initiatives internes de DIRHAN INNOVATION. Leur
            statut (en développement, prototype ou concept) est indiqué sur chaque projet.
          </p>
        </Apparition>
      </Section>

      {/* ===== Projets ===== */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          {aDesProjets ? (
            <GrilleRealisations projets={realisations} />
          ) : (
            <Apparition immediat>
              <div className="carte rounded-[var(--radius-grand)] p-10 text-center sm:p-16">
                <p className="surtitre">Portfolio en préparation</p>
                <h2 className="titre-bloc mx-auto mt-6 max-w-2xl">Nos études de cas arrivent très bientôt.</h2>
                <p className="texte-intro mx-auto mt-6">
                  Nous préparons la présentation détaillée de nos projets. En attendant, nous
                  pouvons vous présenter des exemples adaptés à votre secteur lors d&apos;un
                  échange.
                </p>
                <Bouton href="/contact" className="mt-10">
                  Demander des exemples
                </Bouton>
              </div>
            </Apparition>
          )}
        </div>
      </section>

      {/* ===== Ce que nous pouvons réaliser pour vous ===== */}
      <Section fond="alterne" filet>
        <EnTeteSection titre="Ce que nous pouvons réaliser pour vous." />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Apparition key={s.slug} delai={(i % 3) * 0.1}>
              <Link href={`/services#${s.slug}`} className="carte carte-interactive group block h-full p-8">
                <span className="font-titre text-sm text-blanc/35">{s.numero}</span>
                <h3 className="titre-carte mt-4 transition-colors group-hover:text-or">{s.titre}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gris">{s.prestations.slice(0, 3).join(" · ")}</p>
              </Link>
            </Apparition>
          ))}
        </div>
      </Section>

      {/* ===== Appel à l'action ===== */}
      <AppelAction
        titre={
          <>
            Votre projet sera <span className="texte-or italic">le prochain.</span>
          </>
        }
      />
    </>
  );
}
