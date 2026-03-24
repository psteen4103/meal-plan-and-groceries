import type { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'
import type { ActiveHousehold } from '../features/household/householdService'

type AppShellProps = PropsWithChildren<{
  activeHousehold: ActiveHousehold
  syncMode: string
  onSwitchHousehold: () => void
}>

const navItems = [
  { to: '/recipes', label: 'Recipes' },
  { to: '/plan', label: 'Plan' },
  { to: '/grocery', label: 'Grocery' },
]

export function AppShell({
  activeHousehold,
  children,
  syncMode,
  onSwitchHousehold,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="hero-shell">
        <div>
          <p className="eyebrow">Shared household planner</p>
          <h1>Meal planning that turns straight into a grocery list.</h1>
          <p className="hero-copy">
            Start with recipes, assign them to the week, then generate the shopping list both devices share.
          </p>
        </div>

        <div className="hero-card">
          <span className="status-pill">{syncMode}</span>
          <h2>{activeHousehold.name}</h2>
          <dl className="meta-grid">
            <div>
              <dt>Share code</dt>
              <dd>{activeHousehold.shareCode}</dd>
            </div>
            <div>
              <dt>Joined</dt>
              <dd>{activeHousehold.joinedAtLabel}</dd>
            </div>
          </dl>
          <button className="secondary-button" onClick={onSwitchHousehold} type="button">
            Switch household
          </button>
        </div>
      </header>

      <nav className="tab-nav" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'tab-link active' : 'tab-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="page-shell">{children}</main>
    </div>
  )
}
