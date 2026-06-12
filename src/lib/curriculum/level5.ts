// Nivel 5 — Diseño responsive (Aventuras 41–50).
// Anchos flexibles, media queries y páginas que se adaptan a cualquier pantalla.
// Cada lección sigue la estructura de 5 pasos del PRD.

import type { Lesson } from "../types";

export const LEVEL_5: Lesson[] = [
  {
    id: 41,
    level: 5,
    title: "Anchos en porcentaje",
    concept: "Con width: 50% la caja ocupa la mitad del espacio, sin importar el tamaño de la pantalla.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte aquí! 🤖", "Las páginas se ven en pantallas de muchos tamaños: celulares, tablets, computadoras..."] },
      {
        lines: [
          "Sin width, la caja ocupa todo el ancho de la pantalla.",
          "Pero con porcentajes, ¡la caja se adapta al espacio!",
        ],
      },
      { lines: ["width: 50% significa «la mitad del espacio disponible».", "¡Prueba el botón 🖥️/📱 de la vista previa!"] },
    ],
    demo: {
      beforeLabel: "Sin width: la caja ocupa todo el ancho",
      beforeHtml: "<div>Ocupo todo el ancho</div>",
      afterLabel: "Con width: 50%: la caja ocupa la mitad",
      afterHtml: "<div class=\"mitad\">Ocupo la mitad</div>",
      css: "div { background-color: #c4b5fd; padding: 12px; } .mitad { width: 50%; }",
    },
    reference: {
      language: "css",
      code: "div {\n  width: 50%;\n}",
      annotations: [
        { fragment: "width", tip: "La propiedad que controla el ancho de la caja." },
        { fragment: "50%", tip: "El valor: la mitad del espacio disponible. ¡Se adapta solo!" },
      ],
    },
    challenge: {
      instruction: "Haz que la caja ocupe la mitad del espacio. Escribe: width: 50%; Luego prueba el conmutador 🖥️/📱 de la vista previa.",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Me adapto a la pantalla</p>\n</div>",
      startingCss: "div {\n  background-color: #c4b5fd;\n  \n}",
      responsivePreview: true,
      rules: [
        { type: "cssMatches", pattern: "width\\s*:\\s*50%", message: "Escribe width: 50%; dentro del selector div." },
        // Anchos exactos: (viewport − 16px de margin por defecto del body) / 2.
        // Si buildDocument añade un reset de margin algún día, ajustar estos px.
        { type: "computedStyle", selector: "div", property: "width", contains: "392px", message: "La caja todavía no mide la mitad en pantalla grande. Usa width: 50%;" },
        { type: "computedStyle", selector: "div", property: "width", contains: "172px", viewport: 360, message: "La caja todavía no mide la mitad en pantalla de celular. Usa width: 50%;" },
      ],
      hints: [
        "El porcentaje se calcula sobre el espacio disponible.",
        "Escríbelo así: width: 50%;",
      ],
    },
    celebration: "¡Adaptable! Tu caja ahora mide la mitad en cualquier pantalla. 🤖",
  },

  {
    id: 42,
    level: 5,
    title: "Imágenes que no se desbordan",
    concept: "Con max-width: 100% una imagen nunca se sale de la pantalla: se achica si hace falta.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel aquí! 👾", "¿Sabes qué pasa con una foto enorme en un celular?"] },
      {
        lines: [
          "¡Se sale de la pantalla y rompe la página!",
          "Con max-width: 100% le decimos: «nunca seas más ancha que tu espacio».",
        ],
      },
      { lines: ["Si la pantalla es chica, la foto se achica sola.", "¡Es el truco más usado del diseño responsive!"] },
    ],
    demo: {
      beforeLabel: "Foto gigante: se sale de la pantalla",
      beforeHtml: "<img src=\"https://picsum.photos/900/300\" alt=\"Paisaje muy ancho\">",
      afterLabel: "Con max-width: 100%: la foto se ajusta sola",
      afterHtml: "<img class=\"ajustada\" src=\"https://picsum.photos/900/300\" alt=\"Paisaje muy ancho\">",
      css: ".ajustada { max-width: 100%; }",
    },
    reference: {
      language: "css",
      code: "img {\n  max-width: 100%;\n}",
      annotations: [
        { fragment: "max-width", tip: "La propiedad que pone un ancho MÁXIMO: de ahí no pasa." },
        { fragment: "100%", tip: "El valor: como máximo, todo el espacio disponible. Nunca más." },
      ],
    },
    challenge: {
      instruction: "Evita que la foto se desborde. Escribe: max-width: 100%; Luego pruébalo en modo 📱.",
      cssEnabled: true,
      startingHtml: "<h1>Mi paisaje favorito</h1>\n<img src=\"https://picsum.photos/900/300\" alt=\"Paisaje muy ancho\">",
      startingCss: "img {\n  \n}",
      responsivePreview: true,
      rules: [
        { type: "cssMatches", pattern: "max-width\\s*:\\s*100%", message: "Escribe max-width: 100%; dentro del selector img." },
        { type: "computedStyle", selector: "img", property: "max-width", contains: "100%", message: "La foto todavía puede desbordarse. Usa max-width: 100%;" },
      ],
      hints: [
        "max-width pone un límite: la imagen no puede ser más ancha que eso.",
        "Escríbelo así: max-width: 100%;",
      ],
    },
    celebration: "¡Foto domada! Ya nunca se saldrá de la pantalla. 👾",
  },

  {
    id: 43,
    level: 5,
    title: "Crecer hasta un límite",
    concept: "Combinando width: 100% y max-width: 400px, la caja crece con la pantalla pero nunca pasa de 400px.",
    character: "max",
    narrative: [
      { lines: ["¡Max aquí! 🐙", "Mis tentáculos se estiran... ¡pero hasta cierto punto!"] },
      {
        lines: [
          "width: 100% hace que la caja use todo el espacio.",
          "max-width: 400px le pone un freno: de 400px no pasa.",
        ],
      },
      { lines: ["En celular ocupa toda la pantalla. En computadora, solo 400px.", "¡Así se hacen las tarjetas de las páginas reales!"] },
    ],
    demo: {
      beforeLabel: "Solo width: 100%: crece sin límite",
      beforeHtml: "<div class=\"libre\">Crezco sin parar</div>",
      afterLabel: "Con max-width: 200px: crece hasta el límite",
      afterHtml: "<div class=\"confreno\">Crezco hasta mi límite</div>",
      css: "div { background-color: #a7f3d0; padding: 12px; } .libre { width: 100%; } .confreno { width: 100%; max-width: 200px; }",
    },
    reference: {
      language: "css",
      code: "div {\n  width: 100%;\n  max-width: 400px;\n}",
      annotations: [
        { fragment: "width: 100%", tip: "La caja intenta usar todo el espacio disponible." },
        { fragment: "max-width: 400px", tip: "El freno: la caja nunca será más ancha que 400 píxeles." },
      ],
    },
    challenge: {
      instruction: "Haz una tarjeta elástica con freno. Escribe las dos propiedades: width: 100%; y max-width: 400px; Compárala en 🖥️ y en 📱.",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Tarjeta elástica</p>\n</div>",
      startingCss: "div {\n  background-color: #a7f3d0;\n  \n}",
      responsivePreview: true,
      rules: [
        { type: "cssMatches", pattern: "width\\s*:\\s*100%", message: "Primero haz que la caja crezca: width: 100%;" },
        { type: "cssMatches", pattern: "max-width\\s*:\\s*400px", message: "Ahora ponle el freno: max-width: 400px;" },
        { type: "computedStyle", selector: "div", property: "width", contains: "400px", message: "En pantalla grande la caja debería frenar en 400px. Revisa max-width: 400px;" },
        // 344px = 360 de viewport − 16px de margin por defecto del body.
        { type: "computedStyle", selector: "div", property: "width", contains: "344px", viewport: 360, message: "En celular la caja debería ocupar todo el ancho. Revisa width: 100%;" },
      ],
      hints: [
        "Son dos líneas: una con width y otra con max-width.",
        "width: 100%; deja crecer y max-width: 400px; pone el límite.",
      ],
    },
    celebration: "¡Elástica con freno! Tu tarjeta crece justo hasta donde debe. 🐙",
  },

  {
    id: 44,
    level: 5,
    title: "La pregunta mágica: @media",
    concept: "Con @media (max-width: 600px) aplicamos estilos SOLO cuando la pantalla es angosta, como un celular.",
    character: "luna",
    narrative: [
      { lines: ["¡Luna aquí con un hechizo nuevo! 🦊", "¿Y si la página pudiera preguntar: «¿estoy en un celular?»?"] },
      {
        lines: [
          "¡Puede! Se llama media query y se escribe con @media.",
          "@media (max-width: 600px) significa: «si la pantalla mide 600px o menos...»",
        ],
      },
      { lines: ["Las reglas de adentro solo se aplican en pantallas angostas.", "¡Vamos a cambiar un color según la pantalla!"] },
    ],
    demo: {
      beforeLabel: "Sin @media: la caja siempre es celeste",
      beforeHtml: "<div><p>Soy una caja</p></div>",
      afterLabel: "Con @media: en esta pantalla angosta se vuelve naranja",
      afterHtml: "<style>@media (max-width: 500px) { div { background-color: orange; } }</style>\n<div><p>Soy una caja</p></div>",
      css: "div { background-color: lightblue; padding: 20px; }",
    },
    reference: {
      language: "css",
      code: "@media (max-width: 600px) {\n  div {\n    background-color: orange;\n  }\n}",
      annotations: [
        { fragment: "@media (max-width: 600px)", tip: "La pregunta: «¿la pantalla mide 600px o menos?». Si sí, aplica lo de adentro." },
        { fragment: "background-color: orange", tip: "Esta regla solo funciona en pantallas angostas, como un celular." },
      ],
    },
    challenge: {
      instruction: "Dentro del @media ya escrito, haz la caja naranja en celular. Escribe: background-color: orange; Luego cambia entre 🖥️ y 📱 para ver la magia.",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Cambio de color en celular</p>\n</div>",
      startingCss: "div {\n  background-color: lightblue;\n  padding: 20px;\n}\n\n@media (max-width: 600px) {\n  div {\n    \n  }\n}",
      responsivePreview: true,
      rules: [
        { type: "cssMatches", pattern: "@media[\\s\\S]*background-color\\s*:\\s*orange", message: "Dentro del @media escribe background-color: orange;" },
        { type: "computedStyle", selector: "div", property: "background-color", contains: "rgb(255, 165, 0)", viewport: 360, message: "En celular la caja todavía no es naranja. Escribe background-color: orange; dentro del @media." },
        { type: "computedStyle", selector: "div", property: "background-color", contains: "rgb(173, 216, 230)", message: "En pantalla grande la caja debe seguir celeste. No borres el background-color: lightblue; de arriba." },
      ],
      hints: [
        "Busca las llaves vacías del div que está DENTRO del @media.",
        "Ahí escribe: background-color: orange;",
      ],
    },
    celebration: "¡Magia responsive! Tu página ya sabe en qué pantalla está. 🦊",
  },

  {
    id: 45,
    level: 5,
    title: "Esconder en pantallas chicas",
    concept: "Con display: none dentro de un @media, un elemento desaparece solo en celulares.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte de vuelta! 🤖", "En un celular hay poco espacio: a veces sobra algo."] },
      {
        lines: [
          "display: none hace que un elemento desaparezca por completo.",
          "Si lo ponemos dentro de un @media, solo desaparece en pantallas angostas.",
        ],
      },
      { lines: ["En computadora se ve, en celular no.", "¡Vamos a esconder una foto decorativa!"] },
    ],
    demo: {
      beforeLabel: "Sin @media: la foto se ve siempre",
      beforeHtml: "<h2>Mi página</h2>\n<img src=\"https://picsum.photos/200\" alt=\"Foto decorativa\">",
      afterLabel: "Con @media: en esta pantalla angosta la foto desaparece",
      afterHtml: "<style>@media (max-width: 500px) { img { display: none; } }</style>\n<h2>Mi página</h2>\n<img src=\"https://picsum.photos/200\" alt=\"Foto decorativa\">",
    },
    reference: {
      language: "css",
      code: "@media (max-width: 600px) {\n  img {\n    display: none;\n  }\n}",
      annotations: [
        { fragment: "@media (max-width: 600px)", tip: "Solo aplica lo de adentro en pantallas de 600px o menos." },
        { fragment: "display: none", tip: "Hace desaparecer el elemento por completo, como si no existiera." },
      ],
    },
    challenge: {
      instruction: "Haz que la foto desaparezca en celulares. Dentro del @media escribe: display: none; Compruébalo con el botón 📱.",
      cssEnabled: true,
      startingHtml: "<h1>Mi blog</h1>\n<img src=\"https://picsum.photos/200\" alt=\"Foto decorativa\">\n<p>Bienvenidos a mi página.</p>",
      startingCss: "@media (max-width: 600px) {\n  img {\n    \n  }\n}",
      responsivePreview: true,
      rules: [
        { type: "cssMatches", pattern: "@media[\\s\\S]*display\\s*:\\s*none", message: "Dentro del @media escribe display: none; para la imagen." },
        { type: "computedStyle", selector: "img", property: "display", contains: "none", viewport: 360, message: "En celular la foto todavía se ve. Escribe display: none; dentro del @media." },
        { type: "computedStyle", selector: "img", property: "display", contains: "inline", message: "En pantalla grande la foto debe seguir viéndose. El display: none; va solo DENTRO del @media." },
      ],
      hints: [
        "Busca las llaves vacías de img dentro del @media.",
        "Ahí escribe: display: none;",
      ],
    },
    celebration: "¡Ahora la ves, ahora no! Tu página esconde lo que sobra en celulares. 🤖",
  },

  {
    id: 46,
    level: 5,
    title: "Texto que se adapta",
    concept: "Con @media cambiamos el font-size: títulos grandes en computadora y más pequeños en celular.",
    character: "max",
    narrative: [
      { lines: ["¡Max aquí! 🐙", "Un título gigante se ve genial en computadora..."] },
      {
        lines: [
          "...¡pero en un celular no cabe y se parte feo!",
          "Con @media le ponemos un font-size más pequeño solo en pantallas angostas.",
        ],
      },
      { lines: ["Esta vez vas a escribir el @media completo tú.", "¡Tú puedes, es como una receta!"] },
    ],
    demo: {
      beforeLabel: "Sin @media: título gigante hasta en pantallas angostas",
      beforeHtml: "<h1>Bienvenidos a mi mundo</h1>",
      afterLabel: "Con @media: en esta pantalla angosta el título se achica",
      afterHtml: "<style>@media (max-width: 500px) { h1 { font-size: 20px; } }</style>\n<h1>Bienvenidos a mi mundo</h1>",
      css: "h1 { font-size: 40px; }",
    },
    reference: {
      language: "css",
      code: "h1 {\n  font-size: 40px;\n}\n\n@media (max-width: 600px) {\n  h1 {\n    font-size: 24px;\n  }\n}",
      annotations: [
        { fragment: "font-size: 40px", tip: "El tamaño normal del título, para pantallas grandes." },
        { fragment: "@media (max-width: 600px)", tip: "La pregunta: «¿la pantalla mide 600px o menos?»." },
        { fragment: "font-size: 24px", tip: "El tamaño más pequeño, solo para celulares." },
      ],
    },
    challenge: {
      instruction: "Debajo de la regla del h1, escribe un @media (max-width: 600px) completo que ponga el h1 con font-size: 24px; Pruébalo en 🖥️ y 📱.",
      cssEnabled: true,
      startingHtml: "<h1>Bienvenidos a mi mundo</h1>\n<p>Una página que se lee bien en todos lados.</p>",
      startingCss: "h1 {\n  font-size: 40px;\n}\n",
      responsivePreview: true,
      rules: [
        { type: "cssMatches", pattern: "@media\\s*\\(\\s*max-width", message: "Falta la pregunta mágica: @media (max-width: 600px) { … }." },
        { type: "cssMatches", pattern: "@media[\\s\\S]*font-size\\s*:\\s*24px", message: "Dentro del @media, el h1 necesita font-size: 24px;" },
        { type: "computedStyle", selector: "h1", property: "font-size", contains: "24px", viewport: 360, message: "En celular el título todavía no se achica. Revisa el @media." },
        { type: "computedStyle", selector: "h1", property: "font-size", contains: "40px", message: "En pantalla grande el título debe seguir midiendo 40px. No borres la primera regla." },
      ],
      hints: [
        "La receta: @media (max-width: 600px) { h1 { … } }.",
        "Dentro de las llaves del h1 escribe font-size: 24px; ¡Cuenta bien las llaves de cierre!",
      ],
    },
    celebration: "¡Texto camaleón! Tu título se adapta solo a cada pantalla. 🐙",
  },

  {
    id: 47,
    level: 5,
    title: "Cajas que saltan de línea",
    concept: "Con flex-wrap: wrap las cajas de un contenedor flex bajan a la siguiente línea cuando no caben.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel aquí! 👾", "¿Recuerdas display: flex, que pone las cajas en fila?"] },
      {
        lines: [
          "Tiene un problema: si la pantalla es angosta, ¡las cajas se aplastan o se salen!",
          "flex-wrap: wrap las deja saltar a la línea de abajo.",
        ],
      },
      { lines: ["Como cuando escribes y la palabra no cabe: baja sola.", "¡Es responsive sin usar @media!"] },
    ],
    demo: {
      beforeLabel: "Sin flex-wrap: las cajas se salen de la pantalla",
      beforeHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n  <p>Cuatro</p>\n</div>",
      afterLabel: "Con flex-wrap: wrap: las que no caben bajan de línea",
      afterHtml: "<div class=\"salto\">\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n  <p>Cuatro</p>\n</div>",
      css: "div { display: flex; gap: 8px; } p { background-color: #fbcfe8; padding: 10px; min-width: 130px; text-align: center; } .salto { flex-wrap: wrap; }",
    },
    reference: {
      language: "css",
      code: "div {\n  display: flex;\n  flex-wrap: wrap;\n}",
      annotations: [
        { fragment: "display: flex", tip: "Pone las cajas hijas en fila, como ya sabes." },
        { fragment: "flex-wrap: wrap", tip: "Permite que las cajas salten a la línea de abajo cuando no caben." },
      ],
    },
    challenge: {
      instruction: "Deja que las cajas salten de línea cuando no quepan. Escribe: flex-wrap: wrap; Luego angosta la pantalla con 📱 y míralas bajar.",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n  <p>Cuatro</p>\n</div>",
      startingCss: "div {\n  display: flex;\n  gap: 12px;\n  \n}\n\np {\n  background-color: #fbcfe8;\n  padding: 12px;\n  /* min-width es el hermano de max-width: un ancho MÍNIMO */\n  min-width: 120px;\n  text-align: center;\n}",
      responsivePreview: true,
      rules: [
        { type: "cssMatches", pattern: "flex-wrap\\s*:\\s*wrap", message: "Escribe flex-wrap: wrap; dentro del selector div." },
        { type: "computedStyle", selector: "div", property: "flex-wrap", contains: "wrap", message: "Las cajas todavía no pueden saltar de línea. Usa flex-wrap: wrap;" },
      ],
      hints: [
        "La propiedad va en el contenedor div, junto a display: flex.",
        "Escríbela así: flex-wrap: wrap;",
      ],
    },
    celebration: "¡Saltarinas! Tus cajas bajan de línea solas cuando falta espacio. 👾",
  },

  {
    id: 48,
    level: 5,
    title: "Fila en grande, columna en chico",
    concept: "Con flex-direction: column dentro de un @media, las cajas van en fila en computadora y en columna en celular.",
    character: "luna",
    narrative: [
      { lines: ["¡Luna aquí! 🦊", "Este es EL truco de casi todas las páginas del mundo."] },
      {
        lines: [
          "En computadora, las cajas se ven en fila con display: flex.",
          "En celular no caben... ¡entonces las apilamos en columna!",
        ],
      },
      { lines: ["flex-direction: column las pone una debajo de otra.", "Dentro de un @media, solo pasa en celular."] },
    ],
    demo: {
      beforeLabel: "Sin @media: siempre en fila, aunque no quepan",
      beforeHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      afterLabel: "Con @media: en esta pantalla angosta se apilan en columna",
      afterHtml: "<style>@media (max-width: 500px) { div { flex-direction: column; } }</style>\n<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      css: "div { display: flex; gap: 12px; } p { background-color: #a7f3d0; padding: 14px; text-align: center; }",
    },
    reference: {
      language: "css",
      code: "div {\n  display: flex;\n  gap: 12px;\n}\n\n@media (max-width: 600px) {\n  div {\n    flex-direction: column;\n  }\n}",
      annotations: [
        { fragment: "display: flex", tip: "En pantallas grandes, las cajas van en fila." },
        { fragment: "@media (max-width: 600px)", tip: "La pregunta: «¿estoy en una pantalla angosta?»." },
        { fragment: "flex-direction: column", tip: "Cambia la dirección: las cajas se apilan una debajo de otra." },
      ],
    },
    challenge: {
      instruction: "Debajo de la regla del div, escribe un @media (max-width: 600px) que ponga el div con flex-direction: column; Cambia entre 🖥️ y 📱 para verlo.",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      startingCss: "div {\n  display: flex;\n  gap: 12px;\n}\n\np {\n  background-color: #a7f3d0;\n  padding: 14px;\n  text-align: center;\n}\n",
      responsivePreview: true,
      rules: [
        { type: "cssMatches", pattern: "@media\\s*\\(\\s*max-width", message: "Falta el @media (max-width: 600px) { … }." },
        { type: "cssMatches", pattern: "@media[\\s\\S]*flex-direction\\s*:\\s*column", message: "Dentro del @media, el div necesita flex-direction: column;" },
        { type: "computedStyle", selector: "div", property: "flex-direction", contains: "column", viewport: 360, message: "En celular las cajas todavía no se apilan. Revisa el @media." },
        { type: "computedStyle", selector: "div", property: "flex-direction", contains: "row", message: "En pantalla grande las cajas deben seguir en fila. El flex-direction: column; va solo DENTRO del @media." },
      ],
      hints: [
        "La receta: @media (max-width: 600px) { div { … } }.",
        "Dentro de las llaves del div escribe flex-direction: column;",
      ],
    },
    celebration: "¡Lo lograste! Fila en computadora, columna en celular: como las páginas de verdad. 🦊",
  },

  {
    id: 49,
    level: 5,
    title: "Centrado en toda la pantalla",
    concept: "Con height: 100vh el contenedor mide toda la pantalla, y con flex centramos una tarjeta justo en el medio.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte aquí! 🤖", "Hoy aprendemos una medida nueva: vh."] },
      {
        lines: [
          "100vh significa «el 100% de la altura de la pantalla».",
          "Sirve para que un contenedor ocupe toda la pantalla, sea cual sea.",
        ],
      },
      { lines: ["Y con justify-content y align-items en center...", "¡la tarjeta queda en el medio exacto de cualquier pantalla!"] },
    ],
    demo: {
      beforeLabel: "Sin centrar: la tarjeta queda arriba a la izquierda",
      beforeHtml: "<div>\n  <p>Mi tarjeta</p>\n</div>",
      afterLabel: "Con 100vh y flex centrado: justo en el medio",
      afterHtml: "<div class=\"centro\">\n  <p>Mi tarjeta</p>\n</div>",
      css: "div { display: flex; } p { background-color: #fbcfe8; padding: 20px; border-radius: 16px; } .centro { height: 100vh; justify-content: center; align-items: center; }",
    },
    reference: {
      language: "css",
      code: "div {\n  display: flex;\n  height: 100vh;\n  justify-content: center;\n  align-items: center;\n}",
      annotations: [
        { fragment: "height: 100vh", tip: "El contenedor mide el 100% de la altura de la pantalla." },
        { fragment: "justify-content: center", tip: "Centra la tarjeta a lo ancho." },
        { fragment: "align-items: center", tip: "Centra la tarjeta de arriba a abajo." },
      ],
    },
    challenge: {
      instruction: "Centra la tarjeta en el medio de la pantalla. En el div escribe: height: 100vh; justify-content: center; y align-items: center; Pruébalo en 🖥️ y 📱.",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Mi tarjeta</p>\n</div>",
      startingCss: "div {\n  display: flex;\n  \n}\n\np {\n  background-color: #fbcfe8;\n  padding: 20px;\n  border-radius: 16px;\n}",
      responsivePreview: true,
      rules: [
        { type: "cssMatches", pattern: "height\\s*:\\s*100vh", message: "El contenedor debe medir toda la pantalla: height: 100vh;" },
        { type: "cssMatches", pattern: "justify-content\\s*:\\s*center", message: "Centra a lo ancho con justify-content: center;" },
        { type: "cssMatches", pattern: "align-items\\s*:\\s*center", message: "Centra de arriba a abajo con align-items: center;" },
        { type: "computedStyle", selector: "div", property: "justify-content", contains: "center", message: "La tarjeta todavía no está centrada a lo ancho. Usa justify-content: center;" },
        { type: "computedStyle", selector: "div", property: "align-items", contains: "center", message: "La tarjeta todavía no está centrada de arriba a abajo. Usa align-items: center;" },
      ],
      hints: [
        "Son tres líneas nuevas dentro del div, debajo de display: flex.",
        "height: 100vh; luego justify-content: center; y align-items: center;",
      ],
    },
    celebration: "¡Diana! Tu tarjeta queda en el centro exacto de cualquier pantalla. 🤖",
  },

  {
    id: 50,
    level: 5,
    title: "Mi galería responsive",
    concept: "Proyecto integrador: una galería en fila con flex y gap que se vuelve columna en celular gracias a @media.",
    character: "max",
    narrative: [
      { lines: ["¡Max aquí para la gran final del Nivel 5! 🐙", "Vas a construir una galería que se adapta sola."] },
      {
        lines: [
          "En computadora: tarjetas en fila con display: flex y gap.",
          "En celular: las tarjetas se apilan en columna con @media.",
        ],
      },
      { lines: ["Es todo lo que aprendiste, junto en una página real.", "¡Demuestra que eres un Héroe Responsive!"] },
    ],
    demo: {
      beforeLabel: "Galería sin diseño: tarjetas sueltas",
      beforeHtml: "<div>\n  <p>Foto 1</p>\n  <p>Foto 2</p>\n  <p>Foto 3</p>\n</div>",
      afterLabel: "Galería responsive: en esta pantalla angosta se apila con estilo",
      afterHtml: "<style>div { display: flex; gap: 16px; } @media (max-width: 500px) { div { flex-direction: column; } }</style>\n<div>\n  <p>Foto 1</p>\n  <p>Foto 2</p>\n  <p>Foto 3</p>\n</div>",
      css: "p { background-color: #c4b5fd; padding: 20px; border-radius: 12px; text-align: center; }",
    },
    reference: {
      language: "css",
      code: "div {\n  display: flex;\n  gap: 16px;\n}\n\n@media (max-width: 600px) {\n  div {\n    flex-direction: column;\n  }\n}",
      annotations: [
        { fragment: "display: flex", tip: "Pone las tarjetas en fila en pantallas grandes." },
        { fragment: "gap: 16px", tip: "Deja un espacio cómodo entre las tarjetas." },
        { fragment: "@media (max-width: 600px)", tip: "La pregunta responsive: «¿estoy en un celular?»." },
        { fragment: "flex-direction: column", tip: "En celular, las tarjetas se apilan una debajo de otra." },
      ],
    },
    challenge: {
      instruction: "Arma tu galería: en el div pon display: flex; y gap: 16px; y debajo escribe un @media (max-width: 600px) que ponga el div con flex-direction: column; Compruébala en 🖥️ y 📱.",
      cssEnabled: true,
      startingHtml: "<h1>Mi galería</h1>\n<div>\n  <p>Foto 1</p>\n  <p>Foto 2</p>\n  <p>Foto 3</p>\n</div>",
      startingCss: "p {\n  background-color: #c4b5fd;\n  padding: 20px;\n  border-radius: 12px;\n  text-align: center;\n}\n\ndiv {\n  \n}\n",
      responsivePreview: true,
      rules: [
        { type: "cssMatches", pattern: "display\\s*:\\s*flex", message: "Pon las tarjetas en fila con display: flex; en el div." },
        { type: "cssMatches", pattern: "gap\\s*:", message: "Separa las tarjetas con gap, por ejemplo gap: 16px;" },
        { type: "cssMatches", pattern: "@media\\s*\\(\\s*max-width", message: "Falta el @media (max-width: 600px) { … } para el modo celular." },
        { type: "cssMatches", pattern: "@media[\\s\\S]*flex-direction\\s*:\\s*column", message: "Dentro del @media, el div necesita flex-direction: column;" },
        { type: "computedStyle", selector: "div", property: "display", contains: "flex", message: "Las tarjetas todavía no están en fila. Usa display: flex;" },
        { type: "computedStyle", selector: "div", property: "flex-direction", contains: "row", message: "En pantalla grande las tarjetas deben seguir en fila. El flex-direction: column; va solo DENTRO del @media." },
        { type: "computedStyle", selector: "div", property: "flex-direction", contains: "column", viewport: 360, message: "En celular las tarjetas todavía no se apilan. Revisa el @media." },
      ],
      hints: [
        "Primero la fila: display: flex; y gap: 16px; dentro de div { }.",
        "Después, al final: @media (max-width: 600px) { div { flex-direction: column; } }.",
      ],
    },
    celebration: "¡FELICIDADES! 🎉 Terminaste el Nivel 5: tus páginas ya se ven bien en CUALQUIER pantalla. 📱",
    badge: "responsive-hero",
  },
];
