// Motor de validación basado en el OUTPUT del código del niño.
// Verifica si el resultado cumple las condiciones esperadas, no si el texto del
// código es idéntico. Corre 100% en el navegador.

import type { ValidationRule, ValidationResult } from "./types";

/** Construye el documento combinado HTML + CSS para renderizar/parsear. */
export function buildDocument(html: string, css: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><style>${css ?? ""}</style></head>
<body>${html ?? ""}</body>
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
      // computedStyle se evalúa aparte (requiere render).
      case "computedStyle":
        break;
    }
  }

  return errors;
}

/** Renderiza el documento en un iframe oculto y evalúa reglas de estilo computado. */
async function evaluateComputedStyleRules(
  rules: ValidationRule[],
  html: string,
  css: string,
): Promise<string[]> {
  const styleRules = rules.filter(
    (r): r is Extract<ValidationRule, { type: "computedStyle" }> =>
      r.type === "computedStyle",
  );
  if (styleRules.length === 0) return [];
  if (typeof document === "undefined") return [];

  const iframe = document.createElement("iframe");
  iframe.setAttribute("sandbox", "allow-same-origin");
  iframe.style.cssText =
    "position:absolute;width:800px;height:600px;left:-9999px;top:-9999px;border:0;";
  document.body.appendChild(iframe);

  try {
    const idoc = iframe.contentDocument;
    if (!idoc) return styleRules.map((r) => r.message);
    idoc.open();
    idoc.write(buildDocument(html, css));
    idoc.close();

    // Espera un frame para que el navegador calcule estilos.
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));

    const win = iframe.contentWindow;
    const errors: string[] = [];
    for (const rule of styleRules) {
      const el = idoc.querySelector(rule.selector);
      if (!el || !win) {
        errors.push(rule.message);
        continue;
      }
      const value = win.getComputedStyle(el).getPropertyValue(rule.property);
      if (!value.toLowerCase().includes(rule.contains.toLowerCase())) {
        errors.push(rule.message);
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
): Promise<ValidationResult> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(buildDocument(html, css), "text/html");

  const staticErrors = evaluateStaticRules(rules, html, css, doc);
  const styleErrors = await evaluateComputedStyleRules(rules, html, css);

  const errors = [...staticErrors, ...styleErrors];
  return { passed: errors.length === 0, errors };
}
