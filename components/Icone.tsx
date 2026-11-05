import type { IconeNom } from "@/lib/site";

// Petites icônes au trait doré, dessinées pour le site (aucune bibliothèque externe).
const chemins: Record<IconeNom, React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="15" rx="2" />
      <path d="M3 8.5h18M6 6.3h.01M8.5 6.3h.01" />
      <path d="M9.5 12l-2 2 2 2M14.5 12l2 2-2 2" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
      <path d="M9.5 7.5h5M9.5 10.5h5M9.5 13.5h3" />
    </>
  ),
  logiciel: (
    <>
      <rect x="3" y="3.5" width="18" height="17" rx="2" />
      <path d="M3 8h18M8 8v12.5" />
      <path d="M11 12h6M11 15.5h4" />
    </>
  ),
  contenu: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9.5v5l4.5-2.5z" />
    </>
  ),
  identite: (
    <>
      <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />
    </>
  ),
  innovation: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
    </>
  ),
  creativite: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  accompagnement: (
    <>
      <circle cx="8.5" cy="8" r="3" />
      <circle cx="16" cy="9.5" r="2.5" />
      <path d="M3 19c0-3 2.5-5.5 5.5-5.5S14 16 14 19M14.5 14.2c.5-.2 1-.2 1.5-.2 2.8 0 5 2.2 5 5" />
    </>
  ),
  qualite: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" />
      <path d="M8.8 12.2l2.2 2.2 4.4-4.6" />
    </>
  ),
};

export default function Icone({ nom, className }: { nom: IconeNom; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {chemins[nom]}
    </svg>
  );
}
