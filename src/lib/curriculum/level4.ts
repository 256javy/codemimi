// Nivel 4 — CSS intermedio (Aventuras 31–40).
// Flexbox, espaciado, sombras y efectos.
// Cada lección sigue la estructura de 5 pasos del PRD.

import type { Lesson } from "../types";

export const LEVEL_4: Lesson[] = [
  {
    id: 31,
    level: 4,
    title: "Cajas en fila con flex",
    concept: "Con display: flex ponemos las cajas hijas en una fila, una al lado de la otra.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte aquí! 🤖", "¿Ves cómo los bloques se apilan uno encima del otro?"] },
      {
        lines: [
          "Con display: flex le decimos al contenedor que ponga sus hijos en fila.",
          "¡Las cajas quedan una al lado de la otra automáticamente!",
        ],
      },
      { lines: ["Es como un estante donde todo se ordena en horizontal.", "¡Vamos a probarlo!"] },
    ],
    demo: {
      beforeLabel: "Sin flex: bloques apilados",
      beforeHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      afterLabel: "Con flex: bloques en fila",
      afterHtml: "<div class=\"fila\">\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      css: "p { background-color: #c4b5fd; padding: 8px; } .fila { display: flex; }",
    },
    reference: {
      language: "css",
      code: "div {\n  display: flex;\n}",
      annotations: [
        { fragment: "div", tip: "El selector: aplica la regla al contenedor div." },
        { fragment: "display", tip: "La propiedad que controla cómo se muestran los hijos." },
        { fragment: "flex", tip: "El valor: pone los hijos en fila, uno al lado del otro." },
      ],
    },
    challenge: {
      instruction: "Pon las tres cajas en fila. Dentro del div escribe: display: flex;",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      startingCss: "div {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "display\\s*:\\s*flex", message: "Escribe display: flex; dentro del selector div." },
        { type: "computedStyle", selector: "div", property: "display", contains: "flex", message: "Las cajas todavía no están en fila. Usa display: flex;" },
      ],
      hints: [
        "flex coloca a los hijos uno al lado del otro.",
        "Escríbelo así: display: flex;",
      ],
    },
    celebration: "¡En fila! Tu contenedor flex ya alinea todo perfectamente. 🤖",
  },

  {
    id: 32,
    level: 4,
    title: "Repartir el espacio",
    concept: "Con justify-content repartimos las cajas a lo ancho: al inicio, al centro o con espacio entre ellas.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel aquí! 👾", "Ya sé poner las cajas en fila, ¡pero están todas pegadas!"] },
      {
        lines: [
          "Con justify-content decidimos cómo se reparten a lo ancho.",
          "space-between las separa poniendo todo el espacio sobrante ENTRE ellas.",
        ],
      },
      { lines: ["¡Queda súper ordenado y con mucho estilo!", "¡Vamos a separar nuestras cajas!"] },
    ],
    demo: {
      beforeLabel: "Con flex pero sin justify-content",
      beforeHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      afterLabel: "Con justify-content: space-between",
      afterHtml: "<div class=\"repartido\">\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      css: "div { display: flex; } p { background-color: #fbcfe8; padding: 8px; } .repartido { justify-content: space-between; }",
    },
    reference: {
      language: "css",
      code: "div {\n  display: flex;\n  justify-content: space-between;\n}",
      annotations: [
        { fragment: "justify-content", tip: "La propiedad que decide cómo se reparte el espacio a lo ancho." },
        { fragment: "space-between", tip: "El valor: pone todo el espacio sobrante ENTRE los elementos." },
      ],
    },
    challenge: {
      instruction: "Reparte las cajas dejando espacio entre ellas. Escribe: justify-content: space-between;",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      startingCss: "div {\n  display: flex;\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "justify-content\\s*:\\s*space-between", message: "Escribe justify-content: space-between; dentro del div." },
        { type: "computedStyle", selector: "div", property: "justify-content", contains: "space-between", message: "Las cajas todavía no están repartidas. Usa justify-content: space-between;" },
      ],
      hints: [
        "justify-content reparte a lo ancho (horizontal).",
        "Prueba con: justify-content: space-between;",
      ],
    },
    celebration: "¡Perfecto reparto! Las cajas ahora tienen todo el espacio que merecen. 👾",
  },

  {
    id: 33,
    level: 4,
    title: "Centrar arriba y abajo",
    concept: "Con align-items alineamos las cajas de arriba a abajo dentro de un contenedor flex.",
    character: "luna",
    narrative: [
      { lines: ["¡Luna aquí! 🦊", "Ya repartimos a lo ancho, ¡pero falta el eje vertical!"] },
      {
        lines: [
          "align-items controla la alineación de arriba a abajo.",
          "Con center las cajas quedan justo en el medio del contenedor.",
        ],
      },
      { lines: ["¡Es el truco favorito de los diseñadores para centrar!", "¡Vamos a centrarlo todo!"] },
    ],
    demo: {
      beforeLabel: "Cajas arriba del contenedor",
      beforeHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n</div>",
      afterLabel: "Cajas centradas verticalmente",
      afterHtml: "<div class=\"centrado\">\n  <p>Uno</p>\n  <p>Dos</p>\n</div>",
      css: "div { display: flex; height: 120px; background-color: #fde68a; } p { background-color: #a7f3d0; padding: 8px; } .centrado { align-items: center; }",
    },
    reference: {
      language: "css",
      code: "div {\n  display: flex;\n  align-items: center;\n}",
      annotations: [
        { fragment: "align-items", tip: "La propiedad que alinea los hijos de arriba a abajo." },
        { fragment: "center", tip: "El valor: centra los elementos verticalmente dentro del contenedor." },
      ],
    },
    challenge: {
      instruction: "Centra las cajas de arriba a abajo. Escribe: align-items: center;",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n</div>",
      startingCss: "div {\n  display: flex;\n  height: 120px;\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "align-items\\s*:\\s*center", message: "Escribe align-items: center; dentro del div." },
        { type: "computedStyle", selector: "div", property: "align-items", contains: "center", message: "Las cajas todavía no están centradas verticalmente. Usa align-items: center;" },
      ],
      hints: [
        "align-items alinea de arriba a abajo (vertical).",
        "Para el centro: align-items: center;",
      ],
    },
    celebration: "¡Centrado perfecto! Ahora controlas los dos ejes como una experta. 🦊",
  },

  {
    id: 34,
    level: 4,
    title: "Espacio entre cajas",
    concept: "Con gap dejamos un espacio entre las cajas de un contenedor flex.",
    character: "max",
    narrative: [
      { lines: ["¡Max aquí! 🐙", "Mis tentáculos necesitan espacio, ¡y tus cajas también!"] },
      {
        lines: [
          "La propiedad gap le pone un hueco entre cada elemento del contenedor.",
          "No hace falta poner márgenes: gap lo hace solo.",
        ],
      },
      { lines: ["Con 16px ya se nota una separación muy cómoda.", "¡Vamos a darle espacio a las cajas!"] },
    ],
    demo: {
      beforeLabel: "Cajas flex pegadas",
      beforeHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      afterLabel: "Cajas flex con gap de 16px",
      afterHtml: "<div class=\"separado\">\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      css: "div { display: flex; } p { background-color: #6ee7b7; padding: 8px; } .separado { gap: 16px; }",
    },
    reference: {
      language: "css",
      code: "div {\n  display: flex;\n  gap: 16px;\n}",
      annotations: [
        { fragment: "gap", tip: "La propiedad que pone espacio ENTRE los elementos del contenedor flex." },
        { fragment: "16px", tip: "El valor: 16 píxeles de espacio entre cada caja." },
      ],
    },
    challenge: {
      instruction: "Separa las cajas con un espacio entre ellas. Escribe: gap: 16px;",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      startingCss: "div {\n  display: flex;\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "gap\\s*:\\s*16px", message: "Escribe gap: 16px; dentro del div." },
        { type: "computedStyle", selector: "div", property: "gap", contains: "16px", message: "Las cajas todavía están pegadas. Usa gap: 16px;" },
      ],
      hints: [
        "gap pone espacio ENTRE las cajas flex.",
        "Escríbelo así: gap: 16px;",
      ],
    },
    celebration: "¡Espacioso y cómodo! El gap es la forma más fácil de separar las cajas. 🐙",
  },

  {
    id: 35,
    level: 4,
    title: "Espacio exterior",
    concept: "Con margin damos espacio por FUERA de la caja, separándola de los bordes y de otras cajas.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte de vuelta! 🤖", "Ya conoces padding, el espacio de dentro."] },
      {
        lines: [
          "Ahora viene margin: el espacio de FUERA de la caja.",
          "Separa la caja de los bordes de la página y de otras cajas.",
        ],
      },
      { lines: ["Con 30px la caja respira y no queda pegada al borde.", "¡Vamos a darle margen!"] },
    ],
    demo: {
      beforeLabel: "Sin margen: caja pegada al borde",
      beforeHtml: "<div><p>Sin margen</p></div>",
      afterLabel: "Con margin: caja con espacio exterior",
      afterHtml: "<div class=\"conmargen\"><p>Con margen</p></div>",
      css: "div { background-color: #c4b5fd; padding: 8px; } .conmargen { margin: 30px; }",
    },
    reference: {
      language: "css",
      code: "div {\n  margin: 30px;\n}",
      annotations: [
        { fragment: "margin", tip: "La propiedad que da espacio por fuera de la caja." },
        { fragment: "30px", tip: "El valor: 30 píxeles de espacio en los cuatro lados exteriores." },
      ],
    },
    challenge: {
      instruction: "Dale espacio por fuera de la caja. Escribe: margin: 30px;",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Tengo espacio fuera</p>\n</div>",
      startingCss: "div {\n  background-color: #c4b5fd;\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "margin\\s*:\\s*30px", message: "Escribe margin: 30px; dentro del div." },
        { type: "computedStyle", selector: "div", property: "margin-top", contains: "30px", message: "La caja todavía no tiene espacio por fuera. Usa margin: 30px;" },
      ],
      hints: [
        "margin es el espacio EXTERIOR (padding es el interior).",
        "Escríbelo así: margin: 30px;",
      ],
    },
    celebration: "¡La caja ya respira! Ahora sabes la diferencia entre padding y margin. 🤖",
  },

  {
    id: 36,
    level: 4,
    title: "Sombra de caja",
    concept: "Con box-shadow le ponemos una sombra a la caja para que parezca que flota.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel aquí! 👾", "Las tarjetas con sombra parecen flotar sobre la página."] },
      {
        lines: [
          "box-shadow le añade una sombra a la caja.",
          "Tiene cuatro partes: desplazamiento X, Y, difuminado y color.",
        ],
      },
      { lines: ["Por ejemplo: 4px 4px 8px gray.", "¡Hagamos que nuestra caja flote!"] },
    ],
    demo: {
      beforeLabel: "Caja sin sombra",
      beforeHtml: "<div><p>Sin sombra</p></div>",
      afterLabel: "Caja con sombra flotante",
      afterHtml: "<div class=\"sombra\"><p>Con sombra</p></div>",
      css: "div { background-color: #fbcfe8; padding: 20px; margin: 12px; } .sombra { box-shadow: 4px 4px 8px gray; }",
    },
    reference: {
      language: "css",
      code: "div {\n  box-shadow: 4px 4px 8px gray;\n}",
      annotations: [
        { fragment: "box-shadow", tip: "La propiedad que añade una sombra a la caja." },
        { fragment: "4px 4px 8px gray", tip: "El valor: 4px a la derecha, 4px abajo, 8px difuminado, color gris." },
      ],
    },
    challenge: {
      instruction: "Ponle una sombra a la caja. Escribe: box-shadow: 4px 4px 8px gray;",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Caja con sombra</p>\n</div>",
      startingCss: "div {\n  background-color: #fbcfe8;\n  padding: 20px;\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "box-shadow\\s*:", message: "Escribe box-shadow: 4px 4px 8px gray; dentro del div." },
        { type: "computedStyle", selector: "div", property: "box-shadow", contains: "8px", message: "La caja todavía no tiene sombra. Usa box-shadow: 4px 4px 8px gray;" },
      ],
      hints: [
        "La sombra tiene: desplazamiento X, Y, difuminado y color.",
        "Escríbela así: box-shadow: 4px 4px 8px gray;",
      ],
    },
    celebration: "¡Flota como por arte de magia! La sombra le da profundidad a tu caja. 👾",
  },

  {
    id: 37,
    level: 4,
    title: "Transparencia con opacity",
    concept: "Con opacity hacemos una caja más o menos transparente. 1 es sólida y 0 es invisible.",
    character: "luna",
    narrative: [
      { lines: ["¡Luna explorando efectos! 🦊", "¿Puedes imaginar una caja que casi no se ve?"] },
      {
        lines: [
          "La propiedad opacity controla la transparencia.",
          "1 significa sólida, 0 significa completamente invisible.",
        ],
      },
      { lines: ["Con 0.5 la caja queda a la mitad de transparente.", "¡Vamos a hacerla semitransparente!"] },
    ],
    demo: {
      beforeLabel: "Caja sólida (opacity: 1)",
      beforeHtml: "<div><p>Soy sólida</p></div>",
      afterLabel: "Caja semitransparente (opacity: 0.5)",
      afterHtml: "<div class=\"fantasma\"><p>Casi transparente</p></div>",
      css: "div { background-color: #6366f1; color: white; padding: 20px; } .fantasma { opacity: 0.5; }",
    },
    reference: {
      language: "css",
      code: "div {\n  opacity: 0.5;\n}",
      annotations: [
        { fragment: "opacity", tip: "La propiedad que controla la transparencia del elemento." },
        { fragment: "0.5", tip: "El valor: la mitad de transparente. Va de 0 (invisible) a 1 (sólida)." },
      ],
    },
    challenge: {
      instruction: "Haz la caja semitransparente. Escribe: opacity: 0.5;",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Casi transparente</p>\n</div>",
      startingCss: "div {\n  background-color: #6366f1;\n  color: white;\n  padding: 20px;\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "opacity\\s*:\\s*0\\.5", message: "Escribe opacity: 0.5; dentro del div." },
        { type: "computedStyle", selector: "div", property: "opacity", contains: "0.5", message: "La caja todavía es sólida. Usa opacity: 0.5;" },
      ],
      hints: [
        "opacity va de 0 (invisible) a 1 (sólida).",
        "Para mitad de transparencia: opacity: 0.5;",
      ],
    },
    celebration: "¡Fantasmagórica! Ahora puedes controlar cuánto se ve cada elemento. 🦊",
  },

  {
    id: 38,
    level: 4,
    title: "Girar con transform",
    concept: "Con transform podemos girar, agrandar o mover una caja. rotate(10deg) la inclina un poco.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte aquí con un truco especial! 🤖", "¿Y si pudiéramos girar una caja?"] },
      {
        lines: [
          "transform es una propiedad muy poderosa.",
          "Con rotate(10deg) la caja se inclina 10 grados.",
        ],
      },
      { lines: ["deg significa grados, como en un reloj.", "¡Vamos a inclinar nuestra caja!"] },
    ],
    demo: {
      beforeLabel: "Caja sin girar",
      beforeHtml: "<div><p>Sin giro</p></div>",
      afterLabel: "Caja inclinada con rotate(10deg)",
      afterHtml: "<div class=\"girada\"><p>¡Girando!</p></div>",
      css: "div { background-color: #f59e0b; padding: 20px; margin: 16px; } .girada { transform: rotate(10deg); }",
    },
    reference: {
      language: "css",
      code: "div {\n  transform: rotate(10deg);\n}",
      annotations: [
        { fragment: "transform", tip: "La propiedad que transforma la forma o posición de la caja." },
        { fragment: "rotate(10deg)", tip: "El valor: gira la caja 10 grados en el sentido de las agujas del reloj." },
      ],
    },
    challenge: {
      instruction: "Gira la caja un poco. Escribe: transform: rotate(10deg);",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>¡Girando!</p>\n</div>",
      startingCss: "div {\n  background-color: #f59e0b;\n  padding: 20px;\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "transform\\s*:\\s*rotate", message: "Escribe transform: rotate(10deg); dentro del div." },
        { type: "computedStyle", selector: "div", property: "transform", contains: "matrix", message: "La caja todavía no está girada. Usa transform: rotate(10deg);" },
      ],
      hints: [
        "transform cambia la forma o posición de la caja.",
        "Para girarla: transform: rotate(10deg);",
      ],
    },
    celebration: "¡Dando vueltas! La transformación le da mucha personalidad a tus cajas. 🤖",
  },

  {
    id: 39,
    level: 4,
    title: "Efectos al pasar el cursor",
    concept: "Con :hover aplicamos estilos solo cuando pasamos el cursor por encima. transition hace que el cambio sea suave.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel con un efecto sorpresa! 👾", "¿Qué pasaría si el botón cambiara de color al tocarlo?"] },
      {
        lines: [
          ":hover aplica estilos solo cuando el cursor está encima.",
          "transition hace que el cambio sea gradual y suave.",
        ],
      },
      { lines: ["Así los botones se sienten vivos e interactivos.", "¡Pasa el cursor por encima y compruébalo!"] },
    ],
    demo: {
      beforeLabel: "Botón normal sin efecto",
      beforeHtml: "<button>Sin efecto</button>",
      afterLabel: "Cambia de color (pasa el cursor por encima)",
      afterHtml: "<button class=\"btn\">Pásame el cursor</button>",
      css: ".btn { background-color: #8b5cf6; color: white; padding: 12px; transition: 0.3s; } .btn:hover { background-color: #ec4899; }",
    },
    reference: {
      language: "css",
      code: "button {\n  transition: 0.3s;\n}\nbutton:hover {\n  background-color: pink;\n}",
      annotations: [
        { fragment: ":hover", tip: "El pseudo-selector que aplica estilos cuando el cursor está encima." },
        { fragment: "transition", tip: "La propiedad que hace el cambio gradual y suave." },
        { fragment: "background-color", tip: "La propiedad que cambia el color de fondo al hacer hover." },
      ],
    },
    challenge: {
      instruction: "Haz que el botón cambie de color al pasar el cursor. Dentro de la regla button:hover escribe: background-color: #ec4899;",
      cssEnabled: true,
      startingHtml: "<button>Pásame el cursor</button>",
      startingCss: "button {\n  background-color: #8b5cf6;\n  color: white;\n  padding: 12px;\n  transition: 0.3s;\n}\nbutton:hover {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: ":hover", message: "Necesitas una regla button:hover { … }." },
        { type: "cssMatches", pattern: "hover\\s*\\{[^}]*background-color", message: "Dentro de button:hover escribe un background-color nuevo, por ejemplo #ec4899." },
      ],
      hints: [
        "La regla button:hover ya está; complétala dentro de sus llaves.",
        "Escribe: background-color: #ec4899;",
      ],
    },
    celebration: "¡Interactivo! Tu botón ahora reacciona al cursor como en las páginas reales. 👾",
  },

  {
    id: 40,
    level: 4,
    title: "Fila de cajas con estilo",
    concept: "Proyecto integrador: combina display: flex, gap y box-shadow para diseñar una fila de cajas.",
    character: "luna",
    narrative: [
      { lines: ["¡Luna aquí para la última aventura del Nivel 4! 🦊", "¡Vamos a usar todo lo que aprendiste!"] },
      {
        lines: [
          "display: flex pone las cajas en fila, gap las separa y box-shadow las hace flotar.",
          "¡Es la combinación perfecta para una fila de tarjetas!",
        ],
      },
      { lines: ["Mezcla las tres propiedades dentro de div { }.", "¡Demuestra todo tu talento de diseñadora CSS!"] },
    ],
    demo: {
      beforeLabel: "Tres bloques apilados sin estilo",
      beforeHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      afterLabel: "Fila de cajas con gap y sombra",
      afterHtml: "<div class=\"fila\">\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      css: "div { background-color: #f0fdf4; padding: 12px; } p { background-color: #a7f3d0; padding: 10px; } .fila { display: flex; gap: 16px; box-shadow: 4px 4px 8px gray; }",
    },
    reference: {
      language: "css",
      code: "div {\n  display: flex;\n  gap: 16px;\n  box-shadow: 4px 4px 8px gray;\n}",
      annotations: [
        { fragment: "display", tip: "Con display: flex ponemos los hijos en fila." },
        { fragment: "gap", tip: "gap separa los elementos con un espacio entre ellos." },
        { fragment: "box-shadow", tip: "box-shadow añade una sombra para que la caja parezca que flota." },
      ],
    },
    challenge: {
      instruction: "Diseña una fila: pon las cajas en fila con display: flex, sepáralas con gap y dale una box-shadow al contenedor.",
      cssEnabled: true,
      startingHtml: "<div>\n  <p>Uno</p>\n  <p>Dos</p>\n  <p>Tres</p>\n</div>",
      startingCss: "div {\n  \n}",
      rules: [
        { type: "cssMatches", pattern: "display\\s*:\\s*flex", message: "Pon las cajas en fila con display: flex;" },
        { type: "cssMatches", pattern: "gap\\s*:", message: "Sepáralas con gap, por ejemplo gap: 16px;" },
        { type: "cssMatches", pattern: "box-shadow\\s*:", message: "Dale una sombra con box-shadow." },
        { type: "computedStyle", selector: "div", property: "display", contains: "flex", message: "Las cajas todavía no están en fila. Usa display: flex;" },
      ],
      hints: [
        "Ve agregando una propiedad a la vez dentro de div { }.",
        "display: flex; luego gap: 16px; y box-shadow: 4px 4px 8px gray;",
      ],
    },
    celebration: "¡FELICIDADES! 🎉 Terminaste el Nivel 4 y ya eres todo un Diseñador de CSS. ✏️",
    badge: "disenador",
  },
];
