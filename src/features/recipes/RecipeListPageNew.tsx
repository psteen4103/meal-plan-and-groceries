import { useEffect, useState } from 'react'
import type { Recipe } from '../../lib/db/types'
import { listRecipes as fetchRecipes } from './recipeService'
import { RecipeCard, RecipeEditor, RecipeDetail } from './RecipeComponents'

type RecipeListPageProps = {
  householdId: string
}

export function RecipeListPage({ householdId }: RecipeListPageProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    const loaded = fetchRecipes(householdId)
    setRecipes(loaded)
  }, [householdId])

  const handleRecipeSaved = (recipe: Recipe) => {
    setRecipes((prev) => {
      const index = prev.findIndex((r) => r.id === recipe.id)
      if (index >= 0) {
        const updated = [...prev]
        updated[index] = recipe
        return updated
      }
      return [recipe, ...prev]
    })
    setShowAddForm(false)
    setEditingRecipe(null)
    setSelectedRecipe(null)
  }

  const handleRecipeDeleted = () => {
    const newRecipes = recipes.filter((r) => r.id !== selectedRecipe?.id)
    setRecipes(newRecipes)
    setSelectedRecipe(null)
    setEditingRecipe(null)
  }

  return (
    <section className="content-grid recipe-page">
      {editingRecipe ? (
        <RecipeEditor
          householdId={householdId}
          recipe={editingRecipe}
          onSave={handleRecipeSaved}
          onCancel={() => setEditingRecipe(null)}
        />
      ) : selectedRecipe ? (
        <RecipeDetail
          recipe={selectedRecipe}
          householdId={householdId}
          onEdit={() => setEditingRecipe(selectedRecipe)}
          onDelete={handleRecipeDeleted}
          onClose={() => setSelectedRecipe(null)}
        />
      ) : showAddForm ? (
        <RecipeEditor
          householdId={householdId}
          onSave={handleRecipeSaved}
          onCancel={() => setShowAddForm(false)}
        />
      ) : (
        <>
          <article className="content-card spotlight-card">
            <p className="eyebrow">Recipe library</p>
            <h2>Your recipes</h2>
            <p>
              Store recipes and assign them to your weekly meal plan. Import from URLs or photos, or create them manually.
            </p>
            <div className="recipe-action-buttons">
              <button className="primary-button" onClick={() => setShowAddForm(true)} type="button">
                Add recipe
              </button>
              <button className="secondary-button" disabled type="button">
                Import from URL
              </button>
              <button className="secondary-button" disabled type="button">
                Import from photo
              </button>
            </div>
          </article>

          {recipes.length > 0 ? (
            <article className="content-card recipe-list-card">
              <div className="recipe-list">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => setSelectedRecipe(recipe)}
                  />
                ))}
              </div>
            </article>
          ) : (
            <article className="content-card">
              <p className="muted-text">No recipes yet. Create one to get started!</p>
            </article>
          )}
        </>
      )}
    </section>
  )
}
