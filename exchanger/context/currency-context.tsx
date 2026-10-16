import { Currency, getCurrency } from '@/data/currencies'
import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

export type CurrencyAlert = {
  id: string
  from: Currency
  to: Currency
  target: number
  enabled: boolean
}

type CurrencyContextValue = {
  from: Currency
  to: Currency
  setFrom: (currency: Currency) => void
  setTo: (currency: Currency) => void
  swap: () => void
  alerts: CurrencyAlert[]
  addAlert: (target: number) => void
  removeAlert: (id: string) => void
  toggleAlert: (id: string) => void
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [from, setFrom] = useState(getCurrency('BRL'))
  const [to, setTo] = useState(getCurrency('USD'))
  const [alerts, setAlerts] = useState<CurrencyAlert[]>([])

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
      alerts,
      addAlert: (target: number) => {
        setAlerts(current => [
          ...current,
          {
            id: `${Date.now()}-${current.length}`,
            from,
            to,
            target,
            enabled: true,
          },
        ])
      },
      removeAlert: (id: string) => {
        setAlerts(current => current.filter(alert => alert.id !== id))
      },
      toggleAlert: (id: string) => {
        setAlerts(current =>
          current.map(alert => (alert.id === id ? { ...alert, enabled: !alert.enabled } : alert)),
        )
      },
    }),
    [from, to, alerts],
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
