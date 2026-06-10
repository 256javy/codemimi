// Tipos compartidos de CodeMimi. Este archivo es el contrato central del que
// dependen el currículo, el store, el motor de validación y la UI.

/** Reglas de validación basadas en el OUTPUT del código del niño (no en el texto
 *  literal). Son datos serializables para que el currículo se escriba como data. */
export type ValidationRule =
  | {
      type: "elementExists";
      /** Selector CSS evaluado sobre el HTML escrito por el niño. */
      selector: string;
      message: string;
    }
  | {
      type: "elementCount";
      selector: string;
      min?: number;
      max?: number;
      exact?: number;
      message: string;
    }
  | {
      type: "textContains";
      selector: string;
      /** Texto que debe contener el elemento (case-insensitive). Si se omite,
       *  solo se exige que el texto no esté vacío. */
      text?: string;
      message: string;
    }
  | {
      type: "attribute";
      selector: string;
      attr: string;
      /** Valor exacto esperado. Si se omite, basta con que el atributo exista. */
      equals?: string;
      message: string;
    }
  | {
      type: "htmlMatches";
      /** Expresión regular (string) evaluada sobre el HTML crudo. */
      pattern: string;
      flags?: string;
      message: string;
    }
  | {
      type: "cssMatches";
      /** Expresión regular (string) evaluada sobre el CSS crudo. */
      pattern: string;
      flags?: string;
      message: string;
    }
  | {
      type: "computedStyle";
      /** Selector evaluado sobre el documento renderizado. */
      selector: string;
      property: string;
      /** Substring que debe contener el valor computado de la propiedad. */
      contains: string;
      message: string;
    };

export interface ValidationResult {
  passed: boolean;
  /** Mensajes de las reglas que aún no se cumplen, en español amigable. */
  errors: string[];
}

/** Un paso de tipo narrativo dicho por el personaje. */
export interface NarrativeScreen {
  /** Frases cortas (máx 3-4) que dice el personaje. */
  lines: string[];
}

/** Comparación visual "sin" vs "con" el concepto (paso 2 del PRD). */
export interface DemoStep {
  beforeLabel: string;
  beforeHtml: string;
  afterLabel: string;
  afterHtml: string;
  /** CSS opcional compartido para ambos previews. */
  css?: string;
}

/** Anotación emergente sobre una parte del código de referencia. */
export interface CodeAnnotation {
  /** Fragmento de texto del snippet a resaltar. */
  fragment: string;
  /** Explicación que aparece al pasar el cursor. */
  tip: string;
}

export interface ReferenceStep {
  language: "html" | "css";
  code: string;
  annotations?: CodeAnnotation[];
}

/** El reto donde el niño escribe código. */
export interface ChallengeStep {
  /** Instrucción de la tarea, ej: "Escribe un <h1> con tu nombre". */
  instruction: string;
  /** Indica si el editor de CSS está disponible en esta lección. */
  cssEnabled: boolean;
  /** Código HTML inicial precargado en el editor. */
  startingHtml: string;
  /** Código CSS inicial (si cssEnabled). */
  startingCss?: string;
  /** Reglas que validan el output. Todas deben cumplirse para pasar. */
  rules: ValidationRule[];
  /** Pistas textuales progresivas (no muestran la solución). */
  hints: string[];
}

export type LessonLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Una aventura/lección completa con sus 5 pasos. */
export interface Lesson {
  /** Número global de aventura (1..50). */
  id: number;
  level: LessonLevel;
  title: string;
  /** Concepto resumido para la tarjeta del mapa. */
  concept: string;
  /** Personaje narrador de esta aventura. */
  character: CharacterId;
  narrative: NarrativeScreen[];
  demo: DemoStep;
  reference: ReferenceStep;
  challenge: ChallengeStep;
  /** Mensaje de celebración del paso 5. */
  celebration: string;
  /** Insignia que se desbloquea al completar (opcional). */
  badge?: BadgeId;
}

export type CharacterId = "byte" | "pixel" | "luna" | "max";

export interface Character {
  id: CharacterId;
  name: string;
  emoji: string;
  /** Color de acento (clase/valor). */
  color: string;
  personality: string;
}

export type BadgeId =
  | "primer-codigo"
  | "maestro-html"
  | "artista-css"
  | "constructor"
  | "disenador"
  | "responsive-hero"
  | "explorador"
  | "creador";

export interface Badge {
  id: BadgeId;
  name: string;
  emoji: string;
  description: string;
}

export type AvatarId =
  | "robot"
  | "alien"
  | "gato"
  | "dragon"
  | "astronauta"
  | "unicornio"
  | "pulpo"
  | "zorro";

export interface Avatar {
  id: AvatarId;
  name: string;
  emoji: string;
}

/** Proyecto libre creado por el niño en el sandbox. */
export interface Project {
  id: string;
  name: string;
  html: string;
  css: string;
  createdAt: number;
  updatedAt: number;
}

/** Progreso de una aventura. */
export interface LessonProgress {
  lessonId: number;
  completed: boolean;
  completedAt?: number;
}

/** Todo el estado persistente del estudiante. Esto es lo que se exporta/importa. */
export interface StudentData {
  /** Versión del esquema para migraciones futuras de export/import. */
  schemaVersion: number;
  username: string;
  avatar: AvatarId;
  lessons: Record<number, LessonProgress>;
  badges: BadgeId[];
  projects: Project[];
  /** Días con actividad (YYYY-MM-DD) para la racha. */
  activeDays: string[];
  createdAt: number;
}

export const SCHEMA_VERSION = 1;
