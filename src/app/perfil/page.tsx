"use client";

import { useRef, useState } from "react";
import { useStudentStore } from "@/lib/store";
import { computeStreak } from "@/lib/store";
import { AVATARS, BADGES } from "@/lib/catalog";
import { exportStudentData, importStudentFile } from "@/lib/export-import";
import type { BadgeId, StudentData } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import BadgeChip from "@/components/ui/BadgeChip";

const ALL_BADGE_IDS = Object.keys(BADGES) as BadgeId[];

export default function PerfilPage() {
  const hydrated = useStudentStore((s) => s.hydrated);
  const username = useStudentStore((s) => s.username);
  const avatar = useStudentStore((s) => s.avatar);
  const lessons = useStudentStore((s) => s.lessons);
  const badges = useStudentStore((s) => s.badges);
  const projects = useStudentStore((s) => s.projects);
  const activeDays = useStudentStore((s) => s.activeDays);

  const setUsername = useStudentStore((s) => s.setUsername);
  const setAvatar = useStudentStore((s) => s.setAvatar);
  const replaceAll = useStudentStore((s) => s.replaceAll);
  const reset = useStudentStore((s) => s.reset);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  if (!hydrated) {
    return (
      <div className="py-20 text-center text-tinta/50">
        <div className="text-4xl">🙂</div>
        <p className="mt-3 font-display text-lg">Cargando…</p>
      </div>
    );
  }

  const completedLessons = Object.values(lessons).filter((l) => l.completed).length;
  const streak = computeStreak(activeDays);
  const unlockedBadges = new Set(badges);

  function handleExport() {
    const data: StudentData = {
      schemaVersion: useStudentStore.getState().schemaVersion,
      username,
      avatar,
      lessons,
      badges,
      projects,
      activeDays,
      createdAt: useStudentStore.getState().createdAt,
    };
    exportStudentData(data);
    setMessage({ type: "ok", text: "¡Tus datos se descargaron! Guárdalos en un lugar seguro. 💾" });
  }

  async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // permite re-importar el mismo archivo
    if (!file) return;

    const result = await importStudentFile(file);
    if (!result.ok || !result.data) {
      setMessage({ type: "error", text: result.error ?? "No se pudo importar el archivo." });
      return;
    }
    if (window.confirm("Esto reemplazará tus datos actuales. ¿Quieres continuar?")) {
      replaceAll(result.data);
      setMessage({ type: "ok", text: "¡Listo! Importamos tu progreso correctamente. 🎉" });
    }
  }

  function handleReset() {
    if (
      window.confirm(
        "¿Seguro que quieres empezar de cero? Se borrará todo tu progreso, insignias y proyectos. No se puede deshacer.",
      )
    ) {
      reset();
      setMessage({ type: "ok", text: "Empezaste de cero. ¡Nueva aventura por delante! ✨" });
    }
  }

  return (
    <div className="space-y-8 py-4">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-tinta sm:text-4xl">🙂 Mi Perfil</h1>
        <p className="mx-auto max-w-prose text-tinta/70">
          Personaliza tu nombre y avatar, mira tus insignias y lleva tu progreso a otra
          computadora.
        </p>
      </header>

      {message && (
        <div
          className={`rounded-2xl border-2 px-4 py-3 text-center font-semibold ${
            message.type === "ok"
              ? "border-menta/40 bg-menta/10 text-menta"
              : "border-coral/40 bg-coral/10 text-coral"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Nombre y avatar */}
      <section className="rounded-2xl border-2 border-uva/15 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 font-display text-xl font-bold text-tinta">¿Cómo te llamas?</h2>
        <input
          type="text"
          value={username}
          maxLength={20}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Escribe tu nombre"
          className="w-full rounded-2xl border-2 border-uva/20 bg-crema/40 px-4 py-3 text-tinta outline-none focus:border-uva/50"
        />

        <h2 className="mb-3 mt-6 font-display text-xl font-bold text-tinta">Elige tu avatar</h2>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {AVATARS.map((av) => {
            const selected = av.id === avatar;
            return (
              <button
                key={av.id}
                type="button"
                onClick={() => setAvatar(av.id)}
                title={av.name}
                className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-3 transition ${
                  selected
                    ? "border-uva bg-uva/10 shadow-md"
                    : "border-uva/15 bg-white hover:border-uva/40"
                }`}
              >
                <span className="text-3xl">{av.emoji}</span>
                <span className="text-[10px] font-semibold text-tinta/60">{av.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Estadísticas */}
      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard emoji="🏆" value={completedLessons} label="Aventuras completadas" color="bg-menta/10 border-menta/30" />
        <StatCard emoji="🎨" value={projects.length} label="Proyectos creados" color="bg-uva/10 border-uva/30" />
        <StatCard emoji="🔥" value={streak} label="Días seguidos de racha" color="bg-sol/15 border-sol/40" />
      </section>

      {/* Insignias */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-tinta">🏅 Mis Insignias</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ALL_BADGE_IDS.map((bid) => (
            <BadgeChip key={bid} badge={BADGES[bid]} unlocked={unlockedBadges.has(bid)} />
          ))}
        </div>
      </section>

      {/* Exportar / Importar */}
      <section className="space-y-4 rounded-2xl border-2 border-cielo/30 bg-cielo/10 p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="font-display text-xl font-bold text-tinta">
            💻 Llevar mi progreso a otra computadora
          </h2>
          <p className="mt-1 text-sm text-tinta/70">
            Tu progreso se guarda solo en este navegador. Descarga un archivo para llevarlo a
            otra computadora o guardarlo como respaldo.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleExport}>Exportar mis datos 💾</Button>
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
            Importar datos 📂
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleImportFile}
            className="hidden"
          />
        </div>
      </section>

      {/* Empezar de cero */}
      <section className="rounded-2xl border-2 border-coral/30 bg-coral/5 p-5 shadow-sm sm:p-6">
        <h2 className="font-display text-lg font-bold text-tinta">Empezar de cero</h2>
        <p className="mt-1 text-sm text-tinta/70">
          Borra todo tu progreso y comienza una aventura nueva. Esto no se puede deshacer.
        </p>
        <div className="mt-3">
          <Button variant="secondary" onClick={handleReset}>
            🧹 Empezar de cero
          </Button>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  emoji,
  value,
  label,
  color,
}: {
  emoji: string;
  value: number;
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
