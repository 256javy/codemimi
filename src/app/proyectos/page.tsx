import type { Metadata } from "next";
import ProyectosClient from "./ProyectosClient";

export const metadata: Metadata = {
  title: "Proyectos libres — Crea tus propias páginas web",
  description:
    "Un espacio para que los niños inventen y construyan sus propias páginas web con HTML y CSS, partiendo de plantillas o desde cero. Todo se guarda en su dispositivo.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: "Proyectos libres · CodeMimi",
    description:
      "Crea, experimenta y guarda tus propias páginas web con HTML y CSS.",
    url: "/proyectos",
  },
};

export default function ProyectosPage() {
  return <ProyectosClient />;
}
