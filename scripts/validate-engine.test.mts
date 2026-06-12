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
// Una solución es solo HTML (string) o un objeto { html, css?, js? } para
// lecciones de CSS o JavaScript.
type Solution = string | { html: string; css?: string; js?: string };
const SOLUTIONS: Record<number, Solution> = {
  // Nivel 1 — HTML
  1: "<p>¡Hola, soy programador!</p>",
  2: "<!DOCTYPE html><html><head></head><body><p>¡Mi primera página!</p></body></html>",
  3: "<h1>Mi Aventura</h1><h2>Capítulo 1</h2>",
  4: "<p>Línea uno<br>Línea dos</p><p>Segundo párrafo</p>",
  5: "<p>Esto es <strong>fuerte</strong> y esto va <mark>marcado</mark>.</p>",
  6: "<ul><li>uno</li><li>dos</li><li>tres</li></ul>",
  7: '<img src="https://picsum.photos/200" alt="un gatito">',
  8: '<a href="https://wikipedia.org">ir a wikipedia</a>',
  9: "<div><h2>Mi caja</h2><p>contenido</p></div>",
  10: '<h1>Yo</h1><p>hola</p><ul><li>a</li><li>b</li></ul><img src="x.jpg" alt="foto">',

  // Nivel 2 — CSS. Las reglas computedStyle solo corren en el navegador (aquí se
  // omiten por falta de `document` global); este test verifica las reglas estáticas
  // (cssMatches) con una solución que SÍ escribe el CSS pedido.
  11: { html: "<p>Me encanta programar</p>", css: "p { color: red; }" },
  12: { html: "<div><h2>Mi tarjeta</h2></div>", css: "div { background-color: yellow; }" },
  13: { html: "<p>¡Soy gigante!</p>", css: "p { font-size: 40px; }" },
  14: { html: "<h1>Mi título</h1>", css: "h1 { text-align: center; }" },
  15: { html: "<p>Letras divertidas</p>", css: "p { font-family: monospace; }" },
  16: { html: "<p>Subraya esto</p>", css: "p { text-decoration: underline; }" },
  17: { html: "<div><p>Caja con borde</p></div>", css: "div { border: 4px solid black; }" },
  18: { html: "<div><p>Caja redondita</p></div>", css: "div { border-radius: 20px; }" },
  19: { html: "<div><p>Tengo aire</p></div>", css: "div { padding: 20px; }" },
  20: {
    html: "<div><h2>Mi tarjeta</h2><p>¡Hecha con CSS!</p></div>",
    css: "div { background-color: pink; padding: 20px; border-radius: 16px; text-align: center; }",
  },

  // Nivel 3 — HTML intermedio (tablas, formularios, semántica). Validación estructural.
  21: "<table><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>",
  22: "<table><tr><th>Fruta</th><th>Color</th></tr><tr><td>Manzana</td><td>Roja</td></tr></table>",
  23: '<form><input type="text"></form>',
  24: '<form><label>Nombre:</label><input type="text"></form>',
  25: '<form><input type="text"><button>Enviar</button></form>',
  26: "<form><textarea></textarea><select><option>Sí</option><option>No</option></select></form>",
  27: "<header>Mi sitio</header><nav>Inicio</nav><footer>Fin</footer>",
  28: "<main><section><article>Mi artículo</article></section></main>",
  29: '<figure><img src="x.jpg" alt="foto"><figcaption>Mi foto</figcaption></figure>',
  30: '<header><h1>Mi página</h1></header><main><table><tr><td>a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table></main><form><input type="text"><button>Enviar</button></form>',

  // Nivel 4 — CSS intermedio (flexbox, espaciado, sombras, efectos). Validación dual.
  31: { html: "<div><p>Uno</p><p>Dos</p><p>Tres</p></div>", css: "div { display: flex; }" },
  32: { html: "<div><p>Uno</p><p>Dos</p><p>Tres</p></div>", css: "div { display: flex; justify-content: space-between; }" },
  33: { html: "<div><p>Uno</p><p>Dos</p></div>", css: "div { display: flex; height: 120px; align-items: center; }" },
  34: { html: "<div><p>Uno</p><p>Dos</p><p>Tres</p></div>", css: "div { display: flex; gap: 16px; }" },
  35: { html: "<div><p>Tengo espacio fuera</p></div>", css: "div { background-color: #c4b5fd; margin: 30px; }" },
  36: { html: "<div><p>Caja con sombra</p></div>", css: "div { background-color: #fbcfe8; padding: 20px; box-shadow: 4px 4px 8px gray; }" },
  37: { html: "<div><p>Casi transparente</p></div>", css: "div { background-color: #6366f1; padding: 20px; opacity: 0.5; }" },
  38: { html: "<div><p>¡Girando!</p></div>", css: "div { background-color: #f59e0b; padding: 20px; transform: rotate(10deg); }" },
  39: {
    html: "<button>Pásame el cursor</button>",
    css: "button { background-color: #8b5cf6; color: white; padding: 12px; transition: 0.3s; } button:hover { background-color: #ec4899; }",
  },
  40: { html: "<div><p>Uno</p><p>Dos</p><p>Tres</p></div>", css: "div { display: flex; gap: 16px; box-shadow: 4px 4px 8px gray; }" },

  // Nivel 5 — Diseño responsive. Las reglas computedStyle (incl. viewport) solo
  // corren en el navegador; aquí se verifican las reglas estáticas (cssMatches).
  41: { html: "<div><p>Me adapto a la pantalla</p></div>", css: "div { background-color: #c4b5fd; width: 50%; }" },
  42: { html: '<h1>Mi paisaje favorito</h1><img src="https://picsum.photos/900/300" alt="Paisaje muy ancho">', css: "img { max-width: 100%; }" },
  43: { html: "<div><p>Tarjeta elástica</p></div>", css: "div { background-color: #a7f3d0; width: 100%; max-width: 400px; }" },
  44: { html: "<div><p>Cambio de color en celular</p></div>", css: "div { background-color: lightblue; padding: 20px; } @media (max-width: 600px) { div { background-color: orange; } }" },
  45: { html: '<h1>Mi blog</h1><img src="https://picsum.photos/200" alt="Foto decorativa"><p>Bienvenidos a mi página.</p>', css: "@media (max-width: 600px) { img { display: none; } }" },
  46: { html: "<h1>Bienvenidos a mi mundo</h1><p>Una página que se lee bien en todos lados.</p>", css: "h1 { font-size: 40px; } @media (max-width: 600px) { h1 { font-size: 24px; } }" },
  47: { html: "<div><p>Uno</p><p>Dos</p><p>Tres</p><p>Cuatro</p></div>", css: "div { display: flex; gap: 12px; flex-wrap: wrap; } p { background-color: #fbcfe8; padding: 12px; min-width: 120px; text-align: center; }" },
  48: { html: "<div><p>Uno</p><p>Dos</p><p>Tres</p></div>", css: "div { display: flex; gap: 12px; } p { background-color: #a7f3d0; padding: 14px; text-align: center; } @media (max-width: 600px) { div { flex-direction: column; } }" },
  49: { html: "<div><p>Mi tarjeta</p></div>", css: "div { display: flex; height: 100vh; justify-content: center; align-items: center; } p { background-color: #fbcfe8; padding: 20px; border-radius: 16px; }" },
  50: { html: "<h1>Mi galería</h1><div><p>Foto 1</p><p>Foto 2</p><p>Foto 3</p></div>", css: "p { background-color: #c4b5fd; padding: 20px; border-radius: 12px; text-align: center; } div { display: flex; gap: 16px; } @media (max-width: 600px) { div { flex-direction: column; } }" },

  // Nivel 6 — JavaScript. Las reglas domAfterJs solo corren en el navegador;
  // este test verifica las reglas estáticas (jsMatches) con soluciones reales.
  51: {
    html: '<h1 id="saludo">Zzz... estoy dormida</h1>',
    js: 'document.querySelector("#saludo").textContent = "¡Estoy viva!";',
  },
  52: {
    html: '<h2>Mi mascota</h2>\n<p id="mascota"></p>',
    js: 'let mascota = "gato";\ndocument.querySelector("#mascota").textContent = "Mi mascota es un " + mascota;',
  },
  53: {
    html: '<h2>La cuenta de las galletas</h2>\n<p id="resultado"></p>',
    js: 'let galletas = 4 * 3;\ndocument.querySelector("#resultado").textContent = "Tengo " + galletas + " galletas";',
  },
  54: {
    html: '<button id="boton">¡Púlsame!</button>\n<p id="mensaje">Esperando...</p>',
    js: 'document.querySelector("#boton").addEventListener("click", () => {\n  document.querySelector("#mensaje").textContent = "¡Hiciste clic!";\n});',
  },
  55: {
    html: '<h1 id="titulo">Mi página</h1>\n<button id="boton">Modo fiesta</button>',
    js: 'document.querySelector("#boton").addEventListener("click", () => {\n  document.querySelector("#titulo").style.color = "hotpink";\n  document.body.style.backgroundColor = "lightyellow";\n});',
  },
  56: {
    html: '<h2>El juego de puntos</h2>\n<p id="animo">???</p>',
    js: 'let puntos = 10;\nif (puntos >= 5) {\n  document.querySelector("#animo").textContent = "¡Ganaste!";\n} else {\n  document.querySelector("#animo").textContent = "Sigue intentando";\n}',
  },
  57: {
    html: '<h2>La escuela de magia</h2>\n<p id="hechizo">Esperando magia...</p>',
    js: 'function brillar() {\n  document.querySelector("#hechizo").textContent = "✨ ¡Magia! ✨";\n}\nbrillar();',
  },
  58: {
    html: '<h2>El aplausómetro</h2>\n<p id="aplausos">...</p>',
    js: 'let texto = "";\nfor (let i = 0; i < 5; i++) {\n  texto = texto + "👏";\n}\ndocument.querySelector("#aplausos").textContent = texto;',
  },
  59: {
    html: '<h2>Mi mochila</h2>\n<ul id="lista">\n  <li>Agua</li>\n</ul>',
    js: 'let nuevo = document.createElement("li");\nnuevo.textContent = "Linterna";\ndocument.querySelector("#lista").appendChild(nuevo);',
  },
  60: {
    html: '<h1 id="titulo">La puerta secreta</h1>\n<button id="boton">Usar la llave 🔑</button>\n<p id="mensaje">La puerta está cerrada.</p>',
    js: 'let llaves = 3;\ndocument.querySelector("#boton").addEventListener("click", () => {\n  if (llaves >= 1) {\n    document.querySelector("#mensaje").textContent = "¡La puerta se abrió!";\n    document.querySelector("#titulo").style.color = "green";\n  } else {\n    document.querySelector("#mensaje").textContent = "No tienes llaves...";\n  }\n});',
  },
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

  const solHtml = typeof solution === "string" ? solution : solution.html;
  const solCss = typeof solution === "string" ? "" : (solution.css ?? "");
  const solJs = typeof solution === "string" ? "" : (solution.js ?? "");

  // 1) La solución correcta debe pasar.
  const good = await validateOutput(solHtml, solCss, lesson.challenge.rules, solJs);
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
