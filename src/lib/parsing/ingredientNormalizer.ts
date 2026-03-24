const unitMap = new Map([
  ['teaspoon', 'tsp'],
  ['teaspoons', 'tsp'],
  ['tsp', 'tsp'],
  ['tablespoon', 'tbsp'],
  ['tablespoons', 'tbsp'],
  ['tbsp', 'tbsp'],
  ['ounce', 'oz'],
  ['ounces', 'oz'],
  ['oz', 'oz'],
  ['pound', 'lb'],
  ['pounds', 'lb'],
  ['lb', 'lb'],
  ['lbs', 'lb'],
  ['cup', 'cup'],
  ['cups', 'cup'],
])

const aliasMap = new Map([
  ['yellow onion', 'onion'],
  ['red onion', 'onion'],
  ['white onion', 'onion'],
  ['garlic cloves', 'garlic'],
])

export function normalizeUnit(unit: string | null | undefined) {
  if (!unit) {
    return ''
  }

  return unitMap.get(unit.trim().toLowerCase()) ?? unit.trim().toLowerCase()
}

export function normalizeIngredientName(name: string) {
  const cleanName = name.trim().toLowerCase()
  return aliasMap.get(cleanName) ?? cleanName
}
