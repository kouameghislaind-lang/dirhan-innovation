import FilAriane from "@/components/FilAriane";
import type { Metadata } from "next";
import { metaPage } from "@/lib/seo";
import Link from "next/link";
import Apparition from "@/components/Apparition";
import GrilleRealisations from "@/components/GrilleRealisations";
import AppelAction from "@/components/ui/AppelAction";
import Bouton from "@/components/ui/Bouton";
import EnTeteSection from "@/components/ui/EnTeteSection";
import Section from "@/components/ui/Section";
import BadgeStatut from "@/components/BadgeStatut";
import {
  liensContact,
  messagesWhatsApp,
  realisations,
  services,
  site,
  statutsDescription,
  type StatutProjet,
} from "@/lib/site";

// Statuts réellement utilisés par les projets, dans l'ordre d'avancement
const statutsAffiches = (["concept", "prototype", "developpement", "livre"] as StatutProjet[]).filter((s) =>
  realisations.some((p) => p.statut === s),
);

export const metadata: Metadata = metaPage(
  "Réalisations",
  "Découvrez les projets réalisés par DIRHAN INNOVATION : sites web, applications, logiciels et solutions digitales.",
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
        <FilAriane etapes={[{ label: "Réalisations" }]} className="apparition-immediate mb-8" />
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
          <div className="mt-10 rounded-[var(--radius-carte)] border border-ligne bg-noir-carte/60 p-6 sm:p-8">
            <p className="max-w-3xl text-sm leading-relaxed text-gris-clair">
              Les projets présentés ici sont des <strong className="font-semibold text-blanc">initiatives internes</strong>{" "}
              de {site.nom}. Leur état d&apos;avancement réel est indiqué sur chaque projet ; les visuels
              sans capture d&apos;écran sont des illustrations de concept.
            </p>
            <dl className="mt-6 grid gap-4 border-t border-ligne pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {statutsAffiches.map((s) => (
                <div key={s}>
                  <dt>
                    <BadgeStatut statut={s} />
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-gris">{statutsDescription[s]}</dd>
                </div>
              ))}
            </dl>
          </div>
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

      {/* ===== Ce que nous pouvons réaliser pour vous : liste éditoriale ===== */}
      <Section fond="alterne" filet conteneur="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <EnTeteSection
            surtitre="Nos expertises"
            titre="Ce que nous pouvons réaliser pour vous."
          />
        </div>
        <ul className="border-t border-ligne lg:col-span-8">
          {services.map((s, i) => (
            <li key={s.slug} className="border-b border-ligne">
              <Apparition delai={(i % 3) * 0.05}>
                <Link href={`/services/${s.slug}`} className="group grid items-baseline gap-2 py-6 sm:grid-cols-12 sm:gap-6">
                  <span className="font-titre text-sm text-blanc/35 transition-colors group-hover:text-or sm:col-span-1">
                    {s.numero}
                  </span>
                  <span className="titre-carte transition-colors group-hover:text-or sm:col-span-5">{s.titre}</span>
                  <span className="text-sm leading-relaxed text-gris sm:col-span-5">
                    {s.prestations.slice(0, 3).join(" · ")}
                  </span>
                  <span aria-hidden className="hidden text-right text-or transition-transform group-hover:translate-x-1 sm:col-span-1 sm:block">
                    →
                  </span>
                </Link>
              </Apparition>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== Appel à l'action ===== */}
      <AppelAction
        titre={
          <>
            Votre projet sera <span className="texte-or italic">le prochain.</span>
          </>
        }
        bouton={{ label: "Parlons de votre projet", href: "/contact" }}
        secondaire={{ label: "Écrire sur WhatsApp", href: liensContact.whatsapp(messagesWhatsApp.devis), externe: true }}
      />
    </>
  );
}
