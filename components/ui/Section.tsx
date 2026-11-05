import type { ReactNode } from "react";

// Une section de page avec un rythme vertical identique partout.
//
// fond    : "base" (noir) ou "alterne" (noir légèrement plus clair, pour alterner)
// rythme  : "normal" (96 px, 128 px sur ordinateur) ou "entete" (haut de page, sous le menu)
// decor   : éléments décoratifs placés derrière le contenu (halos, grilles...)

type Props = {
  children: ReactNode;
  id?: string;
  fond?: "base" | "alterne";
  rythme?: "normal" | "entete";
  filet?: boolean;
  decor?: ReactNode;
  className?: string;
  conteneur?: string;
};

const rythmes = {
  normal: "py-24 lg:py-32",
  entete: "pt-36 pb-16 lg:pt-44 lg:pb-20",
};

export default function Section({
  children,
  id,
  fond = "base",
  rythme = "normal",
  filet = false,
  decor,
  className = "",
  conteneur = "",
}: Props) {
  return (
    <section
      id={id}
      className={`relative ${decor ? "overflow-hidden" : ""} ${rythmes[rythme]} ${
        fond === "alterne" ? "bg-noir-clair" : ""
      } ${filet ? "border-t border-ligne" : ""} ${id ? "scroll-mt-20" : ""} ${className}`}
    >
      {decor}
      <div className={`relative mx-auto w-full max-w-7xl px-6 ${conteneur}`}>{children}</div>
    </section>
  );
}
