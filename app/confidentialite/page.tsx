import type { Metadata } from "next";
import Link from "next/link";
import { AValider, Article, Fiche, PageLegale, Valeur } from "@/components/PageLegale";
import { metaPage } from "@/lib/seo";
import { entreprise, site } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Politique de confidentialité",
  "Comment DIRHAN INNOVATION collecte, utilise et protège vos données personnelles, conformément à la loi ivoirienne n° 2013-450.",
  "/confidentialite",
);

export default function Confidentialite() {
  const contactDonnees = site.email ? (
    <a href={`mailto:${site.email}`}>{site.email}</a>
  ) : (
    <Valeur v="" />
  );

  return (
    <PageLegale
      surtitre="Vos données"
      titre="Politique de confidentialité"
      intro={
        <>
          {entreprise.raisonSociale} accorde une grande importance à la protection de vos données
          personnelles. Cette politique explique, en termes simples, quelles données nous
          collectons, pourquoi, et quels sont vos droits, conformément à la loi n° 2013-450 du 19
          juin 2013 relative à la protection des données à caractère personnel.
        </>
      }
    >
      <Article numero={1} titre="Responsable du traitement">
        <Fiche
          lignes={[
            ["Organisme", entreprise.raisonSociale],
            ["Adresse", <Valeur key="a" v={entreprise.siege} />],
            ["Contact", contactDonnees],
          ]}
        />
      </Article>

      <Article numero={2} titre="Données collectées">
        <p>
          Nous collectons uniquement les données que vous nous transmettez volontairement via le{" "}
          <Link href="/contact">formulaire de contact</Link> :
        </p>
        <ul>
          <li>
            <strong>Obligatoires :</strong> nom complet, adresse e-mail et description de votre
            projet.
          </li>
          <li>
            <strong>Facultatives :</strong> téléphone ou WhatsApp, nom de votre entreprise et
            service souhaité.
          </li>
        </ul>
        <p>
          Nous ne collectons aucune donnée sensible et vous invitons à ne pas en indiquer dans
          votre message.
        </p>
      </Article>

      <Article numero={3} titre="Pourquoi nous utilisons vos données">
        <p>Vos données servent exclusivement à :</p>
        <ul>
          <li>répondre à votre demande et échanger avec vous sur votre projet ;</li>
          <li>vous adresser, si vous le souhaitez, une proposition ou un devis.</li>
        </ul>
        <p>
          Elles ne sont <strong>jamais vendues</strong>, ni louées, ni utilisées pour vous envoyer
          de la publicité sans votre accord.
        </p>
        <p>
          Ce traitement repose sur votre <strong>consentement</strong>, exprimé lorsque vous
          envoyez le formulaire, et sur l&apos;intérêt commun à donner suite à votre demande <AValider />.
        </p>
      </Article>

      <Article numero={4} titre="Qui peut accéder à vos données">
        <p>
          Seule l&apos;équipe de {entreprise.raisonSociale} a accès aux messages reçus. Pour faire
          fonctionner le site, nous faisons appel à des prestataires techniques qui traitent les
          données uniquement pour notre compte :
        </p>
        <ul>
          <li>
            l&apos;hébergeur du site (<Valeur v={entreprise.hebergeur.nom} />) ;
          </li>
          <li>le service d&apos;envoi d&apos;e-mails qui nous transmet vos messages.</li>
        </ul>
        <p>
          Certains de ces prestataires peuvent être situés hors de Côte d&apos;Ivoire. Le cas
          échéant, nous veillons à ce que ces transferts soient encadrés conformément à la loi n°
          2013-450 <AValider />.
        </p>
      </Article>

      <Article numero={5} titre="Durée de conservation">
        <p>
          Vos données sont conservées pendant <strong>{entreprise.dureeConservation}</strong>, puis
          supprimées, sauf si une relation commerciale s&apos;est établie entre nous <AValider />.
        </p>
      </Article>

      <Article numero={6} titre="Sécurité">
        <p>
          Le site est accessible via une connexion sécurisée, et nous mettons en œuvre des mesures
          raisonnables pour protéger vos données contre tout accès, perte ou divulgation non
          autorisés.
        </p>
      </Article>

      <Article numero={7} titre="Cookies">
        <p>
          À ce jour, ce site <strong>n&apos;utilise aucun cookie publicitaire ni outil de
          mesure d&apos;audience</strong>. Si cela devait changer, cette politique serait mise à
          jour et votre accord vous serait demandé lorsque la loi l&apos;exige. Pour en savoir
          plus, consultez notre page <Link href="/cookies">gestion des cookies</Link>.
        </p>
      </Article>

      <Article numero={8} titre="Vos droits">
        <p>Conformément à la loi n° 2013-450, vous disposez des droits suivants :</p>
        <ul>
          <li>
            <strong>accès</strong> : savoir quelles données nous détenons sur vous ;
          </li>
          <li>
            <strong>rectification</strong> : corriger des données inexactes ;
          </li>
          <li>
            <strong>opposition</strong> : vous opposer à l&apos;utilisation de vos données ;
          </li>
          <li>
            <strong>suppression</strong> : demander l&apos;effacement de vos données.
          </li>
        </ul>
        <p>Pour exercer ces droits, il suffit de nous écrire : {contactDonnees}.</p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l&apos;Autorité
          de Régulation des Télécommunications/TIC de Côte d&apos;Ivoire (ARTCI), autorité de
          protection des données personnelles.
        </p>
        <p>
          {entreprise.raisonSociale} vérifie, avec l&apos;ARTCI ou un conseil juridique, les
          formalités préalables applicables à ce traitement (déclaration ou autorisation){" "}
          <AValider />.
        </p>
      </Article>

      <Article numero={9} titre="Modification de cette politique">
        <p>
          Cette politique peut être mise à jour, par exemple en cas d&apos;évolution du site ou de
          la réglementation. La date de dernière mise à jour est indiquée en haut de cette page.
        </p>
      </Article>
    </PageLegale>
  );
}
