"use client";

// Visuel décoratif du haut de l'accueil : composition géométrique dorée animée.
// Purement décoratif (aria-hidden) : il ne contient aucune information importante.

import { motion } from "framer-motion";

const OR = "#D4AF37";
const easeLuxe = [0.22, 1, 0.36, 1] as const;

const etiquettes = [
  { texte: "Sites web", classe: "left-[2%] top-[18%]", delai: 1.1 },
  { texte: "Applications", classe: "right-[0%] top-[30%]", delai: 1.3 },
  { texte: "Logiciels", classe: "left-[6%] bottom-[18%]", delai: 1.5 },
  { texte: "Contenus & identité", classe: "right-[4%] bottom-[8%]", delai: 1.7 },
];

export default function HeroVisuel({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none relative aspect-square select-none ${className ?? ""}`}>
      <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <radialGradient id="hero-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={OR} stopOpacity="0.35" />
            <stop offset="60%" stopColor={OR} stopOpacity="0.05" />
            <stop offset="100%" stopColor={OR} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-gemme" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F3DC8B" />
            <stop offset="50%" stopColor={OR} />
            <stop offset="100%" stopColor="#8E6F1E" />
          </linearGradient>
        </defs>

        {/* Halo lumineux */}
        <motion.circle
          cx="250"
          cy="250"
          r="230"
          fill="url(#hero-halo)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: easeLuxe }}
          style={{ transformOrigin: "250px 250px" }}
        />

        {/* Cercles qui se dessinent */}
        {[210, 160, 110].map((r, i) => (
          <motion.circle
            key={r}
            cx="250"
            cy="250"
            r={r}
            fill="none"
            stroke={OR}
            strokeOpacity={0.55 - i * 0.1}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.2 + i * 0.2, ease: easeLuxe }}
          />
        ))}

        {/* Anneau en pointillés qui tourne lentement */}
        <g className="hero-rotation" style={{ transformOrigin: "250px 250px" }}>
          <circle cx="250" cy="250" r="185" fill="none" stroke={OR} strokeOpacity="0.35" strokeDasharray="2 10" />
          <circle cx="435" cy="250" r="5" fill={OR} />
          <circle cx="65" cy="250" r="3" fill="#FFFFFF" fillOpacity="0.7" />
        </g>
        <g className="hero-rotation-inverse" style={{ transformOrigin: "250px 250px" }}>
          <circle cx="250" cy="115" r="4" fill={OR} fillOpacity="0.8" />
          <circle cx="250" cy="385" r="2.5" fill="#FFFFFF" fillOpacity="0.5" />
        </g>

        {/* Lignes de construction */}
        {[0, 45, 90, 135].map((angle, i) => (
          <motion.line
            key={angle}
            x1="250"
            y1="30"
            x2="250"
            y2="470"
            stroke={OR}
            strokeOpacity="0.12"
            transform={`rotate(${angle} 250 250)`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.6 + i * 0.1, ease: easeLuxe }}
          />
        ))}

        {/* Gemme centrale : symbole d'excellence */}
        <motion.g
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: easeLuxe }}
          style={{ transformOrigin: "250px 250px" }}
        >
          <path d="M250 175 L315 230 L250 330 L185 230 Z" fill="url(#hero-gemme)" />
          <path d="M185 230 L315 230 M250 175 L222 230 L250 330 L278 230 Z" fill="none" stroke="#080808" strokeOpacity="0.35" strokeWidth="1.2" />
          <path d="M250 175 L315 230 L250 330 L185 230 Z" fill="none" stroke="#F3DC8B" strokeOpacity="0.8" strokeWidth="1" />
        </motion.g>
      </svg>

      {/* Étiquettes flottantes (ordinateur uniquement) */}
      {etiquettes.map((e, i) => (
        <motion.span
          key={e.texte}
          className={`absolute hidden items-center whitespace-nowrap rounded-full border border-or/30 bg-noir/70 px-4 py-2 text-xs font-medium tracking-wide text-blanc/85 backdrop-blur-md lg:inline-flex ${e.classe}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.8, delay: e.delai },
            y: { duration: 5 + i, delay: e.delai, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-or" />
          {e.texte}
        </motion.span>
      ))}
    </div>
  );
}
