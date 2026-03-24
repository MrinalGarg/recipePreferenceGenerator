import { Sparkles, Soup, WheatOff, Flame, Clock3 } from 'lucide-react';
import clsx from 'clsx';

const cuisineOptions = ['Italian', 'Mexican', 'Indian', 'Thai', 'Mediterranean', 'Japanese'];
const dietOptions = ['None', 'Vegetarian', 'Vegan', 'High-Protein', 'Gluten-Free'];

export default function PreferenceForm({ form, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-[28px] bg-white/90 p-5 shadow-[0_20px_60px_rgba(88,28,135,0.12)] backdrop-blur md:p-6">
      <div className="space-y-2">
        <label htmlFor="ingredients" className="text-sm font-semibold text-slate-800">Ingredients you have</label>
        <div className="rounded-2xl bg-saffron-50 p-3">
          <div className="mb-2 flex items-center gap-2 text-saffron-700">
            <Soup className="h-4 w-4" />
            <span className="text-sm font-medium">Separate with commas</span>
          </div>
          <textarea id="ingredients" name="ingredients" value={form.ingredients} onChange={onChange} rows="4" placeholder="chickpeas, spinach, garlic, coconut milk" className="w-full resize-none rounded-2xl border-0 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-1 ring-saffron-100 placeholder:text-slate-400 focus:ring-2 focus:ring-saffron-300" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="cuisine" className="text-sm font-semibold text-slate-800">Cuisine vibe</label>
          <div className="relative">
            <Sparkles className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-plum-500" />
            <select id="cuisine" name="cuisine" value={form.cuisine} onChange={onChange} className="min-h-[44px] w-full appearance-none rounded-2xl bg-plum-50 py-3 pl-11 pr-4 text-base text-slate-900 outline-none ring-1 ring-plum-100 focus:ring-2 focus:ring-plum-300">
              {cuisineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="diet" className="text-sm font-semibold text-slate-800">Diet preference</label>
          <div className="relative">
            <WheatOff className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ember-500" />
            <select id="diet" name="diet" value={form.diet} onChange={onChange} className="min-h-[44px] w-full appearance-none rounded-2xl bg-ember-50 py-3 pl-11 pr-4 text-base text-slate-900 outline-none ring-1 ring-ember-100 focus:ring-2 focus:ring-ember-300">
              {dietOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="time" className="text-sm font-semibold text-slate-800">Max cooking time</label>
          <div className="relative">
            <Clock3 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-saffron-600" />
            <input id="time" name="time" type="number" min="10" max="180" step="5" value={form.time} onChange={onChange} className="min-h-[44px] w-full rounded-2xl bg-saffron-50 py-3 pl-11 pr-4 text-base text-slate-900 outline-none ring-1 ring-saffron-100 focus:ring-2 focus:ring-saffron-300" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="spiceLevel" className="text-sm font-semibold text-slate-800">Spice level</label>
          <div className="relative">
            <Flame className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ember-600" />
            <select id="spiceLevel" name="spiceLevel" value={form.spiceLevel} onChange={onChange} className="min-h-[44px] w-full appearance-none rounded-2xl bg-ember-50 py-3 pl-11 pr-4 text-base text-slate-900 outline-none ring-1 ring-ember-100 focus:ring-2 focus:ring-ember-300">
              {['Mild', 'Medium', 'Hot'].map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className="text-sm font-semibold text-slate-800">Anything else?</label>
        <textarea id="notes" name="notes" value={form.notes} onChange={onChange} rows="3" placeholder="I want something cozy, one-pan, and kid-friendly." className="w-full resize-none rounded-2xl bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-plum-300" />
      </div>

      <button type="submit" disabled={loading} className={clsx('flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white transition-all duration-200', loading ? 'bg-slate-400' : 'bg-gradient-to-r from-plum-600 via-ember-500 to-saffron-500 shadow-lg shadow-ember-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]')}>
        <Sparkles className="h-5 w-5" />
        {loading ? 'Cooking up your recipe...' : 'Generate my recipe'}
      </button>
    </form>
  );
}
