import Image from "next/image";
import Apparition from "@/components/Apparition";
import Bouton from "@/components/ui/Bouton";
import { dirigeant } from "@/lib/site";
// Import direct des photos : Next.js connaît leurs dimensions, les optimise (WebP/AVIF,
// tailles adaptées à chaque écran) et affiche un aperçu flou pendant le chargement.
import portraitCouleur from "@/public/equipe/dirigeant-02.jpg";
import portraitNoirBlanc from "@/public/equipe/dirigeant.jpg";

// Section « dirigeant », en deux variantes :
//   - "accueil"        : portrait couleur (portrait principal), mise en page éditoriale
//   - "institutionnel" : portrait noir et blanc, pour la page À propos

const altPortrait = dirigeant.nom
  ? `Portrait de ${dirigeant.nom}, ${dirigeant.fonction}`
  : `Portrait du dirigeant de DIRHAN INNOVATION`;

type Options = {
  // Petit texte au-dessus du titre
  surtitre?: string;
  // Lien sous le texte (aucun lien si null)
  lien?: { label: string; href: string } | null;
};

export default function SectionDirigeant({
  variante,
  ...options
}: { variante: "accueil" | "institutionnel" } & Options) {
  return variante === "accueil" ? <Accueil {...options} /> : <Institutionnel {...options} />;
}

// ---------- Accueil : portrait couleur dans un cadre doré décalé ----------
function Accueil({ surtitre = "Notre équipe · La direction", lien = { label: "Découvrir l'agence", href: "/a-propos" } }: Options) {
  return (
    <section aria-labelledby="titre-dirigeant" className="relative overflow-hidden border-t border-ligne py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-or/10 blur-[140px]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-20">
        {/* Portrait */}
        <Apparition className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative">
            {/* Cadre doré décalé */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[var(--radius-grand)] border border-or/40 sm:translate-x-6 sm:translate-y-6"
            />
            <div className="group relative overflow-hidden rounded-[var(--radius-grand)] border border-ligne bg-noir-carte">
              <Image
                src={portraitCouleur}
                alt={altPortrait}
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 90vw"
                className="aspect-[4/5] w-full object-cover object-[50%_20%] transition-transform duration-1000 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              {/* Dégradé bas pour la légende */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-noir/90 via-noir/40 to-transparent"
              />
              <p className="absolute bottom-5 left-6 right-6 text-xs uppercase tracking-[0.3em] text-champagne">
                {dirigeant.fonction}
              </p>
            </div>
          </div>
        </Apparition>

        {/* Texte */}
        <div className="lg:col-span-7">
          <Apparition>
            <p className="surtitre">{surtitre}</p>
            <h2 id="titre-dirigeant" className="titre-section mt-5">
              {dirigeant.nom ? (
                dirigeant.nom
              ) : (
                <>
                  Une vision, <span className="texte-or italic">une exigence.</span>
                </>
              )}
            </h2>
            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-gris">{dirigeant.fonction}</p>
          </Apparition>

          <Apparition delai={0.1}>
            <span aria-hidden className="mt-10 block h-px w-16 bg-or" />
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-gris-clair">
              {dirigeant.presentation.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {dirigeant.citation && (
              <blockquote className="mt-10 max-w-2xl border-l-2 border-or pl-6 font-titre text-2xl italic leading-snug text-blanc/90">
                « {dirigeant.citation} »
              </blockquote>
            )}
          </Apparition>

          {lien && (
            <Apparition delai={0.2} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Bouton href={lien.href} variante="accent" taille="compact" fleche="droite">
                {lien.label}
              </Bouton>
            </Apparition>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------- À propos : portrait noir et blanc, mise en page institutionnelle ----------
function Institutionnel({ surtitre = "La direction", lien = null }: Options) {
  return (
    <section aria-labelledby="titre-direction" className="relative border-t border-ligne bg-noir-clair">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* Portrait pleine hauteur */}
        <Apparition className="relative">
          <div className="relative h-full min-h-[28rem] overflow-hidden sm:min-h-[36rem]">
            <Image
              src={portraitNoirBlanc}
              alt={altPortrait}
              placeholder="blur"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_25%]"
            />
            {/* Fondu vers le texte (à droite sur ordinateur, en bas sur mobile) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir-clair via-transparent to-transparent lg:bg-gradient-to-l"
            />
            <div aria-hidden className="absolute bottom-0 left-0 h-px w-1/2 bg-gradient-to-r from-or/70 to-transparent" />
          </div>
        </Apparition>

        {/* Texte */}
        <div className="flex items-center px-6 py-16 sm:py-20 lg:px-16 lg:py-28">
          <Apparition delai={0.1} className="max-w-xl">
            <p className="surtitre">{surtitre}</p>
            <h2 id="titre-direction" className="titre-section mt-5">
              {dirigeant.nom || (
                <>
                  Une direction <span className="texte-or italic">engagée.</span>
                </>
              )}
            </h2>
            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-champagne">{dirigeant.fonction}</p>
            <span aria-hidden className="mt-8 block h-px w-16 bg-or" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-gris-clair">
              {dirigeant.presentation.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {dirigeant.citation && (
              <blockquote className="mt-10 border-l-2 border-or pl-6 font-titre text-2xl italic leading-snug text-blanc/90">
                « {dirigeant.citation} »
              </blockquote>
            )}
            {lien && (
              <div className="mt-10">
                <Bouton href={lien.href} variante="accent" taille="compact" fleche="droite">
                  {lien.label}
                </Bouton>
              </div>
            )}
          </Apparition>
        </div>
      </div>
    </section>
  );
}
