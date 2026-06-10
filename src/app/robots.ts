import type { MetadataRoute } from "next";
import { absoluteUrl, SITE } from "@/lib/seo";

// Las páginas de perfil y progreso muestran datos personales del estudiante
// (guardados en su navegador): no aportan a la búsqueda y no deben indexarse.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/perfil", "/progreso"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
