"use client"; // Los error boundaries deben ser Client Components

import { useEffect } from "react";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-5xl">🍳</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">Algo se quemó en la cocina</h1>
      <p className="mt-2 text-muted">No pudimos cargar esta página. Puede ser un problema temporal con la API de recetas.</p>
      <button
        onClick={() => retry()}
        className="mt-6 rounded-full bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-hover"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
