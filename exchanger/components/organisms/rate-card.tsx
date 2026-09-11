import { StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { AppCard } from '@/components/molecules/app-card'
import { RateChart } from '@/components/molecules/rate-chart'
import { Currency, pairRate, rateHistory } from '@/data/currencies'
import { formatNumber } from '@/lib/format'
import { colors, spacing } from '@/theme'

type RateCardProps = {
  from: Currency
  to: Currency
}

export function RateCard({ from, to }: RateCardProps) {
  return (
    <AppCard>
      <View style={styles.header}>
        <AppText variant="caption">Cotação atual</AppText>
        <AppText variant="caption" color={colors.gold}>{`${to.code}/${from.code}`}</AppText>
      </View>

      <AppText variant="rate" style={styles.value}>
        {formatNumber(pairRate(from, to), 4)}
      </AppText>

      <RateChart points={rateHistory} />
    </AppCard>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
})
