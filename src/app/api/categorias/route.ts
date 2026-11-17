import { getCategories } from "@/lib/mealdb";

/**
 * GET /api/categorias
 * Lista de categorías (nombre + miniatura). Como `getCategories` está
 * cacheada con `use cache`, esta respuesta puede prerenderizarse.
 */
export async function GET() {
  try {
    const categories = await getCategories();
    return Response.json({
      categories: categories.map(({ id, name, thumbnail }) => ({ id, name, thumbnail })),
    });
  } catch (error) {
    console.error("[api/categorias]", error);
    return Response.json(
      { error: "No pudimos obtener las categorías." },
      { status: 502 },
    );
  }
}
