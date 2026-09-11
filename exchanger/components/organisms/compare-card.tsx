import { StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { AppCard } from '@/components/molecules/app-card'
import { DateField } from '@/components/molecules/date-field'
import { formatNumber } from '@/lib/format'
import { colors, fonts, spacing } from '@/theme'

type CompareCardProps = {
  start: string
  end: string
  change: number
}

export function CompareCard({ start, end, change }: CompareCardProps) {
  const positive = change >= 0

  return (
    <AppCard>
      <AppText variant="caption">Comparar datas</AppText>

      <View style={styles.fields}>
        <DateField label="De" value={start} />
        <DateField label="Hoje" value={end} />
      </View>

      <View style={styles.footer}>
        <AppText style={styles.footerLabel}>Variação no período:</AppText>
        <AppText color={positive ? colors.positive : colors.negative} style={styles.change}>
          {`${positive ? '+' : '-'}${formatNumber(Math.abs(change), 1)}%`}
        </AppText>
      </View>
    </AppCard>
  )
}

const styles = StyleSheet.create({
  fields: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  footerLabel: {
    fontSize: 15,
  },
  change: {
    fontFamily: fonts.mono,
    fontSize: 15,
  },
})
