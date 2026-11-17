import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/mealdb";

// Server Component: obtiene las categorías directamente en el servidor
export default async function Home() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold">Bienvenido a Sazón</h1>
      <p className="mt-2 text-gray-600">
        Aquí puedes buscar recetas de todo el mundo, ver sus ingredientes y guardar tus favoritas.
      </p>
      <Link href="/recetas" className="mt-4 inline-block rounded bg-orange-600 px-4 py-2 text-white">
        Buscar recetas
      </Link>

      <h2 className="mt-10 mb-4 text-2xl font-bold">Categorías</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.slice(0, 8).map((cat) => (
          <Link
            key={cat.id}
            href={`/categorias/${cat.name}`}
            className="rounded border border-gray-300 bg-white p-3 text-center"
          >
            <Image src={cat.thumbnail} alt={cat.name} width={120} height={75} className="mx-auto" />
            <p className="mt-2">{cat.name}</p>
          </Link>
        ))}
      </div>
      <Link href="/categorias" className="mt-4 inline-block text-orange-600 underline">
        Ver todas las categorías
      </Link>
    </div>
  );
}
