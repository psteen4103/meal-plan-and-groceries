import type { ReactNode } from 'react'
import { useState, useSyncExternalStore } from 'react'
import {
  createHousehold,
  joinHousehold,
  readActiveHousehold,
  subscribeToHousehold,
  type ActiveHousehold,
} from './householdService'

type HouseholdGateProps = {
  children: (household: ActiveHousehold) => ReactNode
}

export function HouseholdGate({ children }: HouseholdGateProps) {
  const activeHousehold = useSyncExternalStore(
    subscribeToHousehold,
    readActiveHousehold,
    readActiveHousehold,
  )
  const [householdName, setHouseholdName] = useState('')
  const [shareCode, setShareCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  if (activeHousehold) {
    return <>{children(activeHousehold)}</>
  }

  const handleCreate = () => {
    if (!householdName.trim()) {
      setErrorMessage('Enter a household name before creating one.')
      return
    }

    createHousehold(householdName)
    setErrorMessage('')
  }

  const handleJoin = () => {
    try {
      joinHousehold(shareCode)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to join household.')
    }
  }

  return (
    <section className="welcome-shell">
      <div className="welcome-panel intro-panel">
        <p className="eyebrow">MVP foundation</p>
        <h1>Shared meal planning without accounts.</h1>
        <p className="hero-copy">
          This first build uses local household state so we can develop the full flow before wiring Supabase realtime sync.
        </p>
        <div className="feature-grid">
          <article>
            <h2>Recipes</h2>
            <p>Store recipes and prepare URL/photo import flows.</p>
          </article>
          <article>
            <h2>Weekly plan</h2>
            <p>Assign meals across the week and track servings.</p>
          </article>
          <article>
            <h2>Grocery list</h2>
            <p>Aggregate ingredients into a shared shopping list.</p>
          </article>
        </div>
      </div>

      <div className="welcome-panel action-panel">
        <div className="form-card">
          <h2>Create household</h2>
          <label className="field-label" htmlFor="household-name">
            Household name
          </label>
          <input
            id="household-name"
            className="text-input"
            onChange={(event) => setHouseholdName(event.target.value)}
            placeholder="Steen household"
            value={householdName}
          />
          <button className="primary-button" onClick={handleCreate} type="button">
            Create and continue
          </button>
        </div>

        <div className="form-card">
          <h2>Join household</h2>
          <label className="field-label" htmlFor="share-code">
            Share code
          </label>
          <input
            id="share-code"
            className="text-input"
            onChange={(event) => setShareCode(event.target.value.toUpperCase())}
            placeholder="ABC123"
            value={shareCode}
          />
          <button className="secondary-button" onClick={handleJoin} type="button">
            Join existing household
          </button>
        </div>

        {errorMessage ? <p className="error-copy">{errorMessage}</p> : null}
      </div>
    </section>
  )
}
