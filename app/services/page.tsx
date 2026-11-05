import type { Metadata } from "next";
import { metaPage } from "@/lib/seo";
import Apparition from "@/components/Apparition";
import AppelAction from "@/components/ui/AppelAction";
import Bouton from "@/components/ui/Bouton";
import EnTeteSection from "@/components/ui/EnTeteSection";
import Section from "@/components/ui/Section";
import { actionPrincipale, methode, services } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Services",
  "Création de sites web, applications mobiles, logiciels sur mesure, branding, marketing digital et intelligence artificielle : découvrez les expertises de DIRHAN INNOVATION à Abidjan.",
  "/services",
);

export default function PageServices() {
  return (
    <>
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
        <EnTeteSection
          niveau={1}
          surtitre="Nos services"
          titre={
            <>
              Tout le digital, <span className="texte-or italic">sous un même toit.</span>
            </>
          }
          intro="De l'identité de votre marque à l'intelligence artificielle, nous réunissons toutes les compétences pour faire grandir votre entreprise."
        />

        {/* Raccourcis vers chaque service */}
        <Apparition immediat delai={0.1}>
          <nav aria-label="Aller à un service" className="mt-12 flex flex-wrap gap-3">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="inline-flex h-10 items-center rounded-full border border-ligne-forte px-5 text-sm text-blanc/80 transition-colors hover:border-or hover:text-or"
              >
                {s.titre}
              </a>
            ))}
          </nav>
        </Apparition>
      </Section>

      {/* ===== Détail des 6 services ===== */}
      <div className="border-t border-ligne">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className={`scroll-mt-20 border-b border-ligne py-20 lg:py-28 ${i % 2 === 1 ? "bg-noir-clair" : ""}`}
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
              <Apparition className="lg:col-span-5">
                <span className="font-titre text-6xl font-bold text-blanc/15 sm:text-7xl">{s.numero}</span>
                <h2 className="titre-bloc mt-4">{s.titre}</h2>
                <p className="texte-intro mt-6">{s.detail}</p>
                <Bouton href={actionPrincipale.href} variante="lien" fleche="droite" className="mt-6">
                  {actionPrincipale.label}
                </Bouton>
              </Apparition>

              <Apparition delai={0.1} className="lg:col-span-6 lg:col-start-7">
                <div className="carte p-8 sm:p-10">
                  <p className="surtitre">Ce que nous faisons</p>
                  <ul className="mt-6 divide-y divide-[var(--color-ligne)]">
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
      </div>

      {/* ===== Notre méthode ===== */}
      <Section>
        <EnTeteSection surtitre="Notre méthode" titre="Un projet clair, du premier échange au lancement." />

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {methode.map((etape, i) => (
            <li key={etape.titre}>
              <Apparition delai={i * 0.1} className="carte h-full p-8">
                <span className="surtitre">Étape {i + 1}</span>
                <p className="titre-carte mt-4">{etape.titre}</p>
                <p className="mt-3 leading-relaxed text-gris">{etape.texte}</p>
              </Apparition>
            </li>
          ))}
        </ol>
      </Section>

      {/* ===== Appel à l'action ===== */}
      <AppelAction
        titre={
          <>
            Un projet en tête ? <span className="texte-or italic">Parlons-en.</span>
          </>
        }
        texte="Décrivez votre besoin : nous vous proposons la solution la plus adaptée."
      />
    </>
  );
}
