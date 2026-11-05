import type { ReactNode } from "react";
import Apparition from "@/components/Apparition";

// L'en-tête standard d'une section : surtitre + titre + introduction (+ action à droite).
//
// niveau 1 : grand titre de page (h1), apparition immédiate
// niveau 2 : titre de section (h2)

type Props = {
  surtitre?: string;
  titre: ReactNode;
  intro?: ReactNode;
  niveau?: 1 | 2;
  alignement?: "gauche" | "centre";
  action?: ReactNode;
  className?: string;
};

export default function EnTeteSection({
  surtitre,
  titre,
  intro,
  niveau = 2,
  alignement = "gauche",
  action,
  className = "",
}: Props) {
  const centre = alignement === "centre";
  const Titre = niveau === 1 ? "h1" : "h2";

  return (
    <Apparition
      immediat={niveau === 1}
      className={`flex flex-col gap-8 ${
        action && !centre ? "md:flex-row md:items-end md:justify-between" : ""
      } ${centre ? "items-center text-center" : ""} ${className}`}
    >
      <div className={centre ? "flex flex-col items-center" : ""}>
        {surtitre && <p className="surtitre">{surtitre}</p>}
        <Titre
          className={`${surtitre ? "mt-5" : ""} ${
            niveau === 1 ? "titre-affiche max-w-4xl" : "titre-section max-w-3xl"
          }`}
        >
          {titre}
        </Titre>
        {intro && <p className={`mt-6 texte-intro ${centre ? "mx-auto" : ""}`}>{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Apparition>
  );
}
