# 🧩 CodeKids

Plataforma web para que niños de 8 años en adelante aprendan a escribir **HTML y CSS de verdad**, a través de aventuras narrativas con personajes, un editor de código real (sin autocompletado ni IA) y preview en tiempo real.

MVP **100% en el navegador**: sin cuenta, sin backend y sin base de datos. Todo el progreso se guarda en `localStorage` y puede **exportarse/importarse** como archivo JSON para continuar en otra computadora.

Proyecto **sin fines de lucro, gratis para siempre**.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **CodeMirror 6** (`@uiw/react-codemirror`) — editor sin autocompletado ni cierre automático de etiquetas (requisito pedagógico)
- **Zustand** con persistencia en `localStorage`
- **motion** para animaciones

## Cómo correrlo en local

```bash
npm install
npm run dev
# abre http://localhost:3000
```

### Otros comandos

```bash
npm run build   # build de producción
npm run lint    # ESLint
npm test        # prueba headless del motor de validación (jsdom)
```

## Cómo probar el MVP

1. **Landing** (`/`): página para padres/docentes con FAQ. Pulsa **Empezar gratis**.
2. **Aventuras** (`/aventuras`): mapa con el Nivel 1 (10 aventuras de HTML). Las aventuras se desbloquean en orden.
   - Cada aventura tiene 5 pasos: narrativa → demo visual → código de referencia → **tú escribes** (editor + preview en vivo + botón _Comprobar_) → celebración con insignia.
3. **Proyectos** (`/proyectos`): sandbox libre con plantillas; crea, edita (autoguardado) y borra páginas propias.
4. **Perfil** (`/perfil`): nombre, avatar, insignias y **Exportar / Importar** tus datos.
5. **Progreso** (`/progreso`): panel para adultos con el avance por nivel.

> Niveles 2–5 (CSS y HTML/CSS intermedio) y Nivel 6 (**JavaScript básico**) aparecen como **"Muy pronto"** en el mapa; su contenido se desarrollará más adelante.

### Probar exportar/importar entre computadoras

En **Perfil** → _Exportar mis datos_ descarga un `.json`. En otra computadora (u otro navegador), _Importar datos_ y selecciona ese archivo para continuar donde quedaste.

## Arquitectura

```
src/
  app/                  # rutas (App Router)
    page.tsx            # landing
    aventuras/          # mapa + runner de lección [id]
    proyectos/          # galería + editor [id]
    perfil/  progreso/
  components/
    editor/             # CodeEditor (CodeMirror), Preview (iframe), SplitEditor
    lesson/             # LessonRunner (5 pasos), ReferenceCode
    layout/  ui/
  lib/
    types.ts            # contratos compartidos
    store.ts            # estado del estudiante (Zustand + persist)
    validation.ts       # motor de validación por OUTPUT (no por texto literal)
    export-import.ts    # exportar/importar JSON
    catalog.ts          # personajes, insignias, avatares
    curriculum/         # contenido de las lecciones (level1.ts ...)
```

### Extender el currículo

El currículo está diseñado para crecer sin reescritura: añade `src/lib/curriculum/levelN.ts` exportando `Lesson[]` y agrégalo en `src/lib/curriculum/index.ts`. Las reglas de validación (`ValidationRule`) ya soportan estilos computados (`computedStyle`) para las lecciones de CSS de los niveles 2 a 5.

## Para desarrolladores (Claude Code)

- `AGENTS.md` (importado por `CLAUDE.md`) documenta arquitectura, comandos y las **restricciones pedagógicas no negociables** (editor sin autocompletado, validación por output, estructura de 5 pasos, progresión y coherencia del currículo).
- Agentes de proyecto en `.claude/agents/`:
  - **`curriculum-author`** — escribe/amplía el contenido de las aventuras.
  - **`lesson-coherence-reviewer`** — audita el currículo en busca de incoherencias (solo lectura).
