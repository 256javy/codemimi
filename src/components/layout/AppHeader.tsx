"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStudentStore } from "@/lib/store";
import { getAvatar } from "@/lib/catalog";

const NAV = [
  { href: "/aventuras", label: "Aventuras", emoji: "🗺️" },
  { href: "/proyectos", label: "Proyectos", emoji: "🎨" },
  { href: "/perfil", label: "Perfil", emoji: "⭐" },
  { href: "/progreso", label: "Progreso", emoji: "📊" },
];

export default function AppHeader() {
  const pathname = usePathname();
  const username = useStudentStore((s) => s.username);
  const avatar = useStudentStore((s) => s.avatar);
  const hydrated = useStudentStore((s) => s.hydrated);

  return (
    <header className="sticky top-0 z-40 mb-6 border-b border-uva/10 bg-crema/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-tinta">
          <span className="text-2xl">🧩</span>
          <span>
            Code<span className="text-uva">Kids</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-uva text-white"
                    : "text-tinta/70 hover:bg-uva-claro hover:text-tinta"
                }`}
              >
                <span className="mr-1">{item.emoji}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/perfil"
          className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-uva/10 transition hover:ring-uva/30"
        >
          <span className="text-2xl leading-none">
            {hydrated ? getAvatar(avatar).emoji : "🙂"}
          </span>
          <span className="hidden text-sm font-semibold text-tinta md:inline">
            {hydrated && username ? username : "Invitado"}
          </span>
        </Link>
      </div>
    </header>
  );
}
