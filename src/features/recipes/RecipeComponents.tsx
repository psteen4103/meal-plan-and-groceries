import { useState, type ReactNode } from 'react'
import type { Recipe, RecipeInput } from '../../lib/db/types'
import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  listRecipes as fetchRecipes,
} from './recipeService'

type RecipeEditorProps = {
  householdId: string
  recipe?: Recipe
  onSave: (recipe: Recipe) => void
  onCancel: () => void
}

export function RecipeEditor({ householdId, recipe, onSave, onCancel }: RecipeEditorProps) {
  const [title, setTitle] = useState(recipe?.title ?? '')
  const [prepTime, setPrepTime] = useState(recipe?.prepTime?.toString() ?? '')
  const [servings, setServings] = useState(recipe?.servings?.toString() ?? '')
  const [notes, setNotes] = useState(recipe?.notes ?? '')
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients ?? [{ id: '', name: '', quantity: undefined, unit: '' }],
  )

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { id: '', name: '', quantity: undefined, unit: '' }])
  }

  const handleIngredientChange = (
    index: number,
    field: keyof typeof ingredients[0],
    value: string | number | undefined,
  ) => {
    const updated = [...ingredients]
    updated[index] = { ...updated[index], [field]: value }
    setIngredients(updated)
  }

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (!title.trim()) {
      alert('Recipe title is required.')
      return
    }

    const input: RecipeInput = {
      title,
      prepTime: prepTime ? parseInt(prepTime, 10) : undefined,
      servings: servings ? parseInt(servings, 10) : undefined,
      notes,
      ingredients: ingredients.filter((ing) => ing.name.trim()).map(({ id, ...ing }) => ing),
    }

    try {
      const saved = recipe ? updateRecipe(recipe.id, householdId, input) : createRecipe(householdId, input)
      onSave(saved)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error saving recipe.')
    }
  }

  return (
    <div className="recipe-editor-panel">
      <h2>{recipe ? 'Edit Recipe' : 'Add Recipe'}</h2>

      <div className="form-group">
        <label className="field-label" htmlFor="recipe-title">
          Title
        </label>
        <input
          id="recipe-title"
          className="text-input"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sheet-pan salmon"
          value={title}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="field-label" htmlFor="recipe-prep-time">
            Prep time (minutes)
          </label>
          <input
            id="recipe-prep-time"
            className="text-input"
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="30"
            type="number"
            value={prepTime}
          />
        </div>

        <div className="form-group">
          <label className="field-label" htmlFor="recipe-servings">
            Servings
          </label>
          <input
            id="recipe-servings"
            className="text-input"
            onChange={(e) => setServings(e.target.value)}
            placeholder="4"
            type="number"
            value={servings}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="field-label" htmlFor="recipe-notes">
          Notes
        </label>
        <textarea
          id="recipe-notes"
          className="text-input"
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special instructions..."
          rows={3}
          value={notes}
        />
      </div>

      <div className="form-group">
        <h3>Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <input
              className="text-input ingredient-field"
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              placeholder="Ingredient name"
              value={ingredient.name}
            />
            <input
              className="text-input ingredient-field qty-field"
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value ? parseFloat(e.target.value) : undefined)}
              placeholder="Qty"
              type="number"
              value={ingredient.quantity ?? ''}
            />
            <input
              className="text-input ingredient-field unit-field"
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              placeholder="Unit"
              value={ingredient.unit}
            />
            <button
              className="secondary-button"
              onClick={() => handleRemoveIngredient(index)}
              type="button"
            >
              Remove
            </button>
          </div>
        ))}
        <button className="secondary-button" onClick={handleAddIngredient} type="button">
          Add ingredient
        </button>
      </div>

      <div className="form-actions">
        <button className="primary-button" onClick={handleSave} type="button">
          Save recipe
        </button>
        <button className="secondary-button" onClick={onCancel} type="button">
          Cancel
        </button>
      </div>
    </div>
  )
}

type RecipeDetailProps = {
  recipe: Recipe
  householdId: string
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

export function RecipeDetail({ recipe, householdId, onEdit, onDelete, onClose }: RecipeDetailProps) {
  const handleConfirmDelete = () => {
    if (window.confirm(`Delete "${recipe.title}"?`)) {
      deleteRecipe(recipe.id, householdId)
      onDelete()
    }
  }

  return (
    <div className="recipe-detail-panel">
      <button className="close-button" onClick={onClose} type="button">
        ✕
      </button>

      <h2>{recipe.title}</h2>

      <dl className="recipe-meta">
        {recipe.prepTime ? (
          <>
            <dt>Prep time</dt>
            <dd>{recipe.prepTime} min</dd>
          </>
        ) : null}
        {recipe.servings ? (
          <>
            <dt>Servings</dt>
            <dd>{recipe.servings}</dd>
          </>
        ) : null}
      </dl>

      {recipe.notes ? (
        <div className="recipe-section">
          <h3>Notes</h3>
          <p>{recipe.notes}</p>
        </div>
      ) : null}

      {recipe.ingredients.length > 0 ? (
        <div className="recipe-section">
          <h3>Ingredients</h3>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.quantity ? `${ing.quantity} ${ing.unit ?? ''} ` : ''}{ing.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="form-actions">
        <button className="primary-button" onClick={onEdit} type="button">
          Edit
        </button>
        <button className="secondary-button" onClick={handleConfirmDelete} type="button">
          Delete
        </button>
      </div>
    </div>
  )
}

type RecipeCardProps = {
  recipe: Recipe
  onClick: () => void
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <button className="recipe-card" onClick={onClick} type="button">
      <h3>{recipe.title}</h3>
      {recipe.prepTime ? <p className="recipe-meta-text">{recipe.prepTime} min</p> : null}
    </button>
  )
}
