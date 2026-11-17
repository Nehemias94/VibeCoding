import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-5xl">🥄</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">No encontramos esa receta</h1>
      <p className="mt-2 text-muted">La página que buscas no existe o fue movida.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
