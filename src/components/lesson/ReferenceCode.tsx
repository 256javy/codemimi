"use client";

import { useState } from "react";
import type { ReferenceStep } from "@/lib/types";

/** Muestra código de referencia en SOLO LECTURA y no copiable, con anotaciones
 *  explicativas al pasar el cursor (paso 3 del PRD). */
export default function ReferenceCode({ reference }: { reference: ReferenceStep }) {
  const [active, setActive] = useState<string | null>(null);
  const annotation = reference.annotations?.find((a) => a.fragment === active);

  return (
    <div className="space-y-3">
      <pre
        // Bloqueamos selección/copia para evitar copiar sin entender.
        onCopy={(e) => e.preventDefault()}
        className="select-none overflow-x-auto rounded-2xl bg-tinta p-5 font-mono text-sm leading-relaxed text-cielo-claro"
      >
        <code>
          {reference.annotations && reference.annotations.length > 0
            ? renderAnnotated(reference.code, reference.annotations.map((a) => a.fragment), setActive)
            : reference.code}
        </code>
      </pre>
      <p className="min-h-[1.5rem] text-sm text-tinta/70">
        {annotation ? (
          <>
            <span className="font-mono font-bold text-uva">{annotation.fragment}</span>{" "}
            — {annotation.tip}
          </>
        ) : (
          <span className="text-tinta/40">
            👆 Pasa el cursor sobre las partes resaltadas para saber qué hacen.
          </span>
        )}
      </p>
    </div>
  );
}

/** Resalta los fragmentos anotados dentro del código como spans interactivos. */
function renderAnnotated(
  code: string,
  fragments: string[],
  onHover: (f: string | null) => void,
) {
  const parts: (string | { frag: string })[] = [code];

  for (const frag of fragments) {
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (typeof part !== "string") continue;
      const idx = part.indexOf(frag);
      if (idx === -1) continue;
      const before = part.slice(0, idx);
      const after = part.slice(idx + frag.length);
      parts.splice(i, 1, before, { frag }, after);
      break;
    }
  }

  return parts.map((part, i) =>
    typeof part === "string" ? (
      <span key={i}>{part}</span>
    ) : (
      <mark
        key={i}
        onMouseEnter={() => onHover(part.frag)}
        onMouseLeave={() => onHover(null)}
        className="cursor-help rounded bg-uva/40 px-0.5 text-white"
      >
        {part.frag}
      </mark>
    ),
  );
}
