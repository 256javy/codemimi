"use client";

import Link from "next/link";
import { LEVELS, getLevelLessons, isLessonUnlocked } from "@/lib/curriculum";
import { useStudentStore } from "@/lib/store";
import ProgressBar from "@/components/ui/ProgressBar";
import { CHARACTERS } from "@/lib/catalog";

export default function AventurasClient() {
  const lessons = useStudentStore((s) => s.lessons);
  const hydrated = useStudentStore((s) => s.hydrated);

  const totalLessons = LEVELS.reduce((n, lv) => n + getLevelLessons(lv.level).length, 0);
  const completedTotal = Object.values(lessons).filter((l) => l.completed).length;

  return (
    <div className="space-y-8 py-4">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-tinta sm:text-4xl">🗺️ Mapa de Aventuras</h1>
        <p className="mx-auto max-w-prose text-tinta/70">
          Cada aventura te enseña algo nuevo. Complétalas en orden y conviértete en un
          maestro de la web.
        </p>
        <div className="mx-auto max-w-md">
          <ProgressBar value={completedTotal} max={totalLessons} label="Tu progreso total" />
        </div>
      </header>

      <div className="space-y-10">
        {LEVELS.map((level) => {
          const levelLessons = getLevelLessons(level.level);
          const available = levelLessons.length > 0;
          const done = levelLessons.filter((l) => hydrated && lessons[l.id]?.completed).length;

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
                {available && (
                  <span className="ml-auto rounded-full bg-uva/10 px-3 py-1 text-sm font-semibold text-uva">
                    {done}/{levelLessons.length}
                  </span>
                )}
              </div>

              {available ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {levelLessons.map((lesson) => {
                    const completed = Boolean(hydrated && lessons[lesson.id]?.completed);
                    const unlocked = isLessonUnlocked(
                      lesson.id,
                      (id) => Boolean(hydrated && lessons[id]?.completed),
                    );
                    const char = CHARACTERS[lesson.character];

                    const card = (
                      <div
                        className={`flex h-full flex-col gap-2 rounded-2xl border-2 p-4 transition ${
                          completed
                            ? "border-menta/40 bg-menta/10"
                            : unlocked
                              ? "border-uva/20 bg-white hover:border-uva/50 hover:shadow-md"
                              : "border-uva/10 bg-uva/5 opacity-60"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{char.emoji}</span>
                          <span className="text-lg">
                            {completed ? "✅" : unlocked ? "▶️" : "🔒"}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-uva">Aventura {lesson.id}</span>
                        <span className="font-display text-sm font-semibold leading-tight text-tinta">
                          {lesson.title}
                        </span>
                      </div>
                    );

                    return unlocked ? (
                      <Link key={lesson.id} href={`/aventuras/${lesson.id}`}>
                        {card}
                      </Link>
                    ) : (
                      <div key={lesson.id} title="Completa la aventura anterior para desbloquear">
                        {card}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-uva/20 bg-white/50 p-6 text-tinta/60">
                  <p className="text-center font-semibold">
                    🚧 ¡Muy pronto! Estamos preparando estas aventuras.
                  </p>
                  {level.upcoming && level.upcoming.length > 0 && (
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {level.upcoming.map((topic) => (
                        <span
                          key={topic}
                          className="inline-flex items-center gap-1.5 rounded-full bg-uva/5 px-3 py-1.5 text-sm font-medium text-tinta/60 ring-1 ring-uva/10"
                        >
                          🔒 {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
