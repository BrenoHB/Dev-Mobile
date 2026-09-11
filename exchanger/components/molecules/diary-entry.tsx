import { StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { colors, fonts, spacing } from '@/theme'

type DiaryEntryProps = {
  label: string
  rate: string
}

export function DiaryEntry({ label, rate }: DiaryEntryProps) {
  return (
    <View style={styles.row}>
      <AppText>{label}</AppText>
      <AppText style={styles.rate}>{rate}</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
  },
  rate: {
    fontFamily: fonts.mono,
    fontSize: 15,
  },
})
