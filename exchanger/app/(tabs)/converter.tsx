import { AppText } from '@/components/atoms/app-text'
import { Flag } from '@/components/atoms/flag'
import { FavoriteChip } from '@/components/molecules/favorite-chip'
import { AppShell } from '@/components/organisms/app-shell'
import { ConverterCard } from '@/components/organisms/converter-card'
import { RateCard } from '@/components/organisms/rate-card'
import { useCurrency } from '@/context/currency-context'
import { currencies, Currency, favorites, getCurrency } from '@/data/currencies'
import { colors, spacing } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native'

export default function Converter() {
  const { from, to, setFrom, setTo, swap } = useCurrency()
  const [amount, setAmount] = useState('1.000,00')
  const [picker, setPicker] = useState<'from' | 'to' | null>(null)

  const selectCurrency = (currency: Currency) => {
    if (picker === 'from') setFrom(currency)
    if (picker === 'to') setTo(currency)
    setPicker(null)
  }

  return (
    <AppShell>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <AppText variant="caption" color={colors.gold}>
            Maré · Câmbio
          </AppText>
          <AppText variant="title">Converter</AppText>
        </View>

        <ConverterCard
          from={from}
          to={to}
          amount={amount}
          onChangeAmount={setAmount}
          onSwap={swap}
          onSelectFrom={() => setPicker('from')}
          onSelectTo={() => setPicker('to')}
        />

        <RateCard from={from} to={to} />

        <View>
          <AppText variant="caption" style={styles.sectionTitle}>
            Favoritas
          </AppText>
          <View style={styles.favorites}>
            {favorites.map(code => (
              <FavoriteChip
                key={code}
                code={code}
                active={to.code === code}
                onPress={() => setTo(getCurrency(code))}
              />
            ))}
          </View>
        </View>
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
              <View>
                <AppText variant="caption" color={colors.gold}>
                  Converter
                </AppText>
                <AppText variant="label">Escolha a moeda</AppText>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Fechar seleção de moeda"
                onPress={() => setPicker(null)}
                style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
                <Feather name="x" size={20} color={colors.textMuted} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {currencies.map(currency => {
                const selected = currency.code === (picker === 'from' ? from.code : to.code)

                return (
                  <Pressable
                    key={currency.code}
                    accessibilityRole="button"
                    accessibilityLabel={`Selecionar ${currency.name}`}
                    onPress={() => selectCurrency(currency)}
                    style={({ pressed }) => [
                      styles.currencyOption,
                      selected && styles.selectedOption,
                      pressed && styles.pressed,
                    ]}>
                    <Flag country={currency.country} />
                    <View style={styles.currencyCopy}>
                      <AppText variant="label">{currency.name}</AppText>
                      <AppText variant="caption">{currency.code}</AppText>
                    </View>
                    {selected && <Feather name="check" size={18} color={colors.gold} />}
                  </Pressable>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  sectionTitle: {
    marginBottom: spacing.md,
  },
  favorites: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  modalSheet: {
    maxHeight: '72%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    padding: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  closeButton: {
    padding: spacing.sm,
  },
  currencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 58,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
    gap: spacing.md,
  },
  selectedOption: {
    backgroundColor: colors.surfaceRaised,
  },
  currencyCopy: {
    flex: 1,
    gap: 2,
  },
  pressed: {
    opacity: 0.65,
  },
})
