import type { Metadata } from "next";
import Image from "next/image";
import Apparition from "@/components/Apparition";
import FilAriane from "@/components/FilAriane";
import SectionDirigeant from "@/components/SectionDirigeant";
import AppelAction from "@/components/ui/AppelAction";
import EnTeteSection from "@/components/ui/EnTeteSection";
import Section from "@/components/ui/Section";
import { metaPage } from "@/lib/seo";
import { equipe, liensContact, messagesWhatsApp, site } from "@/lib/site";

export const metadata: Metadata = metaPage(
  "Notre équipe",
  `Rencontrez l'équipe de ${site.nom}, agence digitale et technologique à Cocody, Abidjan : la direction et l'accompagnement commercial de vos projets.`,
  "/equipe",
);

// Seuls les membres avec un nom ET une vraie photo sont présentés
const membres = equipe.filter((m) => m.nom && m.photo);

export default function PageEquipe() {
  return (
    <>
      {/* ===== En-tête ===== */}
      <Section
        rythme="entete"
        decor={
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/3 h-[30rem] w-[36rem] rounded-full bg-or/10 blur-[120px]"
          />
        }
      >
        <FilAriane etapes={[{ label: "À propos", href: "/a-propos" }, { label: "Notre équipe" }]} className="apparition-immediate mb-8" />
        <EnTeteSection
          niveau={1}
          surtitre="Notre équipe"
          titre={
            <>
              Des visages, <span className="texte-or italic">un engagement.</span>
            </>
          }
          intro="Derrière chaque projet, une équipe à l'écoute, disponible et exigeante, qui vous accompagne de la première idée jusqu'au lancement."
        />
      </Section>

      {/* ===== Le dirigeant : portrait couleur principal ===== */}
      <SectionDirigeant variante="accueil" surtitre="La direction" lien={null} />

      {/* ===== Les autres membres (la commerciale dès que sa photo est ajoutée) ===== */}
      {membres.map((m, i) => (
        <section key={m.nom} className={`border-t border-ligne ${i % 2 === 0 ? "bg-noir-clair" : ""}`}>
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-12 lg:gap-20 lg:py-32">
            <Apparition className={`mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none ${i % 2 === 0 ? "lg:order-2" : ""}`}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[var(--radius-grand)] border border-or/40 sm:-translate-x-6 sm:translate-y-6"
                />
                <div className="relative overflow-hidden rounded-[var(--radius-grand)] border border-ligne">
                  <Image
                    src={m.photo}
                    alt={`Portrait de ${m.nom}, ${m.role}`}
                    width={900}
                    height={1125}
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 90vw"
                    className="aspect-[4/5] w-full object-cover object-[50%_20%]"
                  />
                </div>
              </div>
            </Apparition>
            <Apparition delai={0.1} className={`lg:col-span-7 ${i % 2 === 0 ? "lg:order-1" : ""}`}>
              <p className="surtitre">{m.role}</p>
              <h2 className="titre-section mt-5">{m.nom}</h2>
              <span aria-hidden className="mt-10 block h-px w-16 bg-or" />
              {m.presentation && (
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gris-clair">{m.presentation}</p>
              )}
            </Apparition>
          </div>
        </section>
      ))}

      <AppelAction
        titre={
          <>
            Envie d&apos;échanger <span className="texte-or italic">avec nous ?</span>
          </>
        }
        texte="Présentez-nous votre projet : nous vous répondons rapidement, par e-mail, téléphone ou WhatsApp."
        bouton={{ label: "Parlons de votre projet", href: "/contact" }}
        secondaire={{ label: "Écrire sur WhatsApp", href: liensContact.whatsapp(messagesWhatsApp.general), externe: true }}
      />
    </>
  );
}
