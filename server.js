import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const fallbackRecipe = ({ ingredients, cuisine, diet, time, spiceLevel, notes }) => ({
  title: `${cuisine} Pantry Skillet`,
  description: `A flexible ${diet === 'None' ? '' : `${diet.toLowerCase()} `}${cuisine.toLowerCase()}-inspired meal built around ${ingredients[0] || 'your pantry staples'} and ready in about ${time} minutes.`,
  cuisine,
  diet,
  cookTime: `${time} minutes`,
  spiceLevel,
  servings: '2-3 servings',
  ingredients: [
    ...ingredients.map((item) => item.trim()).filter(Boolean),
    '2 tablespoons olive oil',
    '1 small onion, diced',
    spiceLevel === 'Hot' ? '1 teaspoon chili flakes' : '1/2 teaspoon black pepper',
    'Salt to taste',
  ],
  steps: [
    'Prep the ingredients and heat olive oil in a wide skillet over medium heat.',
    'Sauté onion until soft, then add your main ingredients and cook until fragrant.',
    `Season with ${spiceLevel.toLowerCase()} heat, adjust salt, and add a splash of water if the pan looks dry.`,
    `Simmer gently until everything is tender and the flavors meld, about ${Math.max(10, Math.round(time / 2))} minutes.`,
    `Finish with any fresh herbs or citrus you have on hand. ${notes ? `Keep in mind: ${notes}` : 'Serve warm and enjoy.'}`,
  ],
  chefTip: 'Toast your spices in oil for 30 seconds before adding liquid to deepen the flavor fast.',
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/recipe', async (req, res) => {
  const { ingredients = '', cuisine = 'Italian', diet = 'None', time = 30, spiceLevel = 'Medium', notes = '' } = req.body || {};
  const ingredientList = String(ingredients).split(',').map((item) => item.trim()).filter(Boolean);

  if (!ingredientList.length) {
    return res.status(400).json({ error: 'Please add at least one ingredient so I can build a recipe around it.' });
  }

  if (!client) {
    return res.json({ recipe: fallbackRecipe({ ingredients: ingredientList, cuisine, diet, time, spiceLevel, notes }) });
  }

  try {
    const completion = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: 'You are a creative chef. Return only valid JSON with keys: title, description, cuisine, diet, cookTime, spiceLevel, servings, ingredients, steps, chefTip. ingredients and steps must be arrays of strings. Keep recipes practical and concise.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: JSON.stringify({ ingredients: ingredientList, cuisine, diet, time, spiceLevel, notes }),
            },
          ],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'recipe_response',
          schema: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'description', 'cuisine', 'diet', 'cookTime', 'spiceLevel', 'servings', 'ingredients', 'steps', 'chefTip'],
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              cuisine: { type: 'string' },
              diet: { type: 'string' },
              cookTime: { type: 'string' },
              spiceLevel: { type: 'string' },
              servings: { type: 'string' },
              ingredients: { type: 'array', items: { type: 'string' } },
              steps: { type: 'array', items: { type: 'string' } },
              chefTip: { type: 'string' },
            },
          },
        },
      },
    });

    const recipe = JSON.parse(completion.output_text);
    res.json({ recipe });
  } catch (error) {
    console.error('OpenAI recipe generation failed:', error);
    res.json({ recipe: fallbackRecipe({ ingredients: ingredientList, cuisine, diet, time, spiceLevel, notes }) });
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
