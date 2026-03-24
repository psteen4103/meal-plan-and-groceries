import { Navigate, Route, Routes } from 'react-router-dom'
import { GroceryPage } from '../features/grocery/GroceryPage'
import { PlannerPage } from '../features/planner/PlannerPage'
import { RecipeListPage } from '../features/recipes/RecipeListPageNew'

type AppRoutesProps = {
  householdId: string
}

export function AppRoutes({ householdId }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/plan" />} />
      <Route path="/recipes" element={<RecipeListPage householdId={householdId} />} />
      <Route path="/plan" element={<PlannerPage />} />
      <Route path="/grocery" element={<GroceryPage />} />
      <Route path="*" element={<Navigate replace to="/plan" />} />
    </Routes>
  )
}
