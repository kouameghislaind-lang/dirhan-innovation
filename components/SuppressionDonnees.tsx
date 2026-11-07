import Link from "next/link";
import { AValider, Article, Fiche, Valeur } from "@/components/PageLegale";
import { liensContact, site } from "@/lib/site";

// Section « Comment demander la suppression de vos données ».
// Elle décrit UNIQUEMENT ce que le site fait réellement aujourd'hui :
//   - seules les données du formulaire de contact sont collectées ;
//   - aucune connexion Facebook, Instagram ou WhatsApp Business n'est intégrée au site ;
//   - la suppression est traitée manuellement par DIRHAN INNOVATION, sur demande.
// Adresse directe de cette section (utile pour Meta Developers) :
//   /politique-de-confidentialite#suppression-des-donnees

export const ANCRE_SUPPRESSION = "suppression-des-donnees";

export default function SuppressionDonnees({ numero }: { numero: number }) {
  return (
    <div id={ANCRE_SUPPRESSION} className="scroll-mt-28">
      <Article numero={numero} titre="Comment demander la suppression de vos données">
        <p>
          Vous pouvez à tout moment demander la suppression des données personnelles que{" "}
          {site.nom} détient à votre sujet. Cette démarche est gratuite.
        </p>

        <h3 className="titre-carte pt-2 text-blanc">Quelles données sont concernées ?</h3>
        <p>
          À ce jour, {site.nom} ne collecte des données personnelles que par le{" "}
          <Link href="/contact">formulaire de contact</Link> : nom, adresse e-mail, téléphone ou
          WhatsApp, entreprise, service souhaité et message. Ces informations nous parviennent par
          e-mail.
        </p>
        <p>
          Le site <strong>n&apos;utilise aucune connexion Facebook, Instagram ou WhatsApp
          Business</strong> et ne reçoit aucune donnée de ces plateformes. Les liens vers notre page
          Facebook et vers WhatsApp ouvrent simplement ces services, qui appliquent leurs propres
          règles de confidentialité.
        </p>

        <h3 className="titre-carte pt-2 text-blanc">Comment faire votre demande</h3>
        <p>Contactez-nous par l&apos;un des moyens suivants, en indiquant :</p>
        <ul>
          <li>l&apos;objet « Suppression de mes données » ;</li>
          <li>
            l&apos;adresse e-mail et, le cas échéant, le numéro de téléphone utilisés lors de votre
            prise de contact, pour que nous retrouvions vos informations.
          </li>
        </ul>
        <Fiche
          lignes={[
            ["Formulaire", <Link key="f" href="/contact">Formulaire de contact</Link>],
            [
              "Téléphone",
              <a key="t" href={liensContact.telephone}>
                {site.telephone}
              </a>,
            ],
            [
              "WhatsApp",
              <a key="w" href={liensContact.whatsapp("Bonjour, je souhaite la suppression de mes données.")} target="_blank" rel="noopener noreferrer">
                Écrire sur WhatsApp
              </a>,
            ],
            [
              "E-mail",
              site.email ? (
                <a key="e" href={`mailto:${site.email}?subject=Suppression%20de%20mes%20donn%C3%A9es`}>
                  {site.email}
                </a>
              ) : (
                <Valeur key="e" v="" />
              ),
            ],
          ]}
        />

        <h3 className="titre-carte pt-2 text-blanc">Ce qui se passe ensuite</h3>
        <ul>
          <li>
            Nous pouvons vous demander de confirmer votre identité, afin d&apos;éviter qu&apos;une
            autre personne demande la suppression de vos données.
          </li>
          <li>
            Nous supprimons vos messages et vos coordonnées de nos boîtes de réception et de nos
            fichiers dans un délai de <strong>30 jours</strong> au maximum <AValider />.
          </li>
          <li>Nous vous confirmons la suppression par le moyen de contact que vous avez utilisé.</li>
          <li>
            Certaines informations peuvent être conservées plus longtemps si la loi nous y oblige
            (par exemple, une facture émise dans le cadre d&apos;une prestation réalisée)
            <AValider />.
          </li>
        </ul>
        <p>
          Les copies techniques éventuellement conservées par nos prestataires (envoi d&apos;e-mails,
          hébergement du site) sont supprimées selon leurs propres délais <AValider />.
        </p>
      </Article>
    </div>
  );
}
