"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFavorites, saveFavorites } from "@/components/FavoriteButton";
import { Cargando, MealCard, MealGrid } from "@/components/MealCard";
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
    <div>
      <h1 className="text-3xl font-bold">Mis favoritos</h1>
      <p className="mb-6 text-gray-500">Las recetas se guardan en este navegador.</p>

      {!loaded ? (
        <Cargando />
      ) : favorites.length === 0 ? (
        <p>
          Aún no tienes recetas favoritas.{" "}
          <Link href="/recetas" className="text-orange-600 underline">
            Buscar recetas
          </Link>
        </p>
      ) : (
        <>
          <button onClick={clearAll} className="mb-4 text-red-600 underline">
            Borrar todos
          </button>
          <MealGrid>
            {favorites.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </MealGrid>
        </>
      )}
    </div>
  );
}
