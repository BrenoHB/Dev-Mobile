import { AppText } from '@/components/atoms/app-text'
import { AppCard } from '@/components/molecules/app-card'
import { AppShell } from '@/components/organisms/app-shell'
import { useCurrency } from '@/context/currency-context'
import { formatNumber, parseNumber } from '@/lib/format'
import { colors, radius, spacing } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'

type Expense = {
  id: string
  title: string
  category: string
  amount: number
}

const initialExpenses: Expense[] = [
  { id: '1', title: 'Hospedagem', category: 'Estadia', amount: 420 },
  { id: '2', title: 'Jantar', category: 'Alimentação', amount: 68.5 },
  { id: '3', title: 'Transporte', category: 'Locomoção', amount: 32 },
]

const categories = ['Estadia', 'Alimentação', 'Locomoção', 'Compras']

export default function Trip() {
  const { to } = useCurrency()
  const [budget, setBudget] = useState(1200)
  const [expenses, setExpenses] = useState(initialExpenses)
  const [modalVisible, setModalVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])

  const spent = expenses.reduce((total, expense) => total + expense.amount, 0)
  const remaining = Math.max(budget - spent, 0)
  const progress = Math.min(spent / budget, 1)

  const addExpense = () => {
    const parsedAmount = parseNumber(amount)
    if (!title.trim() || parsedAmount <= 0) return

    setExpenses(current => [
      { id: `${Date.now()}`, title: title.trim(), category, amount: parsedAmount },
      ...current,
    ])
    setTitle('')
    setAmount('')
    setModalVisible(false)
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
            <AppText variant="caption" color={colors.gold}>Maré · Viagem</AppText>
            <AppText variant="title">Meu orçamento</AppText>
          </View>
        </View>

        <AppCard style={styles.budgetCard}>
          <View style={styles.cardTopline}>
            <View>
              <AppText variant="caption">Viagem internacional</AppText>
              <AppText variant="label" style={styles.tripName}>Próxima viagem</AppText>
            </View>
            <View style={styles.currencyBadge}>
              <AppText style={styles.currencyBadgeText}>{to.code}</AppText>
            </View>
          </View>
          <View style={styles.budgetValues}>
            <View>
              <AppText color={colors.textMuted}>Disponível</AppText>
              <AppText variant="amount">{formatNumber(remaining)}</AppText>
              <AppText color={colors.textMuted}>{to.code}</AppText>
            </View>
            <View style={styles.budgetTotal}>
              <AppText color={colors.textMuted}>Orçamento</AppText>
              <AppText variant="label">{formatNumber(budget)} {to.code}</AppText>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.progressFooter}>
            <AppText color={colors.textMuted}>{Math.round(progress * 100)}% utilizado</AppText>
            <AppText color={colors.textMuted}>≈ R$ {formatNumber(spent * to.rate)}</AppText>
          </View>
        </AppCard>

        <View style={styles.statsRow}>
          <Stat label="Gasto" value={`${formatNumber(spent)} ${to.code}`} color={colors.negative} />
          <Stat label="Lançamentos" value={String(expenses.length)} color={colors.gold} />
          <Stat label="Taxa usada" value={`R$ ${formatNumber(to.rate, 2)}`} color={colors.positive} />
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <AppText variant="caption">Despesas da viagem</AppText>
            <AppText color={colors.textMuted} style={styles.sectionHint}>Acompanhe seus gastos em tempo real</AppText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Adicionar despesa"
            onPress={() => setModalVisible(true)}
            style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
            <Feather name="plus" size={18} color={colors.background} />
          </Pressable>
        </View>

        <View style={styles.expenseList}>
          {expenses.map(expense => (
            <AppCard key={expense.id} style={styles.expenseCard}>
              <View style={styles.expenseIcon}>
                <Feather name={expense.category === 'Alimentação' ? 'coffee' : expense.category === 'Estadia' ? 'home' : 'navigation'} size={17} color={colors.gold} />
              </View>
              <View style={styles.expenseCopy}>
                <AppText variant="label">{expense.title}</AppText>
                <AppText color={colors.textMuted}>{expense.category}</AppText>
              </View>
              <AppText variant="label">{formatNumber(expense.amount)} {to.code}</AppText>
            </AppCard>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setModalVisible(false)} />
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View>
                <AppText variant="caption" color={colors.gold}>Novo lançamento</AppText>
                <AppText variant="label">Adicionar despesa</AppText>
              </View>
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Feather name="x" size={20} color={colors.textMuted} />
              </Pressable>
            </View>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Nome da despesa"
              placeholderTextColor={colors.textMuted}
              selectionColor={colors.gold}
              style={styles.input}
            />
            <View style={styles.amountInput}>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="Valor"
                placeholderTextColor={colors.textMuted}
                selectionColor={colors.gold}
                style={[styles.input, styles.amountField]}
              />
              <AppText variant="label">{to.code}</AppText>
            </View>
            <AppText variant="caption">Categoria</AppText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
              {categories.map(option => (
                <Pressable
                  key={option}
                  onPress={() => setCategory(option)}
                  style={[styles.categoryChip, category === option && styles.categoryChipActive]}>
                  <AppText style={category === option ? styles.categoryTextActive : styles.categoryText}>{option}</AppText>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              onPress={addExpense}
              disabled={!title.trim() || parseNumber(amount) <= 0}
              style={({ pressed }) => [styles.saveButton, (!title.trim() || parseNumber(amount) <= 0) && styles.disabled, pressed && styles.pressed]}>
              <AppText style={styles.saveButtonText}>Adicionar despesa</AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </AppShell>
  )
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.stat}>
      <View style={[styles.statDot, { backgroundColor: color }]} />
      <AppText variant="caption">{label}</AppText>
      <AppText variant="label" style={styles.statValue}>{value}</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  content: { gap: spacing.xl, paddingBottom: spacing.xxl },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceBorder },
  budgetCard: { padding: spacing.lg },
  cardTopline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  tripName: { marginTop: spacing.sm },
  currencyBadge: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, backgroundColor: colors.surfaceRaised },
  currencyBadgeText: { color: colors.gold, fontWeight: '700' },
  budgetValues: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: spacing.xl },
  budgetTotal: { alignItems: 'flex-end', gap: spacing.sm },
  progressTrack: { height: 8, marginTop: spacing.lg, overflow: 'hidden', borderRadius: radius.pill, backgroundColor: colors.surfaceRaised },
  progressBar: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.gold },
  progressFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  stat: { flex: 1, minHeight: 84, padding: spacing.md, justifyContent: 'space-between', borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceBorder },
  statDot: { width: 7, height: 7, borderRadius: 4 },
  statValue: { fontSize: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionHint: { marginTop: spacing.sm, fontSize: 12 },
  addButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: radius.md, backgroundColor: colors.gold },
  expenseList: { gap: spacing.md },
  expenseCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  expenseIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: radius.md, backgroundColor: colors.surfaceRaised },
  expenseCopy: { flex: 1, gap: 4 },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.55)' },
  modalSheet: { backgroundColor: colors.surface, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: spacing.xl, gap: spacing.md },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
  closeButton: { padding: spacing.sm },
  input: { height: 50, paddingHorizontal: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: colors.surfaceBorder, backgroundColor: colors.background, color: colors.text, fontSize: 15 },
  amountInput: { height: 50, flexDirection: 'row', alignItems: 'center', paddingRight: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: colors.surfaceBorder, backgroundColor: colors.background },
  amountField: { flex: 1, borderWidth: 0, backgroundColor: 'transparent' },
  categoryList: { gap: spacing.sm },
  categoryChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, backgroundColor: colors.surfaceRaised },
  categoryChipActive: { backgroundColor: colors.gold },
  categoryText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  categoryTextActive: { color: colors.background, fontSize: 12, fontWeight: '700' },
  saveButton: { height: 50, alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm, borderRadius: radius.md, backgroundColor: colors.gold },
  saveButtonText: { color: colors.background, fontWeight: '700' },
  disabled: { opacity: 0.4 },
  pressed: { opacity: 0.65 },
})