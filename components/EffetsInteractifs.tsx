"use client";

// Micro-interactions du site, gérées par UN SEUL écouteur pour rester léger :
//  1. Halo qui suit la souris sur les cartes cliquables (.carte-interactive)
//  2. Boutons « magnétiques » : ils glissent légèrement vers le pointeur ([data-magnetique])
//
// Actifs uniquement avec une souris (pas sur écran tactile) ; le magnétisme est
// désactivé si l'appareil demande moins d'animations. Ce composant n'affiche rien.

import { useEffect } from "react";

const FORCE = 0.25; // part du décalage du pointeur appliquée au bouton
const MAX = 6; // déplacement maximal en pixels

export default function EffetsInteractifs() {
  useEffect(() => {
    const souris = window.matchMedia("(hover: hover) and (pointer: fine)");
    const moinsAnimations = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!souris.matches) return;

    let boutonActif: HTMLElement | null = null;

    const relacher = () => {
      if (boutonActif) boutonActif.style.transform = "";
      boutonActif = null;
    };

    const surMouvement = (e: PointerEvent) => {
      const cible = e.target instanceof Element ? e.target : null;

      // 1. Halo sur les cartes
      const carte = cible?.closest<HTMLElement>(".carte-interactive");
      if (carte) {
        const r = carte.getBoundingClientRect();
        carte.style.setProperty("--pointeur-x", `${e.clientX - r.left}px`);
        carte.style.setProperty("--pointeur-y", `${e.clientY - r.top}px`);
      }

      // 2. Boutons magnétiques
      if (moinsAnimations.matches) return;
      const bouton = cible?.closest<HTMLElement>("[data-magnetique]") ?? null;
      if (bouton !== boutonActif) relacher();
      if (bouton) {
        const r = bouton.getBoundingClientRect();
        const dx = Math.max(-MAX, Math.min(MAX, (e.clientX - (r.left + r.width / 2)) * FORCE));
        const dy = Math.max(-MAX, Math.min(MAX, (e.clientY - (r.top + r.height / 2)) * FORCE));
        bouton.style.transform = `translate(${dx}px, ${dy}px)`;
        boutonActif = bouton;
      }
    };

    document.addEventListener("pointermove", surMouvement, { passive: true });
    document.addEventListener("pointerleave", relacher);
    window.addEventListener("blur", relacher);
    return () => {
      document.removeEventListener("pointermove", surMouvement);
      document.removeEventListener("pointerleave", relacher);
      window.removeEventListener("blur", relacher);
      relacher();
    };
  }, []);

  return null;
}
