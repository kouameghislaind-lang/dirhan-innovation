// Limite d'envois du formulaire de contact (protection contre les abus et le spam).
//
// Fonctionnement : on mémorise l'heure des derniers envois, par visiteur (adresse IP)
// et pour l'ensemble du site. Au-delà des plafonds, l'envoi est refusé poliment.
//
// Limite connue : sur Vercel, cette mémoire est propre à chaque serveur et repart à zéro
// quand il redémarre. C'est une protection simple et gratuite, efficace contre les abus
// basiques. Pour une protection totale, il faudra un stockage partagé (ex. : Upstash Redis).
//
// Ce fichier n'est utilisé que côté serveur (par app/contact/actions.ts).

const UNE_HEURE = 60 * 60 * 1000;

// Plafonds
export const LIMITE_PAR_VISITEUR = 5; // messages par heure et par visiteur
export const LIMITE_GLOBALE = 40; // messages par heure pour tout le site (protège le quota Resend)

const envoisParVisiteur = new Map<string, number[]>();
let envoisGlobaux: number[] = [];

function recents(horodatages: number[], maintenant: number) {
  return horodatages.filter((t) => maintenant - t < UNE_HEURE);
}

/**
 * Vérifie si ce visiteur peut envoyer un message maintenant.
 * Si oui, l'envoi est comptabilisé. Renvoie true (autorisé) ou false (refusé).
 */
export function autoriserEnvoi(visiteur: string, maintenant = Date.now()): boolean {
  envoisGlobaux = recents(envoisGlobaux, maintenant);
  const siens = recents(envoisParVisiteur.get(visiteur) ?? [], maintenant);

  if (siens.length >= LIMITE_PAR_VISITEUR || envoisGlobaux.length >= LIMITE_GLOBALE) {
    envoisParVisiteur.set(visiteur, siens);
    return false;
  }

  siens.push(maintenant);
  envoisParVisiteur.set(visiteur, siens);
  envoisGlobaux.push(maintenant);

  // Ménage : on oublie les visiteurs sans envoi récent, pour ne pas encombrer la mémoire
  if (envoisParVisiteur.size > 1000) {
    for (const [cle, valeurs] of envoisParVisiteur) {
      if (recents(valeurs, maintenant).length === 0) envoisParVisiteur.delete(cle);
    }
  }
  return true;
}

/** Identifie le visiteur à partir des en-têtes transmis par Vercel. */
export function identifierVisiteur(enTetes: Headers): string {
  const transmis = enTetes.get("x-forwarded-for");
  return (transmis?.split(",")[0].trim() || enTetes.get("x-real-ip") || "inconnu").slice(0, 64);
}
