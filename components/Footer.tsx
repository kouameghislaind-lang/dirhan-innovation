import Link from "next/link";
import Logo from "@/components/Logo";
import { liensLegaux, navigation, services, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-ligne bg-noir-clair">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo taille="grand" />
          <p className="mt-6 max-w-sm font-titre text-xl italic text-blanc/90">
            {site.signature}
          </p>
          <p className="mt-4 text-sm text-gris">{site.ville}</p>
        </div>

        <div>
          <h2 className="surtitre">
            Navigation
          </h2>
          <ul className="mt-4 space-y-1">
            {navigation.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="inline-block py-1 text-sm text-gris transition-colors hover:text-blanc"
                >
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="surtitre">
            Services
          </h2>
          <ul className="mt-4 space-y-1">
            {services.map((service) => (
              <li key={service.numero}>
                <Link
                  href={`/services#${service.slug}`}
                  className="inline-block py-1 text-sm text-gris transition-colors hover:text-blanc"
                >
                  {service.titre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ligne">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-gris xl:flex-row xl:items-center xl:justify-between">
          <p>© 2026 {site.nom}. Tous droits réservés.</p>
          <nav aria-label="Informations légales">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {liensLegaux.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-block py-1 transition-colors hover:text-blanc">
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
