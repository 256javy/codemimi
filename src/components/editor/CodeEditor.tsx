"use client";

import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { EditorView } from "@codemirror/view";
import { useMemo } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: "html" | "css";
  readOnly?: boolean;
  /** Permite pegar desde fuera (true en proyectos libres, false en lecciones). */
  ariaLabel?: string;
}

// Tema visual claro y legible para niños.
const kidTheme = EditorView.theme({
  "&": { backgroundColor: "#ffffff", color: "#1e1b4b" },
  ".cm-content": { padding: "12px 0", fontFamily: "var(--font-mono), monospace" },
  ".cm-gutters": {
    backgroundColor: "#f5f3ff",
    color: "#a78bfa",
    border: "none",
    fontWeight: "600",
  },
  ".cm-activeLine": { backgroundColor: "#faf5ff" },
  ".cm-activeLineGutter": { backgroundColor: "#ede9fe", color: "#7c3aed" },
  ".cm-lineNumbers .cm-gutterElement": { padding: "0 10px" },
  "&.cm-focused": { outline: "none" },
});

export default function CodeEditor({
  value,
  onChange,
  language,
  readOnly = false,
  ariaLabel,
}: CodeEditorProps) {
  const extensions = useMemo(
    () => [language === "html" ? html() : css(), kidTheme, EditorView.lineWrapping],
    [language],
  );

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      extensions={extensions}
      aria-label={ariaLabel}
      height="100%"
      basicSetup={{
        // Requisito pedagógico: SIN asistencia de escritura.
        autocompletion: false,
        closeBrackets: false,
        completionKeymap: false,
        // Indentación automática de formato sí está permitida.
        indentOnInput: true,
        // Características de ayuda visual activas.
        lineNumbers: true,
        highlightActiveLine: true,
        bracketMatching: true,
        foldGutter: false,
        searchKeymap: false,
        lintKeymap: false,
      }}
    />
  );
}
