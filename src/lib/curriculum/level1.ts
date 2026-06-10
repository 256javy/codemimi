// Nivel 1 — Fundamentos de HTML (Aventuras 1–10).
// Cada lección sigue la estructura de 5 pasos del PRD.

import type { Lesson } from "../types";

export const LEVEL_1: Lesson[] = [
  {
    id: 1,
    level: 1,
    title: "¿Qué es HTML?",
    concept: "HTML es el lenguaje con el que se construyen las páginas web.",
    character: "byte",
    narrative: [
      { lines: ["¡Hola! Soy Byte 🤖.", "Hoy vamos a descubrir un lenguaje secreto: HTML."] },
      {
        lines: [
          "HTML son instrucciones que le damos al navegador.",
          "Con ellas le decimos qué mostrar: títulos, textos, imágenes...",
        ],
      },
      { lines: ["Cada instrucción se escribe dentro de una etiqueta.", "¡Vamos a escribir nuestra primera!"] },
    ],
    demo: {
      beforeLabel: "Sin HTML: todo amontonado",
      beforeHtml:
        "Mi mascota Mi perro Rex es café y le encanta correr en el parque todas las mañanas.",
      afterLabel: "Con HTML: ¡ordenado!",
      afterHtml:
        "<h1>Mi mascota</h1>\n<p>Mi perro Rex es café y le encanta correr en el parque todas las mañanas.</p>",
    },
    reference: {
      language: "html",
      code: "<p>Hola mundo</p>",
      annotations: [
        { fragment: "<p>", tip: "Etiqueta de apertura: empieza un párrafo." },
        { fragment: "</p>", tip: "Etiqueta de cierre: termina el párrafo." },
      ],
    },
    challenge: {
      instruction: "Escribe un párrafo con la etiqueta <p> que diga: ¡Hola, soy programador!",
      cssEnabled: false,
      startingHtml: "",
      rules: [
        { type: "elementExists", selector: "p", message: "Necesitas una etiqueta <p>…</p>." },
        {
          type: "textContains",
          selector: "p",
          text: "hola",
          message: "El párrafo debe saludar diciendo «hola».",
        },
      ],
      hints: [
        "Recuerda abrir con <p> y cerrar con </p>.",
        "El texto va entre la etiqueta de apertura y la de cierre.",
      ],
    },
    celebration: "¡Increíble! Escribiste tu primera línea de HTML de verdad. 🎉",
    badge: "primer-codigo",
  },

  {
    id: 2,
    level: 1,
    title: "El esqueleto de una página",
    concept: "Toda página tiene una estructura: <!DOCTYPE html>, <html>, <head> y <body>.",
    character: "byte",
    narrative: [
      { lines: ["¡Volví! Soy Byte 🤖.", "A los robots nos encanta el orden."] },
      {
        lines: [
          "Cada página web tiene un esqueleto.",
          "<head> guarda info secreta y <body> guarda lo que se ve.",
        ],
      },
      { lines: ["Y arriba del todo va <!DOCTYPE html>.", "¡Así el navegador sabe que es HTML moderno!"] },
    ],
    demo: {
      beforeLabel: "Contenido sin estructura",
      beforeHtml: "Mi diario Hoy aprendí a programar y me divertí mucho",
      afterLabel: "Organizado dentro del <body>",
      afterHtml: "<h1>Mi diario</h1>\n<p>Hoy aprendí a programar y me divertí mucho.</p>",
    },
    reference: {
      language: "html",
      code:
        "<!DOCTYPE html>\n<html>\n  <head></head>\n  <body>\n    <p>¡Hola!</p>\n  </body>\n</html>",
      annotations: [
        { fragment: "<!DOCTYPE html>", tip: "Le avisa al navegador que esto es HTML." },
        { fragment: "<html>", tip: "Contiene toda la página dentro." },
        { fragment: "<head>", tip: "Guarda información que no se ve en la pantalla." },
        { fragment: "<body>", tip: "Aquí va todo lo que SÍ se ve." },
      ],
    },
    challenge: {
      instruction:
        "Completa el esqueleto: dentro de <body> escribe un párrafo <p> que diga ¡Mi primera página!",
      cssEnabled: false,
      startingHtml:
        "<!DOCTYPE html>\n<html>\n  <head></head>\n  <body>\n    \n  </body>\n</html>",
      rules: [
        { type: "elementExists", selector: "body", message: "El esqueleto necesita una etiqueta <body>." },
        {
          type: "elementExists",
          selector: "body p",
          message: "El párrafo <p> debe ir dentro de <body>.",
        },
        {
          type: "textContains",
          selector: "p",
          text: "primera",
          message: "El párrafo debe decir «¡Mi primera página!».",
        },
      ],
      hints: [
        "Escribe el <p> entre <body> y </body>.",
        "Recuerda cerrar el párrafo con </p>.",
      ],
    },
    celebration: "¡Bien hecho! Ya sabes armar el esqueleto de cualquier página. 🦴",
  },

  {
    id: 3,
    level: 1,
    title: "Títulos grandes y pequeños",
    concept: "Los encabezados van de <h1> (el más grande) a <h6> (el más pequeño).",
    character: "luna",
    narrative: [
      { lines: ["¡Hola! Soy Luna 🦊.", "Me encanta organizar mis aventuras con títulos."] },
      {
        lines: [
          "<h1> es el título más importante y grande.",
          "Luego <h2>, <h3>... hasta <h6>, cada vez más pequeños.",
        ],
      },
      { lines: ["Usar títulos ayuda a ordenar la página.", "¡Como capítulos de un libro!"] },
    ],
    demo: {
      beforeLabel: "Todo del mismo tamaño",
      beforeHtml: "<p>Mi diario</p>\n<p>Lunes</p>",
      afterLabel: "Con jerarquía de títulos",
      afterHtml: "<h1>Mi diario</h1>\n<h2>Lunes</h2>",
    },
    reference: {
      language: "html",
      code: "<h1>Título principal</h1>\n<h2>Subtítulo</h2>\n<h3>Sección</h3>",
      annotations: [
        { fragment: "<h1>", tip: "El título más grande e importante. Suele haber solo uno." },
        { fragment: "<h2>", tip: "Un subtítulo, un poco más pequeño." },
        { fragment: "<h3>", tip: "Una sección aún más pequeña." },
      ],
    },
    challenge: {
      instruction:
        "Crea un título principal <h1> con el texto Mi Aventura y debajo un <h2> que diga Capítulo 1.",
      cssEnabled: false,
      startingHtml: "",
      rules: [
        {
          type: "textContains",
          selector: "h1",
          text: "mi aventura",
          message: "El <h1> debe decir «Mi Aventura».",
        },
        {
          type: "textContains",
          selector: "h2",
          text: "capítulo 1",
          message: "El <h2> debe decir «Capítulo 1».",
        },
        {
          type: "elementCount",
          selector: "h1",
          exact: 1,
          message: "Recuerda: solo debe haber un <h1> principal.",
        },
      ],
      hints: [
        "Empieza con <h1>Mi Aventura</h1>.",
        "El subtítulo usa <h2>…</h2>, que es más pequeño.",
      ],
    },
    celebration: "¡Genial! Tus títulos ya tienen orden, como un libro. 📚",
  },

  {
    id: 4,
    level: 1,
    title: "Párrafos y saltos de línea",
    concept: "Los textos van en <p> y para bajar de renglón se usa <br>.",
    character: "max",
    narrative: [
      { lines: ["¡Hey! Soy Max 🐙.", "Con mis ocho brazos escribo muchííísimo texto."] },
      {
        lines: [
          "Cada idea va en su propio párrafo <p>.",
          "Así el texto se lee ordenado y con espacios.",
        ],
      },
      { lines: ["¿Y si quiero bajar un renglón sin cambiar de párrafo?", "Uso <br>, que hace un salto de línea."] },
    ],
    demo: {
      beforeLabel: "Todo pegado en una línea",
      beforeHtml: "<p>Línea uno Línea dos</p>",
      afterLabel: "Con salto de línea",
      afterHtml: "<p>Línea uno<br>Línea dos</p>",
    },
    reference: {
      language: "html",
      code: "<p>Primer párrafo.</p>\n<p>Segundo<br>con salto.</p>",
      annotations: [
        { fragment: "<p>", tip: "Empieza un nuevo párrafo de texto." },
        { fragment: "<br>", tip: "Salto de línea: baja al siguiente renglón. No necesita cierre." },
      ],
    },
    challenge: {
      instruction:
        "Escribe dos párrafos <p>. En el primero usa un <br> para partir el texto en dos renglones.",
      cssEnabled: false,
      startingHtml: "",
      rules: [
        {
          type: "elementCount",
          selector: "p",
          min: 2,
          message: "Necesitas al menos dos párrafos <p>.",
        },
        {
          type: "htmlMatches",
          pattern: "<br\\s*/?>",
          message: "Falta el salto de línea <br> dentro del primer párrafo.",
        },
      ],
      hints: [
        "Escribe dos bloques: <p>…</p> y otro <p>…</p>.",
        "El <br> va en medio del texto, donde quieres bajar de renglón.",
      ],
    },
    celebration: "¡Perfecto! Ahora tu texto respira con párrafos y saltos. 🐙",
  },

  {
    id: 5,
    level: 1,
    title: "Texto con estilo",
    concept: "Resalta palabras con <strong> (fuerte), <em> (énfasis) y <mark> (marcador).",
    character: "pixel",
    narrative: [
      { lines: ["¡Buenas! Soy Pixel 👾.", "Soy un alien artista y me encanta destacar cosas."] },
      {
        lines: [
          "<strong> pone el texto en negrita: ¡muy importante!",
          "<em> lo pone en cursiva, con énfasis.",
        ],
      },
      { lines: ["Y <mark> es como un resaltador de colores.", "¡Vamos a darle vida a las palabras!"] },
    ],
    demo: {
      beforeLabel: "Texto plano",
      beforeHtml: "<p>Esto es muy importante.</p>",
      afterLabel: "Con palabras destacadas",
      afterHtml: "<p>Esto es <strong>muy importante</strong>.</p>",
    },
    reference: {
      language: "html",
      code:
        "<p>Texto <strong>fuerte</strong>, <em>con énfasis</em> y <mark>resaltado</mark>.</p>",
      annotations: [
        { fragment: "<strong>", tip: "Pone el texto en negrita: algo muy importante." },
        { fragment: "<em>", tip: "Pone el texto en cursiva: le da énfasis." },
        { fragment: "<mark>", tip: "Resalta el texto como con un marcador de colores." },
      ],
    },
    challenge: {
      instruction:
        "Escribe un párrafo <p> y dentro destaca una palabra con <strong> y otra con <mark>.",
      cssEnabled: false,
      startingHtml: "<p>Mi color favorito es el azul.</p>",
      rules: [
        { type: "elementExists", selector: "p", message: "Todo debe ir dentro de un párrafo <p>." },
        {
          type: "elementExists",
          selector: "strong",
          message: "Falta una palabra en negrita con <strong>.",
        },
        {
          type: "elementExists",
          selector: "mark",
          message: "Falta una palabra resaltada con <mark>.",
        },
      ],
      hints: [
        "Envuelve una palabra así: <strong>palabra</strong>.",
        "Para resaltar otra palabra usa <mark>palabra</mark>.",
      ],
    },
    celebration: "¡Wow! Tus palabras ahora brillan con estilo. ✨",
  },

  {
    id: 6,
    level: 1,
    title: "Listas ordenadas y desordenadas",
    concept: "Usa <ul> para listas con viñetas y <ol> para listas con números; cada ítem es un <li>.",
    character: "luna",
    narrative: [
      { lines: ["¡Soy Luna otra vez! 🦊", "Para una aventura siempre hago listas."] },
      {
        lines: [
          "<ul> es una lista con puntitos (viñetas).",
          "<ol> es una lista con números, ¡en orden!",
        ],
      },
      { lines: ["Cada cosa de la lista va en un <li>.", "¡Vamos a hacer nuestra lista de mochila!"] },
    ],
    demo: {
      beforeLabel: "Texto sin orden",
      beforeHtml: "<p>Agua Mapa Linterna</p>",
      afterLabel: "Lista con viñetas",
      afterHtml: "<ul>\n  <li>Agua</li>\n  <li>Mapa</li>\n  <li>Linterna</li>\n</ul>",
    },
    reference: {
      language: "html",
      code:
        "<ol>\n  <li>Primero</li>\n  <li>Segundo</li>\n</ol>\n<ul>\n  <li>Manzana</li>\n</ul>",
      annotations: [
        { fragment: "<ol>", tip: "Lista ordenada: pone números automáticamente." },
        { fragment: "<ul>", tip: "Lista desordenada: pone viñetas (puntitos)." },
        { fragment: "<li>", tip: "Un ítem de la lista. Va dentro de <ul> o <ol>." },
      ],
    },
    challenge: {
      instruction:
        "Crea una lista con viñetas <ul> que tenga exactamente 3 elementos <li> con tus comidas favoritas.",
      cssEnabled: false,
      startingHtml: "<ul>\n  \n</ul>",
      rules: [
        { type: "elementExists", selector: "ul", message: "Necesitas una lista con viñetas <ul>." },
        {
          type: "elementCount",
          selector: "ul li",
          exact: 3,
          message: "La lista debe tener exactamente 3 elementos <li>.",
        },
      ],
      hints: [
        "Cada comida va en su propio <li>…</li>.",
        "Pon los tres <li> entre <ul> y </ul>.",
      ],
    },
    celebration: "¡Súper! Ya puedes ordenar cualquier cosa en listas. 📝",
  },

  {
    id: 7,
    level: 1,
    title: "Imágenes en la web",
    concept: "Con <img> mostramos fotos usando src (la dirección) y alt (su descripción).",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel al habla! 👾", "Una página sin imágenes es muy aburrida."] },
      {
        lines: [
          "La etiqueta <img> muestra una foto.",
          "src dice DÓNDE está la imagen.",
        ],
      },
      { lines: ["alt es una descripción para quien no la pueda ver.", "¡Siempre, siempre pon un alt!"] },
    ],
    demo: {
      beforeLabel: "Sin imagen",
      beforeHtml: "<p>Mira mi gatito:</p>",
      afterLabel: "Con una imagen",
      afterHtml: '<p>Mira mi gatito:</p>\n<img src="https://picsum.photos/200" alt="Un gatito">',
    },
    reference: {
      language: "html",
      code: '<img src="https://picsum.photos/200" alt="Una foto bonita">',
      annotations: [
        { fragment: "<img", tip: "La etiqueta para mostrar imágenes. No necesita cierre." },
        { fragment: 'src="https://picsum.photos/200"', tip: "La dirección de la imagen en internet." },
        { fragment: 'alt="Una foto bonita"', tip: "Describe la imagen por si no se puede ver." },
      ],
    },
    challenge: {
      instruction:
        'Agrega una imagen con <img>. Usa src="https://picsum.photos/200" y un alt que la describa.',
      cssEnabled: false,
      startingHtml: "<h1>Mi mascota favorita</h1>\n",
      rules: [
        { type: "elementExists", selector: "img", message: "Necesitas una etiqueta <img>." },
        {
          type: "attribute",
          selector: "img",
          attr: "src",
          message: "La imagen necesita un atributo src con la dirección.",
        },
        {
          type: "attribute",
          selector: "img",
          attr: "alt",
          message: "No olvides el atributo alt para describir la imagen.",
        },
      ],
      hints: [
        "La etiqueta empieza con <img y no necesita cierre.",
        "Dentro pon dos atributos: src=\"...\" y alt=\"...\".",
      ],
    },
    celebration: "¡Espectacular! Tu página ya tiene imágenes de verdad. 🖼️",
  },

  {
    id: 8,
    level: 1,
    title: "Enlaces a otros lugares",
    concept: "Con <a href=\"...\"> creamos enlaces que llevan a otras páginas.",
    character: "max",
    narrative: [
      { lines: ["¡Max otra vez! 🐙", "Con mis brazos me conecto a todos lados."] },
      {
        lines: [
          "Un enlace es una puerta a otra página.",
          "Se hace con la etiqueta <a>.",
        ],
      },
      { lines: ["href dice A DÓNDE lleva el enlace.", "¡Pulsa y viajarás por la web!"] },
    ],
    demo: {
      beforeLabel: "Texto sin enlace",
      beforeHtml: "<p>Visita Wikipedia</p>",
      afterLabel: "Con un enlace",
      afterHtml: '<p>Visita <a href="https://wikipedia.org">Wikipedia</a></p>',
    },
    reference: {
      language: "html",
      code: '<a href="https://wikipedia.org">Ir a Wikipedia</a>',
      annotations: [
        { fragment: "<a", tip: "La etiqueta de enlace (la «a» viene de «anchor», ancla)." },
        { fragment: 'href="https://wikipedia.org"', tip: "La dirección a la que lleva el enlace." },
        { fragment: "Ir a Wikipedia", tip: "El texto azul en el que se hace clic." },
      ],
    },
    challenge: {
      instruction:
        'Crea un enlace <a> con href="https://wikipedia.org" y el texto Visita Wikipedia.',
      cssEnabled: false,
      startingHtml: "",
      rules: [
        { type: "elementExists", selector: "a", message: "Necesitas una etiqueta de enlace <a>…</a>." },
        {
          type: "attribute",
          selector: "a",
          attr: "href",
          equals: "https://wikipedia.org",
          message: "El href debe ser https://wikipedia.org.",
        },
        {
          type: "textContains",
          selector: "a",
          text: "wikipedia",
          message: "El texto del enlace debe mencionar «Wikipedia».",
        },
      ],
      hints: [
        "La estructura es: <a href=\"dirección\">texto</a>.",
        "El href va entre comillas dentro de la etiqueta de apertura.",
      ],
    },
    celebration: "¡Genial! Acabas de construir una puerta a otra página web. 🚪",
  },

  {
    id: 9,
    level: 1,
    title: "Cajas con <div>",
    concept: "El <div> es una caja que agrupa otros elementos dentro.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte de nuevo! 🤖", "A los robots nos encantan las cajas para ordenar."] },
      {
        lines: [
          "Un <div> es una caja invisible.",
          "Sirve para agrupar varios elementos juntos.",
        ],
      },
      { lines: ["Puedes meter títulos, párrafos e imágenes dentro.", "¡Así organizas tu página en bloques!"] },
    ],
    demo: {
      css: "div { background: #ede9fe; border: 3px solid #8b5cf6; border-radius: 16px; padding: 16px; } body { font-family: system-ui, sans-serif; }",
      beforeLabel: "Elementos sueltos",
      beforeHtml: "<h2>Tarjeta</h2>\n<p>Un texto suelto, sin caja.</p>",
      afterLabel: "Agrupados en una caja con <div>",
      afterHtml: "<div>\n  <h2>Tarjeta</h2>\n  <p>Este texto vive dentro de la caja.</p>\n</div>",
    },
    reference: {
      language: "html",
      code: "<div>\n  <h2>Mi caja</h2>\n  <p>Contenido dentro de la caja.</p>\n</div>",
      annotations: [
        { fragment: "<div>", tip: "Abre una caja que agrupa elementos." },
        { fragment: "</div>", tip: "Cierra la caja. Todo lo de adentro queda agrupado." },
      ],
    },
    challenge: {
      instruction:
        "Crea un <div> y dentro pon un título <h2> y un párrafo <p>.",
      cssEnabled: false,
      startingHtml: "<div>\n  \n</div>",
      rules: [
        { type: "elementExists", selector: "div", message: "Necesitas una caja <div>…</div>." },
        {
          type: "elementExists",
          selector: "div h2",
          message: "El título <h2> debe ir dentro del <div>.",
        },
        {
          type: "elementExists",
          selector: "div p",
          message: "El párrafo <p> también debe ir dentro del <div>.",
        },
      ],
      hints: [
        "Escribe el <h2> y el <p> entre <div> y </div>.",
        "Primero el título, debajo el párrafo, ambos dentro de la caja.",
      ],
    },
    celebration: "¡Excelente! Ya sabes agrupar todo en cajas ordenadas. 📦",
  },

  {
    id: 10,
    level: 1,
    title: "Mi primera página personal",
    concept: "Proyecto integrador: combina título, párrafo, lista e imagen en una sola página.",
    character: "luna",
    narrative: [
      { lines: ["¡Lo lograste! Soy Luna 🦊.", "Esta es la gran aventura final del Nivel 1."] },
      {
        lines: [
          "Vas a juntar TODO lo que aprendiste.",
          "Títulos, párrafos, listas e imágenes.",
        ],
      },
      { lines: ["Crearemos tu página personal.", "¡Demuestra todo lo que sabes!"] },
    ],
    demo: {
      beforeLabel: "Página vacía",
      beforeHtml: "<body>\n</body>",
      afterLabel: "Mi página personal",
      afterHtml:
        '<h1>Sobre mí</h1>\n<p>¡Hola! Me gusta programar.</p>\n<ul>\n  <li>Dibujar</li>\n  <li>Jugar</li>\n</ul>\n<img src="https://picsum.photos/200" alt="Mi foto">',
    },
    reference: {
      language: "html",
      code:
        '<h1>Sobre mí</h1>\n<p>Una breve presentación.</p>\n<ul>\n  <li>Gusto 1</li>\n  <li>Gusto 2</li>\n</ul>\n<img src="https://picsum.photos/200" alt="Mi foto">',
      annotations: [
        { fragment: "<h1>", tip: "El título principal de tu página." },
        { fragment: "<p>", tip: "Un párrafo para presentarte." },
        { fragment: "<ul>", tip: "Una lista con tus gustos favoritos." },
        { fragment: "<img", tip: "Una imagen para acompañar tu página." },
      ],
    },
    challenge: {
      instruction:
        "Crea tu página personal: un <h1> con tu nombre, un <p> de presentación, una lista <ul> con 2 gustos y una <img> con su alt.",
      cssEnabled: false,
      startingHtml: "<h1></h1>\n",
      rules: [
        {
          type: "textContains",
          selector: "h1",
          message: "El <h1> no debe estar vacío: escribe tu nombre.",
        },
        { type: "elementExists", selector: "p", message: "Falta un párrafo <p> de presentación." },
        {
          type: "elementCount",
          selector: "ul li",
          min: 2,
          message: "La lista <ul> debe tener al menos 2 elementos <li>.",
        },
        {
          type: "attribute",
          selector: "img",
          attr: "alt",
          message: "La imagen <img> debe tener un atributo alt que la describa.",
        },
      ],
      hints: [
        "Ve agregando una etiqueta a la vez: primero el <h1>, luego el <p>.",
        "Para la lista usa <ul> con dos <li> dentro, y termina con la <img>.",
      ],
    },
    celebration: "¡FELICIDADES! 🎉 Terminaste el Nivel 1 y ya eres todo un Maestro del HTML. 🏗️",
    badge: "maestro-html",
  },
];
