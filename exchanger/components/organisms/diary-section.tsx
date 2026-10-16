import { AppText } from '@/components/atoms/app-text'
import { Pill } from '@/components/atoms/pill'
import { DiaryEntry } from '@/components/molecules/diary-entry'
import { DiaryRecord } from '@/data/history'
import { formatNumber, parseNumber } from '@/lib/format'
import { colors, radius, spacing } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native'

type DiarySectionProps = {
  entries: DiaryRecord[]
}

export function DiarySection({ entries }: DiarySectionProps) {
  const [records, setRecords] = useState(entries)
  const [modalVisible, setModalVisible] = useState(false)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [direction, setDirection] = useState<'buy' | 'sell'>('buy')

  const addRecord = () => {
    const parsedAmount = parseNumber(amount)
    const parsedRate = parseNumber(rate)

    if (!description.trim() || parsedAmount <= 0 || parsedRate <= 0) return

    setRecords(current => [
      {
        id: `${Date.now()}`,
        date: 'Hoje',
        description: description.trim(),
        amount: parsedAmount,
        currency: 'USD',
        direction,
        rate: parsedRate,
      },
      ...current,
    ])
    setDescription('')
    setAmount('')
    setRate('')
    setModalVisible(false)
  }

  return (
    <View>
      <View style={styles.header}>
        <View>
          <AppText variant="caption">Seu diário de câmbio</AppText>
          <AppText color={colors.textMuted} style={styles.count}>
            {records.length} {records.length === 1 ? 'registro' : 'registros'} salvos
          </AppText>
        </View>
        <Pill active style={styles.button} onPress={() => setModalVisible(true)}>
          <AppText color={colors.gold} style={styles.buttonLabel}>
            + Registrar troca
          </AppText>
        </Pill>
      </View>

      <AppText color={colors.textMuted} style={styles.hint}>
        Registro manual — anote as trocas que você fez fora do app pra comparar com a cotação de
        hoje.
      </AppText>

      <View>
        {records.map(entry => (
          <DiaryEntry
            key={entry.id}
            date={entry.date}
            description={entry.description}
            amount={formatNumber(entry.amount)}
            currency={entry.currency}
            direction={entry.direction}
            rate={formatNumber(entry.rate, 4)}
          />
        ))}
      </View>

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
                <AppText variant="caption" color={colors.gold}>Novo registro</AppText>
                <AppText variant="label">Registrar troca</AppText>
              </View>
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Feather name="x" size={20} color={colors.textMuted} />
              </Pressable>
            </View>

            <View style={styles.segmentedControl}>
              {(['buy', 'sell'] as const).map(option => (
                <Pressable
                  key={option}
                  onPress={() => setDirection(option)}
                  style={[styles.segment, direction === option && styles.activeSegment]}>
                  <AppText style={direction === option ? styles.activeSegmentText : styles.segmentText}>
                    {option === 'buy' ? 'Compra' : 'Venda'}
                  </AppText>
                </Pressable>
              ))}
            </View>

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Descrição da troca"
              placeholderTextColor={colors.textMuted}
              selectionColor={colors.gold}
              style={styles.input}
            />
            <View style={styles.inputRow}>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="Valor em moeda estrangeira"
                placeholderTextColor={colors.textMuted}
                selectionColor={colors.gold}
                style={[styles.input, styles.halfInput]}
              />
              <AppText variant="label">USD</AppText>
            </View>
            <View style={styles.inputRow}>
              <TextInput
                value={rate}
                onChangeText={setRate}
                keyboardType="decimal-pad"
                placeholder="Taxa negociada"
                placeholderTextColor={colors.textMuted}
                selectionColor={colors.gold}
                style={[styles.input, styles.halfInput]}
              />
              <AppText variant="label">BRL</AppText>
            </View>
            <Pressable
              onPress={addRecord}
              disabled={!description.trim() || parseNumber(amount) <= 0 || parseNumber(rate) <= 0}
              style={({ pressed }) => [
                styles.saveButton,
                (!description.trim() || parseNumber(amount) <= 0 || parseNumber(rate) <= 0) && styles.disabled,
                pressed && styles.pressed,
              ]}>
              <AppText style={styles.saveButtonText}>Salvar registro</AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  count: { marginTop: spacing.sm, fontSize: 12 },
  hint: {
    marginTop: spacing.md,
    fontSize: 13,
    lineHeight: 19,
  },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.55)' },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.md,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
  closeButton: { padding: spacing.sm },
  segmentedControl: { flexDirection: 'row', padding: 4, borderRadius: radius.md, backgroundColor: colors.surfaceRaised },
  segment: { flex: 1, alignItems: 'center', paddingVertical: spacing.sm, borderRadius: radius.sm },
  activeSegment: { backgroundColor: colors.gold },
  segmentText: { color: colors.textMuted, fontWeight: '600' },
  activeSegmentText: { color: colors.background, fontWeight: '700' },
  input: {
    height: 50,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: 15,
  },
  inputRow: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.background,
  },
  halfInput: { flex: 1, borderWidth: 0, backgroundColor: 'transparent' },
  saveButton: { height: 50, alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm, borderRadius: radius.md, backgroundColor: colors.gold },
  saveButtonText: { color: colors.background, fontWeight: '700' },
  disabled: { opacity: 0.4 },
  pressed: { opacity: 0.65 },
})
