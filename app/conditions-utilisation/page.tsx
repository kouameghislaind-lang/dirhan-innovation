import type { Metadata } from "next";
import Link from "next/link";
import { AValider, Article, PageLegale } from "@/components/PageLegale";
import { metaPage } from "@/lib/seo";
import { entreprise } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Conditions générales d'utilisation",
  "Conditions générales d'utilisation du site de DIRHAN INNOVATION, agence digitale et technologique à Abidjan.",
  "/conditions-utilisation",
);

export default function ConditionsUtilisation() {
  const nom = entreprise.raisonSociale;

  return (
    <PageLegale
      surtitre="Informations légales"
      titre="Conditions générales d'utilisation"
      intro={
        <>
          Les présentes conditions générales d&apos;utilisation (CGU) définissent les règles
          d&apos;accès et d&apos;utilisation du site de {nom}. En naviguant sur ce site, vous
          acceptez ces conditions.
        </>
      }
    >
      <Article numero={1} titre="Objet du site">
        <p>
          Ce site présente {nom}, ses services (création de sites web, applications mobiles,
          logiciels, branding, marketing digital, intelligence artificielle), ses projets et ses
          coordonnées. Il permet également de nous contacter via un formulaire.
        </p>
      </Article>

      <Article numero={2} titre="Accès au site">
        <p>
          Le site est accessible gratuitement à toute personne disposant d&apos;un accès à
          internet. Les frais de connexion restent à la charge de l&apos;utilisateur.
        </p>
        <p>
          {nom} s&apos;efforce de maintenir le site accessible en permanence, mais peut en
          interrompre l&apos;accès, notamment pour maintenance ou mise à jour, sans que sa
          responsabilité puisse être engagée.
        </p>
      </Article>

      <Article numero={3} titre="Informations et projets présentés">
        <p>
          Les contenus du site sont fournis à titre informatif. Ils ne constituent pas une offre
          commerciale ferme : toute prestation fait l&apos;objet d&apos;un devis personnalisé et
          d&apos;un accord écrit entre {nom} et le client.
        </p>
        <p>
          Les projets présentés dans la rubrique <Link href="/realisations">Réalisations</Link>{" "}
          sont des initiatives internes de {nom}. Leur statut (en développement, prototype ou
          concept) est indiqué sur chacun d&apos;eux ; ils ne doivent pas être considérés comme
          des produits finalisés ou commercialisés.
        </p>
      </Article>

      <Article numero={4} titre="Utilisation du formulaire de contact">
        <p>En utilisant le formulaire de contact, vous vous engagez à :</p>
        <ul>
          <li>fournir des informations exactes vous concernant ;</li>
          <li>ne pas envoyer de contenu illicite, injurieux, diffamatoire ou publicitaire non sollicité ;</li>
          <li>ne pas utiliser le formulaire pour tenter de perturber le fonctionnement du site.</li>
        </ul>
        <p>
          {nom} se réserve le droit de ne pas donner suite aux messages qui ne respectent pas ces
          règles.
        </p>
      </Article>

      <Article numero={5} titre="Propriété intellectuelle">
        <p>
          Les textes, le logo, l&apos;identité visuelle, les illustrations et le code de ce site
          sont la propriété de {nom}. Toute reproduction ou réutilisation sans autorisation écrite
          préalable est interdite. Voir aussi nos{" "}
          <Link href="/mentions-legales">mentions légales</Link>.
        </p>
      </Article>

      <Article numero={6} titre="Responsabilité">
        <p>
          {nom} ne saurait être tenue responsable des dommages directs ou indirects résultant de
          l&apos;utilisation du site, d&apos;une indisponibilité temporaire, ou de la présence
          d&apos;un virus malgré les précautions prises <AValider />.
        </p>
        <p>
          L&apos;utilisateur est responsable de l&apos;usage qu&apos;il fait des informations
          présentes sur le site.
        </p>
      </Article>

      <Article numero={7} titre="Liens vers d'autres sites">
        <p>
          Le site peut contenir des liens vers des sites tiers. {nom} n&apos;exerce aucun contrôle
          sur ces sites et n&apos;est pas responsable de leur contenu.
        </p>
      </Article>

      <Article numero={8} titre="Données personnelles et cookies">
        <p>
          Le traitement de vos données est décrit dans notre{" "}
          <Link href="/politique-de-confidentialite">politique de confidentialité</Link>, et l&apos;usage des
          cookies dans notre page <Link href="/cookies">gestion des cookies</Link>.
        </p>
      </Article>

      <Article numero={9} titre="Modification des conditions">
        <p>
          {nom} peut modifier les présentes CGU à tout moment. La version applicable est celle en
          ligne au moment de votre visite ; sa date de mise à jour figure en haut de cette page.
        </p>
      </Article>

      <Article numero={10} titre="Droit applicable et litiges">
        <p>
          Les présentes CGU sont soumises au droit ivoirien. En cas de litige, une solution amiable
          sera recherchée en priorité ; à défaut, les juridictions compétentes d&apos;Abidjan
          seront saisies <AValider />.
        </p>
      </Article>
    </PageLegale>
  );
}
