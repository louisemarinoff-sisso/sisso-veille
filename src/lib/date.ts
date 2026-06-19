const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]

// ISO-8601: week 1 is the week containing the year's first Thursday.
function isoWeekMonday(week: number, year: number): Date {
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const jan4Day = jan4.getUTCDay() || 7
  const week1Monday = new Date(jan4)
  week1Monday.setUTCDate(jan4.getUTCDate() - jan4Day + 1)
  const monday = new Date(week1Monday)
  monday.setUTCDate(week1Monday.getUTCDate() + (week - 1) * 7)
  return monday
}

export function weekDateRange(week: number, year: number): { start: Date; end: Date } {
  const start = isoWeekMonday(week, year)
  const end = new Date(start)
  end.setUTCDate(start.getUTCDate() + 6)
  return { start, end }
}

function dayMonth(d: Date, short: boolean): string {
  const day = String(d.getUTCDate()).padStart(2, '0')
  const month = MONTHS_FR[d.getUTCMonth()]
  return `${day} ${short ? month.slice(0, 3) : month}`
}

export function formatEditionRange(week: number, year: number): string {
  const { start, end } = weekDateRange(week, year)
  const sameMonth = start.getUTCMonth() === end.getUTCMonth()
  const startLabel = sameMonth ? String(start.getUTCDate()).padStart(2, '0') : dayMonth(start, false)
  return `${startLabel} → ${dayMonth(end, false)} ${end.getUTCFullYear()}`
}

export function formatArchiveRange(week: number, year: number): string {
  return formatEditionRange(week, year).toUpperCase()
}

export function currentIsoWeek(now = new Date()): { week: number; year: number } {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return { week, year: d.getUTCFullYear() }
}

export function formatArticleDate(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  return `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}
