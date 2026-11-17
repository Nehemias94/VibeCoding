import { getRandomMeal } from "@/lib/mealdb";

/**
 * GET /api/recetas/aleatoria
 * Devuelve el id y el nombre de una receta al azar. Se usa en el botón
 * "Sorpréndeme" (Client Component) para navegar a una receta nueva.
 */
export async function GET() {
  try {
    const meal = await getRandomMeal();
    return Response.json(
      { id: meal.id, name: meal.name },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[api/recetas/aleatoria]", error);
    return Response.json(
      { error: "No pudimos elegir una receta al azar." },
      { status: 502 },
    );
  }
}
