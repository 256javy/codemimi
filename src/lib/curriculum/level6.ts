// Nivel 6 — JavaScript básico (Aventuras 51–60).
// Primer contacto con JS: el código del niño se inyecta al final del <body>,
// así que el DOM ya existe cuando se ejecuta (no hace falta enseñar eventos de carga).

import type { Lesson } from "../types";

export const LEVEL_6: Lesson[] = [
  {
    id: 51,
    level: 6,
    title: "¿Qué es JavaScript?",
    concept: "JavaScript da vida a la página: con document.querySelector y .textContent cambiamos un texto.",
    character: "byte",
    narrative: [
      { lines: ["¡Hola de nuevo! Soy Byte 🤖.", "Hoy empieza una aventura NUEVA: JavaScript."] },
      {
        lines: [
          "HTML construye la página y CSS la pinta.",
          "JavaScript la hace MOVERSE: es como darle vida.",
        ],
      },
      {
        lines: [
          "Nuestro primer hechizo: document.querySelector busca un elemento por su id.",
          "Y con .textContent le cambiamos el texto. ¡Vamos!",
        ],
      },
    ],
    demo: {
      beforeLabel: "Sin JavaScript: el título no cambia",
      beforeHtml: '<h1 id="saludo">Zzz... estoy dormida</h1>',
      afterLabel: "Con JavaScript: ¡el texto cambió solo!",
      afterHtml:
        '<h1 id="saludo">Zzz... estoy dormida</h1>\n<script>document.querySelector("#saludo").textContent = "¡Estoy viva! ⚡";</script>',
    },
    reference: {
      language: "js",
      code: 'document.querySelector("#saludo").textContent = "¡Estoy viva!";',
      annotations: [
        { fragment: "document", tip: "Representa toda tu página web." },
        { fragment: 'querySelector("#saludo")', tip: "Busca el elemento que tiene id=\"saludo\". El # significa «por id»." },
        { fragment: "textContent", tip: "El texto que hay dentro del elemento." },
        { fragment: "=", tip: "El signo igual le pone un valor nuevo." },
      ],
    },
    challenge: {
      instruction:
        'El título de la página está dormido. En la pestaña ⚡ JS, usa document.querySelector("#saludo") y .textContent para que diga: ¡Estoy viva!',
      cssEnabled: false,
      jsEnabled: true,
      startingHtml: '<h1 id="saludo">Zzz... estoy dormida</h1>',
      startingJs: "",
      rules: [
        {
          type: "jsMatches",
          pattern: "querySelector",
          message: "Usa document.querySelector para buscar el título.",
        },
        {
          type: "jsMatches",
          pattern: "textContent",
          message: "Falta .textContent para cambiar el texto del título.",
        },
        {
          type: "domAfterJs",
          selector: "#saludo",
          textContains: "viva",
          message: "El título debe terminar diciendo «¡Estoy viva!».",
        },
      ],
      hints: [
        'Empieza así: document.querySelector("#saludo")',
        "Después del paréntesis escribe .textContent = y el texto nuevo entre comillas.",
      ],
    },
    celebration: "¡INCREÍBLE! Tu primer hechizo de JavaScript funcionó. ⚡",
  },

  {
    id: 52,
    level: 6,
    title: "Variables: cajitas con datos",
    concept: "Con let creamos una variable: una cajita con nombre donde guardamos un dato.",
    character: "luna",
    narrative: [
      { lines: ["¡Hola! Soy Luna 🦊.", "En mis aventuras guardo cosas en mi mochila."] },
      {
        lines: [
          "En JavaScript guardamos datos en variables.",
          "Una variable es una cajita con nombre: let mascota = \"gato\";",
        ],
      },
      {
        lines: [
          "Después puedes usar la cajita por su nombre.",
          "¡Y mostrar lo que guarda en la página!",
        ],
      },
    ],
    demo: {
      beforeLabel: "Sin variable: el párrafo está vacío",
      beforeHtml: '<p id="mascota"></p>',
      afterLabel: "Con una variable: ¡la página muestra el dato guardado!",
      afterHtml:
        '<p id="mascota"></p>\n<script>let mascota = "gato";\ndocument.querySelector("#mascota").textContent = "Mi mascota es un " + mascota;</script>',
    },
    reference: {
      language: "js",
      code:
        'let mascota = "gato";\ndocument.querySelector("#mascota").textContent = "Mi mascota es un " + mascota;',
      annotations: [
        { fragment: "let", tip: "Crea una variable nueva: una cajita con nombre." },
        { fragment: "mascota", tip: "El nombre de la cajita. Tú lo eliges." },
        { fragment: '"gato"', tip: "El dato guardado. Los textos van entre comillas." },
        { fragment: "+ mascota", tip: "El + pega textos. Aquí añade lo que guarda la cajita." },
      ],
    },
    challenge: {
      instruction:
        'Crea una variable con let que guarde el texto "gato". Luego usa querySelector y textContent para que el párrafo #mascota diga: Mi mascota es un gato.',
      cssEnabled: false,
      jsEnabled: true,
      startingHtml: '<h2>Mi mascota</h2>\n<p id="mascota"></p>',
      startingJs: "",
      rules: [
        {
          type: "jsMatches",
          pattern: "\\blet\\s+\\w+\\s*=",
          message: "Crea una variable con let, por ejemplo: let mascota = \"gato\";",
        },
        {
          type: "jsMatches",
          pattern: "querySelector",
          message: "Usa document.querySelector para encontrar el párrafo #mascota.",
        },
        {
          type: "jsMatches",
          pattern: "textContent",
          message: "Falta .textContent para escribir el texto en el párrafo.",
        },
        {
          type: "domAfterJs",
          selector: "#mascota",
          textContains: "gato",
          message: "El párrafo #mascota debe terminar mencionando al gato.",
        },
      ],
      hints: [
        'Primera línea: let mascota = "gato";',
        'Segunda línea: busca "#mascota" con querySelector y usa + para pegar el texto con la variable.',
      ],
    },
    celebration: "¡Genial! Ya sabes guardar datos en cajitas mágicas. 📦",
  },

  {
    id: 53,
    level: 6,
    title: "Números y cuentas",
    concept: "JavaScript es una súper calculadora: suma (+), resta (-), multiplica (*) y divide (/).",
    character: "max",
    narrative: [
      { lines: ["¡Hey! Soy Max 🐙.", "Con ocho brazos, contar galletas es un lío."] },
      {
        lines: [
          "Por suerte JavaScript hace cuentas solo.",
          "Suma con +, resta con -, multiplica con * y divide con /.",
        ],
      },
      {
        lines: [
          "Los números NO llevan comillas: let galletas = 4 * 3;",
          "¡Y el resultado lo mostramos en la página!",
        ],
      },
    ],
    demo: {
      beforeLabel: "Sin JavaScript: nadie hace la cuenta",
      beforeHtml: '<p id="resultado">¿Cuántas galletas son 4 cajas de 3?</p>',
      afterLabel: "Con JavaScript: ¡la cuenta se hace sola!",
      afterHtml:
        '<p id="resultado">¿Cuántas galletas son 4 cajas de 3?</p>\n<script>let galletas = 4 * 3;\ndocument.querySelector("#resultado").textContent = "¡Son " + galletas + " galletas!";</script>',
    },
    reference: {
      language: "js",
      code:
        'let galletas = 4 * 3;\ndocument.querySelector("#resultado").textContent = "Tengo " + galletas + " galletas";',
      annotations: [
        { fragment: "4 * 3", tip: "El asterisco * multiplica. Esto guarda 12 en la variable." },
        { fragment: "let galletas", tip: "Una variable, pero esta vez guarda un número." },
        { fragment: "+ galletas +", tip: "Pega el número en medio del texto." },
      ],
    },
    challenge: {
      instruction:
        "Tienes 4 cajas con 3 galletas cada una. Guarda en una variable la multiplicación 4 * 3 y muestra el resultado en el párrafo #resultado.",
      cssEnabled: false,
      jsEnabled: true,
      startingHtml: '<h2>La cuenta de las galletas</h2>\n<p id="resultado"></p>',
      startingJs: "",
      rules: [
        {
          type: "jsMatches",
          pattern: "\\blet\\s+\\w+\\s*=",
          message: "Guarda la cuenta en una variable con let.",
        },
        {
          type: "jsMatches",
          pattern: "4\\s*\\*\\s*3|3\\s*\\*\\s*4",
          message: "Multiplica 4 * 3 con el asterisco (sin comillas: son números).",
        },
        {
          type: "jsMatches",
          pattern: "textContent",
          message: "Usa .textContent para mostrar el resultado en #resultado.",
        },
        {
          type: "domAfterJs",
          selector: "#resultado",
          textContains: "12",
          message: "El párrafo #resultado debe mostrar el resultado: 12.",
        },
      ],
      hints: [
        "Primera línea: let galletas = 4 * 3; (los números van sin comillas).",
        'Luego busca "#resultado" con querySelector y pega la variable al texto con +.',
      ],
    },
    celebration: "¡Perfecto! Tu página ya hace cuentas más rápido que una calculadora. 🧮",
  },

  {
    id: 54,
    level: 6,
    title: "Eventos: ¡botones que escuchan!",
    concept: "Con addEventListener(\"click\", ...) un botón reacciona cuando le hacen clic.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel al habla! 👾", "Hasta ahora tu JavaScript corría solo una vez."] },
      {
        lines: [
          "Con los eventos, la página ESPERA al usuario.",
          "addEventListener(\"click\", ...) significa: «cuando hagan clic, haz esto».",
        ],
      },
      {
        lines: [
          "El código que reacciona va dentro de () => { ... }.",
          "¡Vamos a despertar un botón!",
        ],
      },
    ],
    demo: {
      beforeLabel: "Sin evento: el botón no hace nada",
      beforeHtml: '<button id="boton">¡Púlsame!</button>\n<p id="mensaje">Esperando...</p>',
      afterLabel: "Con el evento: así queda el mensaje después del clic",
      afterHtml:
        '<button id="boton">¡Púlsame!</button>\n<p id="mensaje">Esperando...</p>\n<script>document.querySelector("#boton").addEventListener("click", () => {\n  document.querySelector("#mensaje").textContent = "¡Hiciste clic! 🎉";\n});\ndocument.querySelector("#boton").click();</script>',
    },
    reference: {
      language: "js",
      code:
        'document.querySelector("#boton").addEventListener("click", () => {\n  document.querySelector("#mensaje").textContent = "¡Hiciste clic!";\n});',
      annotations: [
        { fragment: "addEventListener", tip: "Le dice al botón: «quédate escuchando»." },
        { fragment: '"click"', tip: "El evento que espera: un clic del ratón." },
        { fragment: "() => {", tip: "Aquí dentro va lo que pasa cuando hacen clic." },
        { fragment: "});", tip: "Cierra el bloque del evento. ¡No lo olvides!" },
      ],
    },
    challenge: {
      instruction:
        'Haz que el botón #boton escuche con addEventListener("click", ...). Cuando le hagan clic, el párrafo #mensaje debe decir: ¡Hiciste clic!',
      cssEnabled: false,
      jsEnabled: true,
      startingHtml: '<button id="boton">¡Púlsame!</button>\n<p id="mensaje">Esperando...</p>',
      startingJs: "",
      rules: [
        {
          type: "jsMatches",
          pattern: "addEventListener",
          message: "Falta addEventListener para que el botón escuche.",
        },
        {
          type: "jsMatches",
          pattern: "[\"']click[\"']",
          message: 'El evento que espera el botón es "click" (entre comillas).',
        },
        {
          type: "jsMatches",
          pattern: "textContent",
          message: "Dentro del evento, usa .textContent para cambiar el mensaje.",
        },
        {
          type: "domAfterJs",
          clickSelector: "#boton",
          selector: "#mensaje",
          textContains: "clic",
          message: "Al hacer clic en el botón, #mensaje debe decir «¡Hiciste clic!». Prueba pulsándolo en la vista previa.",
        },
      ],
      hints: [
        'Empieza así: document.querySelector("#boton").addEventListener("click", () => {',
        "Dentro de las llaves { } cambia el textContent de #mensaje, y cierra con });",
      ],
    },
    celebration: "¡WOW! Tu botón ya escucha y responde. La página cobra vida. 🎉",
  },

  {
    id: 55,
    level: 6,
    title: "Cambiar estilos con JS",
    concept: "Con .style.color y .style.backgroundColor, JavaScript cambia los colores al instante.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel otra vez! 👾", "Ya sabes pintar con CSS... pero eso es fijo."] },
      {
        lines: [
          "Con JavaScript los colores pueden cambiar al hacer clic.",
          ".style.color cambia el color del texto.",
        ],
      },
      {
        lines: [
          "Y .style.backgroundColor cambia el fondo.",
          "Ojo: en JS se escribe junto y con B mayúscula. ¡Modo fiesta, allá vamos!",
        ],
      },
    ],
    demo: {
      beforeLabel: "Sin JS: los colores no cambian al hacer clic",
      beforeHtml: '<h1 id="titulo">Mi página</h1>\n<button id="boton">Modo fiesta</button>',
      afterLabel: "Con JS: así queda tras pulsar «Modo fiesta»",
      afterHtml:
        '<h1 id="titulo">Mi página</h1>\n<button id="boton">Modo fiesta</button>\n<script>document.querySelector("#boton").addEventListener("click", () => {\n  document.querySelector("#titulo").style.color = "hotpink";\n  document.body.style.backgroundColor = "lightyellow";\n});\ndocument.querySelector("#boton").click();</script>',
    },
    reference: {
      language: "js",
      code:
        'document.querySelector("#boton").addEventListener("click", () => {\n  document.querySelector("#titulo").style.color = "hotpink";\n  document.body.style.backgroundColor = "lightyellow";\n});',
      annotations: [
        { fragment: "style.color", tip: "Cambia el color del texto del elemento." },
        { fragment: "style.backgroundColor", tip: "Cambia el color de fondo. En JS va junto y con B mayúscula." },
        { fragment: '"hotpink"', tip: "El color nuevo, entre comillas." },
        { fragment: "document.body", tip: "El body de la página, sin necesidad de querySelector." },
      ],
    },
    challenge: {
      instruction:
        "Haz que al pulsar el botón #boton cambie el color del título #titulo con .style.color Y el fondo de la página con document.body.style.backgroundColor. Elige los colores que quieras.",
      cssEnabled: false,
      jsEnabled: true,
      startingHtml: '<h1 id="titulo">Mi página</h1>\n<button id="boton">Modo fiesta</button>',
      startingJs: "",
      rules: [
        {
          type: "jsMatches",
          pattern: "addEventListener",
          message: "El cambio debe ocurrir al hacer clic: usa addEventListener.",
        },
        {
          type: "jsMatches",
          pattern: "style\\.color",
          message: "Falta cambiar el color del título con .style.color.",
        },
        {
          type: "jsMatches",
          pattern: "style\\.backgroundColor",
          message: "Falta cambiar el fondo con .style.backgroundColor (junto y con B mayúscula).",
        },
        // El clic es idempotente (solo asigna colores), así que ambas reglas
        // pueden clickear sin acumular efectos.
        {
          type: "domAfterJs",
          clickSelector: "#boton",
          selector: "#titulo",
          styleProperty: "color",
          styleNotContains: "rgb(0, 0, 0)",
          message: "Al hacer clic, el título #titulo debería cambiar de color (elige uno distinto del negro).",
        },
        {
          type: "domAfterJs",
          clickSelector: "#boton",
          selector: "body",
          styleProperty: "background-color",
          styleNotContains: "rgba(0, 0, 0, 0)",
          message: "Al hacer clic, el fondo de la página debería cambiar con document.body.style.backgroundColor.",
        },
      ],
      hints: [
        "Es como la aventura anterior: addEventListener(\"click\", () => { ... }) en el botón.",
        'Dentro de las llaves: una línea con .style.color = "uncolor"; y otra con document.body.style.backgroundColor = "otrocolor";',
      ],
    },
    celebration: "¡Modo fiesta activado! Tus colores ahora bailan con un clic. 🎨",
  },

  {
    id: 56,
    level: 6,
    title: "Condicionales: la página decide",
    concept: "Con if y else el código toma decisiones: si pasa algo, haz esto; si no, haz lo otro.",
    character: "luna",
    narrative: [
      { lines: ["¡Soy Luna! 🦊", "En toda aventura hay que tomar decisiones."] },
      {
        lines: [
          "if significa «si»: si la condición se cumple, hace lo de sus llaves.",
          "else significa «si no»: lo que hace cuando NO se cumple.",
        ],
      },
      {
        lines: [
          "Por ejemplo: si tienes 5 puntos o más, ganaste.",
          "¡Vamos a hacer que la página decida sola!",
        ],
      },
    ],
    demo: {
      beforeLabel: "Sin condicional: la página no sabe qué decir",
      beforeHtml: '<p>Puntos: 10</p>\n<p id="animo">???</p>',
      afterLabel: "Con if/else: ¡la página decidió sola!",
      afterHtml:
        '<p>Puntos: 10</p>\n<p id="animo">???</p>\n<script>let puntos = 10;\nif (puntos >= 5) {\n  document.querySelector("#animo").textContent = "¡Ganaste! 🏆";\n} else {\n  document.querySelector("#animo").textContent = "Sigue intentando";\n}</script>',
    },
    reference: {
      language: "js",
      code:
        'let puntos = 10;\nif (puntos >= 5) {\n  document.querySelector("#animo").textContent = "¡Ganaste!";\n} else {\n  document.querySelector("#animo").textContent = "Sigue intentando";\n}',
      annotations: [
        { fragment: "if (puntos >= 5)", tip: "La condición: ¿puntos es mayor o igual que 5?" },
        { fragment: ">=", tip: "Significa «mayor o igual que»." },
        { fragment: "} else {", tip: "Lo que pasa cuando la condición NO se cumple." },
      ],
    },
    challenge: {
      instruction:
        "Ya tienes la variable puntos con valor 10. Escribe un if: si puntos >= 5, el párrafo #animo debe decir ¡Ganaste!; con else, que diga Sigue intentando.",
      cssEnabled: false,
      jsEnabled: true,
      startingHtml: '<h2>El juego de puntos</h2>\n<p id="animo">???</p>',
      startingJs: "let puntos = 10;\n// Escribe tu if aquí debajo\n",
      rules: [
        {
          type: "jsMatches",
          pattern: "\\bif\\s*\\(",
          message: "Falta el if con su condición entre paréntesis: if (puntos >= 5).",
        },
        {
          type: "jsMatches",
          pattern: "\\belse\\b",
          message: "Falta el else para cuando la condición no se cumple.",
        },
        {
          type: "jsMatches",
          pattern: "textContent",
          message: "Usa .textContent para escribir el mensaje en #animo.",
        },
        {
          type: "domAfterJs",
          selector: "#animo",
          textContains: "ganaste",
          message: "Con 10 puntos, #animo debería decir «¡Ganaste!». Revisa tu condición.",
        },
      ],
      hints: [
        "La forma es: if (puntos >= 5) { ... } else { ... }",
        "Dentro de cada bloque de llaves cambia el textContent de #animo con un mensaje distinto.",
      ],
    },
    celebration: "¡Brillante! Tu página ya sabe tomar decisiones sola. 🧠",
  },

  {
    id: 57,
    level: 6,
    title: "Funciones: hechizos con nombre",
    concept: "Una función guarda un bloque de código con nombre para usarlo cuando quieras.",
    character: "max",
    narrative: [
      { lines: ["¡Max de nuevo! 🐙", "Odio escribir lo mismo una y otra vez."] },
      {
        lines: [
          "Una función es un hechizo guardado con nombre.",
          "Se crea con: function brillar() { ... }",
        ],
      },
      {
        lines: [
          "Crearla no hace nada todavía.",
          "Para lanzar el hechizo, la llamas por su nombre: brillar();",
        ],
      },
    ],
    demo: {
      beforeLabel: "Función creada pero NO llamada: no pasa nada",
      beforeHtml:
        '<p id="hechizo">Esperando magia...</p>\n<script>function brillar() {\n  document.querySelector("#hechizo").textContent = "✨ ¡Magia! ✨";\n}</script>',
      afterLabel: "Función llamada con brillar(); — ¡el hechizo se lanza!",
      afterHtml:
        '<p id="hechizo">Esperando magia...</p>\n<script>function brillar() {\n  document.querySelector("#hechizo").textContent = "✨ ¡Magia! ✨";\n}\nbrillar();</script>',
    },
    reference: {
      language: "js",
      code:
        'function brillar() {\n  document.querySelector("#hechizo").textContent = "✨ ¡Magia! ✨";\n}\n\nbrillar();',
      annotations: [
        { fragment: "function brillar()", tip: "Crea una función llamada brillar. Aún no se ejecuta." },
        { fragment: "{", tip: "Entre las llaves va el código del hechizo." },
        { fragment: "brillar();", tip: "La llamada: aquí SÍ se ejecuta la función." },
      ],
    },
    challenge: {
      instruction:
        "Crea una función llamada brillar que cambie el texto de #hechizo a ✨ ¡Magia! ✨. Después llámala con brillar(); para lanzar el hechizo.",
      cssEnabled: false,
      jsEnabled: true,
      startingHtml: '<h2>La escuela de magia</h2>\n<p id="hechizo">Esperando magia...</p>',
      startingJs: "",
      rules: [
        {
          type: "jsMatches",
          pattern: "function\\s+brillar\\s*\\(",
          message: "Crea la función con: function brillar() { ... }",
        },
        {
          type: "jsMatches",
          pattern: "textContent",
          message: "Dentro de la función, usa .textContent para cambiar el texto de #hechizo.",
        },
        {
          type: "jsMatches",
          // Lookahead: no contar la declaración `function brillar() {` como llamada.
          pattern: "brillar\\s*\\(\\s*\\)(?!\\s*\\{)",
          message: "Creaste el hechizo, ¡pero falta lanzarlo! Llama a la función con brillar();",
        },
        {
          type: "domAfterJs",
          selector: "#hechizo",
          textContains: "magia",
          message: "El párrafo #hechizo debe terminar diciendo «✨ ¡Magia! ✨».",
        },
      ],
      hints: [
        "Primero: function brillar() { ... } con el cambio de texto dentro de las llaves.",
        "Después de la llave de cierre }, escribe brillar(); en una línea nueva.",
      ],
    },
    celebration: "¡Hechizo dominado! Ya guardas magia con nombre y la lanzas cuando quieres. 🪄",
  },

  {
    id: 58,
    level: 6,
    title: "Bucles for: repetir sin cansarse",
    concept: "El bucle for repite un bloque de código varias veces, contando con una variable.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel aquí! 👾", "¿Aplaudir 5 veces escribiendo 5 líneas? ¡Qué pereza!"] },
      {
        lines: [
          "El bucle for repite código por ti.",
          "for (let i = 0; i < 5; i++) significa: repite 5 veces.",
        ],
      },
      {
        lines: [
          "La variable i va contando: 0, 1, 2, 3, 4.",
          "¡Vamos a llenar la página de aplausos!",
        ],
      },
    ],
    demo: {
      beforeLabel: "Sin bucle: ni un aplauso",
      beforeHtml: '<p id="aplausos">...</p>',
      afterLabel: "Con un for: ¡5 aplausos sin esfuerzo!",
      afterHtml:
        '<p id="aplausos">...</p>\n<script>let texto = "";\nfor (let i = 0; i < 5; i++) {\n  texto = texto + "👏";\n}\ndocument.querySelector("#aplausos").textContent = texto;</script>',
    },
    reference: {
      language: "js",
      code:
        'let texto = "";\nfor (let i = 0; i < 5; i++) {\n  texto = texto + "👏";\n}\ndocument.querySelector("#aplausos").textContent = texto;',
      annotations: [
        { fragment: "let texto = \"\";", tip: "Empezamos con un texto vacío para ir llenándolo." },
        { fragment: "let i = 0", tip: "El contador empieza en 0." },
        { fragment: "i < 5", tip: "Repite mientras i sea menor que 5: o sea, 5 veces." },
        { fragment: "i++", tip: "Suma 1 al contador en cada vuelta." },
        { fragment: 'texto = texto + "👏"', tip: "En cada vuelta añade un aplauso al texto." },
      ],
    },
    challenge: {
      instruction:
        "Usa un bucle for que repita 5 veces para juntar 5 aplausos 👏 en una variable, y muestra el resultado en el párrafo #aplausos.",
      cssEnabled: false,
      jsEnabled: true,
      startingHtml: '<h2>El aplausómetro</h2>\n<p id="aplausos">...</p>',
      startingJs: 'let texto = "";\n// Escribe tu bucle for aquí debajo\n',
      rules: [
        {
          type: "jsMatches",
          pattern: "for\\s*\\(",
          message: "Falta el bucle: empieza con for ( ... ) { ... }.",
        },
        {
          type: "jsMatches",
          pattern: "<\\s*5|<=\\s*4",
          message: "El bucle debe repetir 5 veces: usa la condición i < 5.",
        },
        {
          type: "jsMatches",
          pattern: "textContent",
          message: "Al final, muestra el texto en #aplausos con .textContent.",
        },
        {
          type: "domAfterJs",
          selector: "#aplausos",
          textContains: "👏👏👏👏👏",
          message: "El párrafo #aplausos debe mostrar 5 aplausos 👏 seguidos.",
        },
      ],
      hints: [
        "El molde es: for (let i = 0; i < 5; i++) { ... }",
        'Dentro de las llaves: texto = texto + "👏"; y al salir del bucle muéstralo en #aplausos.',
      ],
    },
    celebration: "¡Bravo! 👏👏👏👏👏 Aprendiste a repetir sin cansarte. ¡El bucle trabaja por ti!",
  },

  {
    id: 59,
    level: 6,
    title: "Crear elementos nuevos",
    concept: "Con document.createElement creamos etiquetas nuevas y con appendChild las añadimos a la página.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte de vuelta! 🤖", "Hasta ahora solo cambiabas lo que ya existía."] },
      {
        lines: [
          "¡Hoy vamos a CONSTRUIR elementos nuevos con JS!",
          "document.createElement(\"li\") fabrica una etiqueta <li> nueva.",
        ],
      },
      {
        lines: [
          "Pero queda flotando, invisible.",
          "Con appendChild la colocamos dentro de la página. ¡A construir!",
        ],
      },
    ],
    demo: {
      beforeLabel: "La lista de la mochila, con un solo objeto",
      beforeHtml: '<ul id="lista">\n  <li>Agua</li>\n</ul>',
      afterLabel: "Con createElement + appendChild: ¡JS añadió la linterna!",
      afterHtml:
        '<ul id="lista">\n  <li>Agua</li>\n</ul>\n<script>let nuevo = document.createElement("li");\nnuevo.textContent = "Linterna";\ndocument.querySelector("#lista").appendChild(nuevo);</script>',
    },
    reference: {
      language: "js",
      code:
        'let nuevo = document.createElement("li");\nnuevo.textContent = "Linterna";\ndocument.querySelector("#lista").appendChild(nuevo);',
      annotations: [
        { fragment: 'createElement("li")', tip: "Fabrica una etiqueta <li> nueva, todavía invisible." },
        { fragment: 'nuevo.textContent = "Linterna";', tip: "Le pone texto al elemento recién creado." },
        { fragment: "appendChild(nuevo)", tip: "Coloca el elemento nuevo dentro de la lista. ¡Ahora sí se ve!" },
      ],
    },
    challenge: {
      instruction:
        'La mochila solo tiene Agua. Con createElement("li"), textContent y appendChild, añade un <li> nuevo que diga Linterna a la lista #lista.',
      cssEnabled: false,
      jsEnabled: true,
      startingHtml: '<h2>Mi mochila</h2>\n<ul id="lista">\n  <li>Agua</li>\n</ul>',
      startingJs: "",
      rules: [
        {
          type: "jsMatches",
          pattern: "createElement\\s*\\(\\s*[\"']li[\"']",
          message: 'Fabrica el elemento nuevo con document.createElement("li").',
        },
        {
          type: "jsMatches",
          pattern: "textContent",
          message: "Ponle texto al <li> nuevo con .textContent.",
        },
        {
          type: "jsMatches",
          pattern: "appendChild",
          message: "Falta appendChild para colocar el <li> dentro de la lista #lista.",
        },
        {
          type: "domAfterJs",
          selector: "#lista",
          textContains: "linterna",
          message: "La lista #lista debe terminar mostrando la Linterna.",
        },
      ],
      hints: [
        'Paso 1: let nuevo = document.createElement("li"); Paso 2: ponle texto con nuevo.textContent.',
        "Paso 3: busca #lista con querySelector y usa .appendChild(nuevo); para colgarlo dentro.",
      ],
    },
    celebration: "¡Excelente! Ya no solo cambias la página: ¡la construyes con código! 🏗️",
  },

  {
    id: 60,
    level: 6,
    title: "La puerta secreta (proyecto)",
    concept: "Proyecto integrador: un botón con evento, un condicional y cambios en la página.",
    character: "luna",
    narrative: [
      { lines: ["¡Llegaste al final, soy Luna! 🦊", "Esta es la última aventura de JavaScript."] },
      {
        lines: [
          "Vas a juntar TODO: variables, eventos, condicionales y cambios en la página.",
          "Construiremos una puerta secreta que solo se abre con llaves.",
        ],
      },
      {
        lines: [
          "Al pulsar el botón, un if decide: ¿hay llaves?",
          "Si las hay, la puerta se abre. ¡Demuestra tu magia!",
        ],
      },
    ],
    demo: {
      beforeLabel: "Sin JS: la puerta no responde",
      beforeHtml:
        '<h1 id="titulo">La puerta secreta</h1>\n<button id="boton">Usar la llave 🔑</button>\n<p id="mensaje">La puerta está cerrada.</p>',
      afterLabel: "Con JS: así queda tras pulsar el botón (con 3 llaves)",
      afterHtml:
        '<h1 id="titulo">La puerta secreta</h1>\n<button id="boton">Usar la llave 🔑</button>\n<p id="mensaje">La puerta está cerrada.</p>\n<script>let llaves = 3;\ndocument.querySelector("#boton").addEventListener("click", () => {\n  if (llaves >= 1) {\n    document.querySelector("#mensaje").textContent = "¡La puerta se abrió! 🎉";\n    document.querySelector("#titulo").style.color = "green";\n  } else {\n    document.querySelector("#mensaje").textContent = "No tienes llaves...";\n  }\n});\ndocument.querySelector("#boton").click();</script>',
    },
    reference: {
      language: "js",
      code:
        'let llaves = 3;\n\ndocument.querySelector("#boton").addEventListener("click", () => {\n  if (llaves >= 1) {\n    document.querySelector("#mensaje").textContent = "¡La puerta se abrió!";\n    document.querySelector("#titulo").style.color = "green";\n  } else {\n    document.querySelector("#mensaje").textContent = "No tienes llaves...";\n  }\n});',
      annotations: [
        { fragment: "let llaves = 3;", tip: "Una variable guarda cuántas llaves tienes." },
        { fragment: "addEventListener", tip: "El botón escucha el clic, como en la aventura 54." },
        { fragment: "if (llaves >= 1)", tip: "El condicional decide si la puerta se abre, como en la 56." },
        { fragment: "style.color", tip: "Un toque de color para celebrar, como en la 55." },
        { fragment: "} else {", tip: "El plan B: qué pasa si no hay llaves." },
      ],
    },
    challenge: {
      instruction:
        "Construye la puerta secreta: al pulsar #boton, un if comprueba si llaves >= 1. Si sí, #mensaje debe decir ¡La puerta se abrió! y el título #titulo cambia de color con .style.color. Con else, #mensaje dice No tienes llaves...",
      cssEnabled: false,
      jsEnabled: true,
      startingHtml:
        '<h1 id="titulo">La puerta secreta</h1>\n<button id="boton">Usar la llave 🔑</button>\n<p id="mensaje">La puerta está cerrada.</p>',
      startingJs: "let llaves = 3;\n// Escribe tu evento con el if aquí debajo\n",
      rules: [
        {
          type: "jsMatches",
          pattern: "addEventListener",
          message: "El botón #boton debe escuchar el clic con addEventListener.",
        },
        {
          type: "jsMatches",
          pattern: "\\bif\\s*\\(",
          message: "Falta el if que comprueba las llaves: if (llaves >= 1).",
        },
        {
          type: "jsMatches",
          pattern: "\\belse\\b",
          message: "Falta el else con el mensaje para cuando no hay llaves.",
        },
        {
          type: "jsMatches",
          pattern: "style\\.color",
          message: "Cuando la puerta se abre, cambia el color del título con .style.color.",
        },
        {
          type: "domAfterJs",
          clickSelector: "#boton",
          selector: "#mensaje",
          textContains: "se abrió",
          message: "Con 3 llaves, al pulsar el botón #mensaje debe decir «¡La puerta se abrió!».",
        },
      ],
      hints: [
        'Empieza igual que en la aventura 54: el botón con addEventListener("click", () => { ... }).',
        "Dentro del evento pon el if (llaves >= 1) { ... } else { ... } con los dos mensajes y el cambio de color.",
      ],
    },
    celebration:
      "¡FELICIDADES! 🚀 Terminaste el Nivel 6: tus páginas ya piensan, deciden y responden. ¡Eres un Creador de verdad!",
    badge: "creador",
  },
];
