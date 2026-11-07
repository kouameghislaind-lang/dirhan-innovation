import FilAriane from "@/components/FilAriane";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Apparition from "@/components/Apparition";
import BadgeStatut from "@/components/BadgeStatut";
import AppelAction from "@/components/ui/AppelAction";
import IllustrationProjet from "@/components/IllustrationProjet";
import { metaPage } from "@/lib/seo";
import Bouton from "@/components/ui/Bouton";
import { liensContact, realisations, services } from "@/lib/site";

// Une page par projet, créée automatiquement à partir de la liste dans lib/site.ts
export function generateStaticParams() {
  return realisations.map((p) => ({ slug: p.slug }));
}

function trouverProjet(slug: string) {
  return realisations.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const projet = trouverProjet(slug);
  if (!projet) return { title: "Projet introuvable", robots: { index: false } };
  // Description complétée si le résumé est trop court pour Google
  const description =
    projet.resume.length < 110
      ? `${projet.resume} Projet interne de DIRHAN INNOVATION (${projet.statutDetail.toLowerCase()}).`
      : projet.resume;
  return metaPage(projet.titre, description, `/realisations/${projet.slug}`);
}

export default async function PageProjet({ params }: PageProps<"/realisations/[slug]">) {
  const { slug } = await params;
  const projet = trouverProjet(slug);
  if (!projet) notFound();

  const service = services.find((s) => s.slug === projet.service);
  const autres = realisations.filter((p) => p.slug !== projet.slug);

  return (
    <>
      {/* ===== En-tête ===== */}
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[30rem] w-[30rem] rounded-full bg-or/10 blur-[120px]"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Apparition immediat>
            <FilAriane etapes={[{ label: "Réalisations", href: "/realisations" }, { label: projet.titre }]} />
          </Apparition>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
            <Apparition immediat delai={0.05}>
              <div className="flex flex-wrap items-center gap-3">
                <BadgeStatut statut={projet.statut} />
                <span className="surtitre">{projet.categorie}</span>
              </div>
              <h1 className="titre-affiche mt-6">
                {projet.titre}
              </h1>
              <p className="texte-intro mt-6">{projet.resume}</p>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ligne pt-8 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-or">Statut</dt>
                  <dd className="mt-2 text-blanc/90">{projet.statutDetail}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.25em] text-or">Type</dt>
                  <dd className="mt-2 text-blanc/90">{projet.client}</dd>
                </div>
                {service && (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.25em] text-or">Expertise</dt>
                    <dd className="mt-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="-my-1 inline-block py-1 text-blanc/90 underline decoration-or/40 underline-offset-4 transition-colors hover:text-or"
                      >
                        {service.titre}
                      </Link>
                    </dd>
                  </div>
                )}
                {projet.annee && (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.25em] text-or">Année</dt>
                    <dd className="mt-2 text-blanc/90">{projet.annee}</dd>
                  </div>
                )}
              </dl>
            </Apparition>

            <Apparition immediat delai={0.15}>
              <div className="relative overflow-hidden rounded-[var(--radius-grand)] border border-ligne-forte shadow-[0_30px_80px_-30px_rgba(212,175,55,0.35)]">
                <div className="relative aspect-[16/10]">
                  {projet.image ? (
                    <Image
                      src={projet.image}
                      alt={`Aperçu du projet ${projet.titre}`}
                      fill
                      preload
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : projet.illustration ? (
                    <IllustrationProjet type={projet.illustration} className="h-full w-full" />
                  ) : null}
                </div>
              </div>
              {!projet.image && (
                <p className="mt-3 text-center text-xs text-gris">Illustration de concept</p>
              )}
            </Apparition>
          </div>
        </div>
      </section>

      {/* ===== Axes du projet ===== */}
      <section className="border-t border-ligne bg-noir-clair py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Apparition>
            <h2 className="titre-section">Les axes du projet</h2>
          </Apparition>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-carte)] border border-ligne bg-ligne sm:grid-cols-2 lg:grid-cols-4">
            {projet.axes.map((axe, i) => (
              <li key={axe} className="bg-noir-clair p-6 sm:p-8">
                <Apparition delai={i * 0.08}>
                  <span className="font-titre text-3xl text-or/30">{String(i + 1).padStart(2, "0")}</span>
                  <p className="titre-carte mt-4">{axe}</p>
                </Apparition>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-gris">
            Ce projet est une initiative interne de DIRHAN INNOVATION ({projet.statutDetail.toLowerCase()}).
            Sa présentation sera enrichie au fil de son avancement.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {projet.lien && (
              <Bouton href={projet.lien} externe variante="accent" taille="compact" fleche="externe">
                Voir le projet en ligne
              </Bouton>
            )}
            {service && (
              // Lien simple (et non Bouton) : le texte, long, doit pouvoir revenir à la ligne sur mobile
              <Link
                href={`/services/${service.slug}`}
                className="group inline-flex max-w-full items-baseline gap-2 font-semibold text-or transition-colors hover:text-or-clair"
              >
                <span className="lien-anime">Découvrir le service : {service.titre}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ===== Autres projets ===== */}
      {autres.length > 0 && (
        <section className="border-t border-ligne py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="titre-bloc">Autres projets</h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {autres.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/realisations/${p.slug}`}
                    className="carte carte-interactive group flex items-center justify-between gap-6 p-6"
                  >
                    <div>
                      <BadgeStatut statut={p.statut} />
                      <p className="titre-carte mt-4 transition-colors group-hover:text-or">
                        {p.titre}
                      </p>
                      <p className="mt-1 text-sm text-gris">{p.categorie}</p>
                    </div>
                    <span aria-hidden className="text-2xl text-or transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ===== Appel à l'action ===== */}
      <AppelAction
        titre={
          <>
            Un projet similaire ? <span className="texte-or italic">Parlons-en.</span>
          </>
        }
        bouton={{ label: "Parlons de votre projet", href: "/contact" }}
        secondaire={{
          label: "Écrire sur WhatsApp",
          href: liensContact.whatsapp(`Bonjour DIRHAN INNOVATION, j'ai découvert le projet ${projet.titre} et j'aimerais échanger sur un projet similaire.`),
          externe: true,
        }}
      />
    </>
  );
}
