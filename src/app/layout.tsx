import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";
import StoreHydration from "@/components/layout/StoreHydration";
import AppHeader from "@/components/layout/AppHeader";
import { SITE, absoluteUrl } from "@/lib/seo";

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
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: SITE.titleTemplate,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.publisher }],
  creator: SITE.publisher,
  publisher: SITE.publisher,
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
};

// Datos estructurados: ayudan a Google a entender qué es CodeMimi y a mostrar
// resultados enriquecidos. Una sola organización educativa + el sitio web.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": absoluteUrl("/#organization"),
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      inLanguage: "es",
      sameAs: [...SITE.social],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      inLanguage: "es",
      publisher: { "@id": absoluteUrl("/#organization") },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
      isAccessibleForFree: true,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${fredoka.variable} ${nunito.variable} ${mono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StoreHydration />
        <AppHeader />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16">{children}</main>
      </body>
    </html>
  );
}
