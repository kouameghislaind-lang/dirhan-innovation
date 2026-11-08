import type { Metadata } from "next";
import Link from "next/link";
import Apparition from "@/components/Apparition";
import FilAriane from "@/components/FilAriane";
import Icone from "@/components/Icone";
import RedirectionAncreService from "@/components/RedirectionAncreService";
import AppelAction from "@/components/ui/AppelAction";
import EnTeteSection from "@/components/ui/EnTeteSection";
import Section from "@/components/ui/Section";
import { metaPage } from "@/lib/seo";
import { accueil, liensContact, messagesWhatsApp, services } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Solutions numériques pour entreprises",
  "Communication digitale, création de sites web, applications web et mobiles, création graphique, logiciels et contenus : les expertises de DIRHAN INNOVATION à Abidjan.",
  "/services",
);

export default function PageServices() {
  return (
    <>
      {/* Les anciens liens « /services#branding »… mènent vers la nouvelle page dédiée */}
      <RedirectionAncreService />

      {/* ===== En-tête de page ===== */}
      <Section
        rythme="entete"
        decor={
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-or/10 blur-[120px]"
          />
        }
      >
        <FilAriane etapes={[{ label: "Services" }]} className="apparition-immediate mb-8" />
        <EnTeteSection
          niveau={1}
          surtitre="Nos services"
          titre={
            <>
              Solutions digitales pour entreprises, <span className="texte-or italic">sous un même toit.</span>
            </>
          }
          intro="Création de sites web à Abidjan, applications web et mobiles, logiciels sur mesure, communication digitale et contenus numériques : six expertises complémentaires, réunies dans une même équipe, pour faire grandir votre entreprise."
        />
      </Section>

      {/* ===== Les 6 services : une composition différente par service ===== */}
      <div className="border-t border-ligne">
        {services.map((s, i) => {
          const inverse = i % 2 === 1;
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`titre-${s.slug}`}
              className={`scroll-mt-20 border-b border-ligne ${inverse ? "bg-noir-clair" : ""}`}
            >
              <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
                {/* Visuel : grand numéro, icône et prestations */}
                <Apparition className={`lg:col-span-5 ${inverse ? "lg:order-2" : ""}`}>
                  <div className="relative overflow-hidden rounded-[var(--radius-grand)] border border-ligne bg-noir-carte p-8 sm:p-10">
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute h-64 w-64 rounded-full bg-or/10 blur-[90px] ${
                        inverse ? "-left-16 -bottom-16" : "-right-16 -top-16"
                      }`}
                    />
                    <div className="relative flex items-start justify-between">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-or/40 text-or">
                        <Icone nom={s.icone} className="h-8 w-8" />
                      </span>
                      <span aria-hidden className="font-titre text-7xl leading-none text-or/15">
                        {s.numero}
                      </span>
                    </div>
                    <ul className="relative mt-10 space-y-0">
                      {s.prestations.map((p) => (
                        <li key={p} className="flex items-center gap-4 border-t border-ligne py-4 text-blanc/90">
                          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-or" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Apparition>

                {/* Texte */}
                <Apparition delai={0.1} className={`lg:col-span-7 ${inverse ? "lg:order-1" : ""}`}>
                  <p className="surtitre">
                    {s.numero} / 0{services.length}
                  </p>
                  <h2 id={`titre-${s.slug}`} className="titre-section mt-5">
                    {s.titre}
                  </h2>
                  <p className="texte-intro mt-6">{s.accroche}</p>
                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group/lien inline-flex h-13 items-center gap-2.5 rounded-full bg-or px-7 text-[0.95rem] font-semibold text-noir transition-colors hover:bg-or-clair"
                    >
                      Découvrir ce service
                      <span aria-hidden className="transition-transform group-hover/lien:translate-x-1">
                        →
                      </span>
                      <span className="sr-only"> : {s.titre}</span>
                    </Link>
                    <a
                      href={liensContact.whatsapp(messagesWhatsApp.service(s.titre))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lien-anime text-sm font-semibold text-or hover:text-or-clair"
                    >
                      En parler sur WhatsApp ↗<span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </div>
                </Apparition>
              </div>
            </section>
          );
        })}
      </div>

      {/* ===== Notre approche ===== */}
      <Section>
        <EnTeteSection surtitre="Notre approche" titre="Un projet clair, du premier échange au lancement." />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-carte)] border border-ligne bg-ligne sm:grid-cols-2 lg:grid-cols-3">
          {accueil.approche.map((etape, i) => (
            <li key={etape.titre} className="bg-noir p-8 sm:p-10">
              <Apparition delai={(i % 3) * 0.08}>
                <span className="font-titre text-4xl text-or/30">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="titre-carte mt-5">{etape.titre}</h3>
                <p className="mt-3 leading-relaxed text-gris">{etape.texte}</p>
              </Apparition>
            </li>
          ))}
        </ol>
      </Section>

      <AppelAction
        titre={
          <>
            Un projet en tête ? <span className="texte-or italic">Parlons-en.</span>
          </>
        }
        texte="Décrivez votre besoin : nous vous proposons la solution la plus adaptée."
        secondaire={{ label: "Écrire sur WhatsApp", href: liensContact.whatsapp(messagesWhatsApp.devis), externe: true }}
      />
    </>
  );
}
