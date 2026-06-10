import type { Metadata } from "next";
import { Fredoka, Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";
import StoreHydration from "@/components/layout/StoreHydration";
import AppHeader from "@/components/layout/AppHeader";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

// Fuente con aspecto redondeado para el editor/código.
const mono = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-code",
});

export const metadata: Metadata = {
  title: "CodeKids — Aprende HTML y CSS jugando",
  description:
    "Plataforma para que niños de 8 años en adelante aprendan a escribir HTML y CSS de verdad, a través de aventuras y proyectos creativos.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fredoka.variable} ${nunito.variable} ${mono.variable}`}>
      <body className="antialiased">
        <StoreHydration />
        <AppHeader />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16">{children}</main>
      </body>
    </html>
  );
}
