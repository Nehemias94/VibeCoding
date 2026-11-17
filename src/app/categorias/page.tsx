import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/mealdb";

export const metadata: Metadata = { title: "Categorías" };

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Categorías</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categorias/${cat.name}`}
            className="flex gap-4 rounded-2xl border border-border bg-surface p-4 transition hover:border-accent"
          >
            <Image src={cat.thumbnail} alt={cat.name} width={96} height={60} className="h-fit shrink-0" />
            <div>
              <h2 className="font-display text-lg font-semibold">{cat.name}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
