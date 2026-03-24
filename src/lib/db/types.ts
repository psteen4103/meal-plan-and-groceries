export type Ingredient = {
  id: string
  name: string
  quantity?: number
  unit?: string
}

export type Recipe = {
  id: string
  householdId: string
  title: string
  prepTime?: number
  servings?: number
  notes?: string
  ingredients: Ingredient[]
  createdAt: string
  updatedAt: string
}

export type RecipeInput = {
  title: string
  prepTime?: number
  servings?: number
  notes?: string
  ingredients: Omit<Ingredient, 'id'>[]
}
