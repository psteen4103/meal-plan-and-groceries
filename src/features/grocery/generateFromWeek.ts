import { normalizeIngredientName, normalizeUnit } from '../../lib/parsing/ingredientNormalizer'

export type GroceryDraftIngredient = {
  name: string
  quantity?: number
  unit?: string
}

export type GroceryItemPreview = {
  name: string
  quantity?: number
  unit?: string
}

export function aggregateIngredients(ingredients: GroceryDraftIngredient[]) {
  const merged = new Map<string, GroceryItemPreview>()

  for (const ingredient of ingredients) {
    const normalizedName = normalizeIngredientName(ingredient.name)
    const normalizedUnit = normalizeUnit(ingredient.unit)
    const key = `${normalizedName}:${normalizedUnit}`
    const current = merged.get(key)

    if (!current) {
      merged.set(key, {
        name: normalizedName,
        quantity: ingredient.quantity,
        unit: normalizedUnit || undefined,
      })
      continue
    }

    merged.set(key, {
      name: normalizedName,
      unit: normalizedUnit || undefined,
      quantity:
        typeof current.quantity === 'number' && typeof ingredient.quantity === 'number'
          ? current.quantity + ingredient.quantity
          : current.quantity ?? ingredient.quantity,
    })
  }

  return Array.from(merged.values())
}
