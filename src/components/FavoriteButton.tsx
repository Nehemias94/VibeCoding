"use client";

import { useEffect, useState } from "react";
import type { MealSummary } from "@/lib/types";

const STORAGE_KEY = "sazon-favoritos";

export function getFavorites(): MealSummary[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveFavorites(list: MealSummary[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function FavoriteButton({ meal }: { meal: MealSummary }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Al montar, revisamos si la receta ya está guardada
  useEffect(() => {
    const saved = getFavorites().some((m) => m.id === meal.id);
    setIsFavorite(saved);
  }, [meal.id]);

  function toggle() {
    const list = getFavorites();
    if (isFavorite) {
      saveFavorites(list.filter((m) => m.id !== meal.id));
    } else {
      const { id, name, thumbnail, category, area } = meal;
      saveFavorites([{ id, name, thumbnail, category, area }, ...list]);
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
        isFavorite
          ? "bg-accent text-white hover:bg-accent-hover"
          : "border border-border bg-surface hover:border-accent hover:text-accent"
      }`}
    >
      {isFavorite ? "♥ En favoritos" : "♡ Guardar en favoritos"}
    </button>
  );
}
