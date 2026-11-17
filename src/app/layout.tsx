import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import { Navbar, NavbarFallback } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Sazón";

export const metadata: Metadata = {
  title: {
    default: `${appName} · Recetas del mundo`,
    template: `%s · ${appName}`,
  },
  description:
    "Explora cientos de recetas de todo el mundo, busca por ingrediente o categoría y guarda tus favoritas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {/* El navbar lee la ruta actual (usePathname), por eso va en Suspense */}
        <Suspense fallback={<NavbarFallback />}>
          <Navbar />
        </Suspense>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
