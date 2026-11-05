import { statuts, type StatutProjet } from "@/lib/site";

// Petite étiquette qui indique où en est un projet.
const styles: Record<StatutProjet, { badge: string; point: string }> = {
  developpement: { badge: "border-or/60 bg-noir/80 text-or", point: "bg-or animate-pulse" },
  prototype: { badge: "border-blanc/40 bg-noir/80 text-blanc", point: "bg-blanc" },
  concept: { badge: "border-blanc/20 bg-noir/80 text-blanc/75", point: "border border-blanc/60" },
  livre: { badge: "border-or bg-or text-noir", point: "bg-noir" },
};

export default function BadgeStatut({ statut, className }: { statut: StatutProjet; className?: string }) {
  const s = styles[statut];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] backdrop-blur-sm ${s.badge} ${className ?? ""}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${s.point}`} />
      {statuts[statut]}
    </span>
  );
}
