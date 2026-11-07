import type { Metadata } from "next";
import Apparition from "@/components/Apparition";
import { IconeWhatsApp } from "@/components/BoutonWhatsApp";
import FilAriane from "@/components/FilAriane";
import FormulaireContact from "@/components/FormulaireContact";
import { metaPage } from "@/lib/seo";
import { liensContact, messagesWhatsApp, reassurance, site } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Contact",
  "Parlez-nous de votre projet digital : communication, site web, application, création graphique, logiciel ou contenus. Agence basée à Cocody, Abidjan.",
  "/contact",
);

const etapes = [
  { titre: "Vous nous écrivez", texte: "Décrivez votre projet en quelques lignes." },
  { titre: "Nous échangeons", texte: "Un échange pour bien comprendre vos besoins." },
  { titre: "Vous recevez une proposition", texte: "Un devis clair, un planning et un budget précis." },
];

// Moyens de contact directs (uniquement ceux réellement renseignés dans lib/site.ts)
const moyens = [
  site.whatsapp && {
    etiquette: "WhatsApp",
    valeur: "Écrire sur WhatsApp",
    href: liensContact.whatsapp(messagesWhatsApp.devis),
    externe: true,
    principal: true,
  },
  site.telephone && { etiquette: "Téléphone", valeur: site.telephone, href: liensContact.telephone, externe: false },
  site.email && { etiquette: "E-mail", valeur: site.email, href: `mailto:${site.email}`, externe: false },
  { etiquette: "Facebook", valeur: "Page officielle", href: site.facebook.url, externe: true },
].filter(Boolean) as { etiquette: string; valeur: string; href: string; externe: boolean; principal?: boolean }[];

export default function PageContact() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-or/10 blur-[120px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#d4af37_1px,transparent_1px),linear-gradient(90deg,#d4af37_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]"
        />

        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12">
          {/* Colonne de gauche : texte, étapes et coordonnées */}
          <div className="lg:col-span-5">
            <Apparition immediat>
              <FilAriane etapes={[{ label: "Contact" }]} className="mb-8" />
              <p className="surtitre">Contact</p>
              <h1 className="titre-affiche mt-5">
                Parlons de <span className="texte-or italic">votre projet.</span>
              </h1>
              <p className="texte-intro mt-6">
                Une idée, un besoin, une ambition ? Écrivez-nous : nous revenons vers vous
                rapidement avec une réponse claire.
              </p>
            </Apparition>

            {/* Étapes : ligne verticale dorée */}
            <Apparition immediat delai={0.1}>
              <ol className="relative mt-12 space-y-8 border-l border-or/25 pl-8">
                {etapes.map((e, i) => (
                  <li key={e.titre} className="relative">
                    <span className="absolute -left-[2.85rem] top-0 flex h-9 w-9 items-center justify-center rounded-full border border-or/50 bg-noir font-titre text-sm text-or">
                      {i + 1}
                    </span>
                    <p className="font-titre text-lg font-semibold tracking-[-0.01em]">{e.titre}</p>
                    <p className="mt-1 text-sm text-gris">{e.texte}</p>
                  </li>
                ))}
              </ol>
            </Apparition>

            {/* Coordonnées */}
            <Apparition immediat delai={0.2}>
              <div className="mt-12 border-t border-ligne pt-8">
                <p className="surtitre">Nous joindre directement</p>
                <ul className="mt-5 divide-y divide-[var(--color-ligne)] border-y border-ligne">
                  {moyens.map((m) => (
                    <li key={m.etiquette}>
                      <a
                        href={m.href}
                        {...(m.externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-4 py-4"
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            m.principal
                              ? "border-or bg-or text-noir group-hover:bg-or-clair"
                              : "border-ligne-forte text-or group-hover:border-or"
                          }`}
                        >
                          {m.etiquette === "WhatsApp" ? (
                            <IconeWhatsApp className="h-4.5 w-4.5" />
                          ) : (
                            <span aria-hidden className="text-sm">
                              {m.externe ? "↗" : "→"}
                            </span>
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs uppercase tracking-[0.2em] text-gris">{m.etiquette}</span>
                          <span className="block truncate text-blanc/90 transition-colors group-hover:text-or">
                            {m.valeur}
                            {m.externe && <span className="sr-only"> (nouvel onglet)</span>}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 text-sm text-gris">
                  <span className="text-blanc/80">Adresse :</span> <address className="inline not-italic">{site.ville}</address>
                </div>
              </div>
            </Apparition>
          </div>

          {/* Colonne de droite : formulaire */}
          <Apparition immediat delai={0.15} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[var(--radius-grand)] border border-ligne-forte bg-noir-carte p-6 shadow-[0_40px_100px_-40px_rgba(212,175,55,0.25)] sm:p-10">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-or/70 to-transparent" />
              <h2 className="titre-carte">Votre demande</h2>
              <p className="mt-2 text-sm text-gris">Réponse rapide, premier échange sans engagement.</p>
              <div className="mt-8">
                <FormulaireContact />
              </div>
            </div>

            {/* Réassurance */}
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {reassurance.map((r) => (
                <li key={r.titre} className="flex gap-3 rounded-[var(--radius-petit)] border border-ligne p-4">
                  <svg aria-hidden viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-or">
                    <path
                      d="M4 10.5l3.5 3.5L16 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-blanc">{r.titre}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gris">{r.texte}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Apparition>
        </div>
      </section>
    </>
  );
}
