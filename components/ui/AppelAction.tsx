import type { ReactNode } from "react";
import Apparition from "@/components/Apparition";
import Bouton from "@/components/ui/Bouton";
import Section from "@/components/ui/Section";
import { actionPrincipale } from "@/lib/site";

// Le grand encadré d'appel à l'action, identique en bas de chaque page.
type Props = {
  titre: ReactNode;
  texte?: string;
  bouton?: { label: string; href: string };
  // Bouton secondaire facultatif, à côté du bouton principal
  // externe : lien vers un autre site (ex. WhatsApp), ouvert dans un nouvel onglet
  secondaire?: { label: string; href: string; externe?: boolean };
  // Lien texte discret sous les boutons (ex. « Découvrir nos réalisations »)
  lienDiscret?: { label: string; href: string };
};

export default function AppelAction({
  titre,
  texte = "Décrivez-nous votre idée en quelques lignes : nous revenons vers vous rapidement avec une proposition claire et adaptée.",
  bouton = actionPrincipale,
  secondaire,
  lienDiscret,
}: Props) {
  return (
    <Section>
      <Apparition>
        <div className="relative overflow-hidden rounded-[var(--radius-grand)] border border-or/25 bg-noir-carte px-6 py-20 text-center sm:px-12 lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-or/20 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#d4af37_1px,transparent_1px),linear-gradient(90deg,#d4af37_1px,transparent_1px)] [background-size:48px_48px]"
          />
          <div className="relative">
            <h2 className="titre-section mx-auto max-w-3xl">{titre}</h2>
            {texte && <p className="texte-intro mx-auto mt-6">{texte}</p>}
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Bouton href={bouton.href} fleche="droite">
                {bouton.label}
              </Bouton>
              {secondaire && (
                <Bouton
                  href={secondaire.href}
                  variante="secondaire"
                  externe={secondaire.externe}
                  fleche={secondaire.externe ? "externe" : undefined}
                >
                  {secondaire.label}
                </Bouton>
              )}
            </div>
            {lienDiscret && (
              <Bouton href={lienDiscret.href} variante="lien" fleche="droite" className="mt-8">
                {lienDiscret.label}
              </Bouton>
            )}
          </div>
        </div>
      </Apparition>
    </Section>
  );
}
