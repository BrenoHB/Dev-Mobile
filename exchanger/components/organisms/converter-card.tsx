import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { IconButton } from '@/components/atoms/icon-button'
import { AppCard } from '@/components/molecules/app-card'
import { CurrencyPicker } from '@/components/molecules/currency-picker'
import { Currency, convert } from '@/data/currencies'
import { formatNumber, parseNumber } from '@/lib/format'
import { colors, fonts, spacing } from '@/theme'

type ConverterCardProps = {
  from: Currency
  to: Currency
  amount: string
  onChangeAmount: (amount: string) => void
  onSwap: () => void
}

export function ConverterCard({ from, to, amount, onChangeAmount, onSwap }: ConverterCardProps) {
  const converted = convert(parseNumber(amount), from, to)

  return (
    <AppCard>
      <View style={styles.labels}>
        <AppText variant="caption">De</AppText>
        <AppText variant="caption">Para</AppText>
      </View>

      <View style={styles.pickers}>
        <CurrencyPicker currency={from} />
        <IconButton onPress={onSwap}>
          <MaterialCommunityIcons name="swap-horizontal" size={20} color={colors.gold} />
        </IconButton>
        <CurrencyPicker currency={to} reverse />
      </View>

      <TextInput
        value={amount}
        onChangeText={onChangeAmount}
        keyboardType="decimal-pad"
        selectionColor={colors.gold}
        style={styles.input}
      />

      <AppText color={colors.positive} style={styles.converted}>
        {`≈ ${to.symbol} ${formatNumber(converted)}`}
      </AppText>
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
    fontFamily: fonts.mono,
    fontSize: 34,
    letterSpacing: 2,
    color: colors.text,
    marginTop: spacing.xl,
    padding: 0,
  },
  converted: {
    marginTop: spacing.sm,
    fontSize: 15,
  },
})
