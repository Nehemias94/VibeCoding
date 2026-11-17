import type { Metadata } from "next";
import { RecipeSearch } from "./RecipeSearch";

export const metadata: Metadata = { title: "Recetas" };

export default function RecetasPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Buscar recetas</h1>
      <p className="mt-2 mb-6 text-gray-600">Escribe el nombre de un platillo en inglés (ej. chicken, pasta, cake).</p>
      <RecipeSearch />
    </div>
  );
}
