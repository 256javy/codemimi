// Store global del estudiante con persistencia en localStorage (Zustand).
// Usa skipHydration para evitar mismatch de hidratación en el App Router de
// Next.js: la rehidratación se dispara manualmente desde <StoreHydration/>.

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AvatarId, BadgeId, Project, StudentData } from "./types";
import { SCHEMA_VERSION } from "./types";

const STORAGE_KEY = "codekids-student";

function todayKey(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function newId(): string {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export interface StudentState extends StudentData {
  hydrated: boolean;
  // --- acciones ---
  setUsername: (name: string) => void;
  setAvatar: (avatar: AvatarId) => void;
  completeLesson: (lessonId: number, badge?: BadgeId) => void;
  awardBadge: (badge: BadgeId) => void;
  createProject: (name: string, html?: string, css?: string) => Project;
  updateProject: (id: string, patch: Partial<Pick<Project, "name" | "html" | "css">>) => void;
  deleteProject: (id: string) => void;
  markActiveToday: () => void;
  /** Reemplaza por completo los datos (usado al importar). */
  replaceAll: (data: StudentData) => void;
  /** Reinicia a un estado vacío. */
  reset: () => void;
}

export function emptyStudent(): StudentData {
  return {
    schemaVersion: SCHEMA_VERSION,
    username: "",
    avatar: "robot",
    lessons: {},
    badges: [],
    projects: [],
    activeDays: [],
    createdAt: Date.now(),
  };
}

export const useStudentStore = create<StudentState>()(
  persist(
    (set, get) => ({
      ...emptyStudent(),
      hydrated: false,

      setUsername: (name) => set({ username: name }),
      setAvatar: (avatar) => set({ avatar }),

      completeLesson: (lessonId, badge) => {
        const lessons = { ...get().lessons };
        lessons[lessonId] = {
          lessonId,
          completed: true,
          completedAt: Date.now(),
        };
        set({ lessons });
        get().markActiveToday();

        const badges = new Set(get().badges);
        if (badge) badges.add(badge);
        // Insignia automática por explorar 5 aventuras.
        const completedCount = Object.values(lessons).filter((l) => l.completed).length;
        if (completedCount >= 5) badges.add("explorador");
        if (completedCount >= 1) badges.add("primer-codigo");
        set({ badges: Array.from(badges) });
      },

      awardBadge: (badge) => {
        const badges = new Set(get().badges);
        badges.add(badge);
        set({ badges: Array.from(badges) });
      },

      createProject: (name, html = "", css = "") => {
        const now = Date.now();
        const project: Project = {
          id: newId(),
          name: name.trim() || "Mi proyecto",
          html,
          css,
          createdAt: now,
          updatedAt: now,
        };
        set({ projects: [project, ...get().projects] });
        get().awardBadge("creador");
        get().markActiveToday();
        return project;
      },

      updateProject: (id, patch) => {
        set({
          projects: get().projects.map((p) =>
            p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p,
          ),
        });
        get().markActiveToday();
      },

      deleteProject: (id) => {
        set({ projects: get().projects.filter((p) => p.id !== id) });
      },

      markActiveToday: () => {
        const key = todayKey();
        if (!get().activeDays.includes(key)) {
          set({ activeDays: [...get().activeDays, key] });
        }
      },

      replaceAll: (data) => {
        set({
          schemaVersion: data.schemaVersion ?? SCHEMA_VERSION,
          username: data.username ?? "",
          avatar: data.avatar ?? "robot",
          lessons: data.lessons ?? {},
          badges: data.badges ?? [],
          projects: data.projects ?? [],
          activeDays: data.activeDays ?? [],
          createdAt: data.createdAt ?? Date.now(),
        });
      },

      reset: () => set({ ...emptyStudent() }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      // Solo persistimos los datos del estudiante, no las acciones ni hydrated.
      partialize: (state): StudentData => ({
        schemaVersion: state.schemaVersion,
        username: state.username,
        avatar: state.avatar,
        lessons: state.lessons,
        badges: state.badges,
        projects: state.projects,
        activeDays: state.activeDays,
        createdAt: state.createdAt,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markActiveToday();
      },
    },
  ),
);

/** Calcula la racha de días consecutivos terminando hoy o ayer. */
export function computeStreak(activeDays: string[]): number {
  if (activeDays.length === 0) return 0;
  const set = new Set(activeDays);
  let streak = 0;
  const cursor = new Date();
  // Permite que la racha siga viva si hoy aún no hay actividad pero ayer sí.
  if (!set.has(formatDay(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (set.has(formatDay(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function formatDay(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}
