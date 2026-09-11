import { StyleSheet, View } from 'react-native'
import { AppCard } from '@/components/molecules/app-card'
import { RateChart } from '@/components/molecules/rate-chart'
import { Stat } from '@/components/molecules/stat'
import { formatNumber } from '@/lib/format'
import { colors, spacing } from '@/theme'

type RangeCardProps = {
  values: number[]
}

export function RangeCard({ values }: RangeCardProps) {
  return (
    <AppCard>
      <View style={styles.header}>
        <Stat label="Máxima" value={formatNumber(Math.max(...values), 4)} color={colors.positive} />
        <Stat
          label="Mínima"
          value={formatNumber(Math.min(...values), 4)}
          color={colors.negative}
          align="right"
        />
      </View>
      <RateChart points={values} height={130} />
    </AppCard>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
})
