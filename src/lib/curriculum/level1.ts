// Nivel 1 — Fundamentos de HTML (Aventuras 1–10).
// Cada lección sigue la estructura de 5 pasos del PRD.
// NOTA: archivo semilla con una lección de ejemplo completa; el resto se
// completa siguiendo exactamente este mismo patrón.

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
      beforeLabel: "Texto normal",
      beforeHtml: "Hola mundo",
      afterLabel: "Con una etiqueta de párrafo",
      afterHtml: "<p>Hola mundo</p>",
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
];
