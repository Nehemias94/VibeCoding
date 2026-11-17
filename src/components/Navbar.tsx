"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/recetas", label: "Recetas" },
  { href: "/categorias", label: "Categorías" },
  { href: "/favoritos", label: "Favoritos" },
] as const;

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Sazón";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-display text-2xl font-semibold">
      <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-accent text-lg text-white">
        🍲
      </span>
      {appName}
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Barra de navegación con menú móvil desplegable (Client Component). */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground aria-[current=page]:bg-accent-soft aria-[current=page]:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="space-y-1 border-t border-border px-4 py-3 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className="block rounded-xl px-4 py-3 font-medium text-muted aria-[current=page]:bg-accent-soft aria-[current=page]:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

/** Versión estática que se muestra mientras se resuelve la ruta. */
export function NavbarFallback() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-muted">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <span className="h-10 w-10 rounded-full border border-border md:hidden" />
      </nav>
    </header>
  );
}
