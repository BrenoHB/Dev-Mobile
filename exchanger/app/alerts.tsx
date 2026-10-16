import { AppText } from '@/components/atoms/app-text'
import { AppCard } from '@/components/molecules/app-card'
import { AppShell } from '@/components/organisms/app-shell'
import { useCurrency } from '@/context/currency-context'
import { currencies, Currency, pairRate } from '@/data/currencies'
import { formatNumber, parseNumber } from '@/lib/format'
import { colors, radius, spacing } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'

type PickerTarget = 'from' | 'to' | null

export default function Alerts() {
  const { from, to, alerts, setFrom, setTo, addAlert, removeAlert, toggleAlert } = useCurrency()
  const [target, setTarget] = useState('')
  const [picker, setPicker] = useState<PickerTarget>(null)

  const currentRate = pairRate(from, to)
  const targetValue = parseNumber(target)

  const selectCurrency = (currency: Currency) => {
    if (picker === 'from') setFrom(currency)
    if (picker === 'to') setTo(currency)
    setPicker(null)
  }

  const createAlert = () => {
    if (targetValue <= 0) return
    addAlert(targetValue)
    setTarget('')
  }

  return (
    <AppShell>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <Feather name="arrow-left" size={20} color={colors.text} />
          </Pressable>
          <View>
            <AppText variant="caption" color={colors.gold}>
              Maré · Monitoramento
            </AppText>
            <AppText variant="title">Alertas</AppText>
          </View>
        </View>

        <AppCard style={styles.rateSummary}>
          <View style={styles.rateSummaryHeader}>
            <View>
              <AppText variant="caption">Cotação atual</AppText>
              <AppText style={styles.ratePair}>{from.code} / {to.code}</AppText>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <AppText style={styles.liveLabel}>Ao vivo</AppText>
            </View>
          </View>
          <View style={styles.rateSummaryFooter}>
            <AppText variant="rate">{formatNumber(currentRate, 4)}</AppText>
            <View style={styles.rateChange}>
              <Feather name="trending-up" size={15} color={colors.positive} />
              <AppText style={styles.rateChangeLabel}>+2,8% hoje</AppText>
            </View>
          </View>
          <AppText color={colors.textMuted} style={styles.updatedAt}>
            Última atualização há poucos segundos
          </AppText>
        </AppCard>

        <AppCard>
          <AppText variant="caption">Novo alerta</AppText>
          <AppText style={styles.description}>
            Avisaremos quando a cotação atingir o valor definido.
          </AppText>

          <View style={styles.pairRow}>
            <View style={styles.fieldGroup}>
              <AppText variant="caption">De</AppText>
              <CurrencyButton currency={from} onPress={() => setPicker('from')} />
            </View>
            <Feather name="arrow-right" size={18} color={colors.textMuted} />
            <View style={styles.fieldGroup}>
              <AppText variant="caption">Para</AppText>
              <CurrencyButton currency={to} onPress={() => setPicker('to')} />
            </View>
          </View>

          <View style={styles.targetField}>
            <AppText variant="caption">Alertar quando chegar a</AppText>
            <View style={styles.inputRow}>
              <TextInput
                value={target}
                onChangeText={setTarget}
                keyboardType="decimal-pad"
                placeholder={formatNumber(currentRate)}
                placeholderTextColor={colors.textMuted}
                selectionColor={colors.gold}
                style={styles.input}
              />
              <AppText variant="label">{to.code}</AppText>
            </View>
            <View style={styles.quickTargets}>
              {[0.98, 1.02, 1.05].map(multiplier => {
                const value = currentRate * multiplier

                return (
                  <Pressable
                    key={multiplier}
                    accessibilityRole="button"
                    accessibilityLabel={`Usar meta ${formatNumber(value)} ${to.code}`}
                    onPress={() => setTarget(formatNumber(value, 4))}
                    style={({ pressed }) => [styles.quickTarget, pressed && styles.pressed]}>
                    <AppText style={styles.quickTargetLabel}>{formatNumber(value, 2)}</AppText>
                  </Pressable>
                )
              })}
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Criar alerta"
            disabled={targetValue <= 0}
            onPress={createAlert}
            style={({ pressed }) => [
              styles.createButton,
              targetValue <= 0 && styles.disabledButton,
              pressed && styles.pressed,
            ]}>
            <Feather name="bell" size={17} color={colors.background} />
            <AppText style={styles.createButtonLabel}>Criar alerta</AppText>
          </Pressable>
        </AppCard>

        <View>
          <AppText variant="caption" style={styles.sectionTitle}>
            Alertas ativos {alerts.length > 0 ? `· ${alerts.length}` : ''}
          </AppText>
          {alerts.length === 0 ? (
            <AppCard style={styles.emptyCard}>
              <Feather name="bell-off" size={22} color={colors.textMuted} />
              <AppText style={styles.emptyText}>Você ainda não criou nenhum alerta.</AppText>
            </AppCard>
          ) : (
            <View style={styles.alertList}>
              {alerts.map(alert => (
                <AppCard key={alert.id} style={styles.alertCard}>
                  <View style={styles.alertIcon}>
                    <Feather name="bell" size={17} color={colors.gold} />
                  </View>
                  <View style={styles.alertCopy}>
                    <AppText variant="label">
                      {alert.from.code} / {alert.to.code}
                    </AppText>
                    <AppText color={colors.textMuted}>
                      Acima de {formatNumber(alert.target)} {alert.to.code}
                    </AppText>
                  </View>
                  <Pressable
                    accessibilityRole="switch"
                    accessibilityState={{ checked: alert.enabled }}
                    accessibilityLabel={`Ativar alerta ${alert.from.code} ${alert.to.code}`}
                    onPress={() => toggleAlert(alert.id)}
                    style={[styles.toggle, alert.enabled && styles.toggleOn]}>
                    <View style={[styles.toggleThumb, alert.enabled && styles.toggleThumbOn]} />
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`Excluir alerta ${alert.from.code} ${alert.to.code}`}
                    onPress={() => removeAlert(alert.id)}
                    style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}>
                    <Feather name="trash-2" size={17} color={colors.negative} />
                  </Pressable>
                </AppCard>
              ))}
            </View>
          )}
        </View>

        <AppCard style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Feather name="info" size={17} color={colors.gold} />
          </View>
          <View style={styles.tipCopy}>
            <AppText variant="label">Como funciona</AppText>
            <AppText color={colors.textMuted} style={styles.tipText}>
              Escolha uma meta acima da cotação atual para acompanhar uma alta, ou abaixo para
              acompanhar uma queda.
            </AppText>
          </View>
        </AppCard>
      </ScrollView>

      <Modal
        visible={picker !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setPicker(null)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setPicker(null)} />
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <AppText variant="label">Escolha a moeda</AppText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Fechar seleção de moeda"
                onPress={() => setPicker(null)}
                style={styles.closeButton}>
                <Feather name="x" size={20} color={colors.textMuted} />
              </Pressable>
            </View>
            {currencies.map(currency => (
              <Pressable
                key={currency.code}
                accessibilityRole="button"
                accessibilityLabel={`Selecionar ${currency.name}`}
                onPress={() => selectCurrency(currency)}
                style={({ pressed }) => [styles.currencyOption, pressed && styles.pressed]}>
                <AppText variant="label">{currency.code}</AppText>
                <AppText color={colors.textMuted}>{currency.name}</AppText>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </AppShell>
  )
}

function CurrencyButton({ currency, onPress }: { currency: Currency; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Selecionar ${currency.code}`}
      onPress={onPress}
      style={({ pressed }) => [styles.currencyButton, pressed && styles.pressed]}>
      <AppText variant="label">{currency.code}</AppText>
      <Feather name="chevron-down" size={16} color={colors.textMuted} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  content: { gap: spacing.xl, paddingBottom: spacing.xxl },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  description: { marginTop: spacing.md, lineHeight: 21, color: colors.textMuted },
  rateSummary: { padding: spacing.lg },
  rateSummaryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  ratePair: { marginTop: spacing.sm, fontSize: 15, color: colors.text },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(78, 203, 142, 0.12)',
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.positive },
  liveLabel: { color: colors.positive, fontSize: 11, fontWeight: '700' },
  rateSummaryFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  rateChange: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: 5 },
  rateChangeLabel: { color: colors.positive, fontSize: 12, fontWeight: '600' },
  updatedAt: { marginTop: spacing.sm, fontSize: 11 },
  pairRow: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.md, marginTop: spacing.xl },
  fieldGroup: { flex: 1, gap: spacing.sm },
  currencyButton: {
    height: 48,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
  },
  targetField: { gap: spacing.sm, marginTop: spacing.xl },
  inputRow: {
    height: 52,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
  },
  input: { flex: 1, color: colors.text, fontSize: 20, fontWeight: '600' },
  quickTargets: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  quickTarget: {
    minWidth: 76,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surfaceRaised,
  },
  quickTargetLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  createButton: {
    minHeight: 50,
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.gold,
  },
  createButtonLabel: { color: colors.background, fontWeight: '700' },
  disabledButton: { opacity: 0.4 },
  sectionTitle: { marginBottom: spacing.md },
  tipCard: { flexDirection: 'row', gap: spacing.md, padding: spacing.lg },
  tipIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
  },
  tipCopy: { flex: 1, gap: spacing.sm },
  tipText: { lineHeight: 20 },
  emptyCard: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xxl },
  emptyText: { color: colors.textMuted },
  alertList: { gap: spacing.md },
  alertCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  alertIcon: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
  },
  alertCopy: { flex: 1, gap: 4 },
  toggle: {
    width: 38,
    height: 22,
    padding: 2,
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised,
  },
  toggleOn: { backgroundColor: colors.gold },
  toggleThumb: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.textMuted },
  toggleThumbOn: { alignSelf: 'flex-end', backgroundColor: colors.background },
  deleteButton: { padding: spacing.xs },
  pressed: { opacity: 0.65 },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.55)' },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  closeButton: { padding: spacing.sm },
  currencyOption: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
})