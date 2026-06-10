"use client";

import { useStudentStore, computeStreak } from "@/lib/store";
import { ALL_LESSONS, LEVELS, getLevelLessons } from "@/lib/curriculum";
import { getAvatar } from "@/lib/catalog";
import ProgressBar from "@/components/ui/ProgressBar";
import Preview from "@/components/editor/Preview";

export default function ProgresoPage() {
  const hydrated = useStudentStore((s) => s.hydrated);
  const username = useStudentStore((s) => s.username);
  const avatar = useStudentStore((s) => s.avatar);
  const lessons = useStudentStore((s) => s.lessons);
  const projects = useStudentStore((s) => s.projects);
  const activeDays = useStudentStore((s) => s.activeDays);

  if (!hydrated) {
    return (
      <div className="py-20 text-center text-tinta/50">
        <div className="text-4xl">📊</div>
        <p className="mt-3 font-display text-lg">Cargando…</p>
      </div>
    );
  }

  const totalLessons = ALL_LESSONS.length;
  const completedTotal = Object.values(lessons).filter((l) => l.completed).length;
  const streak = computeStreak(activeDays);
  const activeDaysCount = activeDays.length;
  const av = getAvatar(avatar);

  return (
    <div className="space-y-8 py-4">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-tinta sm:text-4xl">📊 Progreso</h1>
        <p className="mx-auto max-w-prose text-tinta/70">
          Una vista para mamás, papás y docentes:{" "}
          {username ? (
            <>
              así va aprendiendo <strong>{username}</strong> {av.emoji}
            </>
          ) : (
            "así va aprendiendo el estudiante"
          )}
          .
        </p>
      </header>

      {/* Resumen */}
      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          emoji="🏆"
          value={`${completedTotal}/${totalLessons}`}
          label="Aventuras completadas"
          color="bg-menta/10 border-menta/30"
        />
        <SummaryCard
          emoji="🎨"
          value={String(projects.length)}
          label="Proyectos creados"
          color="bg-uva/10 border-uva/30"
        />
        <SummaryCard
          emoji="🔥"
          value={String(streak)}
          label="Días seguidos (racha)"
          color="bg-sol/15 border-sol/40"
        />
      </section>

      <div className="rounded-2xl border-2 border-cielo/30 bg-cielo/10 px-4 py-3 text-center text-sm font-semibold text-tinta/70">
        📅 Días activos en total: <strong className="text-tinta">{activeDaysCount}</strong>
      </div>

      {/* Progreso por nivel */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-tinta">Avance por nivel</h2>
        <div className="space-y-4">
          {LEVELS.map((level) => {
            const levelLessons = getLevelLessons(level.level);
            const done = levelLessons.filter((l) => lessons[l.id]?.completed).length;
            const total = levelLessons.length;
            return (
              <div
                key={level.level}
                className="rounded-2xl border-2 border-uva/15 bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-2xl">{level.emoji}</span>
                  <div>
                    <h3 className="font-display font-bold text-tinta">
                      Nivel {level.level}: {level.title}
                    </h3>
                    <p className="text-xs text-tinta/60">{level.subtitle}</p>
                  </div>
                </div>
                {total > 0 ? (
                  <ProgressBar value={done} max={total} color={level.color} />
                ) : (
                  <p className="text-sm italic text-tinta/40">Aventuras en preparación 🚧</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Proyectos creados */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-tinta">Proyectos creados</h2>
        {projects.length === 0 ? (
          <p className="rounded-2xl border-2 border-dashed border-uva/20 bg-white/50 p-6 text-center text-tinta/50">
            Todavía no hay proyectos libres.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-2xl border-2 border-uva/15 bg-white shadow-sm"
              >
                <div className="relative h-32 overflow-hidden border-b border-uva/10 bg-crema/30">
                  <div
                    className="pointer-events-none absolute inset-0 origin-top-left scale-[0.5]"
                    style={{ width: "200%", height: "200%" }}
                  >
                    <Preview html={p.html} css={p.css} debounceMs={0} />
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-display font-bold leading-tight text-tinta">{p.name}</h3>
                  <p className="text-xs text-tinta/50">
                    {new Date(p.updatedAt).toLocaleDateString("es", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Nota de privacidad */}
      <section className="rounded-2xl border-2 border-menta/30 bg-menta/5 p-5 text-sm text-tinta/70">
        <h2 className="mb-1 font-display text-base font-bold text-tinta">🔒 Sobre la privacidad</h2>
        <p>
          CodeKids funciona 100% en este navegador: no hay cuentas ni servidores. Todo el
          progreso se guarda localmente en este dispositivo y solo sale de aquí si exportas el
          archivo manualmente.
        </p>
        <p className="mt-2">
          No guardamos el código de las sesiones pasadas de las lecciones (solo si una aventura
          fue completada o no). Tampoco medimos el tiempo de uso. Por eso aquí mostramos los
          días activos y la racha, en lugar de minutos frente a la pantalla.
        </p>
      </section>
    </div>
  );
}

function SummaryCard({
  emoji,
  value,
  label,
  color,
}: {
  emoji: string;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-5 text-center ${color}`}>
      <span className="text-4xl">{emoji}</span>
      <span className="font-display text-3xl font-bold text-tinta">{value}</span>
      <span className="text-sm font-semibold text-tinta/60">{label}</span>
    </div>
  );
}
