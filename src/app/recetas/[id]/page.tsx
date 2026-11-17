import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getMealById } from "@/lib/mealdb";

// Server Component: la receta se obtiene en el servidor.
// FavoriteButton es un Client Component incrustado dentro de esta página.
export default async function RecetaPage({ params }: PageProps<"/recetas/[id]">) {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal) notFound();

  return (
    <article className="space-y-10">
      <Link href="/recetas" className="text-sm font-medium text-muted hover:text-accent">
        ← Volver a recetas
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <Image src={meal.thumbnail} alt={meal.name} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>

        <div className="space-y-5">
          <p className="text-sm font-medium text-accent">
            {meal.category} · {meal.area}
          </p>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">{meal.name}</h1>
          <FavoriteButton meal={meal} />

          <div>
            <h2 className="mb-3 font-display text-xl font-semibold">Ingredientes</h2>
            <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
              {meal.ingredients.map((ing) => (
                <li key={ing.name} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
                  <span>{ing.name}</span>
                  <span className="text-muted">{ing.measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold">Preparación</h2>
        <ol className="space-y-4">
          {meal.instructions.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                {i + 1}
              </span>
              <p className="pt-1 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {meal.youtubeId && (
        <section>
          <h2 className="mb-4 font-display text-2xl font-semibold">Video</h2>
          <div className="aspect-video overflow-hidden rounded-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${meal.youtubeId}`}
              title={`Video de ${meal.name}`}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </section>
      )}
    </article>
  );
}
