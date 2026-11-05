import type { Metadata } from "next";
import { metaPage } from "@/lib/seo";
import Image from "next/image";
import Apparition from "@/components/Apparition";
import AppelAction from "@/components/ui/AppelAction";
import EnTeteSection from "@/components/ui/EnTeteSection";
import Section from "@/components/ui/Section";
import logo from "@/public/logo-dirhan.png";
import { aPropos, engagements, fondateur, manifeste, site, valeurs } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "À propos",
  "DIRHAN INNOVATION, agence digitale et technologique née à Abidjan : notre histoire, notre mission, notre vision et nos valeurs.",
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
      </Section>

      {/* ===== Manifeste ===== */}
      <Section filet>
        <Apparition>
          <p className="surtitre">Notre manifeste</p>
          <blockquote className="mt-8 max-w-5xl font-titre text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] leading-[1.25] tracking-[-0.02em] text-blanc/90">
            {texteManifeste()}
          </blockquote>
        </Apparition>
      </Section>

      {/* ===== Notre histoire ===== */}
      <Section filet conteneur="grid items-center gap-16 lg:grid-cols-2">
        <Apparition>
          <p className="surtitre">Notre histoire</p>
          <h2 className="titre-section mt-5">Le meilleur des deux mondes.</h2>
          <div className="mt-8 max-w-[40rem] space-y-6 text-lg leading-relaxed text-gris">
            {aPropos.histoire.map((paragraphe) => (
              <p key={paragraphe}>{paragraphe}</p>
            ))}
          </div>
        </Apparition>

        <Apparition delai={0.15}>
          <div className="carte relative flex aspect-square items-center justify-center overflow-hidden rounded-[var(--radius-grand)] p-10">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#d4af37_1px,transparent_1px),linear-gradient(90deg,#d4af37_1px,transparent_1px)] [background-size:48px_48px]"
            />
            <div aria-hidden className="absolute h-2/3 w-2/3 rounded-full bg-or/10 blur-3xl" />
            <div className="relative text-center">
              <Image src={logo} alt="Logo DIRHAN INNOVATION" className="mx-auto h-auto w-full max-w-sm" />
              <p className="mt-10 font-titre text-xl italic text-blanc/90">{site.signature}</p>
            </div>
          </div>
        </Apparition>
      </Section>

      {/* ===== Le fondateur : s'affiche uniquement quand le nom est renseigné dans lib/site.ts ===== */}
      {fondateur.nom && (
        <Section filet conteneur="grid items-center gap-12 lg:grid-cols-12">
          {fondateur.photo && (
            <Apparition className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-grand)] border border-ligne">
                <Image
                  src={fondateur.photo}
                  alt={`Portrait de ${fondateur.nom}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Apparition>
          )}
          <Apparition delai={0.1} className={fondateur.photo ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-8"}>
            <p className="surtitre">Le fondateur</p>
            <h2 className="titre-section mt-5">{fondateur.nom}</h2>
            {fondateur.role && <p className="mt-3 text-gris">{fondateur.role}</p>}
            {fondateur.citation && (
              <blockquote className="mt-8 border-l-2 border-or pl-6 font-titre text-2xl italic leading-snug text-blanc/90">
                « {fondateur.citation} »
              </blockquote>
            )}
          </Apparition>
        </Section>
      )}

      {/* ===== Mission & vision ===== */}
      <Section fond="alterne" filet conteneur="grid gap-6 md:grid-cols-2">
        {[
          { titre: "Notre mission", texte: aPropos.mission },
          { titre: "Notre vision", texte: aPropos.vision },
        ].map((bloc, i) => (
          <Apparition key={bloc.titre} delai={i * 0.1} className="carte p-10 sm:p-12">
            <p className="surtitre">{bloc.titre}</p>
            <p className="mt-6 font-titre text-2xl leading-snug tracking-[-0.01em] sm:text-3xl">{bloc.texte}</p>
          </Apparition>
        ))}
      </Section>

      {/* ===== Nos valeurs ===== */}
      <Section filet>
        <EnTeteSection surtitre="Nos valeurs" titre="Ce qui guide chacun de nos projets." />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {valeurs.map((v, i) => (
            <Apparition key={v.titre} delai={i * 0.1} className="carte p-8 sm:p-10">
              <span className="font-titre text-sm text-blanc/35">0{i + 1}</span>
              <h3 className="titre-carte mt-6">{v.titre}</h3>
              <p className="mt-4 leading-relaxed text-gris">{v.texte}</p>
            </Apparition>
          ))}
        </div>
      </Section>

      {/* ===== Nos engagements ===== */}
      <Section fond="alterne" filet conteneur="grid gap-16 lg:grid-cols-2">
        <EnTeteSection surtitre="Nos engagements" titre="Un partenaire, pas un simple prestataire." />
        <div className="space-y-10">
          {engagements.map((e, i) => (
            <Apparition key={e.titre} delai={i * 0.1} className="flex gap-6">
              <span className="mt-3 h-px w-10 shrink-0 bg-or" />
              <div>
                <h3 className="titre-carte">{e.titre}</h3>
                <p className="mt-2 leading-relaxed text-gris">{e.texte}</p>
              </div>
            </Apparition>
          ))}
        </div>
      </Section>

      {/* ===== Appel à l'action ===== */}
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
