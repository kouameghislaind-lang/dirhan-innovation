import Link from "next/link";
import Logo from "@/components/Logo";
import Bouton from "@/components/ui/Bouton";
import { actionPrincipale, liensLegaux, navigation, services, site } from "@/lib/site";

// Pied de page « signature » : appel à l'action, plan du site, contact et grande signature DIRHAN.
export default function Footer() {
  const lien = "lien-anime inline-block text-sm leading-6 text-gris hover:text-blanc";

  return (
    <footer className="relative overflow-hidden border-t border-ligne bg-noir-clair">
      {/* Halo doré discret */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-or/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Plan du site */}
        <div className="grid gap-12 pb-10 pt-16 sm:grid-cols-2 lg:grid-cols-12 lg:pt-20">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo taille="grand" />
            <p className="mt-6 max-w-sm font-titre text-xl italic text-blanc/90">{site.signature}</p>
            <Bouton href={actionPrincipale.href} variante="lien" fleche="droite" className="mt-6">
              {actionPrincipale.label}
            </Bouton>
          </div>

          <div className="lg:col-span-2">
            <h2 className="surtitre">Navigation</h2>
            <ul className="mt-4 space-y-2">
              {navigation.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={lien}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="surtitre">Services</h2>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.numero}>
                  <Link href={`/services#${s.slug}`} className={lien}>
                    {s.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="surtitre">Contact</h2>
            <ul className="mt-4 space-y-2">
              <li className="py-1 text-sm text-gris">{site.ville}</li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className={lien}>
                    {site.email}
                  </a>
                </li>
              )}
              {site.telephone && (
                <li>
                  <a href={`tel:${site.telephone.replace(/\s/g, "")}`} className={lien}>
                    {site.telephone}
                  </a>
                </li>
              )}
              {site.whatsapp && (
                <li>
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className={lien}>
                    WhatsApp ↗
                  </a>
                </li>
              )}
              <li>
                <Link href="/contact" className={lien}>
                  Formulaire de contact →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Grande signature */}
      <div aria-hidden className="relative select-none overflow-hidden px-6">
        <p className="mx-auto max-w-7xl translate-y-[18%] bg-gradient-to-b from-blanc/[0.12] to-transparent bg-clip-text text-center font-titre text-[clamp(4rem,19vw,17rem)] font-bold leading-none tracking-[-0.04em] text-transparent">
          DIRHAN
        </p>
      </div>

      {/* Barre légale */}
      <div className="relative border-t border-ligne bg-noir-clair">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-gris xl:flex-row xl:items-center xl:justify-between">
          <p>© 2026 {site.nom}. Tous droits réservés.</p>
          <nav aria-label="Informations légales">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {liensLegaux.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="lien-anime inline-block leading-6 hover:text-blanc">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>Conçu et développé à Abidjan.</p>
        </div>
      </div>
    </footer>
  );
}
