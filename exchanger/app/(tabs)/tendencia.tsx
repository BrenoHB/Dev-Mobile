import { ScrollView, StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { AppCard } from '@/components/molecules/app-card'
import { Notice } from '@/components/molecules/notice'
import { AppShell } from '@/components/organisms/app-shell'
import { TrendCard } from '@/components/organisms/trend-card'
import { useCurrency } from '@/context/currency-context'
import { trendChange } from '@/data/history'
import { colors, spacing } from '@/theme'

export default function Tendencia() {
  const { to } = useCurrency()

  return (
    <AppShell>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText variant="caption" color={colors.gold}>
            Maré · Leitura do momento
          </AppText>
          <AppText variant="title">Tendência</AppText>
        </View>

        <TrendCard currencyName={to.name} change={trendChange()} />

        <AppCard>
          <AppText variant="caption">Como calculamos</AppText>
          <AppText style={styles.explanation}>
            Comparamos a cotação de hoje com a média dos últimos 7 dias. Sem projeção de futuro — só
            leitura do padrão recente.
          </AppText>
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
  explanation: {
    marginTop: spacing.md,
    fontSize: 15,
    lineHeight: 23,
  },
})
