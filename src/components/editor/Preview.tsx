"use client";

import { useEffect, useRef, useState } from "react";
import { buildDocument } from "@/lib/validation";

interface PreviewProps {
  html: string;
  css: string;
  /** Debounce en ms para actualizar el render (PRD: 300ms). */
  debounceMs?: number;
}

/** Renderiza el HTML+CSS del niño en un iframe aislado, con debounce. */
export default function Preview({ html, css, debounceMs = 300 }: PreviewProps) {
  const [doc, setDoc] = useState<string>(() => buildDocument(html, css));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setDoc(buildDocument(html, css));
    }, debounceMs);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [html, css, debounceMs]);

  return (
    <iframe
      title="Vista previa de tu página"
      srcDoc={doc}
      // Permite ejecutar el HTML/CSS sin acceso al resto de la app.
      sandbox="allow-scripts"
      className="h-full w-full rounded-2xl border-2 border-uva/10 bg-white"
    />
  );
}
