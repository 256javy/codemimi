import type { MetadataRoute } from "next";
import { ALL_LESSONS } from "@/lib/curriculum";
import { absoluteUrl } from "@/lib/seo";

// Sitemap generado a partir del currículo. Incluye las páginas públicas y una
// entrada por cada aventura disponible. Se excluyen perfil y progreso (datos
// del estudiante, no indexables) y los proyectos (viven solo en el navegador).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/aventuras"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/proyectos"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const lessonRoutes: MetadataRoute.Sitemap = ALL_LESSONS.map((lesson) => ({
    url: absoluteUrl(`/aventuras/${lesson.id}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...lessonRoutes];
}
