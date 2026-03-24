const recipeWorkflow = [
  'Manual recipe creation with ingredient editor',
  'URL import with editable recipe draft',
  'Photo OCR import with editable ingredient review',
]

export function RecipeListPage() {
  return (
    <section className="content-grid">
      <article className="content-card spotlight-card">
        <p className="eyebrow">Sprint 1 next</p>
        <h2>Recipe library foundation</h2>
        <p>
          The scaffold is ready for recipe CRUD. This page is where the saved recipe list, filters, and import entry points will land.
        </p>
      </article>

      <article className="content-card">
        <h3>Recipe flows planned</h3>
        <ul className="feature-list">
          {recipeWorkflow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="content-card accent-card">
        <h3>Why this order</h3>
        <p>
          Grocery generation depends on normalized recipe ingredients, so recipe CRUD and import review are the first feature layer after household setup.
        </p>
      </article>
    </section>
  )
}
