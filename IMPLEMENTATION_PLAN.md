# Implementation Plan

## Sprint 0
- Scaffold React + Vite + TypeScript app.
- Configure linting, strict TS, and PWA support.
- Add environment setup and Supabase client stub.
- Build base app shell and routing.

## Sprint 1
- Add household create and join flow.
- Persist active household locally.
- Add tabs for Recipes, Plan, and Grocery.

## Sprint 2
- Build recipe CRUD.
- Build ingredient editor.
- Build weekly planner grid and recipe assignment.

## Sprint 3
- Build week-based grocery list.
- Add manual grocery CRUD.
- Add generateFromWeek aggregation logic.
- Add realtime updates across devices.

## Sprint 4
- Add URL import with editable recipe draft.
- Add photo OCR import with editable recipe draft.

## Sprint 5
- Add JSON export and import backup.
- Improve error handling and mobile polish.
- Deploy MVP.

## Suggested Initial Files
- src/main.tsx
- src/App.tsx
- src/app/routes.tsx
- src/app/providers.tsx
- src/features/household/HouseholdGate.tsx
- src/features/household/householdService.ts
- src/features/recipes/RecipeListPage.tsx
- src/features/recipes/recipeService.ts
- src/features/planner/PlannerPage.tsx
- src/features/planner/mealPlanService.ts
- src/features/grocery/GroceryPage.tsx
- src/features/grocery/groceryService.ts
- src/features/grocery/generateFromWeek.ts
- src/lib/db/client.ts
- src/lib/db/types.ts
