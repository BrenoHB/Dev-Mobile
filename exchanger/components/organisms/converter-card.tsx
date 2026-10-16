import { AppText } from '@/components/atoms/app-text'
import { IconButton } from '@/components/atoms/icon-button'
import { AppCard } from '@/components/molecules/app-card'
import { CurrencyPicker } from '@/components/molecules/currency-picker'
import { Currency, convert } from '@/data/currencies'
import { formatNumber, parseNumber } from '@/lib/format'
import { colors, fonts, spacing } from '@/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'

type ConverterCardProps = {
  from: Currency
  to: Currency
  amount: string
  onChangeAmount: (amount: string) => void
  onSwap: () => void
  onSelectFrom: () => void
  onSelectTo: () => void
  onClear: () => void
  onShare: () => void
}

export function ConverterCard({
  from,
  to,
  amount,
  onChangeAmount,
  onSwap,
  onSelectFrom,
  onSelectTo,
  onClear,
  onShare,
}: ConverterCardProps) {
  const converted = convert(parseNumber(amount), from, to)

  return (
    <AppCard>
      <View style={styles.labels}>
        <AppText variant="caption">De</AppText>
        <AppText variant="caption">Para</AppText>
      </View>

      <View style={styles.pickers}>
        <CurrencyPicker currency={from} onPress={onSelectFrom} />
        <IconButton onPress={onSwap}>
          <MaterialCommunityIcons name="swap-horizontal" size={20} color={colors.gold} />
        </IconButton>
        <CurrencyPicker currency={to} reverse onPress={onSelectTo} />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={amount}
          onChangeText={onChangeAmount}
          keyboardType="decimal-pad"
          selectionColor={colors.gold}
          placeholder="0,00"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
        {amount.length > 0 && (
          <IconButton
            accessibilityRole="button"
            accessibilityLabel="Limpar valor"
            onPress={onClear}>
            <MaterialCommunityIcons name="backspace-outline" size={20} color={colors.textMuted} />
          </IconButton>
        )}
      </View>

      <View style={styles.resultRow}>
        <AppText color={colors.positive} style={styles.converted}>
          {`≈ ${to.symbol} ${formatNumber(converted)}`}
        </AppText>
        <IconButton
          accessibilityRole="button"
          accessibilityLabel="Compartilhar conversão"
          onPress={onShare}>
          <MaterialCommunityIcons name="share-variant-outline" size={19} color={colors.gold} />
        </IconButton>
      </View>
    </AppCard>
  )
}

const styles = StyleSheet.create({
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  input: {
    flex: 1,
    fontFamily: fonts.mono,
    fontSize: 34,
    letterSpacing: 2,
    color: colors.text,
    marginTop: spacing.xl,
    padding: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  converted: {
    marginTop: spacing.sm,
    fontSize: 15,
  },
})
