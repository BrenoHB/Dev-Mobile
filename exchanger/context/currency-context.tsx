import { ReactNode, createContext, useContext, useMemo, useState } from 'react'
import { Currency, getCurrency } from '@/data/currencies'

type CurrencyContextValue = {
  from: Currency
  to: Currency
  setFrom: (currency: Currency) => void
  setTo: (currency: Currency) => void
  swap: () => void
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [from, setFrom] = useState(getCurrency('BRL'))
  const [to, setTo] = useState(getCurrency('USD'))

  const value = useMemo(
    () => ({
      from,
      to,
      setFrom,
      setTo,
      swap: () => {
        setFrom(to)
        setTo(from)
      },
    }),
    [from, to],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)

  if (!context) {
    throw new Error('useCurrency precisa estar dentro de um CurrencyProvider')
  }

  return context
}
