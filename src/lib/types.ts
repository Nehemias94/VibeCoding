/**
 * Tipos de dominio de Sazón.
 * La API de TheMealDB devuelve campos con nombres poco amigables
 * (strMeal, strIngredient1..20, etc.), así que los normalizamos aquí.
 */

export interface Ingredient {
  name: string;
  measure: string;
}

/** Versión resumida de una receta, usada en listados y tarjetas. */
export interface MealSummary {
  id: string;
  name: string;
  thumbnail: string;
  category?: string;
  area?: string;
}

/** Receta completa con ingredientes e instrucciones. */
export interface Meal extends MealSummary {
  category: string;
  area: string;
  instructions: string[];
  ingredients: Ingredient[];
  tags: string[];
  youtubeId: string | null;
  source: string | null;
}

export interface Category {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

/** Formato de error uniforme que devuelven nuestros Route Handlers. */
export interface ApiError {
  error: string;
}
