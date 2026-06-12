import type { Metadata } from "next";
import RepasoClient from "./RepasoClient";

export const metadata: Metadata = {
  title: "Repaso — Tus conceptos de HTML, CSS y JavaScript",
  description:
    "Repasa en un solo lugar todos los conceptos de HTML, CSS y JavaScript que has desbloqueado en CodeMimi, con su código de ejemplo. Sin buscar entre lecciones.",
  alternates: { canonical: "/repaso" },
  openGraph: {
    title: "Repaso de conceptos · CodeMimi",
    description:
      "Todos los conceptos de HTML, CSS y JavaScript que has aprendido, juntos y listos para repasar.",
    url: "/repaso",
  },
};

export default function RepasoPage() {
  return <RepasoClient />;
}
