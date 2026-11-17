import Link from "next/link";
import { notFound } from "next/navigation";
import { MealCard, MealGrid } from "@/components/MealCard";
import { getMealsByCategory } from "@/lib/mealdb";

export default async function CategoriaPage({ params }: PageProps<"/categorias/[nombre]">) {
  const { nombre } = await params;
  const category = decodeURIComponent(nombre);
  const meals = await getMealsByCategory(category);

  if (meals.length === 0) notFound();

  return (
    <div>
      <Link href="/categorias" className="text-orange-600 underline">
        ← Volver a categorías
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{category}</h1>
      <p className="mb-6 text-gray-500">{meals.length} recetas</p>
      <MealGrid>
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </MealGrid>
    </div>
  );
}
