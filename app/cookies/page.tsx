import type { Metadata } from "next";
import Link from "next/link";
import { AValider, Article, Fiche, PageLegale } from "@/components/PageLegale";
import { metaPage } from "@/lib/seo";
import { entreprise } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Gestion des cookies",
  "Informations sur l'utilisation des cookies sur le site de DIRHAN INNOVATION : aucun cookie publicitaire ni de mesure d'audience.",
  "/cookies",
);

export default function GestionCookies() {
  return (
    <PageLegale
      surtitre="Vos données"
      titre="Gestion des cookies"
      intro={
        <>
          Cette page explique ce qu&apos;est un cookie, et surtout ce que ce site fait — ou ne
          fait pas — en la matière.
        </>
      }
    >
      <Article numero={1} titre="Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier texte qu&apos;un site internet peut enregistrer sur votre
          ordinateur, votre tablette ou votre téléphone. Il sert, par exemple, à mémoriser vos
          préférences, à mesurer l&apos;audience d&apos;un site ou à afficher de la publicité
          ciblée.
        </p>
      </Article>

      <Article numero={2} titre="Les cookies utilisés sur ce site">
        <p>
          <strong>À ce jour, ce site ne dépose aucun cookie</strong> : ni cookie publicitaire, ni
          cookie de mesure d&apos;audience, ni cookie de réseaux sociaux.
        </p>
        <Fiche
          lignes={[
            ["Cookies publicitaires", "Aucun"],
            ["Mesure d'audience (statistiques)", "Aucune"],
            ["Réseaux sociaux (boutons de partage, vidéos intégrées)", "Aucun"],
            ["Cookies nécessaires au fonctionnement", "Aucun à ce jour"],
          ]}
        />
        <p>
          C&apos;est pourquoi aucun bandeau de consentement ne vous est présenté : il n&apos;y a
          rien à accepter ni à refuser.
        </p>
      </Article>

      <Article numero={3} titre="Et le formulaire de contact ?">
        <p>
          Le <Link href="/contact">formulaire de contact</Link> n&apos;utilise pas de cookie. Les
          informations que vous y saisissez sont envoyées uniquement lorsque vous cliquez sur «
          Envoyer le message », et sont traitées comme décrit dans notre{" "}
          <Link href="/politique-de-confidentialite">politique de confidentialité</Link>.
        </p>
      </Article>

      <Article numero={4} titre="Si cela change">
        <p>
          Si {entreprise.raisonSociale} décide un jour d&apos;ajouter un outil de mesure
          d&apos;audience ou un service tiers déposant des cookies, nous nous engageons à :
        </p>
        <ul>
          <li>mettre à jour cette page en détaillant chaque cookie et sa finalité ;</li>
          <li>
            vous demander votre accord <strong>avant</strong> tout dépôt de cookie non
            indispensable, avec la possibilité de refuser aussi facilement que d&apos;accepter{" "}
            <AValider /> ;
          </li>
          <li>vous permettre de modifier votre choix à tout moment.</li>
        </ul>
      </Article>

      <Article numero={5} titre="Gérer les cookies dans votre navigateur">
        <p>
          Quel que soit le site visité, vous pouvez à tout moment consulter, bloquer ou supprimer
          les cookies depuis les réglages de votre navigateur :
        </p>
        <ul>
          <li>
            <strong>Chrome</strong> : Paramètres › Confidentialité et sécurité › Cookies ;
          </li>
          <li>
            <strong>Safari</strong> (iPhone) : Réglages › Safari › Confidentialité ;
          </li>
          <li>
            <strong>Firefox</strong> : Paramètres › Vie privée et sécurité ;
          </li>
          <li>
            <strong>Edge</strong> : Paramètres › Cookies et autorisations de site.
          </li>
        </ul>
      </Article>
    </PageLegale>
  );
}
