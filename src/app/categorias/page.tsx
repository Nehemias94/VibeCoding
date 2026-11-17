import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/mealdb";

export const metadata: Metadata = { title: "Categorías" };

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Categorías</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categorias/${cat.name}`}
            className="flex gap-3 rounded border border-gray-300 bg-white p-3"
          >
            <Image src={cat.thumbnail} alt={cat.name} width={96} height={60} className="h-fit" />
            <div>
              <h2 className="font-bold">{cat.name}</h2>
              <p className="line-clamp-2 text-sm text-gray-500">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
