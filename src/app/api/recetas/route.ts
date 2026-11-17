import type { NextRequest } from "next/server";
import { getMealsByCategory, MealDbError, searchMeals } from "@/lib/mealdb";
import type { MealSummary } from "@/lib/types";

/**
 * GET /api/recetas?q=pollo&categoria=Chicken
 *
 * Proxy hacia TheMealDB para que el navegador nunca vea la clave de la API.
 * - `q`: término de búsqueda por nombre (opcional)
 * - `categoria`: filtra por categoría (opcional)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q")?.trim() ?? "";
  const categoria = searchParams.get("categoria")?.trim() ?? "";

  if (q.length > 60) {
    return Response.json({ error: "La búsqueda es demasiado larga" }, { status: 400 });
  }

  try {
    let meals: MealSummary[];

    if (categoria && !q) {
      meals = await getMealsByCategory(categoria);
    } else {
      const results = await searchMeals(q);
      meals = categoria
        ? results.filter((m) => m.category?.toLowerCase() === categoria.toLowerCase())
        : results;
    }

    const data = meals.map(({ id, name, thumbnail, category, area }) => ({
      id,
      name,
      thumbnail,
      category,
      area,
    }));

    return Response.json({ count: data.length, meals: data });
  } catch (error) {
    const status = error instanceof MealDbError ? 502 : 500;
    console.error("[api/recetas]", error);
    return Response.json(
      { error: "No pudimos obtener las recetas. Intenta de nuevo." },
      { status },
    );
  }
}
