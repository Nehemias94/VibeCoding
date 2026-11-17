# Proceso de Vibe Coding

Este documento registra cómo se construyó **Sazón** usando IA (Claude Code) como copiloto de desarrollo: los prompts principales, las iteraciones, las decisiones técnicas y los problemas que se resolvieron.

## 1. Concepción del proyecto

**Prompt inicial:**

> Tengo esta tarea: construir una aplicación web con Next.js 16 + App Router y TypeScript, con mínimo 4 rutas, consumo de una API mediante Route Handlers, Server y Client Components, useState/useEffect, diseño responsive, loading y error UI, variables de entorno y despliegue en Vercel. La temática es libre.

**Primera idea:** un explorador de países con clima (REST Countries + Open-Meteo).

**Cambio de rumbo:** al probar la API se descubrió que REST Countries v3.1 fue deprecada y la v5 exige registro y clave. Para no depender de un registro externo se cambió a **TheMealDB**, una API de recetas con una clave pública de desarrollo (`1`) que además permite demostrar el uso de `.env.local`.

**Prompt de ajuste de alcance:**

> No tiene que ser algo muy complejo, tiene que verse como que sí es una tarea sencilla.

Con esto se recortó el alcance: se quitaron la página "Acerca" y el endpoint de receta aleatoria, y se simplificó el manejo de favoritos.

## 2. Iteraciones

Cada iteración corresponde a uno o más commits del historial:

| # | Iteración | Qué se pidió / generó |
| --- | --- | --- |
| 1 | Configuración | `.env.example`, imágenes remotas en `next.config.ts`, nombre del paquete |
| 2 | Capa de datos | Cliente de TheMealDB en `src/lib/mealdb.ts` con tipos normalizados y caché |
| 3 | Route Handlers | `/api/recetas` y `/api/categorias` con manejo de errores |
| 4 | Layout | Paleta de colores, tipografías, navbar responsive y footer |
| 5 | Componentes | `MealCard`, skeletons y `FavoriteButton` |
| 6 | Simplificación | Se quita el endpoint aleatorio para reducir el alcance |
| 7 | Páginas | Inicio, buscador, detalle, categorías y favoritos |
| 8 | Estados | `loading.tsx`, `error.tsx` y `not-found.tsx` |
| 9 | Validación | `tsc`, `eslint`, `next build` y pruebas de cada ruta |
| 10 | Documentación | README y este archivo |
| 11 | Despliegue | Publicación en Vercel con las variables de entorno configuradas en el panel |

## 3. Decisiones técnicas

- **Route Handlers como proxy:** el buscador (Client Component) llama a `/api/recetas` en lugar de llamar a TheMealDB directamente. Así la clave de la API vive solo en el servidor (`MEALDB_API_KEY` no lleva el prefijo `NEXT_PUBLIC_`).
- **Server Components para leer datos:** inicio, categorías y detalle obtienen los datos en el servidor, así que no envían JavaScript extra al navegador.
- **Client Components solo donde hay interacción:** buscador, botón de favoritos, página de favoritos y menú móvil.
- **Caché con `use cache`:** Next.js 16 trae *Cache Components* activado. Las funciones de `mealdb.ts` usan `"use cache"` + `cacheLife("days")`, por lo que las categorías y recetas se prerenderizan y no se consulta la API en cada visita.
- **Favoritos en localStorage:** no se necesita base de datos ni login para una app sencilla.
- **Normalización de datos:** TheMealDB devuelve `strIngredient1` ... `strIngredient20`; se convierten en un arreglo `ingredients` para que los componentes sean simples.

## 4. Desafíos y cómo se resolvieron con IA

| Desafío | Solución |
| --- | --- |
| La API REST Countries v3.1 estaba deprecada | Se probó la API con `curl` antes de programar y se cambió a TheMealDB |
| Next.js 16 cambió APIs respecto a versiones anteriores | La IA leyó la documentación incluida en `node_modules/next/dist/docs` antes de escribir código. Por ejemplo, `error.tsx` ahora recibe `retry` en lugar de `reset` |
| Con Cache Components, `usePathname` en el navbar rompía el prerender en rutas dinámicas | Se envolvió el `Navbar` en `<Suspense>` con un fallback estático |
| ESLint (`react-hooks/set-state-in-effect`) marcaba la lectura de localStorage dentro de `useEffect` | Es un caso válido: localStorage solo existe en el navegador y leerlo en el render causaría errores de hidratación. Se documentó con un comentario y se desactivó la regla solo en esa línea |
| Cerrar el menú móvil con un efecto al cambiar de ruta generaba renders extra | Se cambió por un `onClick` en cada enlace |
| Los tipos `PageProps<"/recetas/[id]">` daban error en `tsc` | Se generan con `next typegen` (también se generan automáticamente en `dev` y `build`) |

## 5. Validación

Antes de cada entrega se ejecutó:

```bash
npx tsc --noEmit   # sin errores de tipos
npm run lint       # sin errores de ESLint
npm run build      # build de producción exitoso
```

Y se probaron manualmente todas las rutas, incluyendo casos de error (receta inexistente → 404, categoría inexistente → 404).

## 6. Despliegue

La aplicación está publicada en Vercel: https://vibe-coding-henna-sigma.vercel.app/

Después del despliegue se verificó que todas las rutas y los Route Handlers respondieran correctamente en producción.
