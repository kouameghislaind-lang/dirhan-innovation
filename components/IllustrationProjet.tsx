// Illustrations originales des projets (dessinées en SVG, aux couleurs du site).
// Elles ne représentent pas des écrans réels : ce sont des illustrations de concept.

type Props = {
  type: "boutique" | "flotte" | "restaurant";
  className?: string;
  // Remplit tout le cadre (quitte à rogner les bords) au lieu de laisser des bandes vides
  remplir?: boolean;
};

const OR = "#D4AF37";
const OR_CLAIR = "#E8C95F";
const BLANC = "#FFFFFF";

function Fenetre({ children }: { children: React.ReactNode }) {
  return (
    <g>
      <rect x="40" y="28" width="320" height="196" rx="14" fill="#0e0e0e" stroke={OR} strokeOpacity="0.45" />
      <line x1="40" y1="52" x2="360" y2="52" stroke={OR} strokeOpacity="0.25" />
      <circle cx="58" cy="40" r="3.5" fill={OR} fillOpacity="0.8" />
      <circle cx="70" cy="40" r="3.5" fill={BLANC} fillOpacity="0.25" />
      <circle cx="82" cy="40" r="3.5" fill={BLANC} fillOpacity="0.25" />
      {children}
    </g>
  );
}

function Boutique() {
  const produits = [
    { x: 60, forme: "haut" },
    { x: 160, forme: "sac" },
    { x: 260, forme: "chaussure" },
  ];
  return (
    <Fenetre>
      {/* Barre de recherche + panier */}
      <rect x="60" y="64" width="190" height="14" rx="7" fill={BLANC} fillOpacity="0.06" />
      <path d="M318 62h18l-3 16h-12z" fill="none" stroke={OR} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M322 62a5 5 0 0 1 10 0" fill="none" stroke={OR} strokeWidth="1.6" />
      <circle cx="338" cy="61" r="5" fill={OR} />
      {produits.map((p) => (
        <g key={p.x} className="illus-element">
          <rect x={p.x} y="90" width="80" height="96" rx="8" fill={BLANC} fillOpacity="0.04" stroke={OR} strokeOpacity="0.3" />
          {p.forme === "haut" && (
            <path d="M84 108l10-6h12l10 6 6 12-9 4v24h-26v-24l-9-4z" fill="none" stroke={OR} strokeWidth="1.6" strokeLinejoin="round" />
          )}
          {p.forme === "sac" && (
            <g fill="none" stroke={OR} strokeWidth="1.6" strokeLinejoin="round">
              <rect x="180" y="118" width="40" height="32" rx="4" />
              <path d="M190 118v-6a10 10 0 0 1 20 0v6" />
            </g>
          )}
          {p.forme === "chaussure" && (
            <path d="M276 142v-20h14l6 10 20 6a6 6 0 0 1 4 6v4h-44z" fill="none" stroke={OR} strokeWidth="1.6" strokeLinejoin="round" />
          )}
          <rect x={p.x + 10} y="162" width="40" height="5" rx="2.5" fill={BLANC} fillOpacity="0.5" />
          <rect x={p.x + 10} y="172" width="24" height="5" rx="2.5" fill={OR} fillOpacity="0.8" />
        </g>
      ))}
      <rect x="60" y="196" width="88" height="16" rx="8" fill={OR} />
      <rect x="156" y="196" width="60" height="16" rx="8" fill="none" stroke={BLANC} strokeOpacity="0.3" />
    </Fenetre>
  );
}

