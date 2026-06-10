import type { Badge } from "@/lib/types";

interface BadgeChipProps {
  badge: Badge;
  unlocked?: boolean;
}

/** Insignia desbloqueable. En gris cuando aún no se obtiene. */
export default function BadgeChip({ badge, unlocked = true }: BadgeChipProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition ${
        unlocked
          ? "border-sol/40 bg-sol/10"
          : "border-uva/10 bg-uva/5 opacity-50 grayscale"
      }`}
      title={badge.description}
    >
      <span className="text-4xl">{unlocked ? badge.emoji : "🔒"}</span>
      <span className="font-display text-sm font-bold text-tinta">{badge.name}</span>
      <span className="text-xs text-tinta/60">{badge.description}</span>
    </div>
  );
}
