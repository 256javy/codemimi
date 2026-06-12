"use client";

import { useState, type ReactNode } from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

interface SplitEditorProps {
  html: string;
  css: string;
  js?: string;
  onHtmlChange: (v: string) => void;
  onCssChange: (v: string) => void;
  onJsChange?: (v: string) => void;
  /** Si false, oculta la pestaña de CSS (lecciones solo-HTML). */
  cssEnabled?: boolean;
  /** Si true, muestra la pestaña de JavaScript. */
  jsEnabled?: boolean;
  /** Si true, muestra el conmutador 📱/🖥️ de la vista previa (responsive). */
  responsivePreview?: boolean;
  /** Contenido opcional bajo el editor (instrucción, errores, botones). */
  feedback?: ReactNode;
}

type Tab = "html" | "css" | "js";

export default function SplitEditor({
  html,
  css,
  js = "",
  onHtmlChange,
  onCssChange,
  onJsChange,
  cssEnabled = true,
  jsEnabled = false,
  responsivePreview = false,
  feedback,
}: SplitEditorProps) {
  const [tab, setTab] = useState<Tab>("html");
  const [mobileView, setMobileView] = useState(false);
  const activeTab: Tab =
    (tab === "css" && !cssEnabled) || (tab === "js" && !jsEnabled)
      ? "html"
      : tab;

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
          {jsEnabled && (
            <TabButton
              label="JS"
              emoji="⚡"
              active={activeTab === "js"}
              onClick={() => setTab("js")}
            />
          )}
        </div>

        <div className="min-h-[320px] flex-1 overflow-hidden p-2">
          {activeTab === "html" && (
            <CodeEditor
              key="html"
              value={html}
              onChange={onHtmlChange}
              language="html"
              ariaLabel="Editor de HTML"
            />
          )}
          {activeTab === "css" && (
            <CodeEditor
              key="css"
              value={css}
              onChange={onCssChange}
              language="css"
              ariaLabel="Editor de CSS"
            />
          )}
          {activeTab === "js" && (
            <CodeEditor
              key="js"
              value={js}
              onChange={(v) => onJsChange?.(v)}
              language="js"
              ariaLabel="Editor de JavaScript"
            />
          )}
        </div>
      </div>

      {/* Columna de la vista previa */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1 text-sm font-semibold text-tinta/70">
          <span>
            <span className="mr-2">👀</span> Vista previa en vivo
          </span>
          {responsivePreview && (
            <div className="flex items-center gap-1 rounded-full bg-uva/10 p-1">
              <ViewportButton
                label="Computadora"
                emoji="🖥️"
                active={!mobileView}
                onClick={() => setMobileView(false)}
              />
              <ViewportButton
                label="Celular"
                emoji="📱"
                active={mobileView}
                onClick={() => setMobileView(true)}
              />
            </div>
          )}
        </div>
        <div
          className={`min-h-[320px] flex-1 ${
            mobileView ? "mx-auto w-full max-w-[360px]" : ""
          }`}
        >
          <Preview html={html} css={cssEnabled ? css : ""} js={jsEnabled ? js : ""} />
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

function ViewportButton({
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
      title={label}
      aria-label={`Vista de ${label.toLowerCase()}`}
      aria-pressed={active}
      className={`rounded-full px-2.5 py-0.5 text-sm transition ${
        active ? "bg-white shadow-sm" : "opacity-50 hover:opacity-80"
      }`}
    >
      {emoji}
    </button>
  );
}
