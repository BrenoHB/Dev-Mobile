import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { PeriodSelector } from '@/components/molecules/period-selector'
import { AppShell } from '@/components/organisms/app-shell'
import { CompareCard } from '@/components/organisms/compare-card'
import { DiarySection } from '@/components/organisms/diary-section'
import { RangeCard } from '@/components/organisms/range-card'
import { useCurrency } from '@/context/currency-context'
import { pairRate } from '@/data/currencies'
import { Period, diaryEntries, history, periodChange, seriesFor, today } from '@/data/history'
import { colors, spacing } from '@/theme'

export default function Historico() {
  const { from, to } = useCurrency()
  const [period, setPeriod] = useState<Period>('30D')

  const values = seriesFor(period, pairRate(from, to))

  return (
    <AppShell>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText variant="caption" color={colors.gold}>
            Maré · Histórico
          </AppText>
          <AppText variant="title">{`Histórico ${to.code}/${from.code}`}</AppText>
        </View>

        <PeriodSelector value={period} onChange={setPeriod} />

        <RangeCard values={values} />

        <CompareCard start={history[period].start} end={today} change={periodChange(period)} />

        <DiarySection entries={diaryEntries} />
      </ScrollView>
    </AppShell>
  )
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  header: {
    gap: spacing.sm,
  },
})
