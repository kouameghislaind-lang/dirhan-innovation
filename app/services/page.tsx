import type { Metadata } from "next";
import { metaPage } from "@/lib/seo";
import Apparition from "@/components/Apparition";
import Icone from "@/components/Icone";
import NavigationServices from "@/components/NavigationServices";
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

      {/* ===== Détail des 6 services =====
          Ordinateur : sommaire fixe à gauche, services à droite.
          Mobile : les raccourcis du haut de page servent de sommaire. */}
      <div className="border-t border-ligne">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <aside className="hidden py-24 lg:col-span-3 lg:block">
            <NavigationServices
              elements={services.map(({ slug, titre, numero, icone }) => ({ slug, titre, numero, icone }))}
            />
          </aside>

          <div className="lg:col-span-9">
            {services.map((s) => (
              <article
                key={s.slug}
                id={s.slug}
                className="scroll-mt-24 border-b border-ligne py-20 last:border-b-0 lg:py-24"
              >
                <Apparition>
                  <div className="flex items-center gap-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-petit)] border border-ligne bg-noir-eleve text-or">
                      <Icone nom={s.icone} className="h-7 w-7" />
                    </span>
                    <span className="font-titre text-sm text-blanc/35">{s.numero} / 0{services.length}</span>
                  </div>
                  <h2 className="titre-bloc mt-8">{s.titre}</h2>
                  <p className="texte-intro mt-5">{s.detail}</p>
                </Apparition>

                <Apparition delai={0.1} className="carte mt-10 p-8 sm:p-10">
                  <p className="surtitre">Ce que nous faisons</p>
                  <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                    {s.prestations.map((p) => (
                      <li key={p} className="flex items-center gap-4 border-b border-ligne py-4 text-blanc/90">
                        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-or" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Bouton href={actionPrincipale.href} variante="lien" fleche="droite" className="mt-6">
                    {actionPrincipale.label}
                  </Bouton>
                </Apparition>
              </article>
            ))}
          </div>
        </div>
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
