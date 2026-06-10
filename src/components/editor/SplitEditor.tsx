"use client";

import { useState, type ReactNode } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

interface SplitEditorProps {
  html: string;
  css: string;
  onHtmlChange: (v: string) => void;
  onCssChange: (v: string) => void;
  /** Si false, oculta la pestaña de CSS (lecciones solo-HTML). */
  cssEnabled?: boolean;
  /** Contenido opcional bajo el editor (instrucción, errores, botones). */
  feedback?: ReactNode;
}

type Tab = "html" | "css";

export default function SplitEditor({
  html,
  css,
  onHtmlChange,
  onCssChange,
  cssEnabled = true,
  feedback,
}: SplitEditorProps) {
  const [tab, setTab] = useState<Tab>("html");
  const activeTab: Tab = cssEnabled ? tab : "html";

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Columna del editor */}
      <div className="flex flex-col rounded-2xl border-2 border-uva/10 bg-white shadow-sm">
        <div className="flex items-center gap-1 border-b border-uva/10 px-3 pt-3">
          <TabButton
            label="HTML"
            emoji="📄"
            active={activeTab === "html"}
            onClick={() => setTab("html")}
          />
          {cssEnabled && (
            <TabButton
              label="CSS"
              emoji="🎨"
              active={activeTab === "css"}
              onClick={() => setTab("css")}
            />
          )}
        </div>

        <div className="min-h-[320px] flex-1 overflow-hidden p-2">
          {activeTab === "html" ? (
            <CodeEditor
              key="html"
              value={html}
              onChange={onHtmlChange}
              language="html"
              ariaLabel="Editor de HTML"
            />
          ) : (
            <CodeEditor
              key="css"
              value={css}
              onChange={onCssChange}
              language="css"
              ariaLabel="Editor de CSS"
            />
          )}
        </div>
      </div>

      {/* Columna de la vista previa */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 px-1 text-sm font-semibold text-tinta/70">
          <span>👀</span> Vista previa en vivo
        </div>
        <div className="min-h-[320px] flex-1">
          <Preview html={html} css={cssEnabled ? css : ""} />
        </div>
      </div>

      {feedback && <div className="lg:col-span-2">{feedback}</div>}
    </div>
  );
}

function TabButton({
  label,
  emoji,
  active,
  onClick,
}: {
  label: string;
  emoji: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`-mb-px rounded-t-xl border-b-2 px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border-uva text-uva"
          : "border-transparent text-tinta/50 hover:text-tinta"
      }`}
    >
      <span className="mr-1">{emoji}</span>
      {label}
    </button>
  );
}
