import type { Metadata } from "next";
import { metaPage } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import Apparition from "@/components/Apparition";
import logo from "@/public/logo-dirhan.png";
import { aPropos, engagements, site, valeurs } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "À propos",
  "DIRHAN INNOVATION, agence digitale et technologique née à Abidjan : notre histoire, notre mission, notre vision et nos valeurs.",
  "/a-propos",
);

export default function PageAPropos() {
  return (
    <>
      {/* ===== En-tête ===== */}
      <section className="relative overflow-hidden pt-40 pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full bg-or/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Apparition immediat>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">À propos</p>
            <h1 className="mt-4 max-w-4xl font-titre text-5xl font-bold leading-[1.05] sm:text-6xl">
              Née à Abidjan,{" "}
              <span className="texte-or italic">pensée pour le monde.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gris">{site.description}</p>
          </Apparition>
        </div>
      </section>

      {/* ===== Notre histoire ===== */}
      <section className="border-t border-or/10 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <Apparition>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">Notre histoire</p>
            <h2 className="mt-4 font-titre text-4xl font-bold sm:text-5xl">
              Le meilleur des deux mondes.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-gris">
              {aPropos.histoire.map((paragraphe) => (
                <p key={paragraphe}>{paragraphe}</p>
              ))}
            </div>
          </Apparition>

          <Apparition delai={0.15}>
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-or/20 bg-noir-carte p-10">
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
        </div>
      </section>

      {/* ===== Mission & vision ===== */}
      <section className="border-t border-or/10 bg-noir-clair py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
          {[
            { titre: "Notre mission", texte: aPropos.mission },
            { titre: "Notre vision", texte: aPropos.vision },
          ].map((bloc, i) => (
            <Apparition
              key={bloc.titre}
              delai={i * 0.1}
              className="rounded-3xl border border-or/15 bg-noir p-10 sm:p-12"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">{bloc.titre}</p>
              <p className="mt-6 font-titre text-2xl leading-snug sm:text-3xl">{bloc.texte}</p>
            </Apparition>
          ))}
        </div>
      </section>

      {/* ===== Nos valeurs ===== */}
      <section className="border-t border-or/10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Apparition>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">Nos valeurs</p>
            <h2 className="mt-4 max-w-2xl font-titre text-4xl font-bold sm:text-5xl">
              Ce qui guide chacun de nos projets.
            </h2>
          </Apparition>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-or/15 bg-or/15 sm:grid-cols-2 lg:grid-cols-4">
            {valeurs.map((v, i) => (
              <Apparition key={v.titre} delai={i * 0.1} className="bg-noir p-8 sm:p-10">
                <span className="font-titre text-sm text-or">0{i + 1}</span>
                <h3 className="mt-6 font-titre text-2xl font-semibold">{v.titre}</h3>
                <p className="mt-4 leading-relaxed text-gris">{v.texte}</p>
              </Apparition>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Nos engagements ===== */}
      <section className="border-t border-or/10 bg-noir-clair py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <Apparition>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">Nos engagements</p>
            <h2 className="mt-4 font-titre text-4xl font-bold sm:text-5xl">
              Un partenaire, <span className="texte-or italic">pas un simple prestataire.</span>
            </h2>
          </Apparition>
          <div className="space-y-10">
            {engagements.map((e, i) => (
              <Apparition key={e.titre} delai={i * 0.1} className="flex gap-6">
                <span className="mt-2 h-px w-10 shrink-0 bg-or" />
                <div>
                  <h3 className="font-titre text-xl font-semibold">{e.titre}</h3>
                  <p className="mt-2 leading-relaxed text-gris">{e.texte}</p>
                </div>
              </Apparition>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Appel à l'action ===== */}
      <section className="border-t border-or/10 py-24">
        <Apparition className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-titre text-4xl font-bold sm:text-5xl">
            Construisons ensemble <span className="texte-or italic">votre réussite digitale.</span>
          </h2>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-or px-8 py-4 font-semibold text-noir transition-colors hover:bg-or-clair"
            >
              Démarrer un projet
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-blanc/20 px-8 py-4 font-semibold text-blanc transition-colors hover:border-or hover:text-or"
            >
              Voir nos services
            </Link>
          </div>
        </Apparition>
      </section>
    </>
  );
}
