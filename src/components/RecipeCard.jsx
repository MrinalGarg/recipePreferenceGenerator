import { Clock3, Flame, ListChecks, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecipeCard({ recipe }) {
  if (!recipe) {
    return (
      <div className="rounded-[28px] border border-dashed border-plum-200 bg-white/70 p-6 text-center shadow-sm">
        <ChefHat className="mx-auto mb-3 h-10 w-10 text-plum-400" />
        <h3 className="text-xl font-semibold text-slate-900">Your custom recipe will appear here</h3>
        <p className="mt-2 text-base leading-relaxed text-slate-600">Tell Flavor Foundry what you’re craving and it will craft a recipe with ingredients, steps, and a chef tip.</p>
      </div>
    );
  }

  return (
    <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden rounded-[28px] bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
      <div className="bg-gradient-to-br from-plum-700 via-slate-900 to-ember-700 p-6 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-saffron-200">Tonight’s pick</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">{recipe.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-200">{recipe.description}</p>
          </div>
          <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-saffron-100 backdrop-blur">{recipe.cuisine} · {recipe.diet}</div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <Clock3 className="mb-2 h-5 w-5 text-saffron-200" />
            <p className="text-sm text-slate-300">Cook time</p>
            <p className="text-lg font-semibold">{recipe.cookTime}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <Flame className="mb-2 h-5 w-5 text-ember-200" />
            <p className="text-sm text-slate-300">Spice level</p>
            <p className="text-lg font-semibold">{recipe.spiceLevel}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <ChefHat className="mb-2 h-5 w-5 text-plum-200" />
            <p className="text-sm text-slate-300">Servings</p>
            <p className="text-lg font-semibold">{recipe.servings}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
        <section className="bg-white p-6 text-slate-900 md:p-7">
          <div className="mb-4 flex items-center gap-2 text-plum-700">
            <ListChecks className="h-5 w-5" />
            <h3 className="text-xl font-semibold">Ingredients</h3>
          </div>
          <ul className="space-y-3 text-base leading-relaxed text-slate-700">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-saffron-400" />
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-slate-50 p-6 text-slate-900 md:p-7">
          <h3 className="text-xl font-semibold text-slate-900">Method</h3>
          <ol className="mt-4 space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-plum-100 font-semibold text-plum-700">{index + 1}</span>
                <span className="text-base leading-relaxed text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 rounded-2xl bg-gradient-to-r from-saffron-100 to-ember-100 p-4 text-slate-800">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ember-700">Chef tip</p>
            <p className="mt-2 text-base leading-relaxed">{recipe.chefTip}</p>
          </div>
        </section>
      </div>
    </motion.article>
  );
}
