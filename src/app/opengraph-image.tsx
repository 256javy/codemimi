import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo";

// Tarjeta social generada al vuelo (1200×630). Next la usa automáticamente
// como og:image en todas las páginas, y los clientes de Twitter/WhatsApp la
// muestran al compartir el enlace.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE.title;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 45%, #e0f2fe 100%)",
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 140, marginBottom: 12 }}>🧑‍💻</div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            color: "#5b21b6",
            letterSpacing: "-2px",
          }}
        >
          CodeMimi
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 600,
            color: "#334155",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Aprende HTML, CSS y JavaScript escribiendo código de verdad
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#7c3aed",
            marginTop: 32,
            background: "#ffffff",
            padding: "12px 32px",
            borderRadius: 999,
            fontWeight: 700,
          }}
        >
          Para niños desde 8 años · Gratis para siempre
        </div>
      </div>
    ),
    { ...size },
  );
}
