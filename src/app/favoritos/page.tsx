"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFavorites, saveFavorites } from "@/components/FavoriteButton";
import { MealCard, MealGrid, MealGridSkeleton } from "@/components/MealCard";
import type { MealSummary } from "@/lib/types";

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState<MealSummary[]>([]);
  const [loaded, setLoaded] = useState(false);

  // localStorage solo existe en el navegador, por eso se lee dentro de useEffect
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFavorites(getFavorites());
    setLoaded(true);
  }, []);

  function clearAll() {
    saveFavorites([]);
    setFavorites([]);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">Mis favoritos</h1>
          <p className="mt-1 text-muted">Las recetas se guardan en este navegador.</p>
        </div>
        {favorites.length > 0 && (
          <button onClick={clearAll} className="text-sm font-medium text-red-600 hover:underline">
            Borrar todos
          </button>
        )}
      </div>

      {!loaded ? (
        <MealGridSkeleton count={4} />
      ) : favorites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-muted">Aún no tienes recetas favoritas.</p>
          <Link href="/recetas" className="mt-3 inline-block font-medium text-accent hover:underline">
            Buscar recetas →
          </Link>
        </div>
      ) : (
        <MealGrid>
          {favorites.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </MealGrid>
      )}
    </div>
  );
}
