import type { Metadata } from "next";
import { metaPage } from "@/lib/seo";
import Apparition from "@/components/Apparition";
import FormulaireContact from "@/components/FormulaireContact";
import { site } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Contact",
  "Parlez-nous de votre projet digital : site web, application mobile, logiciel, branding, marketing ou IA. Agence basée à Abidjan.",
  "/contact",
);

const etapes = [
  { titre: "Vous nous écrivez", texte: "Décrivez votre projet en quelques lignes." },
  { titre: "Nous vous rappelons", texte: "Un échange pour bien comprendre vos besoins." },
  { titre: "Vous recevez une proposition", texte: "Un devis clair, un planning et un budget précis." },
];

export default function PageContact() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-or/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-5">
        {/* Colonne de gauche : texte et informations */}
        <div className="lg:col-span-2">
          <Apparition immediat>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-or">Contact</p>
            <h1 className="mt-4 font-titre text-4xl font-bold leading-tight sm:text-5xl">
              Parlons de <span className="texte-or italic">votre projet.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gris">
              Une idée, un besoin, une ambition ? Écrivez-nous : nous revenons vers vous
              rapidement avec une réponse claire.
            </p>
          </Apparition>

          <Apparition immediat delai={0.1}>
            <ol className="mt-12 space-y-8">
              {etapes.map((e, i) => (
                <li key={e.titre} className="flex gap-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-or/50 font-titre text-sm text-or">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-titre text-lg font-semibold">{e.titre}</p>
                    <p className="mt-1 text-sm text-gris">{e.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Apparition>

          <Apparition immediat delai={0.2}>
            <dl className="mt-12 space-y-4 border-t border-or/15 pt-8 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-[0.25em] text-or">Adresse</dt>
                <dd className="mt-1 text-blanc/90">{site.ville}</dd>
              </div>
              {site.email && (
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-or">E-mail</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className="text-blanc/90 hover:text-or">
                      {site.email}
                    </a>
                  </dd>
                </div>
              )}
              {site.telephone && (
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-or">Téléphone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${site.telephone.replace(/\s/g, "")}`} className="text-blanc/90 hover:text-or">
                      {site.telephone}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Apparition>
        </div>

        {/* Colonne de droite : formulaire */}
        <Apparition immediat delai={0.15} className="lg:col-span-3">
          <div className="relative rounded-3xl border border-or/20 bg-noir-carte p-6 sm:p-10">
            <FormulaireContact />
          </div>
        </Apparition>
      </div>
    </section>
  );
}
