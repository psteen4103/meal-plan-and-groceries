# Product Requirements Document (PRD)

## Product Name
Meal + Grocery Planner

## Date
March 18, 2026

## Problem Statement
Build a simple, low/no-cost app for two people to collaboratively plan weekly meals and generate a shared grocery list from selected recipes.

## Goals
- Enable two household users to collaborate in near real-time without full auth in MVP.
- Store and manage recipes in one place.
- Build weekly meal plans from recipes.
- Generate a grocery list from planned meals.
- Keep MVP operational cost at $0.

## Non-Goals (MVP)
- Grocery store integrations.
- Paid third-party APIs as hard dependencies.
- Full account/auth system.
- Native iOS/Android distribution.
- SMS-based list updates.

## Target Users
- Primary: a two-person household.
- Secondary: small households in a future version.

## Core User Stories
- As a user, I can create or join a shared household with a code/link so both of us see the same data.
- As a user, I can add, edit, and delete recipes.
- As a user, I can import a recipe from a URL and then correct fields before saving.
- As a user, I can upload a photo of a recipe and get an editable ingredient draft.
- As a user, I can assign recipes to days of a week.
- As a user, I can generate a grocery list from the selected week.
- As a user, I can manually add, edit, and check off grocery items.
- As a user, I can see my partner's updates across devices.

## Functional Requirements
1. Platform
- Mobile-first PWA.

2. Household Sharing
- Create household returns a share code and link.
- Join household by entering code or opening link.
- Household context persists on each device.

3. Recipe Management
- CRUD for recipes.
- Recipe fields: title, source URL, servings, notes, ingredients.
- Ingredient fields: name, quantity, unit.

4. Recipe URL Import
- Accept URL input.
- Extract probable title and ingredients.
- Always show editable review before save.

5. Photo Recipe Import
- Accept uploaded image.
- OCR extracts raw text.
- Parse text to ingredient draft.
- Always show editable review before save.

6. Weekly Meal Plan
- Weekly view for 7 days.
- Assign one or more recipes per day.
- Optional servings override.

7. Grocery List
- Generate list from selected week plan.
- Aggregate duplicate ingredients where possible.
- Manual item add, edit, delete, and check.

8. Sync
- Shared data visible on both devices in near real-time.
- Conflict behavior uses latest visible update in MVP.

9. Data Backup
- Export and import JSON backup.

## Non-Functional Requirements
- Cost: MVP must run on free-tier services only.
- Performance: common interactions should feel responsive on mobile.
- Reliability: no silent data loss during normal use.
- Privacy: data scoped per household share key.
- Accessibility: basic semantic labels and mobile tap targets.

## Suggested MVP Architecture
- Frontend: React + Vite + TypeScript PWA.
- Backend: Supabase free tier.
- OCR: client-side OCR.
- Hosting: Vercel or Netlify free tier.

## Data Model (High Level)
- Household: id, name, share_code, created_at.
- Recipe: id, household_id, title, source_url, servings, notes, created_at, updated_at.
- RecipeIngredient: id, recipe_id, name, qty, unit.
- MealPlanEntry: id, household_id, week_start, date, recipe_id, servings_override.
- GroceryList: id, household_id, week_start, name, active.
- GroceryItem: id, grocery_list_id, name, qty, unit, checked, source_recipe_id.

## Success Metrics
- Both users can join one household and sync updates on two devices.
- End-to-end flow works: recipe to weekly plan to generated grocery list.
- URL import and photo import each produce editable drafts and save successfully.

## Milestones
1. Foundation
- PWA scaffold, routing, household create/join, base schema.

2. Core Planner and Grocery
- Recipe CRUD, weekly planner, grocery CRUD, realtime sync.

3. Imports
- URL import with editable review.
- Photo OCR import with editable review.

4. Stabilization
- Mobile polish, backup/export, error handling, deploy.

## Acceptance Criteria
- A household can be created and joined from a second device without auth.
- Recipe CRUD works and persists.
- Weekly planning works for all 7 days.
- Grocery generation from planned recipes creates expected items.
- Grocery list supports manual edits and checklist behavior.
- URL import and photo OCR both end in editable confirmation before save.
- App is deployable and usable as a mobile PWA.
- Running costs remain $0 in expected usage.

## Future Scope
- SMS add-to-list.
- Optional AI-assisted parsing.
- Optional user accounts.
- Pantry inventory and budget tracking.
