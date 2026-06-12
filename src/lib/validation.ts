// Motor de validación basado en el OUTPUT del código del niño.
// Verifica si el resultado cumple las condiciones esperadas, no si el texto del
// código es idéntico. Corre 100% en el navegador.

import type { ValidationRule, ValidationResult } from "./types";

/** Construye el documento combinado HTML + CSS (+ JS) para renderizar/parsear.
 *  El script va al final del body para que el DOM ya exista cuando se ejecute. */
export function buildDocument(html: string, css: string, js = ""): string {
  const script = js
    ? `<script>${js.replace(/<\/script/gi, "<\\/script")}</script>`
    : "";
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><style>${css ?? ""}</style></head>
<body>${html ?? ""}${script}</body>
</html>`;
}

function safeRegex(pattern: string, flags?: string): RegExp | null {
  try {
    return new RegExp(pattern, flags ?? "i");
  } catch {
    return null;
  }
}

/** Evalúa las reglas que NO requieren render (estructura HTML, regex). */
function evaluateStaticRules(
  rules: ValidationRule[],
  html: string,
  css: string,
  js: string,
  doc: Document,
): string[] {
  const errors: string[] = [];

  for (const rule of rules) {
    switch (rule.type) {
      case "elementExists": {
        if (!doc.querySelector(rule.selector)) errors.push(rule.message);
        break;
      }
      case "elementCount": {
        const n = doc.querySelectorAll(rule.selector).length;
        const okMin = rule.min === undefined || n >= rule.min;
        const okMax = rule.max === undefined || n <= rule.max;
        const okExact = rule.exact === undefined || n === rule.exact;
        if (!(okMin && okMax && okExact)) errors.push(rule.message);
        break;
      }
      case "textContains": {
        const el = doc.querySelector(rule.selector);
        const text = (el?.textContent ?? "").trim();
        if (!el) {
          errors.push(rule.message);
        } else if (rule.text) {
          if (!text.toLowerCase().includes(rule.text.toLowerCase()))
            errors.push(rule.message);
        } else if (text.length === 0) {
          errors.push(rule.message);
        }
        break;
      }
      case "attribute": {
        const el = doc.querySelector(rule.selector);
        if (!el || !el.hasAttribute(rule.attr)) {
          errors.push(rule.message);
        } else if (
          rule.equals !== undefined &&
          el.getAttribute(rule.attr) !== rule.equals
        ) {
          errors.push(rule.message);
        }
        break;
      }
      case "htmlMatches": {
        const re = safeRegex(rule.pattern, rule.flags);
        if (!re || !re.test(html)) errors.push(rule.message);
        break;
      }
      case "cssMatches": {
        const re = safeRegex(rule.pattern, rule.flags);
        if (!re || !re.test(css)) errors.push(rule.message);
        break;
      }
      case "jsMatches": {
        const re = safeRegex(rule.pattern, rule.flags);
        if (!re || !re.test(js)) errors.push(rule.message);
        break;
      }
      // computedStyle y domAfterJs se evalúan aparte (requieren render).
      case "computedStyle":
      case "domAfterJs":
        break;
    }
  }

  return errors;
}

type RenderedRule = Extract<
  ValidationRule,
  { type: "computedStyle" | "domAfterJs" }
>;

const DEFAULT_VIEWPORT = 800;

/** Renderiza el documento en iframes ocultos (uno por ancho de viewport) y
 *  evalúa estilos computados y el estado del DOM tras ejecutar el JS. */
async function evaluateRenderedRules(
  rules: ValidationRule[],
  html: string,
  css: string,
  js: string,
): Promise<string[]> {
  const rendered = rules.filter(
    (r): r is RenderedRule =>
      r.type === "computedStyle" || r.type === "domAfterJs",
  );
  if (rendered.length === 0) return [];
  if (typeof document === "undefined") return [];

  // Las media queries dependen del ancho del iframe: agrupamos las reglas por
  // viewport para renderizar una sola vez por ancho distinto.
  const groups = new Map<number, RenderedRule[]>();
  for (const rule of rendered) {
    const width =
      rule.type === "computedStyle" && rule.viewport
        ? rule.viewport
        : DEFAULT_VIEWPORT;
    const group = groups.get(width) ?? [];
    group.push(rule);
    groups.set(width, group);
  }

  const errors: string[] = [];
  for (const [width, group] of groups) {
    errors.push(...(await evaluateInIframe(group, html, css, js, width)));
  }
  return errors;
}

async function evaluateInIframe(
  group: RenderedRule[],
  html: string,
  css: string,
  js: string,
  width: number,
): Promise<string[]> {
  const iframe = document.createElement("iframe");
  iframe.setAttribute(
    "sandbox",
    js ? "allow-same-origin allow-scripts" : "allow-same-origin",
  );
  iframe.style.cssText = `position:absolute;width:${width}px;height:600px;left:-9999px;top:-9999px;border:0;`;
  document.body.appendChild(iframe);

  try {
    const idoc = iframe.contentDocument;
    if (!idoc) return group.map((r) => r.message);
    idoc.open();
    idoc.write(buildDocument(html, css, js));
    idoc.close();

    // Espera un frame para que el navegador calcule estilos y ejecute el JS.
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));

    const win = iframe.contentWindow;
    const errors: string[] = [];
    for (const rule of group) {
      if (rule.type === "computedStyle") {
        const el = idoc.querySelector(rule.selector);
        if (!el || !win) {
          errors.push(rule.message);
          continue;
        }
        const value = win.getComputedStyle(el).getPropertyValue(rule.property);
        if (!value.toLowerCase().includes(rule.contains.toLowerCase())) {
          errors.push(rule.message);
        }
      } else {
        // domAfterJs: opcionalmente simula un clic y comprueba el DOM resultante.
        if (rule.clickSelector) {
          const target = idoc.querySelector<HTMLElement>(rule.clickSelector);
          target?.click();
          // Espera a que el handler del niño actualice el DOM.
          await new Promise((resolve) =>
            requestAnimationFrame(() => resolve(null)),
          );
        }
        const el = idoc.querySelector(rule.selector);
        if (!el) {
          errors.push(rule.message);
          continue;
        }
        if (rule.textContains) {
          const text = (el.textContent ?? "").toLowerCase();
          if (!text.includes(rule.textContains.toLowerCase())) {
            errors.push(rule.message);
            continue;
          }
        }
        if (rule.styleProperty && win) {
          const value = win
            .getComputedStyle(el)
            .getPropertyValue(rule.styleProperty)
            .toLowerCase();
          const okContains =
            !rule.styleContains ||
            value.includes(rule.styleContains.toLowerCase());
          const okNot =
            !rule.styleNotContains ||
            !value.includes(rule.styleNotContains.toLowerCase());
          if (!(okContains && okNot)) errors.push(rule.message);
        }
      }
    }
    return errors;
  } finally {
    iframe.remove();
  }
}

/** Valida el código del niño contra el conjunto de reglas de la lección. */
export async function validateOutput(
  html: string,
  css: string,
  rules: ValidationRule[],
  js = "",
): Promise<ValidationResult> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(buildDocument(html, css), "text/html");

  const staticErrors = evaluateStaticRules(rules, html, css, js, doc);
  const renderedErrors = await evaluateRenderedRules(rules, html, css, js);

  const errors = [...staticErrors, ...renderedErrors];
  return { passed: errors.length === 0, errors };
}
