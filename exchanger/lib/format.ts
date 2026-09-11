export function formatNumber(value: number, decimals = 2) {
  const [whole, fraction] = value.toFixed(decimals).split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return fraction ? `${grouped},${fraction}` : grouped
}

export function parseNumber(text: string) {
  const normalized = text.replace(/\./g, '').replace(',', '.')
  const value = Number(normalized)
  return Number.isFinite(value) ? value : 0
}
