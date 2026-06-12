// Nivel 3 — HTML intermedio (Aventuras 21–30).
// Tablas, formularios y etiquetas semánticas.
// Cada lección sigue la estructura de 5 pasos del PRD.

import type { Lesson } from "../types";

export const LEVEL_3: Lesson[] = [
  {
    id: 21,
    level: 3,
    title: "Tablas para ordenar datos",
    concept: "Una tabla <table> ordena datos en filas <tr> y celdas <td>.",
    character: "byte",
    narrative: [
      { lines: ["¡Hola! Soy Byte 🤖.", "A los robots nos encanta ordenar datos en filas."] },
      {
        lines: [
          "<table> es la etiqueta que crea una tabla.",
          "Dentro van filas <tr> y en cada fila van celdas <td>.",
        ],
      },
      { lines: ["¡Es como una hoja de cálculo hecha con HTML!", "Vamos a ordenar algo juntos."] },
    ],
    demo: {
      beforeLabel: "Datos sueltos en párrafos",
      beforeHtml: "<p>Manzana - Roja</p>\n<p>Pera - Verde</p>",
      afterLabel: "Los mismos datos en una tabla",
      afterHtml:
        "<table>\n  <tr>\n    <td>Manzana</td>\n    <td>Roja</td>\n  </tr>\n  <tr>\n    <td>Pera</td>\n    <td>Verde</td>\n  </tr>\n</table>",
    },
    reference: {
      language: "html",
      code: "<table>\n  <tr>\n    <td>Manzana</td>\n    <td>Roja</td>\n  </tr>\n</table>",
      annotations: [
        { fragment: "<table>", tip: "Abre la tabla. Todo lo demás va dentro." },
        { fragment: "<tr>", tip: "Table Row: una fila de la tabla." },
        { fragment: "<td>", tip: "Table Data: una celda dentro de la fila." },
      ],
    },
    challenge: {
      instruction: "Crea una tabla <table> con 2 filas. Cada fila <tr> debe tener 2 celdas <td>.",
      cssEnabled: false,
      startingHtml: "<table>\n  \n</table>",
      rules: [
        { type: "elementExists", selector: "table", message: "Necesitas una etiqueta <table>…</table>." },
        { type: "elementCount", selector: "table tr", min: 2, message: "La tabla necesita al menos 2 filas <tr>." },
        { type: "elementCount", selector: "table td", min: 4, message: "Cada fila debe tener 2 celdas <td>: en total al menos 4." },
      ],
      hints: [
        "Cada fila va en <tr>…</tr>.",
        "Dentro de cada <tr> pon dos celdas: <td>…</td>.",
      ],
    },
    celebration: "¡Perfecto! Tus datos ahora están ordenados en una tabla. 📊",
  },

  {
    id: 22,
    level: 3,
    title: "Encabezados de tabla",
    concept: "Con <th> creamos encabezados de tabla: salen en negrita y centrados.",
    character: "luna",
    narrative: [
      { lines: ["¡Hola! Soy Luna 🦊.", "Una buena tabla siempre tiene títulos en sus columnas."] },
      {
        lines: [
          "<th> es como un <td>, pero es el encabezado.",
          "El navegador lo pone en negrita y centrado automáticamente.",
        ],
      },
      { lines: ["Va en la primera fila de la tabla.", "¡Así se sabe qué significa cada columna!"] },
    ],
    demo: {
      beforeLabel: "Tabla sin encabezados",
      beforeHtml:
        "<table>\n  <tr>\n    <td>Manzana</td>\n    <td>Roja</td>\n  </tr>\n</table>",
      afterLabel: "Tabla con encabezados <th>",
      afterHtml:
        "<table>\n  <tr>\n    <th>Fruta</th>\n    <th>Color</th>\n  </tr>\n  <tr>\n    <td>Manzana</td>\n    <td>Roja</td>\n  </tr>\n</table>",
    },
    reference: {
      language: "html",
      code: "<table>\n  <tr>\n    <th>Fruta</th>\n    <th>Color</th>\n  </tr>\n  <tr>\n    <td>Manzana</td>\n    <td>Roja</td>\n  </tr>\n</table>",
      annotations: [
        { fragment: "<th>", tip: "Table Header: encabezado de columna. Sale en negrita y centrado." },
        { fragment: "<tr>", tip: "La primera fila lleva los <th>; las demás filas llevan <td>." },
      ],
    },
    challenge: {
      instruction: "Agrega una primera fila de encabezados a la tabla usando celdas <th> (al menos 2).",
      cssEnabled: false,
      startingHtml: "<table>\n  <tr>\n    <td>Manzana</td>\n    <td>Roja</td>\n  </tr>\n</table>",
      rules: [
        { type: "elementExists", selector: "table", message: "Sigue usando la tabla <table>." },
        { type: "elementCount", selector: "th", min: 2, message: "Agrega al menos 2 encabezados <th>." },
      ],
      hints: [
        "Los encabezados van en su propia fila <tr> arriba.",
        "Usa <th>…</th> en vez de <td> para los títulos.",
      ],
    },
    celebration: "¡Genial! Tu tabla ahora tiene títulos claros en negrita. 🏷️",
  },

  {
    id: 23,
    level: 3,
    title: "Formularios y campos de texto",
    concept: "Un formulario <form> recoge datos. Un <input type=\"text\"> es un campo para escribir.",
    character: "max",
    narrative: [
      { lines: ["¡Hey! Soy Max 🐙.", "Con mis brazos puedo rellenar muchos formularios a la vez."] },
      {
        lines: [
          "<form> es la caja que recoge la información.",
          "Dentro va un campo <input type=\"text\"> donde se escribe.",
        ],
      },
      { lines: ["El <input> no tiene cierre: va solo.", "¡Hagamos nuestro primer formulario!"] },
    ],
    demo: {
      beforeLabel: "Texto sin campo de escritura",
      beforeHtml: "<p>Escribe tu nombre:</p>",
      afterLabel: "Con un formulario y un campo",
      afterHtml: "<p>Escribe tu nombre:</p>\n<form>\n  <input type=\"text\">\n</form>",
    },
    reference: {
      language: "html",
      code: "<form>\n  <input type=\"text\">\n</form>",
      annotations: [
        { fragment: "<form>", tip: "Abre el formulario. Todo lo que recoge datos va dentro." },
        { fragment: "<input", tip: "La etiqueta del campo. No tiene cierre." },
        { fragment: "type=\"text\"", tip: "Indica que es un campo de texto para escribir." },
      ],
    },
    challenge: {
      instruction: "Crea un formulario <form> y dentro un campo de texto <input type=\"text\">.",
      cssEnabled: false,
      startingHtml: "",
      rules: [
        { type: "elementExists", selector: "form", message: "Necesitas una etiqueta <form>…</form>." },
        { type: "elementExists", selector: "form input", message: "El campo <input> debe ir dentro del <form>." },
        { type: "attribute", selector: "input", attr: "type", equals: "text", message: "El <input> debe ser de tipo texto: type=\"text\"." },
      ],
      hints: [
        "El <input> no necesita cierre, va solo: <input type=\"text\">.",
        "Ponlo entre <form> y </form>.",
      ],
    },
    celebration: "¡Excelente! Tu primer formulario está listo para recibir datos. 📝",
  },

  {
    id: 24,
    level: 3,
    title: "Etiquetas de campo",
    concept: "Un <label> es el texto que explica para qué sirve un campo del formulario.",
    character: "pixel",
    narrative: [
      { lines: ["¡Buenas! Soy Pixel 👾.", "Un campo sin etiqueta es como una puerta sin nombre."] },
      {
        lines: [
          "<label> es el texto que le dice al usuario qué escribir.",
          "Va justo antes del campo al que pertenece.",
        ],
      },
      { lines: ["Así queda clarísimo qué información se pide.", "¡Hagamos nuestro formulario más amigable!"] },
    ],
    demo: {
      beforeLabel: "Campo sin etiqueta (¿qué escribo aquí?)",
      beforeHtml: "<form>\n  <input type=\"text\">\n</form>",
      afterLabel: "Campo con etiqueta <label>",
      afterHtml: "<form>\n  <label>Nombre:</label>\n  <input type=\"text\">\n</form>",
    },
    reference: {
      language: "html",
      code: "<form>\n  <label>Nombre:</label>\n  <input type=\"text\">\n</form>",
      annotations: [
        { fragment: "<label>", tip: "Abre la etiqueta que describe el campo." },
      ],
    },
    challenge: {
      instruction: "Agrega una etiqueta <label> con el texto Nombre: antes del campo.",
      cssEnabled: false,
      startingHtml: "<form>\n  <input type=\"text\">\n</form>",
      rules: [
        { type: "elementExists", selector: "label", message: "Necesitas una etiqueta <label>…</label>." },
        { type: "textContains", selector: "label", message: "El <label> no debe estar vacío: escribe un texto como «Nombre:»." },
      ],
      hints: [
        "El <label> va justo antes del <input>.",
        "Escribe el texto entre <label> y </label>.",
      ],
    },
    celebration: "¡Muy bien! Tu formulario ahora explica qué se debe escribir. ✅",
  },

  {
    id: 25,
    level: 3,
    title: "Botones",
    concept: "Un <button> es un botón en el que se hace clic, por ejemplo para enviar un formulario.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte aquí! 🤖", "A los robots nos encantan los botones: los apretamos con precisión."] },
      {
        lines: [
          "<button> crea un botón en el que el usuario puede hacer clic.",
          "El texto que escribas dentro aparece en el botón.",
        ],
      },
      { lines: ["Suele ir al final del formulario.", "¡Vamos a poner un botón de Enviar!"] },
    ],
    demo: {
      beforeLabel: "Formulario sin botón",
      beforeHtml: "<form>\n  <input type=\"text\">\n</form>",
      afterLabel: "Formulario con botón",
      afterHtml: "<form>\n  <input type=\"text\">\n  <button>Enviar</button>\n</form>",
    },
    reference: {
      language: "html",
      code: "<form>\n  <input type=\"text\">\n  <button>Enviar</button>\n</form>",
      annotations: [
        { fragment: "<button>", tip: "Abre el botón. El texto dentro se ve en la pantalla." },
      ],
    },
    challenge: {
      instruction: "Agrega un botón <button> que diga Enviar al formulario.",
      cssEnabled: false,
      startingHtml: "<form>\n  <input type=\"text\">\n  \n</form>",
      rules: [
        { type: "elementExists", selector: "button", message: "Necesitas una etiqueta <button>…</button>." },
        { type: "textContains", selector: "button", text: "enviar", message: "El botón debe decir «Enviar»." },
      ],
      hints: [
        "El botón va dentro del <form>, después del campo.",
        "Escribe: <button>Enviar</button>.",
      ],
    },
    celebration: "¡Clic! Tu formulario ahora tiene un botón listo para usarse. 🖱️",
  },

  {
    id: 26,
    level: 3,
    title: "Más campos de formulario",
    concept: "Con <textarea> se escriben textos largos y con <select> se elige una opción de una lista.",
    character: "luna",
    narrative: [
      { lines: ["¡Luna de vuelta! 🦊", "Los formularios pueden tener muchos tipos de campos."] },
      {
        lines: [
          "<textarea> es un área grande para escribir mucho texto.",
          "<select> muestra una lista de opciones para elegir.",
        ],
      },
      { lines: ["Cada opción del <select> va en un <option>.", "¡Hagamos un formulario más completo!"] },
    ],
    demo: {
      beforeLabel: "Formulario con solo un campo",
      beforeHtml: "<form>\n  <input type=\"text\">\n</form>",
      afterLabel: "Con área de texto y lista de opciones",
      afterHtml:
        "<form>\n  <textarea></textarea>\n  <select>\n    <option>Sí</option>\n    <option>No</option>\n  </select>\n</form>",
    },
    reference: {
      language: "html",
      code: "<form>\n  <textarea></textarea>\n  <select>\n    <option>Sí</option>\n    <option>No</option>\n  </select>\n</form>",
      annotations: [
        { fragment: "<textarea>", tip: "Área de texto grande. Se abre y se cierra: <textarea></textarea>." },
        { fragment: "<select>", tip: "Lista desplegable de opciones para elegir." },
        { fragment: "<option>", tip: "Cada opción de la lista. Va dentro del <select>." },
      ],
    },
    challenge: {
      instruction: "Agrega un área de texto <textarea> y una lista <select> con 2 opciones <option>.",
      cssEnabled: false,
      startingHtml: "<form>\n  \n</form>",
      rules: [
        { type: "elementExists", selector: "textarea", message: "Falta el área de texto <textarea>…</textarea>." },
        { type: "elementExists", selector: "select", message: "Falta la lista desplegable <select>…</select>." },
        { type: "elementCount", selector: "select option", min: 2, message: "El <select> necesita al menos 2 <option>." },
      ],
      hints: [
        "El <textarea> se abre y se cierra: <textarea></textarea>.",
        "Dentro del <select> pon dos <option>…</option>.",
      ],
    },
    celebration: "¡Impresionante! Tu formulario ahora acepta todo tipo de respuestas. 🎛️",
  },

  {
    id: 27,
    level: 3,
    title: "Semántica I: cabecera, menú y pie",
    concept: "Las etiquetas semánticas dan significado: <header> es la cabecera, <nav> el menú y <footer> el pie de página.",
    character: "max",
    narrative: [
      { lines: ["¡Max aquí! 🐙", "Con mis brazos organizo cada parte de la página en su sitio."] },
      {
        lines: [
          "<header> va arriba: el nombre o logo del sitio.",
          "<nav> es el menú de navegación y <footer> va al pie de la página.",
        ],
      },
      { lines: ["Son como <div>, pero con un nombre que dice qué son.", "¡La página queda más ordenada y con sentido!"] },
    ],
    demo: {
      css: "header { background: #ede9fe; padding: 8px; } nav { background: #dbeafe; padding: 8px; } footer { background: #fce7f3; padding: 8px; }",
      beforeLabel: "Todo en <div> sin significado",
      beforeHtml: "<div>Mi sitio</div>\n<div>Inicio · Juegos</div>\n<div>Hecho por mí</div>",
      afterLabel: "Con etiquetas semánticas (les pusimos color para ver cada zona)",
      afterHtml: "<header>Mi sitio</header>\n<nav>Inicio · Juegos</nav>\n<footer>Hecho por mí</footer>",
    },
    reference: {
      language: "html",
      code: "<header>Mi sitio</header>\n<nav>Inicio · Juegos</nav>\n<footer>Hecho por mí</footer>",
      annotations: [
        { fragment: "<header>", tip: "La cabecera del sitio: nombre, logo, título principal." },
        { fragment: "<nav>", tip: "El menú de navegación: los enlaces para ir a otras secciones." },
        { fragment: "<footer>", tip: "El pie de página: información al final del sitio." },
      ],
    },
    challenge: {
      instruction: "Arma la estructura de la página con tres zonas: <header>, <nav> y <footer>.",
      cssEnabled: false,
      startingHtml: "",
      rules: [
        { type: "elementExists", selector: "header", message: "Falta la cabecera <header>…</header>." },
        { type: "elementExists", selector: "nav", message: "Falta el menú <nav>…</nav>." },
        { type: "elementExists", selector: "footer", message: "Falta el pie de página <footer>…</footer>." },
      ],
      hints: [
        "Cada zona es una etiqueta distinta con su texto dentro.",
        "Orden típico: primero <header>, luego <nav>, al final <footer>.",
      ],
    },
    celebration: "¡Muy bien estructurado! Tu página ya tiene cabecera, menú y pie. 🏛️",
  },

  {
    id: 28,
    level: 3,
    title: "Semántica II: contenido principal",
    concept: "<main> es el contenido principal; dentro va una <section> y dentro un <article> para cada contenido.",
    character: "pixel",
    narrative: [
      { lines: ["¡Pixel al habla! 👾", "Las páginas tienen una zona central con todo el contenido importante."] },
      {
        lines: [
          "<main> es el contenido principal de la página.",
          "Dentro van <section> para agrupar temas y <article> para cada texto.",
        ],
      },
      { lines: ["Se anidan: main contiene section, que contiene article.", "¡Es como cajas dentro de cajas!"] },
    ],
    demo: {
      css: "main { background: #d1fae5; padding: 10px; } section { background: #a7f3d0; padding: 8px; } article { background: #6ee7b7; padding: 6px; }",
      beforeLabel: "Todo en <div> anidados sin significado",
      beforeHtml: "<div><div><div>Mi primer artículo</div></div></div>",
      afterLabel: "Con etiquetas semánticas (les pusimos color para ver la estructura)",
      afterHtml: "<main>\n  <section>\n    <article>Mi primer artículo</article>\n  </section>\n</main>",
    },
    reference: {
      language: "html",
      code: "<main>\n  <section>\n    <article>Mi primer artículo</article>\n  </section>\n</main>",
      annotations: [
        { fragment: "<main>", tip: "El contenido principal de la página. Solo debe haber uno." },
        { fragment: "<section>", tip: "Agrupa contenidos relacionados dentro de main." },
        { fragment: "<article>", tip: "Un contenido independiente: un artículo, una noticia, una entrada." },
      ],
    },
    challenge: {
      instruction: "Dentro de <main> pon una <section> y dentro de ella un <article>.",
      cssEnabled: false,
      startingHtml: "<main>\n  \n</main>",
      rules: [
        { type: "elementExists", selector: "main", message: "Necesitas el contenido principal <main>…</main>." },
        { type: "elementExists", selector: "main section", message: "Dentro de <main> debe ir una <section>." },
        { type: "elementExists", selector: "section article", message: "Dentro de la <section> debe ir un <article>." },
      ],
      hints: [
        "Van anidadas: <main> contiene <section>, que contiene <article>.",
        "Escribe el <article> entre <section> y </section>.",
      ],
    },
    celebration: "¡Estructura perfecta! Tu página tiene su zona de contenido bien organizada. 🗂️",
  },

  {
    id: 29,
    level: 3,
    title: "Imágenes con leyenda",
    concept: "Una <figure> agrupa una imagen con su leyenda <figcaption> (el texto que la describe debajo).",
    character: "luna",
    narrative: [
      { lines: ["¡Luna de nuevo! 🦊", "Las fotos quedan mucho mejor cuando llevan una pequeña explicación."] },
      {
        lines: [
          "<figure> es una caja especial para imágenes.",
          "Dentro va la <img> y, debajo, un <figcaption> con la descripción.",
        ],
      },
      { lines: ["Es como el pie de foto de un álbum.", "¡Hagamos nuestra primera imagen con leyenda!"] },
    ],
    demo: {
      beforeLabel: "Imagen y texto sueltos",
      beforeHtml: "<img src=\"https://picsum.photos/200\" alt=\"Un paisaje\">\n<p>Una foto bonita</p>",
      afterLabel: "Imagen con leyenda dentro de <figure>",
      afterHtml:
        "<figure>\n  <img src=\"https://picsum.photos/200\" alt=\"Un paisaje\">\n  <figcaption>Una foto bonita</figcaption>\n</figure>",
    },
    reference: {
      language: "html",
      code: "<figure>\n  <img src=\"https://picsum.photos/200\" alt=\"Un paisaje\">\n  <figcaption>Una foto bonita</figcaption>\n</figure>",
      annotations: [
        { fragment: "<figure>", tip: "Agrupa la imagen y su leyenda en un solo bloque." },
        { fragment: "<figcaption>", tip: "El texto que describe la imagen; aparece debajo." },
      ],
    },
    challenge: {
      instruction: "Crea una <figure> con una imagen <img> dentro y una leyenda <figcaption>.",
      cssEnabled: false,
      startingHtml: "<figure>\n  \n</figure>",
      rules: [
        { type: "elementExists", selector: "figure", message: "Necesitas una etiqueta <figure>…</figure>." },
        { type: "elementExists", selector: "figure img", message: "La imagen <img> debe ir dentro de la <figure>." },
        { type: "elementExists", selector: "figure figcaption", message: "Falta la leyenda <figcaption> dentro de la <figure>." },
      ],
      hints: [
        "La <img> y la <figcaption> van entre <figure> y </figure>.",
        "Recuerda el alt de la imagen: <img src=\"...\" alt=\"...\">.",
      ],
    },
    celebration: "¡Qué bonita queda la foto con su leyenda! Como en un libro de fotos. 📷",
  },

  {
    id: 30,
    level: 3,
    title: "Mi página semántica completa",
    concept: "Proyecto integrador: una página semántica con cabecera, una tabla y un formulario.",
    character: "byte",
    narrative: [
      { lines: ["¡Byte aquí! 🤖", "Esta es la gran aventura final del Nivel 3."] },
      {
        lines: [
          "Aprendiste tablas, formularios y etiquetas semánticas.",
          "¡Ahora vamos a juntarlo todo en una sola página!",
        ],
      },
      { lines: ["Usa <header>, <main>, <table> y <form>.", "¡Demuestra todo lo que sabes, Constructor!"] },
    ],
    demo: {
      css: "header { background: #ede9fe; padding: 8px; } main { background: #f0fdf4; padding: 8px; } form { background: #fef9c3; padding: 8px; margin-top: 8px; } table { border-collapse: collapse; } td, th { border: 1px solid #aaa; padding: 4px; }",
      beforeLabel: "Página desordenada con <div> y texto suelto",
      beforeHtml:
        "<div>Mi página</div>\n<div>Fruta - Color</div>\n<div>Manzana - Roja</div>\n<div>Escribe algo: <input type=\"text\"> <button>Enviar</button></div>",
      afterLabel: "Página estructurada con semántica, tabla y formulario",
      afterHtml:
        "<header>\n  <h1>Mi página</h1>\n</header>\n<main>\n  <table>\n    <tr>\n      <th>Fruta</th>\n      <th>Color</th>\n    </tr>\n    <tr>\n      <td>Manzana</td>\n      <td>Roja</td>\n    </tr>\n  </table>\n</main>\n<form>\n  <input type=\"text\">\n  <button>Enviar</button>\n</form>",
    },
    reference: {
      language: "html",
      code: "<header>\n  <h1>Mi página</h1>\n</header>\n<main>\n  <table>\n    <tr>\n      <td>Dato</td>\n    </tr>\n  </table>\n</main>\n<form>\n  <input type=\"text\">\n  <button>Enviar</button>\n</form>",
      annotations: [
        { fragment: "<header>", tip: "La cabecera semántica de la página." },
        { fragment: "<main>", tip: "La zona del contenido principal." },
        { fragment: "<table>", tip: "La tabla con filas y celdas." },
        { fragment: "<form>", tip: "El formulario con su campo y botón." },
      ],
    },
    challenge: {
      instruction: "Crea una página completa: un <header> con un título, un <main> con una <table> de 2 filas, y un <form> con un <input> y un <button>.",
      cssEnabled: false,
      startingHtml: "<header>\n  \n</header>\n<main>\n  \n</main>\n",
      rules: [
        { type: "elementExists", selector: "header", message: "Falta la cabecera <header>." },
        { type: "elementExists", selector: "main", message: "Falta el contenido principal <main>." },
        { type: "elementExists", selector: "table", message: "Falta una tabla <table>." },
        { type: "elementCount", selector: "table tr", min: 2, message: "La tabla necesita al menos 2 filas <tr>." },
        { type: "elementExists", selector: "form", message: "Falta un formulario <form>." },
        { type: "elementExists", selector: "form input", message: "El <form> necesita un campo <input>." },
        { type: "elementExists", selector: "form button", message: "El <form> necesita un botón <button>." },
      ],
      hints: [
        "Ve por partes: primero el <header> con un <h1>, luego el <main> con la <table>.",
        "Termina con el <form> que lleva un <input> y un <button> dentro.",
      ],
    },
    celebration: "¡FELICIDADES! 🎉 Terminaste el Nivel 3. Ya sabes estructurar páginas completas. 🧱",
    badge: "constructor",
  },
];
