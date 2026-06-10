// Prueba headless del motor de validación sobre lecciones reales del currículo.
// Verifica que una solución correcta pasa y que una vacía/incorrecta no pasa.
// Ejecutar: npx tsx scripts/validate-engine.test.mts

import { JSDOM } from "jsdom";

// El motor usa DOMParser del navegador; lo proveemos con jsdom.
const dom = new JSDOM("<!DOCTYPE html>");
// @ts-expect-error: inyectamos DOMParser global para el entorno Node.
globalThis.DOMParser = dom.window.DOMParser;

const { validateOutput } = await import("../src/lib/validation.ts");
const { ALL_LESSONS, getLesson } = await import("../src/lib/curriculum/index.ts");

// Soluciones de ejemplo "correctas" para algunas lecciones representativas.
const SOLUTIONS: Record<number, string> = {
  1: "<p>¡Hola, soy programador!</p>",
  2: "<!DOCTYPE html><html><head></head><body><p>¡Mi primera página!</p></body></html>",
  3: "<h1>Mi Aventura</h1><h2>Capítulo 1</h2>",
  4: "<p>Línea uno<br>Línea dos</p><p>Segundo párrafo</p>",
  5: "<p>Esto es <strong>fuerte</strong> y esto va <mark>marcado</mark>.</p>",
  6: "<ul><li>uno</li><li>dos</li><li>tres</li></ul>",
  7: '<img src="https://placekitten.com/200/200" alt="un gatito">',
  8: '<a href="https://wikipedia.org">ir a wikipedia</a>',
  9: "<div><h2>Mi caja</h2><p>contenido</p></div>",
  10: '<h1>Yo</h1><p>hola</p><ul><li>a</li><li>b</li></ul><img src="x.jpg" alt="foto">',
};

let pass = 0;
let fail = 0;

function report(name: string, ok: boolean, detail = "") {
  if (ok) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.log(`  ✗ ${name} ${detail}`);
  }
}

console.log(`Probando ${ALL_LESSONS.length} lecciones del currículo...\n`);

for (const lesson of ALL_LESSONS) {
  const solution = SOLUTIONS[lesson.id];
  if (!solution) {
    console.log(`  - Aventura ${lesson.id}: sin solución de prueba, omitida`);
    continue;
  }

  // 1) La solución correcta debe pasar.
  const good = await validateOutput(solution, "", lesson.challenge.rules);
  report(
    `Aventura ${lesson.id} (${lesson.title}) — solución correcta pasa`,
    good.passed,
    good.passed ? "" : `→ errores: ${JSON.stringify(good.errors)}`,
  );

  // 2) Una solución vacía NO debe pasar (salvo que la lección no exija nada).
  const empty = await validateOutput("", "", lesson.challenge.rules);
  report(
    `Aventura ${lesson.id} — solución vacía NO pasa`,
    !empty.passed,
    "→ una solución vacía no debería aprobar",
  );
}

// Verificación puntual de getLesson.
report("getLesson(1) devuelve la aventura 1", getLesson(1)?.id === 1);
report("getLesson(999) devuelve undefined", getLesson(999) === undefined);

console.log(`\nResultado: ${pass} pasaron, ${fail} fallaron`);
if (fail > 0) process.exit(1);
