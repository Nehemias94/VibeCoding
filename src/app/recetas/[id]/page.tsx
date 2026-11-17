import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getMealById } from "@/lib/mealdb";

// Server Component: la receta se obtiene en el servidor.
// FavoriteButton es un Client Component dentro de esta página.
export default async function RecetaPage({ params }: PageProps<"/recetas/[id]">) {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal) notFound();

  return (
    <div>
      <Link href="/recetas" className="text-orange-600 underline">
        ← Volver
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{meal.name}</h1>
      <p className="mb-4 text-gray-500">
        {meal.category} - {meal.area}
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <Image src={meal.thumbnail} alt={meal.name} width={400} height={400} priority className="h-auto w-full md:w-96" />

        <div>
          <FavoriteButton meal={meal} />
          <h2 className="mt-6 mb-2 text-xl font-bold">Ingredientes</h2>
          <ul className="list-disc pl-5">
            {meal.ingredients.map((ing) => (
              <li key={ing.name}>
                {ing.name} {ing.measure && <span className="text-gray-500">({ing.measure})</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mt-8 mb-2 text-xl font-bold">Preparación</h2>
      <ol className="list-decimal space-y-2 pl-5">
        {meal.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      {meal.youtubeId && (
        <>
          <h2 className="mt-8 mb-2 text-xl font-bold">Video</h2>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${meal.youtubeId}`}
            title={`Video de ${meal.name}`}
            className="aspect-video w-full md:w-[560px]"
            allowFullScreen
          />
        </>
      )}
    </div>
  );
}
