import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Apparition from "@/components/Apparition";
import FilAriane from "@/components/FilAriane";
import Icone from "@/components/Icone";
import AppelAction from "@/components/ui/AppelAction";
import Bouton from "@/components/ui/Bouton";
import EnTeteSection from "@/components/ui/EnTeteSection";
import Section from "@/components/ui/Section";
import { metaPage } from "@/lib/seo";
import { liensContact, messagesWhatsApp, services, site } from "@/lib/site";

// Une page par service, créée automatiquement à partir de lib/services.ts
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function trouverService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = trouverService(slug);
  if (!service) return { title: "Service introuvable", robots: { index: false } };
  return metaPage(service.titreSeo, service.metaDescription, `/services/${service.slug}`);
}

export default async function PageService({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = trouverService(slug);
  if (!service) notFound();

  const lienWhatsApp = liensContact.whatsapp(messagesWhatsApp.service(service.titre));
  // Le formulaire de contact présélectionne ce service (paramètre ?service=)
  const lienDevis = `/contact?service=${service.slug}`;
  const autres = services.filter((s) => s.slug !== service.slug);

  // Données structurées pour Google : le service et sa FAQ
  const donnees = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.titre,
      description: service.metaDescription,
      serviceType: service.titre,
      url: `${site.url}/services/${service.slug}`,
      areaServed: { "@type": "Country", name: "Côte d'Ivoire" },
      // Prestataire : renvoie à la fiche Organization déclarée dans app/layout.tsx
      provider: { "@type": "Organization", "@id": `${site.url}/#entreprise`, name: site.nom, url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.reponse },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees).replace(/</g, "\\u003c") }}
      />

      {/* ===== Hero du service ===== */}
      <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-[34rem] w-[34rem] rounded-full bg-or/10 blur-[130px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#d4af37_1px,transparent_1px),linear-gradient(90deg,#d4af37_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Apparition immediat>
              <FilAriane
                etapes={[{ label: "Services", href: "/services" }, { label: service.titre }]}
                className="mb-10"
              />
              <p className="surtitre">
                Service {service.numero} / 0{services.length}
              </p>
            </Apparition>
            <Apparition immediat delai={0.08}>
              <h1 className="titre-affiche mt-6">{service.titre}</h1>
            </Apparition>
            <Apparition immediat delai={0.16}>
              <p className="texte-intro mt-6">{service.accroche}</p>
            </Apparition>
            <Apparition immediat delai={0.24}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Bouton href={lienDevis} fleche="droite">
                  Demander un devis
                </Bouton>
                <Bouton href={lienWhatsApp} externe variante="secondaire" fleche="externe">
                  Discuter sur WhatsApp
                </Bouton>
              </div>
              <Bouton href="/realisations" variante="lien" fleche="droite" className="mt-6">
                Découvrir nos réalisations
              </Bouton>
            </Apparition>
          </div>

          <Apparition immediat delai={0.2} className="hidden lg:col-span-4 lg:flex lg:items-end lg:justify-end">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-or/25">
              <div aria-hidden className="absolute inset-6 rounded-full border border-ligne" />
              <div aria-hidden className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border-t border-or/60 motion-reduce:animate-none" />
              <Icone nom={service.icone} className="h-16 w-16 text-or" />
            </div>
          </Apparition>
        </div>
      </section>

      {/* ===== Présentation ===== */}
      <Section filet conteneur="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <EnTeteSection surtitre="Présentation" titre="Ce que nous faisons pour vous." />
        </div>
        <div className="lg:col-span-7">
          <Apparition>
            {service.presentation.map((p, i) => (
              <p key={i} className={`leading-relaxed text-gris-clair ${i === 0 ? "text-lg" : "mt-5"}`}>
                {p}
              </p>
            ))}
          </Apparition>
          <Apparition delai={0.1}>
            <ul className="mt-10 grid gap-x-8 border-t border-ligne sm:grid-cols-2">
              {service.prestations.map((p) => (
                <li key={p} className="flex items-center gap-4 border-b border-ligne py-4 text-blanc/90">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-or" />
                  {p}
                </li>
              ))}
            </ul>
          </Apparition>
        </div>
      </Section>

      {/* ===== Problèmes → Solutions ===== */}
      <Section fond="alterne" filet conteneur="grid gap-16 lg:grid-cols-2">
        <div>
          <EnTeteSection surtitre="Vos enjeux" titre="Vous vous reconnaissez ?" />
          <ul className="mt-10 space-y-4">
            {service.problemes.map((p, i) => (
              <li key={p}>
                <Apparition delai={i * 0.06} className="flex gap-4 rounded-[var(--radius-petit)] border border-ligne bg-noir p-5">
                  <span aria-hidden className="mt-0.5 font-titre text-or/60">—</span>
                  <span className="leading-relaxed text-gris-clair">{p}</span>
                </Apparition>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <EnTeteSection surtitre="Nos solutions" titre="Ce que nous vous proposons." />
          <ul className="mt-10 space-y-4">
            {service.solutions.map((s, i) => (
              <li key={s.titre}>
                <Apparition delai={i * 0.06} className="rounded-[var(--radius-petit)] border border-or/20 bg-noir-carte p-6">
                  <h3 className="titre-carte text-or">{s.titre}</h3>
                  <p className="mt-2 leading-relaxed text-gris">{s.texte}</p>
                </Apparition>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ===== Processus ===== */}
      <Section filet>
        <EnTeteSection surtitre="Processus de réalisation" titre="Quatre étapes, aucune surprise." />
        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-or/40 via-or/20 to-transparent lg:block" />
          {service.processus.map((e, i) => (
            <li key={e.titre} className="relative">
              <Apparition delai={i * 0.08}>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-or/50 bg-noir font-titre text-or">
                  {i + 1}
                </span>
                <h3 className="titre-carte mt-6">{e.titre}</h3>
                <p className="mt-2 leading-relaxed text-gris">{e.texte}</p>
              </Apparition>
            </li>
          ))}
        </ol>
      </Section>

      {/* ===== Avantages ===== */}
      <Section fond="alterne" filet>
        <EnTeteSection surtitre="Avantages" titre="Ce que vous y gagnez." alignement="centre" />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-carte)] border border-ligne bg-ligne md:grid-cols-3">
          {service.avantages.map((a, i) => (
            <li key={a.titre} className="bg-noir-clair p-8 text-center sm:p-10">
              <Apparition delai={i * 0.08}>
                <span aria-hidden className="mx-auto block h-px w-10 bg-or" />
                <h3 className="titre-carte mt-6">{a.titre}</h3>
                <p className="mt-3 leading-relaxed text-gris">{a.texte}</p>
              </Apparition>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== FAQ ===== */}
      <Section filet conteneur="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <EnTeteSection surtitre="Questions fréquentes" titre="Vos questions, nos réponses." />
        </div>
        <div className="lg:col-span-8">
          <div className="border-t border-ligne">
            {service.faq.map((f) => (
              <details key={f.question} className="group border-b border-ligne">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-medium text-blanc transition-colors hover:text-or [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ligne-forte text-or transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 leading-relaxed text-gris">{f.reponse}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== Appel à l'action ===== */}
      <AppelAction
        titre={
          <>
            Prêt à lancer votre projet ? <span className="texte-or italic">Parlons-en.</span>
          </>
        }
        texte="Décrivez votre besoin en quelques lignes : nous revenons vers vous avec une proposition claire."
        bouton={{ label: "Demander un devis", href: lienDevis }}
        secondaire={{ label: "Discuter sur WhatsApp", href: lienWhatsApp, externe: true }}
        lienDiscret={{ label: "Découvrir nos réalisations", href: "/realisations" }}
      />

      {/* ===== Autres services ===== */}
      <Section filet>
        <EnTeteSection surtitre="Nos autres expertises" titre="Tout le digital, sous un même toit." />
        <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {autres.map((s) => (
            <li key={s.slug} className="border-t border-ligne">
              <Link href={`/services/${s.slug}`} className="group flex items-center gap-4 py-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ligne text-or transition-colors group-hover:border-or group-hover:bg-or group-hover:text-noir">
                  <Icone nom={s.icone} className="h-5 w-5" />
                </span>
                <span className="font-medium text-blanc/90 transition-colors group-hover:text-or">{s.titre}</span>
                <span aria-hidden className="ml-auto text-blanc/40 transition-transform group-hover:translate-x-1 group-hover:text-or">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
