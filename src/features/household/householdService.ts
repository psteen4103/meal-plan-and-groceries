const ACTIVE_HOUSEHOLD_KEY = 'meal-grocery.active-household'
const KNOWN_HOUSEHOLDS_KEY = 'meal-grocery.known-households'
const HOUSEHOLD_EVENT = 'meal-grocery-household-change'

export type ActiveHousehold = {
  id: string
  name: string
  shareCode: string
  joinedAt: string
  joinedAtLabel: string
}

type StoredHousehold = {
  id: string
  name: string
  shareCode: string
  joinedAt: string
}

function readKnownHouseholds(): StoredHousehold[] {
  const rawValue = window.localStorage.getItem(KNOWN_HOUSEHOLDS_KEY)

  if (!rawValue) {
    return []
  }

  try {
    return JSON.parse(rawValue) as StoredHousehold[]
  } catch {
    return []
  }
}

function writeKnownHouseholds(households: StoredHousehold[]) {
  window.localStorage.setItem(KNOWN_HOUSEHOLDS_KEY, JSON.stringify(households))
}

function emitChange() {
  window.dispatchEvent(new Event(HOUSEHOLD_EVENT))
}

function createId() {
  return crypto.randomUUID()
}

function createShareCode() {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 36).toString(36).toUpperCase()).join('')
}

function formatJoinedLabel(dateString: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString))
}

function toActiveHousehold(value: StoredHousehold | null): ActiveHousehold | null {
  if (!value) {
    return null
  }

  return {
    ...value,
    joinedAtLabel: formatJoinedLabel(value.joinedAt),
  }
}

export function readActiveHousehold() {
  const rawValue = window.localStorage.getItem(ACTIVE_HOUSEHOLD_KEY)

  if (!rawValue) {
    return null
  }

  try {
    return toActiveHousehold(JSON.parse(rawValue) as StoredHousehold)
  } catch {
    return null
  }
}

export function subscribeToHousehold(callback: () => void) {
  const handler = () => callback()
  window.addEventListener(HOUSEHOLD_EVENT, handler)

  return () => {
    window.removeEventListener(HOUSEHOLD_EVENT, handler)
  }
}

export function createHousehold(name: string) {
  const household: StoredHousehold = {
    id: createId(),
    name: name.trim(),
    shareCode: createShareCode(),
    joinedAt: new Date().toISOString(),
  }
  const households = readKnownHouseholds()
  households.push(household)
  writeKnownHouseholds(households)
  window.localStorage.setItem(ACTIVE_HOUSEHOLD_KEY, JSON.stringify(household))
  emitChange()

  return toActiveHousehold(household)
}

export function joinHousehold(shareCode: string) {
  const match = readKnownHouseholds().find(
    (household) => household.shareCode === shareCode.trim().toUpperCase(),
  )

  if (!match) {
    throw new Error('No household found for that share code yet.')
  }

  window.localStorage.setItem(ACTIVE_HOUSEHOLD_KEY, JSON.stringify(match))
  emitChange()

  return toActiveHousehold(match)
}

export function clearActiveHousehold() {
  window.localStorage.removeItem(ACTIVE_HOUSEHOLD_KEY)
  emitChange()
}
