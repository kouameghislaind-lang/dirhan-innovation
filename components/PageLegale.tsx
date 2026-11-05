import Link from "next/link";
import type { ReactNode } from "react";
import { entreprise, liensLegaux } from "@/lib/site";

// Mise en page commune aux pages légales (mentions légales, confidentialité).

export function PageLegale({
  surtitre,
  titre,
  intro,
  children,
}: {
  surtitre: string;
  titre: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="pt-40 pb-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="apparition-immediate">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">{surtitre}</p>
          <h1 className="mt-4 font-titre text-4xl font-bold leading-tight sm:text-5xl">{titre}</h1>
          <p className="mt-6 text-lg leading-relaxed text-gris">{intro}</p>
          <p className="mt-4 text-sm text-gris">Dernière mise à jour : {entreprise.dateMiseAJour}</p>

          {/* Avertissement : document à faire relire */}
          <div
            role="note"
            className="mt-8 rounded-2xl border border-or/30 bg-or/5 px-5 py-4 text-sm leading-relaxed text-blanc/80"
          >
            <p className="font-semibold text-or">Document en cours de finalisation</p>
            <p className="mt-1">
              Les informations marquées <Valeur v="" /> doivent encore être renseignées, et les
              points marqués <AValider /> doivent être vérifiés par un professionnel du droit
              avant la publication définitive.
            </p>
          </div>
        </div>

        <div className="mt-14 space-y-12">{children}</div>

        <nav
          aria-label="Pages légales"
          className="mt-16 flex flex-wrap gap-3 border-t border-or/15 pt-8"
        >
          {liensLegaux.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-or/25 px-4 py-2 text-sm text-blanc/80 transition-colors hover:border-or hover:text-or"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full border border-or/25 px-4 py-2 text-sm text-blanc/80 transition-colors hover:border-or hover:text-or"
          >
            Nous contacter
          </Link>
        </nav>
      </div>
    </section>
  );
}

// Une section numérotée (titre + contenu)
export function Article({ numero, titre, children }: { numero: number; titre: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`article-${numero}`}>
      <h2 id={`article-${numero}`} className="flex items-baseline gap-4 font-titre text-2xl font-bold sm:text-3xl">
        <span className="font-titre text-base text-or">{String(numero).padStart(2, "0")}</span>
        {titre}
      </h2>
      <div className="mt-5 space-y-4 leading-relaxed text-blanc/80 [&_a]:text-or [&_a]:underline [&_a]:decoration-or/40 [&_a]:underline-offset-4 [&_li]:pl-1 [&_li]:marker:text-or [&_strong]:text-blanc [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

// Tableau "étiquette : valeur"
export function Fiche({ lignes }: { lignes: [string, ReactNode][] }) {
  return (
    <dl className="divide-y divide-blanc/10 overflow-hidden rounded-2xl border border-or/15 bg-noir-carte">
      {lignes.map(([etiquette, valeur]) => (
        <div key={etiquette} className="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-6">
          <dt className="text-sm text-gris">{etiquette}</dt>
          <dd className="text-blanc/90 sm:col-span-2">{valeur}</dd>
        </div>
      ))}
    </dl>
  );
}

// Repère pour un point qui doit être vérifié par un juriste
export function AValider() {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-blanc/30 bg-blanc/5 px-3 py-0.5 align-middle text-xs font-semibold uppercase tracking-[0.15em] text-blanc/80">
      <span aria-hidden>⚖</span> À valider
    </span>
  );
}

// Affiche la valeur, ou un repère « À compléter » si elle est vide
export function Valeur({ v }: { v: string }) {
  if (v) return <>{v}</>;
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-or/40 align-middle bg-or/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.15em] text-or">
      À compléter
    </span>
  );
}
