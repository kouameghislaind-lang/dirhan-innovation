import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Apparition from "@/components/Apparition";
import BadgeStatut from "@/components/BadgeStatut";
import BandeDefilante from "@/components/BandeDefilante";
import HeroVisuel from "@/components/HeroVisuel";
import Icone from "@/components/Icone";
import IllustrationProjet from "@/components/IllustrationProjet";
import SectionDirigeant from "@/components/SectionDirigeant";
import AppelAction from "@/components/ui/AppelAction";
import Bouton from "@/components/ui/Bouton";
import EnTeteSection from "@/components/ui/EnTeteSection";
import Section from "@/components/ui/Section";
import { accueil, equipe, liensContact, messagesWhatsApp, realisations, services, site } from "@/lib/site";

// L'accueil garde le titre principal du site ; on précise juste son adresse officielle.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

// Équipe : seules les personnes avec un nom ET une vraie photo sont affichées
const membres = equipe.filter((m) => m.nom && m.photo);

export default function Accueil() {
  return (
    <>
      {/* ===== 1. HERO ===== */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-or/10 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#d4af37_1px,transparent_1px),linear-gradient(90deg,#d4af37_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-or/40 to-transparent"
        />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-10 sm:py-20 lg:grid-cols-12 lg:py-24">
          <div className="relative z-10 lg:col-span-7">
            <Apparition immediat>
              <p className="inline-flex items-center gap-3 rounded-full border border-ligne bg-noir/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-or backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-or" />
                Agence digitale · {site.localisationCourte}
              </p>
            </Apparition>

            <Apparition immediat delai={0.1}>
              <h1 className="titre-affiche mt-6 sm:mt-8">
                Nous transformons vos idées en{" "}
                <span className="texte-or italic">expériences digitales innovantes.</span>
              </h1>
            </Apparition>

            <Apparition immediat delai={0.2}>
              <p className="texte-intro mt-6 sm:mt-8">{accueil.sousTitre}</p>
            </Apparition>

            <Apparition immediat delai={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-4">
                <Bouton href="#expertises" fleche="bas">
                  Découvrir nos services
                </Bouton>
                <Bouton href="/contact" variante="secondaire">
                  Parlons de votre projet
                </Bouton>
              </div>
            </Apparition>
          </div>

          {/* Visuel de marque doré animé : en fond discret sur mobile, à droite sur ordinateur */}
          <div className="pointer-events-none absolute -right-28 top-10 w-[26rem] opacity-25 sm:-right-16 sm:w-[30rem] lg:pointer-events-auto lg:relative lg:right-auto lg:top-auto lg:col-span-5 lg:w-full lg:opacity-100">
            <HeroVisuel />
          </div>
        </div>
      </section>

      <BandeDefilante />

      {/* ===== 2. INTRODUCTION ===== */}
      <Section conteneur="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Apparition className="lg:col-span-4">
          <p className="surtitre">{site.nom}</p>
          <p className="mt-6 font-titre text-[5.5rem] leading-none text-or/20 sm:text-[7rem]" aria-hidden>
            “
          </p>
        </Apparition>
        <div className="lg:col-span-8">
          <Apparition>
            <h2 className="titre-section text-balance">
              {accueil.introduction.accroche}
            </h2>
          </Apparition>
          <div className="mt-10 grid gap-6 border-t border-ligne pt-10 sm:grid-cols-2 sm:gap-10">
            {accueil.introduction.paragraphes.map((p, i) => (
              <Apparition key={i} delai={0.1 + i * 0.08}>
                <p className="leading-relaxed text-gris-clair">{p}</p>
              </Apparition>
            ))}
          </div>
          <Apparition delai={0.25} className="mt-10">
            <Bouton href="/a-propos" variante="lien" fleche="droite">
              Découvrir l&apos;agence
            </Bouton>
          </Apparition>
        </div>
      </Section>

      {/* ===== 3. NOS EXPERTISES — liste éditoriale numérotée ===== */}
      <Section id="expertises" fond="alterne" filet>
        <EnTeteSection
          surtitre="Nos expertises"
          titre="Six métiers, une même exigence."
          intro="De la stratégie de communication au logiciel sur mesure, nous réunissons toutes les compétences pour faire grandir votre activité."
          action={
            <Bouton href="/services" variante="lien" fleche="droite">
              Tous nos services
            </Bouton>
          }
        />

        <ul className="mt-16 border-t border-ligne">
          {services.map((e, i) => (
            <li key={e.titre} className="border-b border-ligne">
              <Apparition delai={(i % 3) * 0.05}>
                <Link
                  href={`/services/${e.slug}`}
                  className="group relative grid items-center gap-5 py-8 transition-colors sm:grid-cols-12 sm:gap-8 sm:py-10"
                >
                  {/* Fond doré très léger au survol */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -inset-x-6 bg-gradient-to-r from-or/[0.06] via-or/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="relative flex items-center gap-5 sm:col-span-5">
                    <span className="font-titre text-sm text-blanc/35 transition-colors group-hover:text-or">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ligne bg-noir text-or transition-colors duration-500 group-hover:border-or group-hover:bg-or group-hover:text-noir">
                      <Icone nom={e.icone} className="h-6 w-6" />
                    </span>
                    <span className="titre-bloc transition-colors group-hover:text-or">{e.titre}</span>
                  </span>
                  <span className="relative text-gris sm:col-span-4">{e.description}</span>
                  <span className="relative hidden flex-wrap gap-2 sm:col-span-3 sm:flex sm:justify-end">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ligne-forte text-blanc/70 transition-all duration-500 group-hover:-rotate-45 group-hover:border-or group-hover:text-or">
                      →
                    </span>
                  </span>
                </Link>
              </Apparition>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== 4. NOS RÉALISATIONS ===== */}
      <Section>
        <EnTeteSection
          surtitre="Nos réalisations"
          titre="Des projets conçus pour durer."
          intro="Nos projets internes, présentés avec leur état d'avancement réel."
          action={
            <Bouton href="/realisations" variante="lien" fleche="droite">
              Toutes les réalisations
            </Bouton>
          }
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {realisations.map((p, i) => (
            <Apparition key={p.slug} delai={i * 0.08}>
              <article className="group relative flex h-full flex-col">
                <div className="relative overflow-hidden rounded-[var(--radius-carte)] border border-ligne bg-noir-carte">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`Aperçu du projet ${p.titre}`}
                      width={1200}
                      height={900}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    p.illustration && (
                      <IllustrationProjet
                        type={p.illustration}
                        className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    )
                  )}
                  <BadgeStatut statut={p.statut} className="absolute left-4 top-4" />
                </div>
                <p className="surtitre mt-6">{p.categorie}</p>
                <h3 className="titre-carte mt-3 transition-colors group-hover:text-or">
                  <Link href={`/realisations/${p.slug}`} className="after:absolute after:inset-0">
                    {p.titre}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed text-gris">{p.resume}</p>
              </article>
            </Apparition>
          ))}
        </div>
      </Section>

      {/* ===== 5. NOTRE APPROCHE ===== */}
      <Section fond="alterne" filet>
        <EnTeteSection
          surtitre="Notre approche"
          titre="Une méthode claire, de l'idée au lancement."
          intro="Six étapes pour avancer sereinement, avec une visibilité complète à chaque moment du projet."
          alignement="centre"
        />

        <ol className="relative mt-16 grid gap-px overflow-hidden rounded-[var(--radius-carte)] border border-ligne bg-ligne sm:grid-cols-2 lg:grid-cols-3">
          {accueil.approche.map((etape, i) => (
            <li key={etape.titre} className="group relative bg-noir-clair p-8 transition-colors duration-500 hover:bg-noir-carte sm:p-10">
              <Apparition delai={(i % 3) * 0.08}>
                <span className="font-titre text-5xl text-or/25 transition-colors duration-500 group-hover:text-or">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="titre-carte mt-6">{etape.titre}</h3>
                <p className="mt-3 leading-relaxed text-gris">{etape.texte}</p>
              </Apparition>
            </li>
          ))}
        </ol>
      </Section>

      {/* ===== 6. NOTRE ÉQUIPE — le dirigeant (portrait couleur), puis les autres membres
          dès que leur vraie photo est ajoutée ===== */}
      <SectionDirigeant variante="accueil" lien={{ label: "Rencontrer l'équipe", href: "/equipe" }} />
      {membres.length > 0 && (
        <Section>
          <EnTeteSection surtitre="Notre équipe" titre="À vos côtés." />
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {membres.map((m, i) => (
              <Apparition key={m.nom} delai={i * 0.1}>
                <figure className="group">
                  <div className="overflow-hidden rounded-[var(--radius-carte)] border border-ligne">
                    <Image
                      src={m.photo}
                      alt={`Portrait de ${m.nom}, ${m.role}`}
                      width={900}
                      height={1100}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="mt-6">
                    <p className="titre-carte">{m.nom}</p>
                    <p className="mt-1 text-sm uppercase tracking-[0.2em] text-or">{m.role}</p>
                    {m.presentation && <p className="mt-4 leading-relaxed text-gris">{m.presentation}</p>}
                  </figcaption>
                </figure>
              </Apparition>
            ))}
          </div>
        </Section>
      )}

      {/* ===== 7. POURQUOI DIRHAN INNOVATION ===== */}
      <Section
        filet
        conteneur="grid gap-16 lg:grid-cols-12"
        decor={
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-or/5 blur-[120px]"
          />
        }
      >
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <EnTeteSection
              surtitre="Pourquoi DIRHAN INNOVATION"
              titre="Un partenaire, pas un simple prestataire."
              intro="Ce que nous nous engageons à vous apporter, sur chaque projet."
            />
            <Apparition delai={0.15} className="mt-10">
              <Bouton
                href={liensContact.whatsapp(messagesWhatsApp.general)}
                externe
                variante="accent"
                taille="compact"
                fleche="externe"
              >
                Échanger sur WhatsApp
              </Bouton>
            </Apparition>
          </div>
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {accueil.avantages.map((a, i) => (
            <li key={a.titre} className="border-t border-ligne py-8">
              <Apparition delai={(i % 2) * 0.08}>
                <span aria-hidden className="block h-px w-10 bg-or" />
                <h3 className="titre-carte mt-6">{a.titre}</h3>
                <p className="mt-3 leading-relaxed text-gris">{a.texte}</p>
              </Apparition>
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== 8. APPEL À L'ACTION FINAL ===== */}
      <AppelAction
        titre={
          <>
            Vous avez un projet ? <span className="texte-or italic">Construisons-le ensemble.</span>
          </>
        }
        bouton={{ label: "Parlons de votre projet", href: "/contact" }}
        secondaire={{ label: "Écrire sur WhatsApp", href: liensContact.whatsapp(messagesWhatsApp.general), externe: true }}
      />
      {/* ===== 9. FOOTER : commun à tout le site (components/Footer.tsx) ===== */}
    </>
  );
}
