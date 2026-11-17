import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-10 text-center">
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <p className="mt-2 text-gray-600">La receta o página que buscas no existe.</p>
      <Link href="/" className="mt-4 inline-block text-orange-600 underline">
        Volver al inicio
      </Link>
    </div>
  );
}
