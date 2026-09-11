export type Currency = {
  code: string
  name: string
  country: string
  symbol: string
  rate: number
}

export const currencies: Currency[] = [
  { code: 'BRL', name: 'Real', country: 'BR', symbol: 'R$', rate: 1 },
  { code: 'USD', name: 'Dólar', country: 'US', symbol: 'US$', rate: 5.2159 },
  { code: 'EUR', name: 'Euro', country: 'EU', symbol: '€', rate: 5.671 },
  { code: 'GBP', name: 'Libra', country: 'GB', symbol: '£', rate: 6.632 },
  { code: 'JPY', name: 'Iene', country: 'JP', symbol: '¥', rate: 0.0353 },
]

export const favorites = ['USD', 'EUR', 'GBP', 'JPY']

export const rateHistory = [
  5.02, 5.18, 5.09, 5.31, 5.24, 5.46, 5.38, 5.29, 5.51, 5.41,
  5.12, 5.27, 5.19, 5.44, 5.33, 5.58, 5.47, 5.36, 5.62, 5.52,
]

export function getCurrency(code: string) {
  return currencies.find(currency => currency.code === code) ?? currencies[0]
}

export function convert(amount: number, from: Currency, to: Currency) {
  return (amount * from.rate) / to.rate
}

export function pairRate(from: Currency, to: Currency) {
  return to.rate / from.rate
}
