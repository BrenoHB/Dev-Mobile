import { AppText } from '@/components/atoms/app-text'
import { colors, fonts, radius, spacing } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

type DiaryEntryProps = {
  date: string
  description: string
  amount: string
  currency: string
  direction: 'buy' | 'sell'
  rate: string
}

export function DiaryEntry({ date, description, amount, currency, direction, rate }: DiaryEntryProps) {
  const isBuy = direction === 'buy'

  return (
    <View style={styles.row}>
      <View style={[styles.directionIcon, isBuy ? styles.buyIcon : styles.sellIcon]}>
        <Feather name={isBuy ? 'arrow-down-left' : 'arrow-up-right'} size={16} color={isBuy ? colors.positive : colors.negative} />
      </View>
      <View style={styles.copy}>
        <AppText variant="label">{description}</AppText>
        <AppText color={colors.textMuted} style={styles.meta}>
          {date} · {isBuy ? 'Compra' : 'Venda'}
        </AppText>
      </View>
      <View style={styles.values}>
        <AppText variant="label" style={styles.amount}>
          {amount} {currency}
        </AppText>
        <AppText style={styles.rate}>R$ {rate}</AppText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
  },
  directionIcon: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  buyIcon: { backgroundColor: 'rgba(78, 203, 142, 0.12)' },
  sellIcon: { backgroundColor: 'rgba(228, 104, 93, 0.12)' },
  copy: { flex: 1, gap: 4 },
  meta: { fontSize: 12 },
  values: { alignItems: 'flex-end', gap: 4 },
  amount: { fontSize: 13 },
  rate: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.textMuted,
  },
})
