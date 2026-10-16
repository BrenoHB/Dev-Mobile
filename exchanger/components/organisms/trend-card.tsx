import { AppText } from '@/components/atoms/app-text'
import { AppCard } from '@/components/molecules/app-card'
import { formatNumber } from '@/lib/format'
import { colors, fonts, radius, spacing } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

type TrendCardProps = {
  currencyName: string
  change: number
  periodLabel: string
}

export function TrendCard({ currencyName, change, periodLabel }: TrendCardProps) {
  const isPositive = change >= 0
  const accent = isPositive ? colors.positive : colors.negative

  return (
    <AppCard style={styles.card}>
      <View style={[styles.badge, { backgroundColor: `${accent}1F` }]}>
        <Feather name={isPositive ? 'trending-up' : 'trending-down'} size={26} color={accent} />
      </View>

      <AppText variant="title" color={accent} style={styles.title}>
        {isPositive ? 'Tendência de alta' : 'Tendência de baixa'}
      </AppText>

      <AppText color={colors.textMuted} style={styles.description}>
        {`${currencyName} em movimento de ${isPositive ? 'subida' : 'queda'} nos últimos ${periodLabel}`}
      </AppText>

      <AppText color={accent} style={styles.value}>
        {`${change >= 0 ? '+' : ''}${formatNumber(change, 1)}%`}
      </AppText>

      <AppText color={colors.textMuted} style={styles.legend}>
        vs. média do período
      </AppText>
    </AppCard>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  badge: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginTop: spacing.xl,
  },
  description: {
    marginTop: spacing.sm,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  value: {
    fontFamily: fonts.mono,
    fontSize: 30,
    letterSpacing: 1,
    marginTop: spacing.xl,
  },
  legend: {
    marginTop: spacing.xs,
    fontSize: 12,
  },
})
