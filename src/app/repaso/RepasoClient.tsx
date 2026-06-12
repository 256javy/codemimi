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

      <details className="group mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-uva/10 open:ring-uva/30">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-semibold text-tinta">
          <span>🤔 ¿Qué es HTML, CSS y JavaScript?</span>
          <span className="shrink-0 text-uva transition group-open:rotate-45">＋</span>
        </summary>
        <div className="border-t border-uva/10 p-5">
          <p className="mb-5 leading-relaxed text-tinta/70">
            Cuando creas una página web usas tres lenguajes que trabajan juntos,
            como un equipo. Cada uno tiene su propio trabajo:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                emoji: "🧱",
                name: "HTML",
                tag: "Los ladrillos",
                meaning: "HyperText Markup Language",
                meaningEs: "“lenguaje de marcado de hipertexto”: con etiquetas marcas qué es cada parte (un título, un párrafo, una imagen).",
                text: "Pone las cosas en su lugar: títulos, textos, imágenes y botones. Es el esqueleto de la página.",
              },
              {
                emoji: "🎨",
                name: "CSS",
                tag: "La pintura",
                meaning: "Cascading Style Sheets",
                meaningEs: "“hojas de estilo en cascada”: hojas con reglas de estilo que se aplican en cascada, unas sobre otras.",
                text: "Decide cómo se ve todo: los colores, los tamaños, las formas y dónde va cada cosa. Le da estilo.",
              },
              {
                emoji: "⚡",
                name: "JavaScript",
                tag: "La magia",
                meaning: "No es una sigla",
                meaningEs: "es el nombre del lenguaje. Nació en 1995 para dar vida a las páginas web (¡y el lenguaje de programación que más se usa!).",
                text: "Hace que la página cobre vida: que responda cuando haces clic, que algo cambie o se mueva.",
              },
            ].map((lang) => (
              <div
                key={lang.name}
                className="rounded-xl bg-crema/60 p-4 ring-1 ring-uva/10"
              >
                <div className="text-3xl">{lang.emoji}</div>
                <h3 className="mt-2 font-display text-lg font-bold text-tinta">
                  {lang.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-uva">
                  {lang.tag}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-tinta/70">
                  {lang.text}
                </p>
                <div className="mt-3 rounded-lg bg-white/70 p-3 ring-1 ring-uva/10">
                  <p className="font-display text-sm font-bold text-tinta">
                    {lang.meaning}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-tinta/60">
                    {lang.meaningEs}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-tinta/60">
            En CodeMimi los aprendes en ese orden: primero los ladrillos, luego la
            pintura y al final la magia. ✨
          </p>
        </div>
      </details>

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
