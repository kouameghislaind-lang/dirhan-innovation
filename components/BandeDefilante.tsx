import { services } from "@/lib/site";

// Bande qui fait défiler en continu les expertises de l'agence (effet "marquee").
// Le contenu est dupliqué pour une boucle sans à-coup ; la copie est cachée aux lecteurs d'écran.
// L'animation s'arrête si l'appareil demande moins d'animations, et se met en pause au survol.

const expertises = services.map((s) => s.titre);

function Liste({ cache }: { cache?: boolean }) {
  return (
    <ul aria-hidden={cache} className="flex shrink-0 items-center gap-10 pr-10">
      {expertises.map((texte) => (
        <li key={texte} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-titre text-2xl text-blanc/80 sm:text-3xl">{texte}</span>
          <span aria-hidden className="text-sm text-or">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function BandeDefilante() {
  return (
    <section aria-label="Nos expertises" className="relative overflow-hidden border-b border-ligne bg-noir-clair py-7">
      {/* Fondu sur les bords */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-noir-clair to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-noir-clair to-transparent" />
      <div className="bande-defilante flex w-max">
        <Liste />
        <Liste cache />
      </div>
    </section>
  );
}
