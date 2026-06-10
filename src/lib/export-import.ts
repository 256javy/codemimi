// Exportar e importar los datos del niño como archivo JSON, para continuar en
// otra computadora sin necesidad de cuenta ni base de datos.

import type { StudentData } from "./types";
import { SCHEMA_VERSION } from "./types";

/** Dispara la descarga de un archivo .json con todos los datos del estudiante. */
export function exportStudentData(data: StudentData): void {
  const payload = { ...data, schemaVersion: data.schemaVersion ?? SCHEMA_VERSION };
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const safeName = (data.username || "estudiante")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const stamp = new Date().toISOString().slice(0, 10);

  const a = document.createElement("a");
  a.href = url;
  a.download = `codekids-${safeName || "estudiante"}-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export interface ImportResult {
  ok: boolean;
  data?: StudentData;
  error?: string;
}

/** Valida y normaliza datos importados desde un string JSON. */
export function parseStudentData(raw: string): ImportResult {
  let obj: unknown;
  try {
    obj = JSON.parse(raw);
  } catch {
    return { ok: false, error: "El archivo no es un JSON válido." };
  }

  if (typeof obj !== "object" || obj === null) {
    return { ok: false, error: "El archivo no tiene el formato esperado." };
  }

  const o = obj as Record<string, unknown>;
  // Verificación mínima de que parece un archivo de CodeKids.
  const looksValid =
    "lessons" in o || "badges" in o || "projects" in o || "username" in o;
  if (!looksValid) {
    return { ok: false, error: "Este archivo no parece ser de CodeKids." };
  }

  const data: StudentData = {
    schemaVersion: typeof o.schemaVersion === "number" ? o.schemaVersion : SCHEMA_VERSION,
    username: typeof o.username === "string" ? o.username : "",
    avatar: (typeof o.avatar === "string" ? o.avatar : "robot") as StudentData["avatar"],
    lessons: (o.lessons && typeof o.lessons === "object"
      ? (o.lessons as StudentData["lessons"])
      : {}),
    badges: Array.isArray(o.badges) ? (o.badges as StudentData["badges"]) : [],
    projects: Array.isArray(o.projects) ? (o.projects as StudentData["projects"]) : [],
    activeDays: Array.isArray(o.activeDays) ? (o.activeDays as string[]) : [],
    createdAt: typeof o.createdAt === "number" ? o.createdAt : Date.now(),
  };

  return { ok: true, data };
}

/** Lee un File (del input) y devuelve los datos parseados. */
export async function importStudentFile(file: File): Promise<ImportResult> {
  try {
    const text = await file.text();
    return parseStudentData(text);
  } catch {
    return { ok: false, error: "No se pudo leer el archivo." };
  }
}
