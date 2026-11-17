"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/recetas", label: "Recetas" },
  { href: "/categorias", label: "Categorías" },
  { href: "/favoritos", label: "Favoritos" },
];

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Sazón";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-orange-600 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          {appName}
        </Link>

        <ul className="hidden gap-5 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={isActive(pathname, link.href) ? "font-bold underline" : ""}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button onClick={() => setOpen(!open)} className="rounded border border-white px-3 py-1 md:hidden">
          Menú
        </button>
      </nav>

      {open && (
        <ul className="px-4 pb-3 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-2 ${isActive(pathname, link.href) ? "font-bold underline" : ""}`}
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

// Se muestra mientras se resuelve la ruta actual
export function NavbarFallback() {
  return (
    <header className="bg-orange-600 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold">
          {appName}
        </Link>
      </nav>
    </header>
  );
}
