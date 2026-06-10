"use client";

import { use } from "react";
import Link from "next/link";
import { getLesson } from "@/lib/curriculum";
import LessonRunner from "@/components/lesson/LessonRunner";

export default function AventuraPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // En Next.js 16 los params de página son una Promise; se desenvuelven con use().
  const { id } = use(params);
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

  // key={lesson.id} fuerza remount al cambiar de aventura, así el runner
  // reinicia su estado (paso, editor, errores) en vez de arrastrar el anterior.
  return <LessonRunner key={lesson.id} lesson={lesson} />;
}
