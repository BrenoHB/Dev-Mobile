import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { Pill } from '@/components/atoms/pill'
import { colors } from '@/theme'

type FavoriteChipProps = {
  code: string
  active?: boolean
  onPress?: () => void
}

export function FavoriteChip({ code, active, onPress }: FavoriteChipProps) {
  return (
    <Pill active={active} onPress={onPress}>
      <Ionicons name="star" size={13} color={colors.gold} />
      <AppText style={styles.code}>{code}</AppText>
    </Pill>
  )
}

const styles = StyleSheet.create({
  code: {
    fontSize: 14,
    fontWeight: '600',
  },
})
