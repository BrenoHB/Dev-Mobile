import { StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { Pill } from '@/components/atoms/pill'
import { Period, periods } from '@/data/history'
import { colors, spacing } from '@/theme'

type PeriodSelectorProps = {
  value: Period
  onChange: (period: Period) => void
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <View style={styles.row}>
      {periods.map(period => (
        <Pill
          key={period}
          active={period === value}
          onPress={() => onChange(period)}
          style={styles.pill}>
          <AppText
            style={styles.label}
            color={period === value ? colors.gold : colors.textMuted}>
            {period}
          </AppText>
        </Pill>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
})
