import type { NextConfig } from "next";

// En-têtes de sécurité envoyés avec chaque page du site
const enTetesSecurite = [
  // Empêche d'afficher le site dans un cadre sur un autre site (protection anti-arnaque)
  { key: "X-Frame-Options", value: "DENY" },
  // Empêche le navigateur de "deviner" le type d'un fichier
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limite les informations transmises aux autres sites quand on clique sur un lien
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Le site n'utilise ni caméra, ni micro, ni géolocalisation
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Ne pas annoncer publiquement la technologie utilisée
  poweredByHeader: false,
  headers() {
    return [{ source: "/:path*", headers: enTetesSecurite }];
  },
  // L'ancienne adresse de la politique de confidentialité redirige vers la nouvelle
  // (redirection permanente 308 : les anciens liens et Google suivent automatiquement)
  redirects() {
    return [{ source: "/confidentialite", destination: "/politique-de-confidentialite", permanent: true }];
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
