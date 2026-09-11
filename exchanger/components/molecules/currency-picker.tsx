import { Feather } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { Flag } from '@/components/atoms/flag'
import { Currency } from '@/data/currencies'
import { colors, spacing } from '@/theme'

type CurrencyPickerProps = {
  currency: Currency
  reverse?: boolean
  onPress?: () => void
}

export function CurrencyPicker({ currency, reverse, onPress }: CurrencyPickerProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, reverse && styles.reverse, pressed && styles.pressed]}>
      <Flag country={currency.country} />
      <AppText variant="label">{currency.code}</AppText>
      <Feather name="chevron-down" size={16} color={colors.textMuted} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  pressed: {
    opacity: 0.6,
  },
})
