import { Feather } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { AppCard } from '@/components/molecules/app-card'
import { formatNumber } from '@/lib/format'
import { colors, fonts, radius, spacing } from '@/theme'

type TrendCardProps = {
  currencyName: string
  change: number
}

export function TrendCard({ currencyName, change }: TrendCardProps) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.badge}>
        <Feather name="trending-up" size={26} color={colors.positive} />
      </View>

      <AppText variant="title" color={colors.positive} style={styles.title}>
        Tendência de alta
      </AppText>

      <AppText color={colors.textMuted} style={styles.description}>
        {`${currencyName} em movimento de subida nos últimos 7 dias`}
      </AppText>

      <AppText color={colors.gold} style={styles.value}>
        {`+${formatNumber(change, 1)}%`}
      </AppText>

      <AppText color={colors.textMuted} style={styles.legend}>
        vs. média móvel de 7 dias
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
    backgroundColor: `${colors.positive}1F`,
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
