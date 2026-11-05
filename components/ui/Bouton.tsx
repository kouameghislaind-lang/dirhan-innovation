import Link from "next/link";
import type { ReactNode } from "react";

// LE bouton du site. Tous les boutons utilisent ce composant pour rester identiques.
//
// variante :
//   - "principal"  : fond or (l'action la plus importante de la zone, une seule à la fois)
//   - "secondaire" : contour blanc (action alternative)
//   - "accent"     : contour or (boutons dans les cartes)
//   - "lien"       : texte or avec flèche (action discrète)
// taille :
//   - "normal"  : 52 px de haut (hero, appels à l'action, formulaire)
//   - "compact" : 40 px de haut (menu, cartes, filtres)

type Variante = "principal" | "secondaire" | "accent" | "lien";
type Taille = "normal" | "compact";

type Props = {
  children: ReactNode;
  href?: string;
  variante?: Variante;
  taille?: Taille;
  fleche?: "droite" | "bas" | "externe";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  // Rend toute la carte parente cliquable (la carte doit être en position relative)
  etirer?: boolean;
  externe?: boolean;
};

const base =
  "group/bouton inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap font-semibold transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70";

const variantes: Record<Variante, string> = {
  principal: "rounded-full bg-or text-noir hover:bg-or-clair",
  secondaire: "rounded-full border border-ligne-forte text-blanc hover:border-or hover:text-or",
  accent: "rounded-full border border-or/40 text-or hover:border-or hover:bg-or hover:text-noir",
  lien: "lien-anime text-or hover:text-or-clair",
};

const tailles: Record<Taille, string> = {
  normal: "h-13 px-7 text-[0.95rem]",
  compact: "h-10 px-5 text-sm",
};

const fleches = { droite: "→", bas: "↓", externe: "↗" };
const mouvements = {
  droite: "group-hover/bouton:translate-x-1",
  bas: "group-hover/bouton:translate-y-0.5",
  externe: "group-hover/bouton:-translate-y-0.5 group-hover/bouton:translate-x-0.5",
};

export function classesBouton(variante: Variante = "principal", taille: Taille = "normal") {
  return `${base} ${variantes[variante]} ${variante === "lien" ? "min-h-6 pb-0.5" : tailles[taille]}`;
}

export default function Bouton({
  children,
  href,
  variante = "principal",
  taille = "normal",
  fleche,
  type = "button",
  disabled,
  onClick,
  className = "",
  etirer,
  externe,
}: Props) {
  const classes = `${classesBouton(variante, taille)} ${etirer ? "after:absolute after:inset-0" : ""} ${className}`;
  // Les boutons principaux et secondaires glissent légèrement vers la souris (voir EffetsInteractifs)
  const magnetique = variante === "principal" || variante === "secondaire" ? { "data-magnetique": "" } : {};
  const contenu = (
    <>
      {children}
      {fleche && (
        <span aria-hidden className={`transition-transform duration-300 ${mouvements[fleche]}`}>
          {fleches[fleche]}
        </span>
      )}
    </>
  );

  if (href && externe) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...magnetique}>
        {contenu}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes} {...magnetique}>
        {contenu}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes} {...magnetique}>
      {contenu}
    </button>
  );
}
