"use client";

// Petit composant réutilisable : son contenu apparaît en douceur
// (fondu + léger glissement vers le haut).
//
// - Par défaut : l'animation se lance quand le bloc entre à l'écran (Framer Motion).
// - Avec "immediat" : pour le haut de page. L'animation est faite en CSS pur,
//   elle démarre dès l'affichage, sans attendre le JavaScript (plus rapide).

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delai?: number;
  className?: string;
  immediat?: boolean;
};

export default function Apparition({ children, delai = 0, className, immediat }: Props) {
  if (immediat) {
    return (
      <div
        className={`apparition-immediate ${className ?? ""}`}
        style={{ animationDelay: `${delai}s` }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: delai, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
