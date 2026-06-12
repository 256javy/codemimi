// Agregador del currículo. Contrato estable que consumen el mapa de aventuras
// y el runner de lecciones. Cada nivel vive en su propio archivo.

import type { Lesson, LessonLevel } from "../types";
import { LEVEL_1 } from "./level1";
import { LEVEL_2 } from "./level2";
import { LEVEL_3 } from "./level3";
import { LEVEL_4 } from "./level4";

export interface LevelMeta {
  level: LessonLevel;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  /** Temas planificados que aún no tienen contenido (se muestran como "Muy pronto"). */
  upcoming?: string[];
}

export const LEVELS: LevelMeta[] = [
  {
    level: 1,
    title: "Fundamentos de HTML",
    subtitle: "Las piezas básicas de toda página web",
    emoji: "🏗️",
    color: "var(--color-cielo)",
  },
  {
    level: 2,
    title: "Introducción a CSS",
    subtitle: "Dale color y estilo a tus páginas",
    emoji: "🎨",
    color: "var(--color-uva)",
  },
  {
    level: 3,
    title: "HTML intermedio",
    subtitle: "Tablas, formularios y etiquetas semánticas",
    emoji: "🧱",
    color: "var(--color-menta)",
  },
  {
    level: 4,
    title: "CSS intermedio",
    subtitle: "Flexbox, posiciones y efectos",
    emoji: "✨",
    color: "var(--color-coral)",
  },
  {
    level: 5,
    title: "Diseño responsive",
    subtitle: "Páginas que se ven bien en cualquier pantalla",
    emoji: "📱",
    color: "var(--color-sol)",
  },
  {
    level: 6,
    title: "JavaScript básico",
    subtitle: "Haz que tus páginas cobren vida y respondan",
    emoji: "🧠",
    color: "#eab308",
    upcoming: [
      "Variables y tipos de datos",
      "Seleccionar elementos del DOM",
      "Eventos: clic y escritura",
      "Condicionales y bucles",
      "Funciones",
      "Cambiar la página con código",
      "Proyectos interactivos",
    ],
  },
];

/** Todas las aventuras disponibles, ordenadas por id. */
export const ALL_LESSONS: Lesson[] = [...LEVEL_1, ...LEVEL_2, ...LEVEL_3, ...LEVEL_4].sort((a, b) => a.id - b.id);

export function getLesson(id: number): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getLevelLessons(level: LessonLevel): Lesson[] {
  return ALL_LESSONS.filter((l) => l.level === level);
}

export function getLevelMeta(level: LessonLevel): LevelMeta | undefined {
  return LEVELS.find((l) => l.level === level);
}

/** Siguiente aventura disponible después de la dada (o la primera). */
export function getNextLessonId(id: number): number | undefined {
  const idx = ALL_LESSONS.findIndex((l) => l.id === id);
  if (idx === -1 || idx + 1 >= ALL_LESSONS.length) return undefined;
  return ALL_LESSONS[idx + 1].id;
}
