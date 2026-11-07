import Link from "next/link";
import { IconeWhatsApp } from "@/components/BoutonWhatsApp";
import Logo from "@/components/Logo";
import Bouton from "@/components/ui/Bouton";
import {
  actionPrincipale,
  liensContact,
  liensLegaux,
  messagesWhatsApp,
  navigation,
  services,
  site,
} from "@/lib/site";

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
            <p className="mt-6 max-w-sm font-titre text-xl italic text-champagne">{site.signature}</p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-gris">
              Agence digitale et technologique à Abidjan : communication, sites web, applications et
              logiciels sur mesure.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Bouton href={actionPrincipale.href} taille="compact" fleche="droite">
                {actionPrincipale.label}
              </Bouton>
              {site.whatsapp && (
                <a
                  href={liensContact.whatsapp(messagesWhatsApp.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp (nouvel onglet)"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ligne-forte text-blanc/80 transition-colors hover:border-or hover:text-or"
                >
                  <IconeWhatsApp className="h-4.5 w-4.5" />
                </a>
              )}
              <a
                href={site.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook (nouvel onglet)"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ligne-forte text-blanc/80 transition-colors hover:border-or hover:text-or"
              >
                <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" className="h-4.5 w-4.5">
                  <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.63a20.9 20.9 0 0 0-2.27-.12c-2.25 0-3.79 1.37-3.79 3.9v2.15H7.92v2.94h2.54V21h3.04Z" />
                </svg>
              </a>
            </div>
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
                  <Link href={`/services/${s.slug}`} className={lien}>
                    {s.titre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="surtitre">Contact</h2>
            <ul className="mt-4 space-y-2">
              <li className="text-sm leading-6 text-gris">
                <address className="not-italic">{site.ville}</address>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className={lien}>
                    {site.email}
                  </a>
                </li>
              )}
              {site.telephone && (
                <li>
                  <a href={liensContact.telephone} className={lien}>
                    {site.telephone}
                  </a>
                </li>
              )}
              {site.whatsapp && (
                <li>
                  <a href={liensContact.whatsapp()} target="_blank" rel="noopener noreferrer" className={lien}>
                    WhatsApp ↗
                  </a>
                </li>
              )}
              <li>
                <a href={site.facebook.url} target="_blank" rel="noopener noreferrer" className={lien}>
                  Facebook ↗
                </a>
              </li>
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
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 pt-6 pb-24 text-xs text-gris sm:pb-6 xl:flex-row xl:items-center xl:justify-between">
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
