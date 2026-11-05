"use client";

// Réglage global des animations Framer Motion :
// si le visiteur a activé "réduire les animations" sur son appareil,
// les mouvements sont désactivés (seuls les fondus sont conservés).

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export default function Animations({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
