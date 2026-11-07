import type { Metadata } from "next";
import Link from "next/link";
import { AValider, Article, Fiche, PageLegale, Valeur } from "@/components/PageLegale";
import SuppressionDonnees, { ANCRE_SUPPRESSION } from "@/components/SuppressionDonnees";
import { metaPage } from "@/lib/seo";
import {
  dateMiseAJourPolitique,
  sectionsPolitique,
  type BlocPolitique,
} from "@/lib/politiqueConfidentialite";
import { site } from "@/lib/site";

const CHEMIN_POLITIQUE = "/politique-de-confidentialite";

export const metadata: Metadata = metaPage(
  "Politique de confidentialité",
  `Comment ${site.nom} collecte, utilise, protège et supprime vos données personnelles, et comment exercer vos droits (loi ivoirienne n° 2013-450).`,
  CHEMIN_POLITIQUE,
);

// Valeur d'une fiche : lien interne (« /… »), lien externe (« http… »),
// « À compléter » si vide, sinon texte simple.
function ValeurFiche({ v }: { v: string }) {
  if (v.startsWith("/")) return <Link href={v}>Formulaire de contact</Link>;
  if (v.startsWith("http"))
    return (
      <a href={v} target="_blank" rel="noopener noreferrer" className="break-all">
        {v.replace(/^https?:\/\//, "").replace(/\/$/, "")}
      </a>
    );
  return <Valeur v={v} />;
}

// Affiche un bloc de texte. Le texte est inséré comme du texte simple : aucun HTML n'est interprété.
function Bloc({ bloc }: { bloc: BlocPolitique }) {
  if (bloc.type === "sousTitre") return <h3 className="titre-carte pt-2 text-blanc">{bloc.texte}</h3>;
  if (bloc.type === "fiche")
    return <Fiche lignes={bloc.lignes.map(([e, v]) => [e, <ValeurFiche key={e} v={v} />])} />;
  if (bloc.type === "liste")
    return (
      <ul>
        {bloc.elements.map((e, i) => (
          <li key={e}>
            {e}
            {bloc.aValider && i === bloc.elements.length - 1 && <> <AValider /></>}
          </li>
        ))}
      </ul>
    );
  return (
    <p>
      {bloc.texte}
      {bloc.aValider && <> <AValider /></>}
    </p>
  );
}

export default function PolitiqueDeConfidentialite() {
  const sommaire = sectionsPolitique.map((s, i) => ({
    href: s.composant === "suppression" ? `#${ANCRE_SUPPRESSION}` : `#article-${i + 1}`,
    titre: s.titre,
    numero: i + 1,
  }));

  return (
    <PageLegale
      surtitre="Vos données"
      titre="Politique de confidentialité"
      dateMiseAJour={dateMiseAJourPolitique}
      intro={
        <>
          Cette politique explique quelles données personnelles {site.nom} collecte, pourquoi,
          comment elles sont protégées, et comment exercer vos droits, y compris la suppression de
          vos données, conformément à la loi ivoirienne n° 2013-450 du 19 juin 2013.
        </>
      }
    >
      {/* Sommaire cliquable */}
      <nav aria-label="Sommaire de la politique" className="carte p-6 sm:p-8">
        <p className="surtitre">Sommaire</p>
        <ol className="mt-5 space-y-1">
          {sommaire.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className="group flex items-baseline gap-4 py-1.5 text-blanc/80 transition-colors hover:text-or"
              >
                <span className="font-titre text-sm text-blanc/35 group-hover:text-or">
                  {String(s.numero).padStart(2, "0")}
                </span>
                <span>{s.titre}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {sectionsPolitique.map((section, i) =>
        section.composant === "suppression" ? (
          <SuppressionDonnees key={section.titre} numero={i + 1} />
        ) : (
          <Article key={section.titre} numero={i + 1} titre={section.titre}>
            {section.blocs.map((bloc, j) => (
              <Bloc key={j} bloc={bloc} />
            ))}
          </Article>
        ),
      )}
    </PageLegale>
  );
}
