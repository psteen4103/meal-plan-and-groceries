import type { Ingredient, Recipe, RecipeInput } from './types'

const RECIPES_KEY_PREFIX = 'meal-grocery.recipes.'

function getStorageKey(householdId: string) {
  return `${RECIPES_KEY_PREFIX}${householdId}`
}

function createId() {
  return crypto.randomUUID()
}

function readRecipes(householdId: string): Recipe[] {
  const key = getStorageKey(householdId)
  const rawValue = window.localStorage.getItem(key)

  if (!rawValue) {
    return []
  }

  try {
    return JSON.parse(rawValue) as Recipe[]
  } catch {
    return []
  }
}

function writeRecipes(householdId: string, recipes: Recipe[]) {
  const key = getStorageKey(householdId)
  window.localStorage.setItem(key, JSON.stringify(recipes))
}

export function listRecipes(householdId: string): Recipe[] {
  return readRecipes(householdId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getRecipe(id: string, householdId: string): Recipe | null {
  return readRecipes(householdId).find((r) => r.id === id) ?? null
}

export function createRecipe(householdId: string, input: RecipeInput): Recipe {
  const recipe: Recipe = {
    id: createId(),
    householdId,
    title: input.title.trim(),
    prepTime: input.prepTime,
    servings: input.servings,
    notes: input.notes?.trim(),
    ingredients: input.ingredients.map((ing) => ({
      ...ing,
      id: createId(),
      name: ing.name.trim(),
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const recipes = readRecipes(householdId)
  recipes.push(recipe)
  writeRecipes(householdId, recipes)

  return recipe
}

export function updateRecipe(id: string, householdId: string, input: RecipeInput): Recipe {
  const recipes = readRecipes(householdId)
  const recipe = recipes.find((r) => r.id === id)

  if (!recipe) {
    throw new Error('Recipe not found')
  }

  const updated: Recipe = {
    ...recipe,
    title: input.title.trim(),
    prepTime: input.prepTime,
    servings: input.servings,
    notes: input.notes?.trim(),
    ingredients: input.ingredients.map((ing) => ({
      ...ing,
      id: ing.id || createId(),
      name: ing.name.trim(),
    })),
    updatedAt: new Date().toISOString(),
  }

  const index = recipes.findIndex((r) => r.id === id)
  recipes[index] = updated
  writeRecipes(householdId, recipes)

  return updated
}

export function deleteRecipe(id: string, householdId: string): void {
  const recipes = readRecipes(householdId)
  const filtered = recipes.filter((r) => r.id !== id)
  writeRecipes(householdId, filtered)
}
