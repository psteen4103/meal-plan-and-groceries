import { Navigate, Route, Routes } from 'react-router-dom'
import { GroceryPage } from '../features/grocery/GroceryPage'
import { PlannerPage } from '../features/planner/PlannerPage'
import { RecipeListPage } from '../features/recipes/RecipeListPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/plan" />} />
      <Route path="/recipes" element={<RecipeListPage />} />
      <Route path="/plan" element={<PlannerPage />} />
      <Route path="/grocery" element={<GroceryPage />} />
      <Route path="*" element={<Navigate replace to="/plan" />} />
    </Routes>
  )
}
