import type { Metadata } from "next";
import Bouton from "@/components/ui/Bouton";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

// Page affichée quand une adresse n'existe pas (erreur 404)
export default function PageIntrouvable() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 pt-20 text-center">
      <div>
        <p className="font-titre text-7xl font-bold texte-or">404</p>
        <h1 className="titre-bloc mt-6">
          Cette page est en préparation.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-gris">
          Elle arrive très bientôt. En attendant, revenez à l&apos;accueil.
        </p>
        <Bouton href="/" className="mt-10">
          Retour à l&apos;accueil
        </Bouton>
      </div>
    </section>
  );
}
