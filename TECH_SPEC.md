# Technical Specification

## System Overview
Build a mobile-first PWA that supports two-person household collaboration without auth in MVP. Users join a shared household by code/link and can store recipes, plan meals for a week, generate and manage a grocery list, and import recipe data from URL and photo OCR with editable review.

## Architecture
### Frontend
- React + Vite + TypeScript.
- TanStack Query for server state.
- React Router for top-level navigation.
- Installable PWA with service worker.

### Backend
- Supabase free tier.
- Postgres for persistence.
- Realtime subscriptions for grocery and planner updates.

### Sync Strategy
- Server is source of truth scoped by household_id.
- Realtime subscriptions refresh query cache.
- Conflict handling uses last-write-wins by updated_at in MVP.

## Security Model
- Access controlled by random share_code and share link.
- No auth in MVP.
- Risk accepted: anyone with the code can join the household.

## Core Entities
- Household
- DeviceMember
- Recipe
- RecipeIngredient
- MealPlanEntry
- GroceryList
- GroceryItem

## Service Contracts
- createHousehold(name)
- joinHousehold(shareCode)
- listRecipes(householdId)
- createRecipe(input)
- updateRecipe(id, input)
- deleteRecipe(id)
- listWeekPlan(householdId, weekStart)
- upsertMealPlanEntry(input)
- getOrCreateWeekList(householdId, weekStart)
- listGroceryItems(groceryListId)
- upsertGroceryItem(input)
- toggleGroceryItem(id, checked)
- generateFromWeek(householdId, weekStart)

## Parsing Rules
- Parse ingredient lines into quantity, unit, and name where possible.
- If parse fails, keep the full line as item name.
- Merge grocery items only when normalized name and unit match.

## Planned Project Structure
```text
src/
  app/
    routes/
    providers/
  components/
  features/
    household/
    recipes/
    planner/
    grocery/
    imports/
  lib/
    db/
    parsing/
    date/
    pwa/
  styles/
```

## Technical Decisions
- TypeScript strict mode.
- UUID primary keys.
- ISO date strings for planner scopes.
- All import outputs remain editable before save.

## Testing Strategy
- Unit tests for parsing and grocery aggregation.
- Integration tests for household join, recipe CRUD, and weekly grocery generation.
- Manual two-device verification for realtime sync.

## Deployment
- Environments: local, preview, production.
- Env vars: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY.
- Host: Vercel or Netlify free tier.
