import { buildWeek, getStartOfWeek } from '../../lib/date/week'

const plannedMealsByLabel: Partial<Record<string, string>> = {
  Mon: 'Sheet-pan salmon',
  Tue: 'Turkey tacos',
  Wed: 'Leftovers',
}

export function PlannerPage() {
  const week = buildWeek(new Date())
  const weekStartLabel = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(getStartOfWeek(new Date()))

  return (
    <section className="content-grid">
      <article className="content-card spotlight-card">
        <p className="eyebrow">Current focus</p>
        <h2>Week of {weekStartLabel}</h2>
        <p>
          This is the planner shell we will connect to recipe assignments and serving overrides once the data layer is in place.
        </p>
      </article>

      <article className="content-card week-card">
        <div className="week-grid">
          {week.map((day) => (
            <div key={day.isoDate} className="day-card">
              <p className="day-label">{day.dayLabel}</p>
              <h3>{day.dateLabel}</h3>
              <p>{plannedMealsByLabel[day.dayLabel] ?? 'Add a recipe'}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
