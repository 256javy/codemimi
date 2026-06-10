import type { Metadata } from "next";
import { ALL_LESSONS, getLesson } from "@/lib/curriculum";
import { SITE } from "@/lib/seo";
import AventuraClient from "./AventuraClient";

// Prerenderiza una ruta por cada aventura: cada una queda como página estática
// con su propio título y descripción para los buscadores.
export function generateStaticParams() {
  return ALL_LESSONS.map((lesson) => ({ id: String(lesson.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const lesson = getLesson(Number(id));

  if (!lesson) {
    return {
      title: "Aventura no encontrada",
      robots: { index: false, follow: true },
    };
  }

  const title = `Aventura ${lesson.id}: ${lesson.title}`;
  const url = `/aventuras/${lesson.id}`;

  return {
    title,
    description: lesson.concept,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE.name,
      title,
      description: lesson.concept,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: lesson.concept,
    },
  };
}

export default async function AventuraPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AventuraClient id={id} />;
}
