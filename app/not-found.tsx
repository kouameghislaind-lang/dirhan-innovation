import type { Metadata } from "next";
import Link from "next/link";

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
        <h1 className="mt-6 font-titre text-3xl font-bold">
          Cette page est en préparation.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-gris">
          Elle arrive très bientôt. En attendant, revenez à l&apos;accueil.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-or px-8 py-3 font-semibold text-noir transition-colors hover:bg-or-clair"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
