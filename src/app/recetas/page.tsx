import type { Metadata } from "next";
import { RecipeSearch } from "./RecipeSearch";

export const metadata: Metadata = { title: "Recetas" };

export default function RecetasPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">Buscar recetas</h1>
        <p className="mt-2 text-muted">Escribe el nombre de un platillo en inglés (ej. chicken, pasta, cake).</p>
      </div>
      <RecipeSearch />
    </div>
  );
}
