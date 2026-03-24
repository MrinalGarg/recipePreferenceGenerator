import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import PreferenceForm from './components/PreferenceForm';
import RecipeCard from './components/RecipeCard';

const initialForm = {
  ingredients: '',
  cuisine: 'Italian',
  diet: 'None',
  time: 30,
  spiceLevel: 'Medium',
  notes: '',
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const requestRecipe = async () => {
    const response = await axios.post('/api/recipe', form);
    setRecipe(response.data.recipe);
  };

  const generateRecipe = async (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    setLoading(true);
    setError('');

    try {
      await requestRecipe();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong while generating your recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 text-slate-900 md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-plum-900 to-ember-700 px-5 py-8 text-white shadow-[0_30px_100px_rgba(88,28,135,0.28)] md:px-8 md:py-10">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-saffron-100 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                AI recipe generator powered by Via’s OpenAI key
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">Flavor Foundry turns your cravings into dinner.</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">Share your ingredients, cuisine mood, dietary needs, and time limit. We’ll generate a tailored recipe with practical steps and a chef tip you can actually use tonight.</p>
            </div>
            <div className="rounded-[28px] bg-white/10 p-5 backdrop-blur md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-saffron-400/20 p-3 text-saffron-100">
                  <ChefHat className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-saffron-200">How it works</p>
                  <p className="text-lg font-semibold">Fast, personalized, zero scrolling</p>
                </div>
              </div>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-200 md:text-base">
                <p>1. Tell us what’s in your kitchen.</p>
                <p>2. Pick your cuisine, diet, spice level, and time.</p>
                <p>3. Get a recipe designed around your preferences in seconds.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-4">
            <PreferenceForm form={form} onChange={handleChange} onSubmit={generateRecipe} loading={loading} />
            {error ? (
              <div className="flex items-start gap-3 rounded-3xl bg-white p-5 text-ember-800 shadow-sm ring-1 ring-ember-100">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">Recipe generation hit a snag</p>
                  <p className="mt-1 text-base leading-relaxed">{error}</p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <RecipeCard recipe={recipe} />
            {recipe ? (
              <button type="button" onClick={() => generateRecipe()} disabled={loading} className="flex min-h-[48px] items-center gap-2 rounded-full bg-white px-5 py-3 text-base font-semibold text-plum-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60">
                <RefreshCw className="h-4 w-4" />
                Regenerate recipe
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
