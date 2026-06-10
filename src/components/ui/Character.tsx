import type { CharacterId } from "@/lib/types";
import { CHARACTERS } from "@/lib/catalog";

interface CharacterProps {
  id: CharacterId;
  /** Texto que dice el personaje en un bocadillo. */
  speech?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "text-4xl",
  md: "text-6xl",
  lg: "text-8xl",
};

/** Personaje narrador con bocadillo de diálogo. */
export default function Character({ id, speech, size = "md" }: CharacterProps) {
  const c = CHARACTERS[id];
  return (
    <div className="flex items-end gap-4">
      <div
        className={`animate-float ${sizes[size]} shrink-0 select-none`}
        aria-hidden
      >
        {c.emoji}
      </div>
      {speech && (
        <div className="relative max-w-prose rounded-3xl rounded-bl-none bg-white px-5 py-4 text-lg leading-relaxed text-tinta shadow-md ring-1 ring-uva/10">
          <span className="mb-1 block text-sm font-bold" style={{ color: c.color }}>
            {c.name}
          </span>
          {speech}
        </div>
      )}
    </div>
  );
}
