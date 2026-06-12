import type { Metadata } from "next";
import AventurasClient from "./AventurasClient";

export const metadata: Metadata = {
  title: "Mapa de aventuras — Aprende HTML, CSS y JavaScript paso a paso",
  description:
    "Recorre las aventuras de CodeMimi y aprende HTML, CSS y JavaScript en orden, desde tu primera etiqueta hasta tu primera página web. Gratis y sin cuenta.",
  alternates: { canonical: "/aventuras" },
  openGraph: {
    title: "Mapa de aventuras · CodeMimi",
    description:
      "Aprende HTML, CSS y JavaScript paso a paso con aventuras narrativas para niños desde 8 años.",
    url: "/aventuras",
  },
};

export default function AventurasPage() {
  return <AventurasClient />;
}
