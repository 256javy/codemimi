"use client";

import { useMemo } from "react";
import Link from "next/link";
import { LEVELS, getUnlockedLessons } from "@/lib/curriculum";
import { useStudentStore } from "@/lib/store";
import ConceptCard from "@/components/lesson/ConceptCard";

export default function RepasoClient() {
  const lessons = useStudentStore((s) => s.lessons);
  const hydrated = useStudentStore((s) => s.hydrated);

  // El progreso solo es fiable tras la hidratación; antes, tratamos todo como
  // no completado (solo se mostrarán las primeras aventuras de cada nivel).
  const isCompleted = useMemo(
    () => (id: number) => Boolean(hydrated && lessons[id]?.completed),
    [hydrated, lessons],
  );

  const unlocked = useMemo(() => getUnlockedLessons(isCompleted), [isCompleted]);
  const completedCount = unlocked.filter((l) => isCompleted(l.id)).length;

  if (!hydrated) {
    return (
      <div className="py-20 text-center text-tinta/50">
        <div className="text-4xl">📖</div>
        <p className="mt-3 font-display text-lg">Cargando…</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-tinta sm:text-4xl">📖 Repaso</h1>
        <p className="mx-auto max-w-prose text-tinta/70">
          Todos los conceptos que has desbloqueado, juntos en un solo lugar. Repásalos
          cuando quieras, sin tener que buscar entre las aventuras.
        </p>
        <p className="text-sm font-semibold text-uva">
          Has desbloqueado {unlocked.length}{" "}
          {unlocked.length === 1 ? "concepto" : "conceptos"} · {completedCount} ya
          {completedCount === 1 ? " aprendido" : " aprendidos"}
        </p>
      </header>

      {unlocked.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-uva/20 bg-white/50 p-8 text-center">
          <div className="text-5xl">🌱</div>
          <p className="mt-3 font-display text-lg font-semibold text-tinta">
            Todavía no hay conceptos para repasar
          </p>
          <p className="mt-1 text-sm text-tinta/60">
            Completa tu primera aventura y aquí aparecerá lo que vayas aprendiendo.
          </p>
          <Link
            href="/aventuras"
            className="mt-5 inline-flex rounded-full bg-uva px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-uva/90"
          >
            Ir a las aventuras 🗺️
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {LEVELS.map((level) => {
            const levelConcepts = unlocked.filter((l) => l.level === level.level);
            if (levelConcepts.length === 0) return null;

            return (
              <section key={level.level} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{level.emoji}</span>
                  <div>
                    <h2 className="text-xl font-bold text-tinta">
                      Nivel {level.level}: {level.title}
                    </h2>
                    <p className="text-sm text-tinta/60">{level.subtitle}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {levelConcepts.map((lesson) => (
                    <ConceptCard
                      key={lesson.id}
                      lesson={lesson}
                      completed={isCompleted(lesson.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
