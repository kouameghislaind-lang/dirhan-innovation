"use client";

// "use client" = ce composant tourne aussi dans le navigateur,
// car il réagit aux clics (menu mobile) et au défilement de la page.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import Bouton from "@/components/ui/Bouton";
import { actionPrincipale, liensContact, messagesWhatsApp, navigation, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [defile, setDefile] = useState(false);

  // Le menu devient plus opaque quand on descend dans la page
  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // La touche Échap referme le menu mobile
  useEffect(() => {
    if (!menuOuvert) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOuvert(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOuvert]);

  // Menu ouvert : la page derrière ne défile plus ; il se ferme si l'écran devient large
  useEffect(() => {
    if (!menuOuvert) return;
    const racine = document.documentElement;
    racine.style.overflow = "hidden";
    const ecranLarge = window.matchMedia("(min-width: 1024px)");
    const surChangement = (e: MediaQueryListEvent) => e.matches && setMenuOuvert(false);
    ecranLarge.addEventListener("change", surChangement);
    return () => {
      racine.style.overflow = "";
      ecranLarge.removeEventListener("change", surChangement);
    };
  }, [menuOuvert]);

  // On referme le menu mobile quand on clique sur un lien
  const fermerMenu = () => setMenuOuvert(false);

  const estActif = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        defile || menuOuvert
          ? "border-b border-ligne bg-noir/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />

        {/* Menu ordinateur */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navigation.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className={`relative py-2 text-sm font-medium tracking-wide transition-colors hover:text-blanc ${
                    estActif(lien.href) ? "text-blanc" : "text-blanc/65"
                  }`}
                >
                  {lien.label}
                  {estActif(lien.href) && (
                    <motion.span
                      layoutId="soulignement"
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-or"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bouton ordinateur : masqué par son conteneur (et non par le bouton lui-même,
            dont la classe « inline-flex » entrait en conflit avec « hidden ») */}
        <div className="hidden lg:block">
          <Bouton href={actionPrincipale.href} taille="compact">
            {actionPrincipale.label}
          </Bouton>
        </div>

        {/* Bouton "hamburger" pour le mobile */}
        <button
          type="button"
          onClick={() => setMenuOuvert((o) => !o)}
          aria-expanded={menuOuvert}
          aria-controls="menu-mobile"
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-or transition-transform duration-300 ${
              menuOuvert ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-or transition-transform duration-300 ${
              menuOuvert ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

    </header>

      {/* Menu mobile plein écran.
          Toujours présent dans la page mais invisible et inactif (inert) quand il est fermé :
          l'ouverture et la fermeture se font en CSS, donc instantanées et fiables. */}
      <nav
        id="menu-mobile"
        aria-label="Navigation mobile"
        inert={!menuOuvert}
        className={`fixed inset-0 top-20 z-40 flex flex-col overflow-y-auto bg-noir/[0.97] backdrop-blur-xl lg:hidden ${
          menuOuvert
            ? "visible opacity-100 [transition:opacity_0.3s_ease,visibility_0s]"
            : "invisible opacity-0 [transition:opacity_0.3s_ease,visibility_0s_0.3s]"
        }`}
      >
        {/* Halo doré */}
        <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-or/10 blur-[100px]" />

        <ul className="relative flex flex-1 flex-col justify-center gap-1 px-6 py-10">
          {navigation.map((lien, i) => (
            <li
              key={lien.href}
              style={{ transitionDelay: menuOuvert ? `${80 + i * 50}ms` : "0ms" }}
              className={`transition-[opacity,transform] duration-500 ease-out ${
                menuOuvert ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <Link
                href={lien.href}
                onClick={fermerMenu}
                aria-current={estActif(lien.href) ? "page" : undefined}
                className="group flex items-baseline gap-5 border-b border-ligne py-5"
              >
                <span className="font-titre text-sm text-blanc/35">0{i + 1}</span>
                <span
                  className={`font-titre text-4xl tracking-[-0.02em] transition-colors sm:text-5xl ${
                    estActif(lien.href) ? "text-or" : "text-blanc group-hover:text-or"
                  }`}
                >
                  {lien.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div
          style={{ transitionDelay: menuOuvert ? "350ms" : "0ms" }}
          className={`relative space-y-4 border-t border-ligne px-6 pb-10 pt-8 transition-opacity duration-500 ${
            menuOuvert ? "opacity-100" : "opacity-0"
          }`}
        >
          <Bouton href={actionPrincipale.href} onClick={fermerMenu} fleche="droite" className="w-full">
            {actionPrincipale.label}
          </Bouton>
          {site.whatsapp && (
            <Bouton
              href={liensContact.whatsapp(messagesWhatsApp.general)}
              externe
              variante="secondaire"
              fleche="externe"
              className="w-full"
            >
              Écrire sur WhatsApp
            </Bouton>
          )}
          <p className="text-center text-sm text-gris">
            {site.ville} · <span className="font-titre italic text-blanc/80">{site.signature}</span>
          </p>
        </div>
      </nav>
    </>
  );
}
