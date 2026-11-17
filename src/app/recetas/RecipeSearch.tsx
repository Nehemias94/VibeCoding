"use client";

import { useEffect, useState } from "react";
import { MealCard, MealGrid, MealGridSkeleton } from "@/components/MealCard";
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
    <div className="space-y-6">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar receta…"
        aria-label="Buscar receta"
        className="w-full rounded-full border border-border bg-surface px-5 py-3 outline-none focus:border-accent sm:max-w-md"
      />

      {loading ? (
        <MealGridSkeleton />
      ) : error ? (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">{error}</p>
      ) : meals.length === 0 ? (
        <p className="text-muted">No encontramos recetas para “{query}”.</p>
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
