// Nivel 2 — Introducción a CSS (Aventuras 11–20).
// Cada lección sigue la estructura de 5 pasos del PRD.

import type { Lesson } from "../types";

export const LEVEL_2: Lesson[] = [
  {
    id: 11,
    level: 2,
    title: "¿Qué es CSS?",
    concept: "CSS es el lenguaje que da estilo y color al HTML. Una regla se escribe: selector { propiedad: valor; }.",
    character: "pixel",
    narrative: [
      { lines: ["¡Hola! Soy Pixel 👾.", "¿Sabes que el HTML solo es el esqueleto de una página?"] },
      {
        lines: [
          "CSS es el lenguaje que le da colores y estilo.",
          "Una regla de CSS dice: «a este elemento, ponle esto».",
        ],
      },
      { lines: ["La regla se escribe así: selector { propiedad: valor; }", "¡Empecemos pintando el texto!"] },
    ],
    demo: {
      beforeLabel: "Sin CSS: texto en negro",
      beforeHtml: "<p>Me encanta programar</p>",
      afterLabel: "Con CSS: texto en rosa",
      afterHtml: "<p class=\"rosa\">Me encanta programar</p>",
      css: ".rosa { color: #e11d48; }",
    },
    reference: {
      language: "css",
      code: "p {\n  color: red;\n}",
      annotations: [
        { fragment: "p", tip: "El selector: le dice a qué elemento aplica la regla." },
        { fragment: "color", tip: "La propiedad que queremos cambiar." },
        { fragment: "red", tip: "El valor: el color que elegimos." },
      ],
    },
    challenge: {
      instruction: "Haz que el texto del párrafo sea rojo. Dentro de las llaves del selector p escribe: color: red;",
      cssEnabled: true,
      startingHtml: "<p>Me encanta programar</p>",
      startingCss: "p {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "color\\s*:\\s*red", message: "Dentro de las llaves de p escribe color: red;" },
        { type: "computedStyle", selector: "p", property: "color", contains: "rgb(255, 0, 0)", message: "El texto todavía no se ve rojo. Usa color: red;" },
      ],
      hints: [
        "La regla va dentro de las llaves: p { aquí }.",
        "Escribe la propiedad y el valor así: color: red;",
      ],
    },
    celebration: "¡Tu primera regla de CSS! Ya puedes pintar el texto de cualquier color. 🎨",
  },

  {
    id: 12,
    level: 2,
    title: "Fondos de colores",
    concept: "Con background-color pintamos el color de fondo de una caja o de la página.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel de vuelta! 👾", "Ahora le vamos a poner color de fondo a las cajas."] },
      {
        lines: [
          "La propiedad background-color cambia el fondo.",
          "Puedes usar nombres de color como yellow, blue o pink.",
        ],
      },
      { lines: ["Funciona con div, p, h1... ¡cualquier elemento!", "¡Hagamos una tarjeta amarilla!"] },
    ],
    demo: {
      beforeLabel: "Sin fondo: fondo blanco",
      beforeHtml: "<div><h2>Mi tarjeta</h2></div>",
      afterLabel: "Con fondo amarillo",
      afterHtml: "<div class=\"amarillo\"><h2>Mi tarjeta</h2></div>",
      css: ".amarillo { background-color: #fde68a; }",
    },
    reference: {
      language: "css",
      code: "div {\n  background-color: yellow;\n}",
      annotations: [
        { fragment: "div", tip: "El selector: aplica la regla a todos los div." },
        { fragment: "background-color", tip: "La propiedad que cambia el color de fondo." },
        { fragment: "yellow", tip: "El valor: el color amarillo." },
      ],
    },
    challenge: {
      instruction: "Pinta el fondo del div de amarillo. Escribe: background-color: yellow;",
      cssEnabled: true,
      startingHtml: "<div>\n  <h2>Mi tarjeta</h2>\n</div>",
      startingCss: "div {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "background-color\\s*:\\s*yellow", message: "Escribe background-color: yellow; dentro del selector div." },
        { type: "computedStyle", selector: "div", property: "background-color", contains: "rgb(255, 255, 0)", message: "El fondo todavía no es amarillo. Usa background-color: yellow;" },
      ],
      hints: [
        "La propiedad del fondo es background-color.",
        "Escríbela así: background-color: yellow;",
      ],
    },
    celebration: "¡Qué bonito! Tu caja ya tiene color de fondo. 🌈",
  },

  {
    id: 13,
    level: 2,
    title: "El tamaño del texto",
    concept: "Con font-size hacemos el texto más grande o más pequeño. Se mide en píxeles (px).",
    character: "byte",
    narrative: [
      { lines: ["¡Byte aquí! 🤖", "Los robots calibramos todo con precisión, ¡incluso el texto!"] },
      {
        lines: [
          "Con font-size controlamos el tamaño de las letras.",
          "Se mide en píxeles: 16px es normal, 40px es ¡gigante!",
        ],
      },
      { lines: ["Cuanto más px, más grande es el texto.", "¡Probemos hacer un texto enorme!"] },
    ],
    demo: {
      beforeLabel: "Texto de tamaño normal",
      beforeHtml: "<p>¡Soy gigante!</p>",
      afterLabel: "Texto más grande con font-size",
      afterHtml: "<p class=\"grande\">¡Soy gigante!</p>",
      css: ".grande { font-size: 40px; }",
    },
    reference: {
      language: "css",
      code: "p {\n  font-size: 40px;\n}",
      annotations: [
        { fragment: "p", tip: "El selector: aplica la regla a todos los párrafos." },
        { fragment: "font-size", tip: "La propiedad que controla el tamaño del texto." },
        { fragment: "40px", tip: "El valor: 40 píxeles de alto para las letras." },
      ],
    },
    challenge: {
      instruction: "Haz el texto más grande. Escribe: font-size: 40px;",
      cssEnabled: true,
      startingHtml: "<p>¡Soy gigante!</p>",
      startingCss: "p {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "font-size\\s*:\\s*40px", message: "Escribe font-size: 40px; dentro del selector p." },
        { type: "computedStyle", selector: "p", property: "font-size", contains: "40px", message: "El texto todavía no es más grande. Usa font-size: 40px;" },
      ],
      hints: [
        "El tamaño se mide en píxeles: px.",
        "Escríbelo así: font-size: 40px;",
      ],
    },
    celebration: "¡ENORME! Ya controlas el tamaño de tus letras como un pro. 🔍",
  },

  {
    id: 14,
    level: 2,
    title: "Centrar el texto",
    concept: "Con text-align decidimos si el texto va a la izquierda, al centro o a la derecha.",
    character: "max",
    narrative: [
      { lines: ["¡Max al habla! 🐙", "Con mis tentáculos pongo cada cosa exactamente donde quiero."] },
      {
        lines: [
          "text-align decide dónde va el texto: left, center o right.",
          "Por defecto el texto va a la izquierda.",
        ],
      },
      { lines: ["Con center lo ponemos justo en el medio.", "¡Los títulos quedan geniales centrados!"] },
    ],
    demo: {
      beforeLabel: "Título a la izquierda",
      beforeHtml: "<h1>Mi título</h1>",
      afterLabel: "Título centrado",
      afterHtml: "<h1 class=\"centro\">Mi título</h1>",
      css: ".centro { text-align: center; }",
    },
    reference: {
      language: "css",
      code: "h1 {\n  text-align: center;\n}",
      annotations: [
        { fragment: "h1", tip: "El selector: aplica la regla al título h1." },
        { fragment: "text-align", tip: "La propiedad que controla la alineación del texto." },
        { fragment: "center", tip: "El valor: coloca el texto en el centro." },
      ],
    },
    challenge: {
      instruction: "Centra el título. Escribe: text-align: center;",
      cssEnabled: true,
      startingHtml: "<h1>Mi título</h1>",
      startingCss: "h1 {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "text-align\\s*:\\s*center", message: "Escribe text-align: center; dentro del selector h1." },
        { type: "computedStyle", selector: "h1", property: "text-align", contains: "center", message: "El título todavía no está centrado. Usa text-align: center;" },
      ],
      hints: [
        "La propiedad para alinear es text-align.",
        "Para el centro: text-align: center;",
      ],
    },
    celebration: "¡Perfecto equilibrio! Tu título está justo en el centro. ⚖️",
  },

  {
    id: 15,
    level: 2,
    title: "Tipos de letra",
    concept: "Con font-family cambiamos el tipo de letra (la fuente) del texto.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel de nuevo! 👾", "¿Sabías que hay muchos tipos de letra diferentes?"] },
      {
        lines: [
          "Con font-family elegimos la fuente del texto.",
          "monospace, serif, sans-serif... ¡cada una tiene personalidad!",
        ],
      },
      { lines: ["monospace hace que todas las letras tengan el mismo ancho.", "¡Es la que usan los programadores!"] },
    ],
    demo: {
      beforeLabel: "Letra normal del navegador",
      beforeHtml: "<p>Letras divertidas</p>",
      afterLabel: "Letra monospace (de programador)",
      afterHtml: "<p class=\"mono\">Letras divertidas</p>",
      css: ".mono { font-family: monospace; }",
    },
    reference: {
      language: "css",
      code: "p {\n  font-family: monospace;\n}",
      annotations: [
        { fragment: "p", tip: "El selector: aplica la regla a todos los párrafos." },
        { fragment: "font-family", tip: "La propiedad que cambia el tipo de letra." },
        { fragment: "monospace", tip: "El valor: una fuente donde todas las letras tienen el mismo ancho." },
      ],
    },
    challenge: {
      instruction: "Cambia el tipo de letra. Escribe: font-family: monospace;",
      cssEnabled: true,
      startingHtml: "<p>Letras divertidas</p>",
      startingCss: "p {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "font-family\\s*:\\s*monospace", message: "Escribe font-family: monospace; dentro del selector p." },
        { type: "computedStyle", selector: "p", property: "font-family", contains: "monospace", message: "La letra todavía no cambió. Usa font-family: monospace;" },
      ],
      hints: [
        "La propiedad del tipo de letra es font-family.",
        "Prueba con: font-family: monospace;",
      ],
    },
    celebration: "¡Qué tipografía tan chula! Ahora sabes cambiar el tipo de letra. ✍️",
  },

  {
    id: 16,
    level: 2,
    title: "Decora el texto",
    concept: "Con text-decoration podemos subrayar el texto (underline) o quitarle líneas.",
    character: "luna",
    narrative: [
      { lines: ["¡Hola! Soy Luna 🦊.", "Me encanta decorar mis notas de aventura."] },
      {
        lines: [
          "text-decoration le pone adornos al texto.",
          "underline añade una línea debajo, como en los enlaces.",
        ],
      },
      { lines: ["También puedes usar none para quitar decoraciones.", "¡Probemos subrayar un párrafo!"] },
    ],
    demo: {
      beforeLabel: "Texto sin decoración",
      beforeHtml: "<p>Subraya esto</p>",
      afterLabel: "Texto subrayado",
      afterHtml: "<p class=\"sub\">Subraya esto</p>",
      css: ".sub { text-decoration: underline; }",
    },
    reference: {
      language: "css",
      code: "p {\n  text-decoration: underline;\n}",
      annotations: [
        { fragment: "p", tip: "El selector: aplica la regla a todos los párrafos." },
        { fragment: "text-decoration", tip: "La propiedad que añade adornos al texto." },
        { fragment: "underline", tip: "El valor: pone una línea debajo del texto." },
      ],
    },
    challenge: {
      instruction: "Subraya el texto. Escribe: text-decoration: underline;",
      cssEnabled: true,
      startingHtml: "<p>Subraya esto</p>",
      startingCss: "p {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "text-decoration\\s*:\\s*underline", message: "Escribe text-decoration: underline; dentro del selector p." },
        { type: "computedStyle", selector: "p", property: "text-decoration", contains: "underline", message: "El texto todavía no está subrayado. Usa text-decoration: underline;" },
      ],
      hints: [
        "La propiedad para decorar el texto es text-decoration.",
        "Para subrayar: text-decoration: underline;",
      ],
    },
    celebration: "¡Listo! Tu texto ahora lleva su subrayado de aventurera. 🦊",
  },

  {
    id: 17,
    level: 2,
    title: "Bordes para las cajas",
    concept: "Con border le ponemos un borde a una caja: grosor, estilo y color, así: 4px solid black.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte aquí! 🤖", "Los robots amamos los bordes: hacen todo más ordenado."] },
      {
        lines: [
          "La propiedad border dibuja un marco alrededor de una caja.",
          "Tiene tres partes: grosor, estilo y color.",
        ],
      },
      { lines: ["Por ejemplo: 4px solid black.", "¡4 píxeles, línea sólida, color negro!"] },
    ],
    demo: {
      beforeLabel: "Caja sin borde",
      beforeHtml: "<div><p>Caja con borde</p></div>",
      afterLabel: "Caja con borde morado",
      afterHtml: "<div class=\"conborde\"><p>Caja con borde</p></div>",
      css: ".conborde { border: 4px solid #8b5cf6; }",
    },
    reference: {
      language: "css",
      code: "div {\n  border: 4px solid black;\n}",
      annotations: [
        { fragment: "div", tip: "El selector: aplica la regla a todos los div." },
        { fragment: "border", tip: "La propiedad que dibuja un marco alrededor del elemento." },
        { fragment: "4px solid black", tip: "El valor: 4 píxeles de grosor, línea sólida, color negro." },
      ],
    },
    challenge: {
      instruction: "Ponle un borde al div. Escribe: border: 4px solid black;",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Caja con borde</p>\n</div>",
      startingCss: "div {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "border\\s*:\\s*\\d+px\\s+solid", message: "Escribe el borde así: border: 4px solid black;" },
        { type: "computedStyle", selector: "div", property: "border-top-style", contains: "solid", message: "La caja todavía no tiene borde. Usa border: 4px solid black;" },
      ],
      hints: [
        "El borde tiene 3 partes: grosor, estilo y color.",
        "Escríbelo así: border: 4px solid black;",
      ],
    },
    celebration: "¡Bien encuadrado! Tu caja ahora tiene un borde perfecto. 🔲",
  },

  {
    id: 18,
    level: 2,
    title: "Esquinas redondeadas",
    concept: "Con border-radius redondeamos las esquinas de una caja. Cuanto más px, más redondo.",
    character: "luna",
    narrative: [
      { lines: ["¡Luna aquí! 🦊", "Las esquinas afiladas son aburridas, ¿no?"] },
      {
        lines: [
          "border-radius redondea las esquinas de una caja.",
          "Con 20px ya se nota la diferencia.",
        ],
      },
      { lines: ["Con valores más grandes puedes hacer hasta círculos.", "¡Hagamos una caja redondita!"] },
    ],
    demo: {
      beforeLabel: "Caja con esquinas cuadradas",
      beforeHtml: "<div>Caja cuadrada</div>",
      afterLabel: "Caja con esquinas redondeadas",
      afterHtml: "<div class=\"redonda\">Caja redondita</div>",
      css: "div { background-color: #c4b5fd; padding: 12px; } .redonda { border-radius: 20px; }",
    },
    reference: {
      language: "css",
      code: "div {\n  border-radius: 20px;\n}",
      annotations: [
        { fragment: "div", tip: "El selector: aplica la regla a todos los div." },
        { fragment: "border-radius", tip: "La propiedad que redondea las esquinas." },
        { fragment: "20px", tip: "El valor: cuánto se redondean las esquinas en píxeles." },
      ],
    },
    challenge: {
      instruction: "Redondea las esquinas de la caja. Escribe: border-radius: 20px;",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Caja redondita</p>\n</div>",
      startingCss: "div {\n  background-color: #c4b5fd;\n  padding: 16px;\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "border-radius\\s*:\\s*20px", message: "Escribe border-radius: 20px; dentro del selector div." },
        { type: "computedStyle", selector: "div", property: "border-radius", contains: "20px", message: "Las esquinas todavía no están redondeadas. Usa border-radius: 20px;" },
      ],
      hints: [
        "La propiedad para redondear es border-radius.",
        "Prueba con: border-radius: 20px;",
      ],
    },
    celebration: "¡Suavecito! Las esquinas redondeadas le dan un toque especial a tu caja. 🔮",
  },

  {
    id: 19,
    level: 2,
    title: "Espacio interior",
    concept: "Con padding damos aire DENTRO de la caja, entre el borde y el contenido.",
    character: "max",
    narrative: [
      { lines: ["¡Max aquí! 🐙", "¿Sabes qué pasa cuando el texto queda pegado al borde?"] },
      {
        lines: [
          "Se ve apretado y es difícil de leer.",
          "Con padding damos espacio interior: entre el borde y el contenido.",
        ],
      },
      { lines: ["Cuanto más px, más aire tiene la caja.", "¡Dale respiro a tu contenido!"] },
    ],
    demo: {
      beforeLabel: "Sin espacio interior",
      beforeHtml: "<div>Sin aire</div>",
      afterLabel: "Con espacio interior (padding)",
      afterHtml: "<div class=\"aire\">Con aire</div>",
      css: "div { background-color: #a7f3d0; } .aire { padding: 20px; }",
    },
    reference: {
      language: "css",
      code: "div {\n  padding: 20px;\n}",
      annotations: [
        { fragment: "div", tip: "El selector: aplica la regla a todos los div." },
        { fragment: "padding", tip: "La propiedad que da espacio interior a la caja." },
        { fragment: "20px", tip: "El valor: 20 píxeles de espacio en todos los lados." },
      ],
    },
    challenge: {
      instruction: "Dale espacio interior a la caja. Escribe: padding: 20px;",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Tengo aire</p>\n</div>",
      startingCss: "div {\n  background-color: #a7f3d0;\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "padding\\s*:\\s*20px", message: "Escribe padding: 20px; dentro del selector div." },
        { type: "computedStyle", selector: "div", property: "padding-top", contains: "20px", message: "La caja todavía no tiene espacio interior. Usa padding: 20px;" },
      ],
      hints: [
        "El espacio interior se llama padding.",
        "Escríbelo así: padding: 20px;",
      ],
    },
    celebration: "¡Qué cómodo! Tu caja ahora tiene todo el espacio que necesita. 🌿",
  },

  {
    id: 20,
    level: 2,
    title: "Mi tarjeta con estilo",
    concept: "Proyecto integrador: combina background-color, padding, border-radius y text-align en una tarjeta.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel aquí! 👾", "¡Esta es la última aventura del Nivel 2!"] },
      {
        lines: [
          "Has aprendido colores, tamaños, bordes y espacios.",
          "¡Ahora vamos a combinarlo todo en una tarjeta increíble!",
        ],
      },
      { lines: ["Usa background-color, padding, border-radius y text-align.", "¡Demuestra todo tu talento de artista CSS!"] },
    ],
    demo: {
      beforeLabel: "Tarjeta sin estilo",
      beforeHtml: "<div>\n  <h2>Mi tarjeta</h2>\n  <p>Sin estilo</p>\n</div>",
      afterLabel: "Tarjeta con todo el estilo",
      afterHtml: "<div class=\"tarjeta\">\n  <h2>Mi tarjeta</h2>\n  <p>¡Con estilo!</p>\n</div>",
      css: ".tarjeta { background-color: #fbcfe8; padding: 20px; border-radius: 16px; text-align: center; }",
    },
    reference: {
      language: "css",
      code: "div {\n  background-color: pink;\n  padding: 20px;\n  border-radius: 16px;\n  text-align: center;\n}",
      annotations: [
        { fragment: "background-color", tip: "El color de fondo de la tarjeta." },
        { fragment: "padding", tip: "El espacio interior entre el borde y el contenido." },
        { fragment: "border-radius", tip: "El redondeo de las esquinas." },
        { fragment: "text-align", tip: "La alineación del texto: center lo centra." },
      ],
    },
    challenge: {
      instruction: "Diseña tu tarjeta: dale un background-color, un padding, un border-radius y centra el texto con text-align: center.",
      cssEnabled: true,
      startingHtml: "<div>\n  <h2>Mi tarjeta</h2>\n  <p>¡Hecha con CSS!</p>\n</div>",
      startingCss: "div {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "background-color\\s*:", message: "Tu tarjeta necesita un color de fondo: background-color." },
        { type: "cssMatches", pattern: "padding\\s*:", message: "Dale espacio interior con padding." },
        { type: "cssMatches", pattern: "border-radius\\s*:", message: "Redondea las esquinas con border-radius." },
        { type: "cssMatches", pattern: "text-align\\s*:\\s*center", message: "Centra el texto con text-align: center;" },
        { type: "computedStyle", selector: "div", property: "text-align", contains: "center", message: "El texto todavía no está centrado. Usa text-align: center;" },
      ],
      hints: [
        "Ve agregando una propiedad a la vez dentro de div { }.",
        "Por ejemplo: background-color: pink; luego padding: 20px; etc.",
      ],
    },
    celebration: "¡FELICIDADES! 🎉 Terminaste el Nivel 2 y ya eres todo un Artista del CSS. 🎨",
    badge: "artista-css",
  },
];
