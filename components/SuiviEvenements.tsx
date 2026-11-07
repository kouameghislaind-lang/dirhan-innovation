"use client";

// Repère les clics commerciaux (WhatsApp, téléphone, demande de devis) sur tout le site,
// sans modifier chaque bouton. Ne fait rien tant qu'aucun outil de mesure n'est installé
// (voir lib/suivi.ts).

import { useEffect } from "react";
import { suivreEvenement } from "@/lib/suivi";

export default function SuiviEvenements() {
  useEffect(() => {
    const surClic = (e: MouseEvent) => {
      const lien = (e.target as Element | null)?.closest?.("a");
      if (!lien) return;
      const href = lien.getAttribute("href") ?? "";
      const page = window.location.pathname;
      if (href.startsWith("https://wa.me/")) suivreEvenement("clic_whatsapp", { page });
      else if (href.startsWith("tel:")) suivreEvenement("clic_telephone", { page });
      else if (href.startsWith("/contact")) suivreEvenement("clic_devis", { page });
    };
    document.addEventListener("click", surClic, { capture: true });
    return () => document.removeEventListener("click", surClic, { capture: true });
  }, []);

  return null;
}
