"use client";

// "use client" = ce composant tourne aussi dans le navigateur,
// car il réagit aux clics (menu mobile) et au défilement de la page.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import { navigation } from "@/lib/site";

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

  // On referme le menu mobile quand on clique sur un lien
  const fermerMenu = () => setMenuOuvert(false);

  const estActif = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        defile || menuOuvert
          ? "border-b border-or/15 bg-noir/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />

        {/* Menu ordinateur */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors hover:text-or ${
                    estActif(lien.href) ? "text-or" : "text-blanc/80"
                  }`}
                >
                  {lien.label}
                  {estActif(lien.href) && (
                    <motion.span
                      layoutId="soulignement"
                      className="absolute -bottom-2 left-0 h-px w-full bg-or"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-or px-5 py-2.5 text-sm font-semibold text-noir transition-colors hover:bg-or-clair lg:inline-block"
        >
          Démarrer un projet
        </Link>

        {/* Bouton "hamburger" pour le mobile */}
        <button
          type="button"
          onClick={() => setMenuOuvert((o) => !o)}
          aria-expanded={menuOuvert}
          aria-controls="menu-mobile"
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
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

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOuvert && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navigation mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-8 pt-2">
              {navigation.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    onClick={fermerMenu}
                    className={`block border-b border-or/10 py-4 font-titre text-2xl ${
                      estActif(lien.href) ? "text-or" : "text-blanc"
                    }`}
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
              <li className="pt-6">
                <Link
                  href="/contact"
                  onClick={fermerMenu}
                  className="block rounded-full bg-or px-5 py-3 text-center font-semibold text-noir"
                >
                  Démarrer un projet
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
