"use client";

// Les anciens liens vers la page Services utilisaient une ancre (ex. /services#branding).
// Le serveur ne voit jamais la partie « #… » d'une adresse : la redirection se fait donc ici,
// dans le navigateur, vers la nouvelle page dédiée du service.

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { anciensSlugs, services } from "@/lib/services";

export default function RedirectionAncreService() {
  const router = useRouter();

  useEffect(() => {
    const ancre = decodeURIComponent(window.location.hash.slice(1));
    if (!ancre) return;
    const slug = anciensSlugs[ancre] ?? (services.some((s) => s.slug === ancre) ? ancre : null);
    if (slug) router.replace(`/services/${slug}`);
  }, [router]);

  return null;
}
