import Image from "next/image";
import Link from "next/link";
import type { MealSummary } from "@/lib/types";

export function MealCard({ meal }: { meal: MealSummary }) {
  return (
    <Link href={`/recetas/${meal.id}`} className="block rounded border border-gray-300 bg-white p-2">
      <Image
        src={meal.thumbnail}
        alt={meal.name}
        width={300}
        height={300}
        className="h-auto w-full"
      />
      <h3 className="mt-2 font-semibold">{meal.name}</h3>
      {meal.category && <p className="text-sm text-gray-500">{meal.category}</p>}
    </Link>
  );
}

export function MealGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{children}</div>;
}

export function Cargando() {
  return <p className="text-gray-500">Cargando...</p>;
}
