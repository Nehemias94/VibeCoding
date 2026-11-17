import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/mealdb";

// Server Component: obtiene las categorías directamente en el servidor
export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="space-y-14">
      <section className="rounded-3xl bg-accent-soft px-6 py-14 text-center sm:px-12">
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">
          Recetas del mundo, <span className="text-accent">a tu manera</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Busca platillos de todo el mundo, revisa sus ingredientes paso a paso y guarda tus favoritos.
        </p>
        <Link
          href="/recetas"
          className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover"
        >
          Buscar recetas
        </Link>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold">Categorías populares</h2>
          <Link href="/categorias" className="text-sm font-medium text-accent hover:underline">
            Ver todas →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/categorias/${cat.name}`}
              className="flex flex-col items-center rounded-2xl border border-border bg-surface p-4 transition hover:border-accent"
            >
              <Image src={cat.thumbnail} alt={cat.name} width={120} height={75} />
              <span className="mt-2 font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
