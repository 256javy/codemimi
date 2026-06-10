"use client";

import { use, useEffect, useRef, useState } from "react";
import { useStudentStore } from "@/lib/store";
import { Button, ButtonLink } from "@/components/ui/Button";
import SplitEditor from "@/components/editor/SplitEditor";

export default function ProyectoEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const hydrated = useStudentStore((s) => s.hydrated);
  const project = useStudentStore((s) => s.projects.find((p) => p.id === id));
  const updateProject = useStudentStore((s) => s.updateProject);

  const [name, setName] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [saved, setSaved] = useState(true);
  const initialized = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inicializa el estado local una vez que el proyecto está disponible.
  useEffect(() => {
    if (project && !initialized.current) {
      setName(project.name);
      setHtml(project.html);
      setCss(project.css);
      initialized.current = true;
    }
  }, [project]);

  // Guardado automático con debounce.
  useEffect(() => {
    if (!initialized.current || !project) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      updateProject(id, { name: name.trim() || "Mi proyecto", html, css });
      setSaved(true);
    }, 500);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, html, css]);

  function markDirty() {
    setSaved(false);
  }

  if (!hydrated) {
    return (
      <div className="py-20 text-center text-tinta/50">
        <div className="text-4xl">🎨</div>
        <p className="mt-3 font-display text-lg">Cargando…</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-5 py-20 text-center">
        <div className="text-5xl">🕵️</div>
        <h1 className="font-display text-2xl font-bold text-tinta">
          Proyecto no encontrado
        </h1>
        <p className="text-tinta/60">
          Quizás lo eliminaste o el enlace está equivocado.
        </p>
        <div className="flex justify-center">
          <ButtonLink href="/proyectos">← Volver a mis proyectos</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <ButtonLink href="/proyectos" variant="ghost" size="sm">
          ← Volver
        </ButtonLink>
        <span
          className={`ml-auto rounded-full px-3 py-1 text-sm font-semibold transition ${
            saved ? "bg-menta/15 text-menta" : "bg-sol/20 text-tinta/70"
          }`}
        >
          {saved ? "Guardado ✓" : "Guardando…"}
        </span>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-tinta/70" htmlFor="proj-name">
          Nombre del proyecto
        </label>
        <input
          id="proj-name"
          type="text"
          value={name}
          maxLength={40}
          onChange={(e) => {
            setName(e.target.value);
            markDirty();
          }}
          className="w-full rounded-2xl border-2 border-uva/20 bg-white px-4 py-3 font-display text-lg font-bold text-tinta outline-none focus:border-uva/50"
        />
      </div>

      <SplitEditor
        html={html}
        css={css}
        cssEnabled
        onHtmlChange={(v) => {
          setHtml(v);
          markDirty();
        }}
        onCssChange={(v) => {
          setCss(v);
          markDirty();
        }}
        feedback={
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-uva/10 bg-crema/30 px-4 py-3">
            <p className="text-sm text-tinta/60">
              💡 Tus cambios se guardan solos. ¡Experimenta sin miedo!
            </p>
            <Button
              size="sm"
              variant="success"
              onClick={() => {
                updateProject(id, { name: name.trim() || "Mi proyecto", html, css });
                setSaved(true);
              }}
            >
              💾 Guardar ahora
            </Button>
          </div>
        }
      />
    </div>
  );
}
