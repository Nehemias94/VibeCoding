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
    <div className="space-y-8">
      <div>
        <Link href="/categorias" className="text-sm font-medium text-muted hover:text-accent">
          ← Todas las categorías
        </Link>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{category}</h1>
        <p className="mt-1 text-muted">{meals.length} recetas</p>
      </div>
      <MealGrid>
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </MealGrid>
    </div>
  );
}
