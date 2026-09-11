import { Feather } from '@expo/vector-icons'
import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppText } from '@/components/atoms/app-text'
import { colors, radius, spacing } from '@/theme'

type NoticeProps = {
  children: ReactNode
}

export function Notice({ children }: NoticeProps) {
  return (
    <View style={styles.notice}>
      <Feather name="info" size={16} color={colors.gold} style={styles.icon} />
      <AppText color={colors.textMuted} style={styles.text}>
        {children}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  notice: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: `${colors.gold}66`,
  },
  icon: {
    marginTop: 2,
  },
  text: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
})
