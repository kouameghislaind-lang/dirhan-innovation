import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Apparition from "@/components/Apparition";
import FilAriane from "@/components/FilAriane";
import SectionDirigeant from "@/components/SectionDirigeant";
import AppelAction from "@/components/ui/AppelAction";
import Bouton from "@/components/ui/Bouton";
import EnTeteSection from "@/components/ui/EnTeteSection";
import Section from "@/components/ui/Section";
import { metaPage } from "@/lib/seo";
import { aPropos, accueil, engagements, equipe, manifeste, reassurance, site, valeurs } from "@/lib/site";
import logo from "@/public/logo-dirhan.png";

export const metadata: Metadata = metaPage(
  "À propos",
  "DIRHAN INNOVATION, agence digitale et technologique née à Abidjan : présentation, vision, mission, valeurs, approche de travail et engagements envers nos clients.",
  "/a-propos",
);

// Met en or les mots-clés du manifeste
function texteManifeste() {
  const motif = new RegExp(`(${manifeste.motsCles.join("|")})`, "g");
  return manifeste.texte.split(motif).map((morceau, i) =>
    manifeste.motsCles.includes(morceau) ? (
      <span key={i} className="texte-or italic">
        {morceau}
      </span>
    ) : (
      morceau
    ),
  );
}

// Engagements envers les clients : engagements de l'agence + points de réassurance
const engagementsClients = [...engagements, ...reassurance];

// La commerciale (et les autres membres) n'apparaissent qu'avec un nom et une vraie photo
const membres = equipe.filter((m) => m.nom && m.photo);

