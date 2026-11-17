import Image from "next/image";
import Link from "next/link";
import type { MealSummary } from "@/lib/types";

export function MealCard({ meal }: { meal: MealSummary }) {
  return (
    <Link
      href={`/recetas/${meal.id}`}
      className="group overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={meal.thumbnail}
          alt={meal.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold group-hover:text-accent">{meal.name}</h3>
        {meal.category && <p className="mt-1 text-sm text-muted">{meal.category}</p>}
      </div>
    </Link>
  );
}

export function MealGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{children}</div>;
}

export function MealGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <MealGrid>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="skeleton aspect-[4/3]" />
          <div className="space-y-2 p-4">
            <div className="skeleton h-5 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/3 rounded" />
          </div>
        </div>
      ))}
    </MealGrid>
  );
}
