import type { Metadata } from "next";
import Link from "next/link";
import { AValider, Article, Fiche, PageLegale, Valeur } from "@/components/PageLegale";
import { metaPage } from "@/lib/seo";
import { entreprise, site } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Mentions légales",
  "Mentions légales du site de DIRHAN INNOVATION, agence digitale et technologique basée à Cocody, Abidjan, Côte d'Ivoire.",
  "/mentions-legales",
);

export default function MentionsLegales() {
  const h = entreprise.hebergeur;

  return (
    <PageLegale
      surtitre="Informations légales"
      titre="Mentions légales"
      intro={
        <>
          Conformément à la réglementation ivoirienne applicable aux services en ligne, notamment
          la loi n° 2013-546 du 30 juillet 2013 relative aux transactions électroniques, voici
          les informations relatives à l&apos;éditeur et à l&apos;hébergeur de ce site <AValider />.
        </>
      }
    >
      <Article numero={1} titre="Éditeur du site">
        <Fiche
          lignes={[
            ["Raison sociale", entreprise.raisonSociale],
            ["Forme juridique", <Valeur key="f" v={entreprise.formeJuridique} />],
            ...(entreprise.capital ? [["Capital social", entreprise.capital] as [string, string]] : []),
            ["RCCM", <Valeur key="r" v={entreprise.rccm} />],
            ["N° de compte contribuable", <Valeur key="n" v={entreprise.ncc} />],
            ["Siège social", <Valeur key="s" v={entreprise.siege} />],
            ["E-mail", site.email ? <a key="e" href={`mailto:${site.email}`}>{site.email}</a> : <Valeur key="e" v="" />],
            ["Téléphone", <Valeur key="t" v={site.telephone} />],
          ]}
        />
      </Article>

      <Article numero={2} titre="Directeur de la publication">
        <p>
          Le directeur de la publication du site est : <Valeur v={entreprise.directeurPublication} />
        </p>
      </Article>

      <Article numero={3} titre="Hébergement">
        <Fiche
          lignes={[
            ["Hébergeur", <Valeur key="h" v={h.nom} />],
            ["Adresse", <Valeur key="a" v={h.adresse} />],
            ["Site web", <Valeur key="w" v={h.site} />],
          ]}
        />
      </Article>

      <Article numero={4} titre="Propriété intellectuelle">
        <p>
          L&apos;ensemble des éléments de ce site (textes, logo, identité visuelle, illustrations,
          mise en page et code) est la propriété exclusive de {entreprise.raisonSociale}, sauf
          mention contraire.
        </p>
        <p>
          Toute reproduction, représentation, modification ou diffusion, totale ou partielle, de
          ces éléments sans l&apos;autorisation écrite préalable de {entreprise.raisonSociale} est
          interdite.
        </p>
        <p>
          Les illustrations des projets présentés dans la rubrique{" "}
          <Link href="/realisations">Réalisations</Link> sont des illustrations de concept et ne
          représentent pas des écrans de produits finalisés.
        </p>
      </Article>

      <Article numero={5} titre="Responsabilité">
        <p>
          {entreprise.raisonSociale} s&apos;efforce de fournir des informations exactes et à jour.
          Elle ne saurait toutefois garantir l&apos;exhaustivité de ces informations ni
          l&apos;absence d&apos;erreurs, et se réserve le droit de modifier le contenu du site à
          tout moment.
        </p>
        <p>
          Les liens éventuels vers des sites tiers sont fournis à titre informatif.{" "}
          {entreprise.raisonSociale} n&apos;exerce aucun contrôle sur ces sites et décline toute
          responsabilité quant à leur contenu.
        </p>
      </Article>

      <Article numero={6} titre="Données personnelles">
        <p>
          Les informations collectées via le formulaire de contact sont traitées conformément à
          notre <Link href="/confidentialite">politique de confidentialité</Link>. L&apos;usage des
          cookies est décrit dans la page <Link href="/cookies">gestion des cookies</Link>, et les
          règles d&apos;utilisation du site dans nos{" "}
          <Link href="/conditions-utilisation">conditions générales d&apos;utilisation</Link>.
        </p>
      </Article>

      <Article numero={7} titre="Droit applicable">
        <p>
          Les présentes mentions légales sont régies par le droit ivoirien. En cas de litige, et à
          défaut de solution amiable, les juridictions compétentes d&apos;Abidjan seront seules
          compétentes <AValider />.
        </p>
      </Article>
    </PageLegale>
  );
}