export default function PageAPropos() {
  return (
    <>
      {/* ===== En-tête ===== */}
      <Section
        rythme="entete"
        decor={
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full bg-or/10 blur-[120px]"
          />
        }
      >
        <FilAriane etapes={[{ label: "À propos" }]} className="apparition-immediate mb-8" />
        <EnTeteSection
          niveau={1}
          surtitre="À propos"
          titre={
            <>
              Née à Abidjan, <span className="texte-or italic">pensée pour le monde.</span>
            </>
          }
          intro={site.description}
        />
        {/* Sommaire de la page */}
        <Apparition immediat delai={0.1}>
          <nav aria-label="Sur cette page" className="mt-12 flex flex-wrap gap-3">
            {[
              ["#presentation", "Présentation"],
              ["#vision-mission", "Vision & mission"],
              ["#valeurs", "Valeurs"],
              ["#approche", "Approche"],
              ["#engagements", "Engagements"],
              ["#direction", "La direction"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="inline-flex h-10 items-center rounded-full border border-ligne-forte px-5 text-sm text-blanc/80 transition-colors hover:border-or hover:text-or"
              >
                {label}
              </a>
            ))}
          </nav>
        </Apparition>
      </Section>

      {/* ===== 1. Présentation ===== */}
      <Section id="presentation" filet conteneur="grid items-center gap-16 lg:grid-cols-2">
        <Apparition>
          <p className="surtitre">Présentation</p>
          <h2 className="titre-section mt-5">Le meilleur des deux mondes.</h2>
          <div className="mt-8 max-w-[40rem] space-y-6 text-lg leading-relaxed text-gris-clair">
            {aPropos.histoire.map((paragraphe) => (
              <p key={paragraphe}>{paragraphe}</p>
            ))}
          </div>
        </Apparition>

        <Apparition delai={0.15}>
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[var(--radius-grand)] border border-ligne bg-noir-carte p-10">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#d4af37_1px,transparent_1px),linear-gradient(90deg,#d4af37_1px,transparent_1px)] [background-size:48px_48px]"
            />
            <div aria-hidden className="absolute h-2/3 w-2/3 rounded-full bg-or/10 blur-3xl" />
            <div className="relative text-center">
              <Image src={logo} alt="Logo DIRHAN INNOVATION" className="mx-auto h-auto w-full max-w-sm" />
              <p className="mt-10 font-titre text-xl italic text-champagne">{site.signature}</p>
            </div>
          </div>
        </Apparition>
      </Section>

      {/* ===== 2. Manifeste ===== */}
      <Section fond="alterne" filet>
        <Apparition>
          <p className="surtitre">Notre manifeste</p>
          <blockquote className="mt-8 max-w-5xl font-titre text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] leading-[1.25] tracking-[-0.02em] text-blanc/90">
            {texteManifeste()}
          </blockquote>
        </Apparition>
      </Section>

      {/* ===== 3. Vision & mission : mise en page éditoriale ===== */}
      <Section id="vision-mission" filet>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-grand)] border border-ligne bg-ligne lg:grid-cols-2">
          {[
            { titre: "Notre vision", texte: aPropos.vision, numero: "I" },
            { titre: "Notre mission", texte: aPropos.mission, numero: "II" },
          ].map((bloc, i) => (
            <Apparition key={bloc.titre} delai={i * 0.1} className="relative bg-noir p-10 sm:p-14">
              <span aria-hidden className="absolute right-8 top-6 font-titre text-7xl text-or/10 sm:text-8xl">
                {bloc.numero}
              </span>
              <h2 className="surtitre relative">{bloc.titre}</h2>
              <p className="relative mt-8 font-titre text-2xl leading-snug tracking-[-0.01em] sm:text-3xl">
                {bloc.texte}
              </p>
            </Apparition>
          ))}
        </div>
      </Section>

      {/* ===== 4. Valeurs : liste numérotée ===== */}
      <Section id="valeurs" fond="alterne" filet conteneur="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <EnTeteSection surtitre="Nos valeurs" titre="Ce qui guide chacun de nos projets." />
        </div>
        <ul className="border-t border-ligne lg:col-span-8">
          {valeurs.map((v, i) => (
            <li key={v.titre} className="border-b border-ligne">
              <Apparition delai={i * 0.06} className="grid gap-3 py-8 sm:grid-cols-12 sm:gap-8">
                <span className="font-titre text-sm text-or sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="titre-bloc sm:col-span-4">{v.titre}</h3>
                <p className="leading-relaxed text-gris sm:col-span-7">{v.texte}</p>
              </Apparition>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== 5. Approche de travail ===== */}
      <Section id="approche" filet>
        <EnTeteSection
          surtitre="Notre approche de travail"
          titre="Six étapes, une seule équipe."
          intro="Une méthode claire qui vous donne de la visibilité à chaque étape, de la découverte de votre besoin jusqu'à l'accompagnement après le lancement."
          action={
            <Bouton href="/services" variante="lien" fleche="droite">
              Nos services
            </Bouton>
          }
        />
        <ol className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {accueil.approche.map((etape, i) => (
            <li key={etape.titre} className="relative min-w-0 border-t border-or/30 pt-6">
              <Apparition delai={(i % 3) * 0.06}>
                <span className="font-titre text-3xl text-or/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="titre-carte mt-4">{etape.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gris">{etape.texte}</p>
              </Apparition>
            </li>
          ))}
        </ol>
      </Section>

      {/* ===== 6. Engagements envers les clients ===== */}
      <Section id="engagements" fond="alterne" filet conteneur="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <EnTeteSection
            surtitre="Notre engagement envers vous"
            titre="Un partenaire, pas un simple prestataire."
            intro="Ce que nous nous engageons à respecter sur chaque projet."
          />
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {engagementsClients.map((e, i) => (
            <li key={e.titre} className="border-t border-ligne py-7">
              <Apparition delai={(i % 2) * 0.06}>
                <span aria-hidden className="block h-px w-10 bg-or" />
                <h3 className="titre-carte mt-5">{e.titre}</h3>
                <p className="mt-2 leading-relaxed text-gris">{e.texte}</p>
              </Apparition>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== 7. La direction : portrait noir et blanc institutionnel ===== */}
      <div id="direction" className="scroll-mt-20">
        <SectionDirigeant variante="institutionnel" lien={{ label: "Rencontrer l'équipe", href: "/equipe" }} />
      </div>

      {/* ===== 8. Autres membres (la commerciale dès que sa photo est ajoutée) ===== */}
      {membres.length > 0 && (
        <Section filet>
          <EnTeteSection surtitre="Notre équipe" titre="À vos côtés." />
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {membres.map((m) => (
              <Link key={m.nom} href="/equipe" className="group flex items-center gap-6">
                <Image
                  src={m.photo}
                  alt={`Portrait de ${m.nom}, ${m.role}`}
                  width={160}
                  height={200}
                  className="h-28 w-24 rounded-[var(--radius-petit)] object-cover object-top"
                />
                <span>
                  <span className="titre-carte block transition-colors group-hover:text-or">{m.nom}</span>
                  <span className="mt-1 block text-sm uppercase tracking-[0.2em] text-or">{m.role}</span>
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <AppelAction
        titre={
          <>
            Construisons ensemble <span className="texte-or italic">votre réussite digitale.</span>
          </>
        }
        secondaire={{ label: "Voir nos services", href: "/services" }}
      />
    </>
  );
}
