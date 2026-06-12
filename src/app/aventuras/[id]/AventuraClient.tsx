"use client";

import Link from "next/link";
import { getLesson, isLessonUnlocked } from "@/lib/curriculum";
import { useStudentStore } from "@/lib/store";
import LessonRunner from "@/components/lesson/LessonRunner";

export default function AventuraClient({ id }: { id: string }) {
  const hydrated = useStudentStore((s) => s.hydrated);
  const lessons = useStudentStore((s) => s.lessons);

  const lesson = getLesson(Number(id));

  if (!lesson) {
    return (
      <div className="space-y-4 py-16 text-center">
        <div className="text-6xl">🚧</div>
        <h1 className="text-2xl font-bold text-tinta">Esta aventura aún no está lista</h1>
        <p className="text-tinta/60">¡Vuelve pronto, estamos preparándola!</p>
        <Link href="/aventuras" className="inline-block font-semibold text-uva hover:underline">
          ← Volver al mapa de aventuras
        </Link>
      </div>
    );
  }

  // El progreso solo es fiable tras la hidratación; mientras tanto, placeholder
  // (evita destellar la lección antes de saber si está desbloqueada).
  if (!hydrated) {
    return (
      <div className="py-20 text-center text-tinta/50">
        <div className="text-4xl">🗺️</div>
        <p className="mt-3 font-display text-lg">Cargando…</p>
      </div>
    );
  }

  const unlocked = isLessonUnlocked(
    lesson.id,
    (lessonId) => Boolean(lessons[lessonId]?.completed),
  );

  if (!unlocked) {
    const prev = getLesson(lesson.id - 1);
    return (
      <div className="mx-auto max-w-md space-y-4 py-16 text-center">
        <div className="text-6xl">🔒</div>
        <h1 className="text-2xl font-bold text-tinta">Esta aventura está bloqueada</h1>
        <p className="text-tinta/70">
          Las aventuras se hacen en orden. Primero termina
          {prev ? (
            <>
              {" "}
              la <strong>Aventura {prev.id}: {prev.title}</strong>.
            </>
          ) : (
            " la aventura anterior."
          )}
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/aventuras"
            className="inline-flex rounded-full bg-uva px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-uva/90"
          >
            ← Volver al mapa
          </Link>
          {prev && (
            <Link
              href={`/aventuras/${prev.id}`}
              className="inline-flex rounded-full bg-uva-claro px-5 py-2.5 text-sm font-semibold text-uva transition hover:bg-uva hover:text-white"
            >
              Ir a la Aventura {prev.id} →
            </Link>
          )}
        </div>
      </div>
    );
  }

  // key={lesson.id} fuerza remount al cambiar de aventura, así el runner
  // reinicia su estado (paso, editor, errores) en vez de arrastrar el anterior.
  return <LessonRunner key={lesson.id} lesson={lesson} />;
}
