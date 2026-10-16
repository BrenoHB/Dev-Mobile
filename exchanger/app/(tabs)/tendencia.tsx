import { AppText } from '@/components/atoms/app-text'
import { AppCard } from '@/components/molecules/app-card'
import { Notice } from '@/components/molecules/notice'
import { PeriodSelector } from '@/components/molecules/period-selector'
import { RateChart } from '@/components/molecules/rate-chart'
import { AppShell } from '@/components/organisms/app-shell'
import { TrendCard } from '@/components/organisms/trend-card'
import { useCurrency } from '@/context/currency-context'
import { pairRate } from '@/data/currencies'
import { Period, periodChange, seriesFor } from '@/data/history'
import { colors, radius, spacing } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

export default function Tendencia() {
  const { from, to } = useCurrency()
  const [period, setPeriod] = useState<Period>('7D')
  const rate = pairRate(from, to)
  const values = seriesFor(period, rate)
  const change = periodChange(period)
  const highest = Math.max(...values)
  const lowest = Math.min(...values)
  const periodLabels: Record<Period, string> = { '7D': '7 dias', '30D': '30 dias', '6M': '6 meses', '1A': '1 ano' }

  return (
    <AppShell showLogout>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText variant="caption" color={colors.gold}>
            Maré · Leitura do momento
          </AppText>
          <AppText variant="title">Tendência</AppText>
        </View>

        <PeriodSelector value={period} onChange={setPeriod} />

        <TrendCard currencyName={to.name} change={change} periodLabel={periodLabels[period]} />

        <AppCard style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <AppText variant="caption">Histórico do par</AppText>
              <AppText variant="label" style={styles.pairLabel}>{from.code} / {to.code}</AppText>
            </View>
            <AppText color={colors.textMuted}>R$ {rate.toFixed(4)}</AppText>
          </View>
          <RateChart points={values} height={130} />
          <View style={styles.rangeRow}>
            <Metric label="Mínima" value={lowest.toFixed(4)} />
            <Metric label="Máxima" value={highest.toFixed(4)} />
            <Metric label="Atual" value={rate.toFixed(4)} accent />
          </View>
        </AppCard>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Criar alerta para este par"
          onPress={() => router.push('/alerts')}
          style={({ pressed }) => [styles.alertButton, pressed && styles.pressed]}>
          <View style={styles.alertButtonIcon}>
            <Feather name="bell" size={17} color={colors.gold} />
          </View>
          <View style={styles.alertButtonCopy}>
            <AppText variant="label">Acompanhar {from.code}/{to.code}</AppText>
            <AppText color={colors.textMuted}>Crie um alerta para esta cotação</AppText>
          </View>
          <Feather name="arrow-up-right" size={18} color={colors.gold} />
        </Pressable>

        <AppCard style={styles.methodCard}>
          <View style={styles.methodHeader}>
            <View style={styles.methodIcon}>
              <Feather name="activity" size={18} color={colors.gold} />
            </View>
            <View style={styles.methodHeading}>
              <AppText variant="caption">Leitura do momento</AppText>
              <AppText variant="label" style={styles.methodTitle}>Como calculamos</AppText>
            </View>
            <View style={styles.periodBadge}>
              <AppText style={styles.periodBadgeText}>7D</AppText>
            </View>
          </View>

          <AppText style={styles.explanation}>
            A tendência compara a cotação atual com a média recente para mostrar a direção do par.
          </AppText>

          <View style={styles.methodSteps}>
            <MethodStep number="01" title="Observamos" description="as cotações dos últimos 7 dias" />
            <MethodStep number="02" title="Calculamos" description="a média do período escolhido" />
            <MethodStep number="03" title="Comparamos" description="o valor atual com essa média" />
          </View>

          <View style={styles.methodFooter}>
            <Feather name="shield" size={14} color={colors.textMuted} />
            <AppText color={colors.textMuted} style={styles.footerText}>
              É uma leitura estatística, não uma previsão financeira.
            </AppText>
          </View>
        </AppCard>

        <Notice>
          Isto é uma leitura estatística do histórico, não uma previsão nem recomendação financeira.
          Câmbio pode mudar de direção a qualquer momento.
        </Notice>
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
  methodCard: { padding: spacing.lg },
  methodHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  methodIcon: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: `${colors.gold}1A` },
  methodHeading: { flex: 1, gap: spacing.xs },
  methodTitle: { fontSize: 17 },
  periodBadge: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radius.pill, backgroundColor: colors.surfaceRaised },
  periodBadgeText: { color: colors.gold, fontSize: 11, fontWeight: '700' },
  explanation: { marginTop: spacing.lg, fontSize: 14, lineHeight: 21, color: colors.textMuted },
  methodSteps: { marginTop: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.surfaceBorder },
  methodStep: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  stepNumber: { width: 28, color: colors.gold, fontFamily: 'monospace', fontSize: 11, fontWeight: '700' },
  stepCopy: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', columnGap: spacing.xs, rowGap: 2 },
  stepTitle: { fontSize: 13 },
  stepDescription: { fontSize: 13 },
  methodFooter: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.surfaceBorder },
  footerText: { flex: 1, fontSize: 11, lineHeight: 16 },
  chartCard: { padding: spacing.lg },
  chartHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing.lg },
  pairLabel: { marginTop: spacing.sm },
  rangeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  metric: { gap: spacing.xs },
  alertButton: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceBorder },
  alertButtonIcon: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: colors.surfaceRaised },
  alertButtonCopy: { flex: 1, gap: 4 },
  pressed: { opacity: 0.65 },
})

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={styles.metric}>
      <AppText variant="caption">{label}</AppText>
      <AppText variant="label" color={accent ? colors.gold : colors.text}>{value}</AppText>
    </View>
  )
}

function MethodStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <View style={styles.methodStep}>
      <AppText style={styles.stepNumber}>{number}</AppText>
      <View style={styles.stepCopy}>
        <AppText variant="label" style={styles.stepTitle}>{title}</AppText>
        <AppText color={colors.textMuted} style={styles.stepDescription}>{description}</AppText>
      </View>
    </View>
  )
}
