import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppShell } from './app/AppShell'
import { AppRoutes } from './app/routes'
import { HouseholdGate } from './features/household/HouseholdGate'
import { clearActiveHousehold } from './features/household/householdService'
import { hasSupabaseConfig } from './lib/db/client'

function App() {
  return (
    <HouseholdGate>
      {(activeHousehold) => (
        <BrowserRouter>
          <AppShell
            activeHousehold={activeHousehold}
            onSwitchHousehold={clearActiveHousehold}
            syncMode={hasSupabaseConfig ? 'Supabase configured' : 'Local household mode'}
          >
            <AppRoutes />
          </AppShell>
        </BrowserRouter>
      )}
    </HouseholdGate>
  )
}

export default App
