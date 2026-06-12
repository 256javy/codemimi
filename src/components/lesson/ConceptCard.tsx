import Link from "next/link";
import type { Lesson } from "@/lib/types";
import { CHARACTERS } from "@/lib/catalog";
import ReferenceCode from "./ReferenceCode";

/** Tarjeta de repaso de un concepto ya desbloqueado: resumen + código de
 *  referencia (solo lectura, no copiable) + enlace para volver a la aventura.
 *  Reutiliza la misma presentación del código que el paso 3 de la lección. */
export default function ConceptCard({
  lesson,
  completed,
}: {
  lesson: Lesson;
  completed: boolean;
}) {
  const char = CHARACTERS[lesson.character];

  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border-2 border-uva/15 bg-white p-5 shadow-sm">
      <header className="flex items-start gap-3">
        <span className="text-3xl leading-none" aria-hidden>
          {char.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-uva">Aventura {lesson.id}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                completed ? "bg-menta/20 text-menta" : "bg-sol/20 text-tinta/70"
              }`}
            >
              {completed ? "✅ Aprendido" : "▶️ En curso"}
            </span>
          </div>
          <h3 className="font-display text-base font-bold leading-tight text-tinta">
            {lesson.title}
          </h3>
        </div>
      </header>

      <p className="text-sm leading-relaxed text-tinta/80">{lesson.concept}</p>

      <ReferenceCode reference={lesson.reference} />

      <Link
        href={`/aventuras/${lesson.id}`}
        className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-uva-claro px-4 py-2 text-sm font-semibold text-uva transition hover:bg-uva hover:text-white"
      >
        Repasar la aventura →
      </Link>
    </article>
  );
}
