// Fuente única de verdad para metadatos de SEO. Lo consumen el layout,
// el sitemap, el robots, el manifest, las imágenes Open Graph y los JSON-LD.

export const SITE = {
  name: "CodeMimi",
  /** URL canónica de producción (sin barra final). */
  url: "https://codemimi.rekova.com.py",
  title: "CodeMimi — Aprende HTML, CSS y JavaScript jugando",
  /** Plantilla para títulos de páginas internas. */
  titleTemplate: "%s · CodeMimi",
  description:
    "Plataforma gratuita para que niños desde los 8 años aprendan a escribir HTML, CSS y JavaScript de verdad, con aventuras narrativas y un editor de código con vista en vivo. Sin cuentas, sin anuncios, sin rastreo.",
  locale: "es_PY",
  themeColor: "#7c3aed",
  /** Organización detrás del proyecto. */
  publisher: "Rekova",
  /** Handle de X/Twitter (para twitter:site / twitter:creator). */
  twitterHandle: "@rekovaoficial",
  /** Perfiles oficiales — alimentan sameAs del JSON-LD. */
  social: [
    "https://www.instagram.com/rekovaoficial",
    "https://www.facebook.com/rekovaoficial",
    "https://x.com/rekovaoficial",
    "https://www.tiktok.com/@rekovaoficial",
    "https://www.linkedin.com/company/rekova",
  ],
  keywords: [
    "aprender HTML para niños",
    "CSS para niños",
    "JavaScript para niños",
    "programación para niños",
    "aprender a programar gratis",
    "código para niños en español",
    "curso de HTML gratis",
    "editor de código para niños",
    "enseñar a programar a niños",
    "aventuras de programación",
    "CodeMimi",
  ],
} as const;

/** Une un path con la URL del sitio (acepta "/" o rutas con barra inicial). */
export function absoluteUrl(path = "/"): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE.url}${path === "/" ? "" : path}`;
}
