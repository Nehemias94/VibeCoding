# 🍲 Sazón — Recetas del mundo

Aplicación web hecha con **Next.js 16 (App Router)**, **TypeScript** y **Tailwind CSS** para buscar recetas de todo el mundo, ver sus ingredientes y preparación, y guardar tus favoritas.

Proyecto desarrollado con la metodología **Vibe Coding**, usando IA como copiloto (ver [VIBE_CODING.md](./VIBE_CODING.md)).

🔗 **Demo en producción:** _pendiente — agregar aquí la URL de Vercel_

## Funcionalidades

- 🔎 Buscador de recetas con resultados en tiempo real
- 📖 Detalle de cada receta: ingredientes, pasos y video
- 🗂️ Navegación por categorías
- ❤️ Favoritos guardados en el navegador (localStorage)
- 📱 Diseño responsive (móvil y escritorio) con modo oscuro automático
- ⏳ Pantallas de carga, error y 404 personalizadas

## Rutas

| Ruta | Tipo | Descripción |
| --- | --- | --- |
| `/` | Server Component | Inicio con categorías populares |
| `/recetas` | Server + Client | Buscador (consume `/api/recetas`) |
| `/recetas/[id]` | Server Component | Detalle de la receta |
| `/categorias` | Server Component | Lista de categorías |
| `/categorias/[nombre]` | Server Component | Recetas de una categoría |
| `/favoritos` | Client Component | Recetas guardadas |
| `/api/recetas` | Route Handler | `?q=` busca por nombre, `?categoria=` filtra |
| `/api/categorias` | Route Handler | Lista de categorías |

## Tecnologías

- [Next.js 16](https://nextjs.org) con App Router y Cache Components
- TypeScript
- Tailwind CSS v4
- API externa: [TheMealDB](https://www.themealdb.com/api.php)

## Instalación

Requisitos: Node.js 20 o superior.

```bash
# 1. Clonar el repositorio
git clone https://github.com/Nehemias94/VibeCoding.git
cd VibeCoding

# 2. Instalar dependencias
npm install

# 3. Crear las variables de entorno
cp .env.example .env.local

# 4. Iniciar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Definidas en `.env.local` (ver `.env.example`):

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `MEALDB_API_URL` | URL base de TheMealDB (solo servidor) | `https://www.themealdb.com/api/json/v1` |
| `MEALDB_API_KEY` | Clave de la API (solo servidor) | `1` (clave pública de desarrollo) |
| `NEXT_PUBLIC_APP_NAME` | Nombre visible de la app | `Sazón` |

## Scripts

```bash
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run start   # servir el build
npm run lint    # revisar el código con ESLint
```

## Despliegue en Vercel

1. Entra a [vercel.com/new](https://vercel.com/new) e importa este repositorio.
2. En **Environment Variables** agrega las tres variables de la tabla anterior.
3. Pulsa **Deploy**.

## Estructura

```
src/
├── app/
│   ├── api/              # Route Handlers (recetas, categorias)
│   ├── recetas/          # buscador y detalle
│   ├── categorias/       # lista y detalle de categoría
│   ├── favoritos/        # recetas guardadas
│   ├── loading.tsx       # UI de carga
│   ├── error.tsx         # UI de error
│   └── not-found.tsx     # página 404
├── components/           # Navbar, Footer, MealCard, FavoriteButton
└── lib/                  # cliente de TheMealDB y tipos
```
