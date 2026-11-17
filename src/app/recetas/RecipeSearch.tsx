"use client";

import { useEffect, useState } from "react";
import { Cargando, MealCard, MealGrid } from "@/components/MealCard";
import type { MealSummary } from "@/lib/types";

export function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cada vez que cambia el texto esperamos 400 ms (debounce) y consultamos la API interna
  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/recetas?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        if (!cancelled) setMeals(data.meals);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Ocurrió un error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar receta…"
        aria-label="Buscar receta"
        className="mb-6 w-full rounded border border-gray-400 bg-white px-3 py-2 md:w-96"
      />

      {loading ? (
        <Cargando />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : meals.length === 0 ? (
        <p className="text-gray-500">No encontramos recetas para “{query}”.</p>
      ) : (
        <MealGrid>
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </MealGrid>
      )}
    </div>
  );
}
