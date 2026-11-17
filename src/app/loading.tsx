import { MealGridSkeleton } from "@/components/MealCard";

export default function Loading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Cargando">
      <div className="skeleton h-10 w-64 rounded-lg" />
      <MealGridSkeleton />
    </div>
  );
}
