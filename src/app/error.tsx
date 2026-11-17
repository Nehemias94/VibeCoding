"use client"; // Los error boundaries deben ser Client Components

import { useEffect } from "react";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-10 text-center">
      <h1 className="text-2xl font-bold">Ocurrió un error</h1>
      <p className="mt-2 text-gray-600">No se pudo cargar esta página. Intenta de nuevo.</p>
      <button onClick={() => retry()} className="mt-4 rounded bg-orange-600 px-4 py-2 text-white">
        Reintentar
      </button>
    </div>
  );
}
