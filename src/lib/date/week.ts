export function getStartOfWeek(input: Date) {
  const date = new Date(input)
  const day = date.getDay()
  const diff = day === 0 ? -6 : 1 - day
  date.setDate(date.getDate() + diff)
  date.setHours(0, 0, 0, 0)
  return date
}

export function toIsoDate(input: Date) {
  return input.toISOString().slice(0, 10)
}

export function buildWeek(input: Date) {
  const start = getStartOfWeek(input)

  return Array.from({ length: 7 }, (_, index) => {
    const value = new Date(start)
    value.setDate(start.getDate() + index)

    return {
      isoDate: toIsoDate(value),
      dayLabel: new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(value),
      dateLabel: new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric',
      }).format(value),
    }
  })
}