function Flotte() {
  const barres = [40, 62, 50, 78, 66, 90];
  return (
    <Fenetre>
      {/* Carte avec trajet */}
      <rect x="56" y="64" width="150" height="100" rx="8" fill={BLANC} fillOpacity="0.03" stroke={OR} strokeOpacity="0.25" />
      <path
        d="M70 148c20-10 24-40 46-44s26 22 44 14 18-30 34-36"
        fill="none"
        stroke={OR}
        strokeWidth="1.6"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />
      <circle cx="70" cy="148" r="4" fill={BLANC} />
      <circle cx="194" cy="82" r="6" fill={OR} className="illus-pulse" />
      {/* Véhicule */}
      <g fill="none" stroke={OR} strokeWidth="1.6" strokeLinejoin="round">
        <path d="M100 116h40l8 10h8v12h-64v-12l8-10z" fill="#0e0e0e" />
        <circle cx="110" cy="139" r="5" fill="#0e0e0e" />
        <circle cx="146" cy="139" r="5" fill="#0e0e0e" />
      </g>
      {/* Indicateurs */}
      <g>
        <rect x="218" y="64" width="126" height="44" rx="8" fill={BLANC} fillOpacity="0.03" stroke={OR} strokeOpacity="0.25" />
        <circle cx="240" cy="86" r="12" fill="none" stroke={BLANC} strokeOpacity="0.15" strokeWidth="4" />
        <path d="M240 74a12 12 0 1 1-11.4 15.7" fill="none" stroke={OR} strokeWidth="4" strokeLinecap="round" />
        <rect x="262" y="78" width="60" height="5" rx="2.5" fill={BLANC} fillOpacity="0.5" />
        <rect x="262" y="89" width="38" height="5" rx="2.5" fill={OR} fillOpacity="0.8" />
      </g>
      {/* Alerte */}
      <g>
        <rect x="218" y="116" width="126" height="48" rx="8" fill={OR} fillOpacity="0.08" stroke={OR} strokeOpacity="0.45" />
        <path d="M236 150h16M238 150v-10a6 6 0 0 1 12 0v10" fill="none" stroke={OR_CLAIR} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="244" cy="154" r="2" fill={OR_CLAIR} />
        <rect x="262" y="132" width="62" height="5" rx="2.5" fill={BLANC} fillOpacity="0.55" />
        <rect x="262" y="143" width="44" height="5" rx="2.5" fill={BLANC} fillOpacity="0.25" />
      </g>
      {/* Graphique de maintenance */}
      {barres.map((h, i) => (
        <rect
          key={i}
          x={64 + i * 20}
          y={212 - h / 2.6}
          width="10"
          height={h / 2.6}
          rx="2"
          fill={i === 5 ? OR : BLANC}
          fillOpacity={i === 5 ? 1 : 0.2}
          className="illus-element"
        />
      ))}
      <rect x="218" y="176" width="126" height="36" rx="8" fill={BLANC} fillOpacity="0.03" stroke={OR} strokeOpacity="0.25" />
      <path d="M228 202l18-10 16 6 18-14 18 8 22-10" fill="none" stroke={OR} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </Fenetre>
  );
}

function Restaurant() {
  return (
    <Fenetre>
      {/* Cloche de service */}
      <g className="illus-element" fill="none" stroke={OR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 172a60 60 0 0 1 120 0" fill={OR} fillOpacity="0.06" />
        <line x1="66" y1="176" x2="214" y2="176" />
        <circle cx="140" cy="106" r="5" />
        <path d="M108 140a36 36 0 0 1 18-20" stroke={OR_CLAIR} strokeOpacity="0.7" />
      </g>
      <rect x="86" y="190" width="108" height="6" rx="3" fill={BLANC} fillOpacity="0.15" />
      {/* Couverts */}
      <g fill="none" stroke={BLANC} strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round">
        <path d="M60 78v28M54 78v12a6 6 0 0 0 12 0V78" />
        <path d="M220 78c-8 6-8 22 0 28v18" />
      </g>
      {/* Carte / commande */}
      <g>
        <rect x="236" y="66" width="108" height="146" rx="10" fill={BLANC} fillOpacity="0.03" stroke={OR} strokeOpacity="0.35" />
        <rect x="250" y="80" width="56" height="7" rx="3.5" fill={OR} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} className="illus-element">
            <rect x="250" y={102 + i * 22} width="54" height="5" rx="2.5" fill={BLANC} fillOpacity="0.5" />
            <rect x="314" y={102 + i * 22} width="18" height="5" rx="2.5" fill={OR} fillOpacity="0.7" />
            <rect x="250" y={111 + i * 22} width="34" height="4" rx="2" fill={BLANC} fillOpacity="0.18" />
          </g>
        ))}
        <rect x="250" y="192" width="80" height="12" rx="6" fill={OR} />
      </g>
    </Fenetre>
  );
}

export default function IllustrationProjet({ type, className, remplir }: Props) {
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio={remplir ? "xMidYMid slice" : "xMidYMid meet"}
      role="img"
      aria-label={`Illustration de concept : ${
        type === "boutique" ? "boutique en ligne" : type === "flotte" ? "tableau de bord de flotte automobile" : "solution pour restaurant"
      }`}
      className={className}
    >
      <defs>
        <radialGradient id={`halo-${type}`} cx="30%" cy="20%" r="80%">
          <stop offset="0%" stopColor={OR} stopOpacity="0.22" />
          <stop offset="70%" stopColor={OR} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill="#121212" />
      <rect width="400" height="250" fill={`url(#halo-${type})`} />
      {type === "boutique" && <Boutique />}
      {type === "flotte" && <Flotte />}
      {type === "restaurant" && <Restaurant />}
    </svg>
  );
}
