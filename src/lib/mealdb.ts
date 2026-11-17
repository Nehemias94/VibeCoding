/**
 * Cliente de TheMealDB (solo servidor).
 *
 * Todas las llamadas a la API externa pasan por este módulo, que:
 *  1. Lee la URL y la clave desde variables de entorno (.env.local).
 *  2. Normaliza las respuestas a nuestros tipos de dominio.
 *  3. Cachea los datos estables con la directiva `use cache` de Next.js 16.
 */
import { cacheLife } from "next/cache";
import type { Category, Ingredient, Meal, MealSummary } from "./types";

// ── Tipos crudos de la API ────────────────────────────────────────────────
type RawMeal = Record<string, string | null>;

interface RawCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

// ── Configuración ─────────────────────────────────────────────────────────
function getBaseUrl(): string {
  const url = process.env.MEALDB_API_URL ?? "https://www.themealdb.com/api/json/v1";
  const key = process.env.MEALDB_API_KEY ?? "1";
  return `${url.replace(/\/$/, "")}/${key}`;
}

export class MealDbError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "MealDbError";
  }
}

async function request<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${getBaseUrl()}/${path}`, {
      signal: AbortSignal.timeout(10_000),
    });
  } catch (cause) {
    throw new MealDbError(`No se pudo conectar con TheMealDB (${String(cause)})`);
  }
  if (!res.ok) {
    throw new MealDbError(`TheMealDB respondió con estado ${res.status}`, res.status);
  }
  return (await res.json()) as T;
}

// ── Normalizadores ────────────────────────────────────────────────────────
function extractIngredients(raw: RawMeal): Ingredient[] {
  const list: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = raw[`strIngredient${i}`]?.trim();
    if (name) list.push({ name, measure: raw[`strMeasure${i}`]?.trim() ?? "" });
  }
  return list;
}

function extractYoutubeId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return match ? match[1] : null;
}

function splitInstructions(text: string | null): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n+/)
    .map((step) => step.replace(/^\s*(step\s*\d+[:.]?|\d+[.)])\s*/i, "").trim())
    .filter((step) => step.length > 2);
}

function toSummary(raw: RawMeal): MealSummary {
  return {
    id: raw.idMeal ?? "",
    name: raw.strMeal ?? "Sin nombre",
    thumbnail: raw.strMealThumb ?? "",
    category: raw.strCategory ?? undefined,
    area: raw.strArea ?? raw.strCountry ?? undefined,
  };
}

function toMeal(raw: RawMeal): Meal {
  return {
    ...toSummary(raw),
    category: raw.strCategory ?? "Otra",
    area: raw.strArea ?? raw.strCountry ?? "Internacional",
    instructions: splitInstructions(raw.strInstructions),
    ingredients: extractIngredients(raw),
    tags: raw.strTags ? raw.strTags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    youtubeId: extractYoutubeId(raw.strYoutube),
    source: raw.strSource || null,
  };
}

// ── API pública ───────────────────────────────────────────────────────────

/** Busca recetas por nombre. Cacheado por término de búsqueda. */
export async function searchMeals(query: string): Promise<Meal[]> {
  "use cache";
  cacheLife("hours");
  const data = await request<{ meals: RawMeal[] | null }>(
    `search.php?s=${encodeURIComponent(query)}`,
  );
  return (data.meals ?? []).map(toMeal);
}

/** Obtiene una receta por id, o `null` si no existe. */
export async function getMealById(id: string): Promise<Meal | null> {
  "use cache";
  cacheLife("days");
  if (!/^\d+$/.test(id)) return null;
  const data = await request<{ meals: RawMeal[] | null }>(`lookup.php?i=${id}`);
  return data.meals?.[0] ? toMeal(data.meals[0]) : null;
}

/** Lista todas las categorías disponibles. */
export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("days");
  const data = await request<{ categories: RawCategory[] | null }>("categories.php");
  return (data.categories ?? []).map((c) => ({
    id: c.idCategory,
    name: c.strCategory,
    thumbnail: c.strCategoryThumb,
    description: c.strCategoryDescription.replace(/\[\d+\]/g, "").trim(),
  }));
}

/** Recetas de una categoría (la API solo devuelve el resumen). */
export async function getMealsByCategory(category: string): Promise<MealSummary[]> {
  "use cache";
  cacheLife("days");
  const data = await request<{ meals: RawMeal[] | null }>(
    `filter.php?c=${encodeURIComponent(category)}`,
  );
  return (data.meals ?? []).map((m) => ({ ...toSummary(m), category }));
}

/** Receta aleatoria. NO se cachea: debe ser distinta en cada petición. */
export async function getRandomMeal(): Promise<Meal> {
  const data = await request<{ meals: RawMeal[] | null }>("random.php");
  if (!data.meals?.[0]) throw new MealDbError("TheMealDB no devolvió ninguna receta");
  return toMeal(data.meals[0]);
}
