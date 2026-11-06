"use client";

import { useActionState } from "react";
import Link from "next/link";
import Bouton from "@/components/ui/Bouton";
import { envoyerMessage, type EtatContact } from "@/app/contact/actions";
import { LIMITES_FORMULAIRE } from "@/lib/limitesFormulaire";
import { services } from "@/lib/site";

const etatInitial: EtatContact = {
  statut: "initial",
  message: "",
  erreurs: {},
  valeurs: { nom: "", email: "", telephone: "", entreprise: "", service: "", message: "" },
};

const styleChamp =
  "w-full rounded-[var(--radius-petit)] border bg-noir px-4 py-3.5 text-blanc placeholder:text-blanc/45 outline-none transition-colors focus:border-or focus:ring-1 focus:ring-or";

function Champ({
  id,
  label,
  erreur,
  optionnel,
  children,
}: {
  id: string;
  label: string;
  erreur?: string;
  optionnel?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-blanc/90">
        {label}
        {optionnel ? <span className="ml-1 text-gris">(facultatif)</span> : <span className="ml-1 text-or">*</span>}
      </label>
      {children}
      {erreur && (
        <p id={`${id}-erreur`} className="mt-2 text-sm text-red-400">
          {erreur}
        </p>
      )}
    </div>
  );
}

export default function FormulaireContact() {
  const [etat, action, envoiEnCours] = useActionState(envoyerMessage, etatInitial);
  const { erreurs, valeurs } = etat;

  const bordure = (cle: keyof typeof erreurs) =>
    erreurs[cle] ? "border-red-400/70" : "border-ligne-forte";
  const aria = (cle: keyof typeof erreurs) =>
    erreurs[cle] ? { "aria-invalid": true, "aria-describedby": `${cle}-erreur` } : {};

  return (
    <form action={action} noValidate className="space-y-6">
      {/* Piège anti-robots : invisible pour les visiteurs */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="site_web">Ne pas remplir</label>
        <input id="site_web" name="site_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Champ id="nom" label="Nom complet" erreur={erreurs.nom}>
          <input
            id="nom"
            name="nom"
            maxLength={LIMITES_FORMULAIRE.nom}
            type="text"
            autoComplete="name"
            required
            defaultValue={valeurs.nom}
            placeholder="Kouamé Yao"
            className={`${styleChamp} ${bordure("nom")}`}
            {...aria("nom")}
          />
        </Champ>
        <Champ id="email" label="Adresse e-mail" erreur={erreurs.email}>
          <input
            id="email"
            name="email"
            maxLength={LIMITES_FORMULAIRE.email}
            type="email"
            autoComplete="email"
            required
            defaultValue={valeurs.email}
            placeholder="vous@entreprise.ci"
            className={`${styleChamp} ${bordure("email")}`}
            {...aria("email")}
          />
        </Champ>
        <Champ id="telephone" label="Téléphone / WhatsApp" erreur={erreurs.telephone} optionnel>
          <input
            id="telephone"
            name="telephone"
            maxLength={LIMITES_FORMULAIRE.telephone}
            type="tel"
            autoComplete="tel"
            defaultValue={valeurs.telephone}
            placeholder="+225 07 00 00 00 00"
            className={`${styleChamp} ${bordure("telephone")}`}
            {...aria("telephone")}
          />
        </Champ>
        <Champ id="entreprise" label="Entreprise" optionnel>
          <input
            id="entreprise"
            name="entreprise"
            maxLength={LIMITES_FORMULAIRE.entreprise}
            type="text"
            autoComplete="organization"
            defaultValue={valeurs.entreprise}
            placeholder="Nom de votre structure"
            className={`${styleChamp} border-ligne-forte`}
          />
        </Champ>
      </div>

      <Champ id="service" label="Service souhaité" erreur={erreurs.service} optionnel>
        <div className="relative">
        <select
          id="service"
          name="service"
          defaultValue={valeurs.service}
          key={valeurs.service}
          className={`${styleChamp} ${bordure("service")} appearance-none pr-12`}
          {...aria("service")}
        >
          <option value="">Choisissez un service</option>
          {services.map((s) => (
            <option key={s.numero} value={s.titre}>
              {s.titre}
            </option>
          ))}
          <option value="Autre">Autre / je ne sais pas encore</option>
        </select>
        {/* Petite flèche dorée : indique que c'est une liste déroulante */}
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-or"
        >
          <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        </div>
      </Champ>

      <Champ id="message" label="Votre projet" erreur={erreurs.message}>
        <textarea
          id="message"
          name="message"
            maxLength={LIMITES_FORMULAIRE.message}
          rows={6}
          required
          defaultValue={valeurs.message}
          placeholder="Parlez-nous de votre projet, de vos objectifs et de vos délais."
          className={`${styleChamp} ${bordure("message")} resize-y`}
          {...aria("message")}
        />
      </Champ>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gris">
          <span className="text-or">*</span> Champs obligatoires. En envoyant ce formulaire,
          vous acceptez que vos informations soient utilisées uniquement pour vous répondre (voir
          notre{" "}
          <Link
            href="/confidentialite"
            className="text-or underline decoration-or/40 underline-offset-2 hover:text-or-clair"
          >
            politique de confidentialité
          </Link>
          ).
        </p>
        <Bouton type="submit" disabled={envoiEnCours}>
          {envoiEnCours && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-noir/30 border-t-noir" />
          )}
          {envoiEnCours ? "Envoi en cours…" : "Envoyer le message"}
        </Bouton>
      </div>

      <div aria-live="polite">
        {/* Message de résultat : affiché immédiatement, avec une courte apparition en CSS */}
        {etat.statut !== "initial" && (
          <p
            key={`${etat.statut}-${etat.horodatage}`}
            className={`apparition-message rounded-xl border px-5 py-4 text-sm ${
              etat.statut === "succes"
                ? "border-or/40 bg-or/10 text-or-clair"
                : "border-red-400/40 bg-red-400/10 text-red-300"
            }`}
          >
            {etat.message}
          </p>
        )}
      </div>
    </form>
  );
}
