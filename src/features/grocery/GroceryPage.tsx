import { aggregateIngredients } from './generateFromWeek'

const previewItems = aggregateIngredients([
  { name: 'Yellow onion', quantity: 1 },
  { name: 'onion', quantity: 2 },
  { name: 'olive oil', quantity: 2, unit: 'tbsp' },
  { name: 'olive oil', quantity: 1, unit: 'tablespoon' },
  { name: 'rice', quantity: 2, unit: 'cup' },
])

export function GroceryPage() {
  return (
    <section className="content-grid">
      <article className="content-card spotlight-card">
        <p className="eyebrow">Aggregation preview</p>
        <h2>Grocery generation base logic</h2>
        <p>
          This preview uses normalized names and units so selected weekly recipes can collapse into a cleaner shared grocery list.
        </p>
      </article>

      <article className="content-card">
        <h3>Preview output</h3>
        <ul className="feature-list grocery-preview">
          {previewItems.map((item) => (
            <li key={`${item.name}-${item.unit ?? 'none'}`}>
              <strong>{item.name}</strong>
              <span>
                {typeof item.quantity === 'number' ? item.quantity : 'n/a'} {item.unit ?? ''}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}
