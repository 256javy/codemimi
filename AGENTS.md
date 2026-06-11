<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CodeMimi

Plataforma web que enseña **HTML y CSS a niños de 8+ años** (en español) mediante aventuras narrativas y un editor de código real. MVP **100% en el cliente**: sin cuenta, sin backend, sin base de datos. Proyecto **sin fines de lucro, gratis para siempre**.

## Comandos

```bash
npm run dev     # servidor de desarrollo (http://localhost:3000)
npm run build   # build de producción (también corre el typecheck)
npm run lint    # ESLint (Next 16: se ejecuta `eslint`, no `next lint`)
npm test        # prueba headless del motor de validación (tsx + jsdom)
```

Antes de cerrar un cambio: `npm run lint && npm test && npm run build` deben pasar.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (config en CSS, `@theme` en `globals.css`) · CodeMirror 6 vía `@uiw/react-codemirror` · Zustand (persist) · motion.

No confíes en la memoria para APIs de estas versiones: verifica en la doc oficial (context7 o `node_modules/next/dist/docs/`) antes de usar features nuevas.

## Arquitectura

```
src/
  app/                 rutas: page (landing), aventuras/[id], proyectos/[id], perfil, progreso
  components/
    editor/            CodeEditor (CodeMirror), Preview (iframe srcdoc), SplitEditor
    lesson/            LessonRunner (flujo de 5 pasos), ReferenceCode
    layout/  ui/
  lib/
    types.ts           contratos compartidos (Lesson, ValidationRule, StudentData...)
    store.ts           estado del estudiante (Zustand + persist en localStorage)
    validation.ts      motor de validación por OUTPUT
    export-import.ts   exportar/importar datos como JSON
    catalog.ts         personajes, insignias, avatares
    curriculum/        index.ts (agregador) + levelN.ts (contenido)
scripts/               tests con tsx (excluidos del tsconfig de la app)
```

## Restricciones no negociables (pedagógicas)

1. **Editor sin asistencia de escritura.** En `CodeEditor`, `basicSetup` mantiene desactivados `autocompletion`, `closeBrackets` y `completionKeymap`. Permitido: resaltado de sintaxis, números de línea, bracket matching, indentación de formato. El niño escribe cada etiqueta a mano. Nunca añadir autocompletado, snippets, "ver solución" ni IA.
2. **Validación por OUTPUT, no por texto.** `validation.ts` comprueba el resultado (estructura del DOM, atributos, estilos computados) con `ValidationRule[]`, nunca compara el código literal. Mensajes de error siempre amigables y en español simple.
3. **Estructura de aventura de 5 pasos** (`LessonRunner`): narrativa → demo visual → código de referencia (solo lectura, no copiable) → el niño escribe → celebración.
4. **Progresión del currículo.** Una lección solo usa etiquetas ya enseñadas en ella o en lecciones anteriores (orden del Nivel 1: p → esqueleto → h1-h6 → br → strong/em/mark → listas → img → a → div → integrador).
5. **Los demos deben mostrar una diferencia visible real** usando **solo** la etiqueta de esa lección. Coherencia entre los 5 pasos: narrativa, demo, referencia y reto hablan del mismo concepto/ejemplo.
6. **Todo en el cliente.** Nada de backend, cuentas ni datos personales. El progreso vive en localStorage y se exporta/importa como JSON (`perfil`).

## Trampas conocidas

- **Hidratación**: el store usa `skipHydration`. La rehidratación se dispara en `<StoreHydration/>` (en el layout). Todo componente que lea el store debe leer `hydrated` y mostrar un placeholder mientras `!hydrated`, o habrá mismatch SSR/cliente. Las páginas que usan el store son Client Components.
- **Estado al navegar entre `[id]`**: `aventuras/[id]` y `proyectos/[id]` montan sus runners con `key={id}` para forzar remount; sin eso, React reutiliza el componente y arrastra el estado (paso/editor) anterior.
- **Params de página son `Promise`** en Next 16: desenvolver con `use(params)` en Client Components.

## Cómo extender el currículo

1. Crea `src/lib/curriculum/levelN.ts` exportando `export const LEVEL_N: Lesson[]` siguiendo la forma de `level1.ts`.
2. Impórtalo y agrégalo a `ALL_LESSONS` en `src/lib/curriculum/index.ts`; añade su `LevelMeta` a `LEVELS`.
3. Un nivel sin lecciones se muestra como **"Muy pronto"** en el mapa; si define `upcoming: string[]`, lista esos temas como chips bloqueados (así está el Nivel 6, JavaScript).
4. Para lecciones de CSS usa reglas `computedStyle` (renderizan en un iframe oculto). Añade un caso a `scripts/validate-engine.test.mts` con una solución correcta.

Para escribir contenido nuevo usa el agente `curriculum-author`; para auditar coherencia, `lesson-coherence-reviewer` (ver `.claude/agents/`).

## Git

Commits convencionales en español (`feat:`, `fix:`, `docs:`, `content:`...). Remote: `origin` → `github.com:256javy/codemimi.git`. Commitea y pushea a `main` solo cuando el usuario lo pida.
