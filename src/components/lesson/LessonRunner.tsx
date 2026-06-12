"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Lesson } from "@/lib/types";
import { validateOutput } from "@/lib/validation";
import { useStudentStore } from "@/lib/store";
import { CHARACTERS, BADGES } from "@/lib/catalog";
import { getNextLessonId } from "@/lib/curriculum";
import Character from "@/components/ui/Character";
import ReferenceCode from "./ReferenceCode";
import Preview from "@/components/editor/Preview";
import SplitEditor from "@/components/editor/SplitEditor";
import { Button, ButtonLink } from "@/components/ui/Button";

type Phase = "narrative" | "demo" | "reference" | "challenge" | "celebration";
const ORDER: Phase[] = ["narrative", "demo", "reference", "challenge", "celebration"];

export default function LessonRunner({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const completeLesson = useStudentStore((s) => s.completeLesson);

  const [phase, setPhase] = useState<Phase>("narrative");
  const [narrativeIdx, setNarrativeIdx] = useState(0);

  const [html, setHtml] = useState(lesson.challenge.startingHtml);
  const [css, setCss] = useState(lesson.challenge.startingCss ?? "");
  const [js, setJs] = useState(lesson.challenge.startingJs ?? "");
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);

  const char = CHARACTERS[lesson.character];
  const nextId = useMemo(() => getNextLessonId(lesson.id), [lesson.id]);

  function goNextPhase() {
    const i = ORDER.indexOf(phase);
    if (i < ORDER.length - 1) setPhase(ORDER[i + 1]);
  }

  async function handleCheck() {
    setChecking(true);
    try {
      const result = await validateOutput(html, css, lesson.challenge.rules, js);
      setErrors(result.errors);
      setWarnings(result.warnings);
      if (result.passed) {
        completeLesson(lesson.id, lesson.badge);
        setPhase("celebration");
      }
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="py-4">
      {/* Migas y barra de pasos */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/aventuras" className="text-sm font-semibold text-tinta/60 hover:text-uva">
          ← Volver al mapa
        </Link>
        <div className="flex items-center gap-1.5">
          {ORDER.map((p) => (
            <span
              key={p}
              className={`h-2.5 w-2.5 rounded-full transition ${
                ORDER.indexOf(p) <= ORDER.indexOf(phase) ? "bg-uva" : "bg-uva/20"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-bold text-uva">Aventura {lesson.id}</span>
      </div>

      <h1 className="mb-6 text-center text-2xl font-bold text-tinta sm:text-3xl">
        {char.emoji} {lesson.title}
      </h1>

      {/* PASO 1 — Narrativa */}
      {phase === "narrative" && (
        <div className="animate-pop-in space-y-8">
          <Character id={lesson.character} size="lg" speech={lesson.narrative[narrativeIdx].lines.join(" ")} />
          <div className="flex justify-center gap-3">
            {narrativeIdx > 0 && (
              <Button variant="secondary" onClick={() => setNarrativeIdx((i) => i - 1)}>
                ← Atrás
              </Button>
            )}
            {narrativeIdx < lesson.narrative.length - 1 ? (
              <Button onClick={() => setNarrativeIdx((i) => i + 1)}>Siguiente →</Button>
            ) : (
              <Button onClick={goNextPhase}>¡Entendido! →</Button>
            )}
          </div>
        </div>
      )}

      {/* PASO 2 — Demostración visual */}
      {phase === "demo" && (
        <div className="animate-pop-in space-y-6">
          <Character id={lesson.character} size="sm" speech="Mira la diferencia que vamos a lograr 👇" />
          <div className="grid gap-4 md:grid-cols-2">
            <DemoCard label={lesson.demo.beforeLabel} html={lesson.demo.beforeHtml} css={lesson.demo.css ?? ""} />
            <DemoCard label={lesson.demo.afterLabel} html={lesson.demo.afterHtml} css={lesson.demo.css ?? ""} highlight />
          </div>
          <div className="flex justify-center">
            <Button onClick={goNextPhase}>Ver el código →</Button>
          </div>
        </div>
      )}

      {/* PASO 3 — Código de referencia */}
      {phase === "reference" && (
        <div className="animate-pop-in space-y-6">
          <Character id={lesson.character} size="sm" speech="Así se escribe. ¡Obsérvalo bien, luego lo escribirás tú!" />
          <ReferenceCode reference={lesson.reference} />
          <div className="flex justify-center">
            <Button onClick={goNextPhase}>¡Mi turno! ✍️</Button>
          </div>
        </div>
      )}

      {/* PASO 4 — El niño escribe */}
      {phase === "challenge" && (
        <div className="animate-pop-in space-y-4">
          <div className="rounded-2xl border-2 border-uva/20 bg-uva-claro p-4">
            <p className="font-semibold text-tinta">
              <span className="mr-2">🎯 Tu misión:</span>
              {lesson.challenge.instruction}
            </p>
          </div>

          <SplitEditor
            html={html}
            css={css}
            js={js}
            onHtmlChange={setHtml}
            onCssChange={setCss}
            onJsChange={setJs}
            cssEnabled={lesson.challenge.cssEnabled}
            jsEnabled={lesson.challenge.jsEnabled}
            responsivePreview={lesson.challenge.responsivePreview}
            feedback={
              <div className="space-y-3">
                {errors.length > 0 && (
                  <div className="space-y-1 rounded-2xl border-2 border-coral/40 bg-coral/10 p-4">
                    <p className="font-bold text-coral">Casi lo tienes, revisa esto:</p>
                    <ul className="list-inside list-disc text-sm text-tinta/80">
                      {errors.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {warnings.length > 0 && (
                  <div className="space-y-1 rounded-2xl border-2 border-menta/40 bg-menta/10 p-4">
                    <p className="font-bold text-menta">¡Ojo a este detalle! 👀</p>
                    <ul className="list-inside list-disc text-sm text-tinta/80">
                      {warnings.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {hintsShown > 0 && (
                  <div className="space-y-1 rounded-2xl border-2 border-sol/40 bg-sol/10 p-4 text-sm text-tinta/80">
                    {lesson.challenge.hints.slice(0, hintsShown).map((h, i) => (
                      <p key={i}>💡 {h}</p>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="success" onClick={handleCheck} disabled={checking}>
                    {checking ? "Comprobando…" : "✅ Comprobar"}
                  </Button>
                  {hintsShown < lesson.challenge.hints.length && (
                    <Button
                      variant="secondary"
                      onClick={() => setHintsShown((n) => n + 1)}
                    >
                      💡 Pedir una pista
                    </Button>
                  )}
                </div>
              </div>
            }
          />
        </div>
      )}

      {/* PASO 5 — Celebración */}
      {phase === "celebration" && (
        <div className="animate-pop-in space-y-6 text-center">
          <div className="text-7xl">🎉</div>
          <Character id={lesson.character} size="md" speech={lesson.celebration} />
          {warnings.length > 0 && (
            <div className="mx-auto max-w-md space-y-1 rounded-2xl border-2 border-menta/40 bg-menta/10 p-4 text-left">
              {warnings.map((w, i) => (
                <p key={i} className="text-sm text-tinta/80">
                  {w}
                </p>
              ))}
            </div>
          )}
          {lesson.badge && (
            <div className="mx-auto inline-flex flex-col items-center gap-2 rounded-2xl border-2 border-sol/40 bg-sol/10 px-8 py-5">
              <span className="text-5xl">{BADGES[lesson.badge].emoji}</span>
              <span className="font-display font-bold text-tinta">
                ¡Insignia desbloqueada: {BADGES[lesson.badge].name}!
              </span>
            </div>
          )}
          <div className="flex justify-center gap-3">
            <ButtonLink variant="secondary" href="/aventuras">
              Volver al mapa
            </ButtonLink>
            {nextId ? (
              <Button onClick={() => router.push(`/aventuras/${nextId}`)}>
                Siguiente aventura →
              </Button>
            ) : (
              <ButtonLink href="/proyectos">¡A crear proyectos! 🚀</ButtonLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DemoCard({
  label,
  html,
  css,
  highlight,
}: {
  label: string;
  html: string;
  css: string;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-2">
      <span
        className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
          highlight ? "bg-menta/20 text-menta" : "bg-uva/10 text-tinta/60"
        }`}
      >
        {label}
      </span>
      <div className="h-48">
        <Preview html={html} css={css} debounceMs={0} />
      </div>
    </div>
  );
}
