export default function Loading() {
  return (
    <div className="space-y-10" aria-busy="true" aria-label="Cargando receta">
      <div className="skeleton h-4 w-32 rounded" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="skeleton aspect-square rounded-3xl" />
        <div className="space-y-4">
          <div className="skeleton h-4 w-40 rounded" />
          <div className="skeleton h-10 w-3/4 rounded-lg" />
          <div className="skeleton h-10 w-52 rounded-full" />
          <div className="skeleton h-64 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
