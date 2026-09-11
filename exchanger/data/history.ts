export type Period = '7D' | '30D' | '6M' | '1A'

export type DiaryRecord = {
  id: string
  date: string
  description: string
  rate: number
}

type PeriodData = {
  start: string
  factors: number[]
}

export const periods: Period[] = ['7D', '30D', '6M', '1A']

export const today = '10 ago 2026'

export const history: Record<Period, PeriodData> = {
  '7D': {
    start: '03 ago 2026',
    factors: [0.9712, 0.9768, 0.9735, 0.9822, 0.979, 0.9865, 0.9894, 1],
  },
  '30D': {
    start: '12 jul 2026',
    factors: [
      0.962443, 0.9702, 0.9668, 0.979, 0.9745, 0.986, 0.9812, 0.9925, 1.000786, 0.988,
      0.9762, 0.983, 0.9705, 0.9788, 0.9902, 0.9845, 0.996, 0.989, 0.9945, 1,
    ],
  },
  '6M': {
    start: '10 fev 2026',
    factors: [
      0.9205, 0.934, 0.9268, 0.9425, 0.9362, 0.951, 0.9448, 0.9585, 0.952, 0.9648,
      0.9578, 0.9705, 0.964, 0.9762, 0.9698, 0.9828, 0.9905, 1,
    ],
  },
  '1A': {
    start: '10 ago 2025',
    factors: [
      0.882, 0.9015, 0.893, 0.916, 0.9075, 0.9298, 0.921, 0.908, 0.9345, 0.9258,
      0.948, 0.9392, 0.9265, 0.9525, 0.9438, 0.966, 0.9572, 0.9448, 0.9705, 0.9618,
      0.984, 0.9752, 0.9905, 1,
    ],
  },
}

export const diaryEntries: DiaryRecord[] = [
  { id: '1', date: '28 jul', description: 'comprou US$ 500', rate: 5.142 },
  { id: '2', date: '03 jun', description: 'comprou US$ 300', rate: 5.021 },
]

export function seriesFor(period: Period, rate: number) {
  return history[period].factors.map(factor => factor * rate)
}

export function periodChange(period: Period) {
  const { factors } = history[period]
  const first = factors[0]
  const last = factors[factors.length - 1]
  return ((last - first) / first) * 100
}

export function trendChange() {
  const { factors } = history['7D']
  const current = factors[factors.length - 1]
  const average = factors.reduce((total, factor) => total + factor, 0) / factors.length
  return ((current - average) / average) * 100
}
