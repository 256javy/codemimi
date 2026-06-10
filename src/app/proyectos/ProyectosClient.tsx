"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStudentStore } from "@/lib/store";
import { Button, ButtonLink } from "@/components/ui/Button";
import Preview from "@/components/editor/Preview";

interface Template {
  id: string;
  name: string;
  emoji: string;
  description: string;
  html: string;
  css: string;
}

const TEMPLATES: Template[] = [
  {
    id: "blanco",
    name: "En blanco",
    emoji: "📄",
    description: "Empieza desde cero, ¡tú mandas!",
    html: `<h1>Mi página</h1>\n<p>¡Empieza a escribir aquí!</p>`,
    css: `h1 {\n  color: purple;\n}`,
  },
  {
    id: "personal",
    name: "Mi página personal",
    emoji: "🙋",
    description: "Cuéntale al mundo quién eres.",
    html: `<h1>¡Hola! Soy ...</h1>\n<p>Estas son algunas cosas sobre mí:</p>\n<ul>\n  <li>Mi color favorito es el azul</li>\n  <li>Me gusta dibujar</li>\n  <li>Quiero aprender a programar</li>\n</ul>`,
    css: `body {\n  font-family: sans-serif;\n  background: #fff7e6;\n  padding: 20px;\n}\nh1 {\n  color: #7c3aed;\n}\nli {\n  font-size: 18px;\n}`,
  },
  {
    id: "mascota",
    name: "Mi mascota favorita",
    emoji: "🐶",
    description: "Una página para tu animal preferido.",
    html: `<h1>Mi mascota favorita 🐶</h1>\n<p>Se llama <strong>Firulais</strong> y es muy juguetón.</p>\n<p>Le encanta:</p>\n<ul>\n  <li>Correr en el parque</li>\n  <li>Comer galletas</li>\n  <li>Dormir mucho</li>\n</ul>`,
    css: `body {\n  font-family: sans-serif;\n  background: #e0f7ff;\n  text-align: center;\n  padding: 20px;\n}\nh1 {\n  color: #0ea5e9;\n}\nstrong {\n  color: #f59e0b;\n}`,
  },
];

export default function ProyectosClient() {
  const router = useRouter();
  const hydrated = useStudentStore((s) => s.hydrated);
  const projects = useStudentStore((s) => s.projects);
  const createProject = useStudentStore((s) => s.createProject);
  const deleteProject = useStudentStore((s) => s.deleteProject);

  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [templateId, setTemplateId] = useState<string>("blanco");

  if (!hydrated) {
    return <LoadingPlaceholder />;
  }

  function handleCreate() {
    const tpl = TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0];
    const finalName = name.trim() || tpl.name;
    const project = createProject(finalName, tpl.html, tpl.css);
    router.push(`/proyectos/${project.id}`);
  }

  function handleDelete(id: string, projectName: string) {
    if (window.confirm(`¿Seguro que quieres eliminar "${projectName}"? No se puede deshacer.`)) {
      deleteProject(id);
    }
  }

  return (
    <div className="space-y-8 py-4">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-bold text-tinta sm:text-4xl">🎨 Proyectos Libres</h1>
        <p className="mx-auto max-w-prose text-tinta/70">
          ¡Aquí mandas tú! Crea tus propias páginas web con todo lo que has aprendido.
          Inventa, experimenta y guarda tus creaciones.
        </p>
      </header>

      {/* Crear nuevo */}
      <section className="rounded-2xl border-2 border-uva/15 bg-white p-5 shadow-sm sm:p-6">
        {!creating ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-display text-lg font-semibold text-tinta">
              ¿Listo para crear algo nuevo?
            </p>
            <Button onClick={() => setCreating(true)}>➕ Crear nuevo proyecto</Button>
          </div>
        ) : (
          <div className="space-y-5">
            <h2 className="font-display text-xl font-bold text-tinta">Nuevo proyecto ✨</h2>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-tinta/70" htmlFor="proj-name">
                Ponle un nombre
              </label>
              <input
                id="proj-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Mi primera página"
                maxLength={40}
                className="w-full rounded-2xl border-2 border-uva/20 bg-crema/40 px-4 py-3 text-tinta outline-none focus:border-uva/50"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <span className="block text-sm font-semibold text-tinta/70">
                Elige una plantilla para empezar
              </span>
              <div className="grid gap-3 sm:grid-cols-3">
                {TEMPLATES.map((tpl) => {
                  const selected = tpl.id === templateId;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setTemplateId(tpl.id)}
                      className={`flex flex-col items-start gap-1 rounded-2xl border-2 p-4 text-left transition ${
                        selected
                          ? "border-uva bg-uva/10 shadow-md"
                          : "border-uva/15 bg-white hover:border-uva/40"
                      }`}
                    >
                      <span className="text-3xl">{tpl.emoji}</span>
                      <span className="font-display font-bold text-tinta">{tpl.name}</span>
                      <span className="text-xs text-tinta/60">{tpl.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleCreate} variant="success">
                🚀 Crear y abrir
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setCreating(false);
                  setName("");
                  setTemplateId("blanco");
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Galería */}
      {projects.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-uva/20 bg-white/50 p-10 text-center">
          <div className="text-5xl">🖌️</div>
          <p className="mt-3 font-display text-lg font-semibold text-tinta">
            Todavía no tienes proyectos
          </p>
          <p className="mt-1 text-tinta/60">
            ¡Crea tu primera página web y aparecerá aquí!
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-2xl border-2 border-uva/15 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Miniatura */}
              <div className="relative h-40 overflow-hidden border-b border-uva/10 bg-crema/30">
                <div className="pointer-events-none absolute inset-0 origin-top-left scale-[0.5]" style={{ width: "200%", height: "200%" }}>
                  <Preview html={project.html} css={project.css} debounceMs={0} />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <h3 className="font-display text-lg font-bold leading-tight text-tinta">
                    {project.name}
                  </h3>
                  <p className="text-xs text-tinta/50">
                    Actualizado el{" "}
                    {new Date(project.updatedAt).toLocaleDateString("es", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  <ButtonLink href={`/proyectos/${project.id}`} size="sm">
                    Abrir ✏️
                  </ButtonLink>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(project.id, project.name)}
                  >
                    🗑️ Eliminar
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingPlaceholder() {
  return (
    <div className="py-20 text-center text-tinta/50">
      <div className="text-4xl">🎨</div>
      <p className="mt-3 font-display text-lg">Cargando…</p>
    </div>
  );
}
