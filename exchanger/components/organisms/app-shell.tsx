import { IconButton } from '@/components/atoms/icon-button'
import { colors, spacing } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ReactNode } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type AppShellProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  showLogout?: boolean
}

export function AppShell({ children, style, showLogout = false }: AppShellProps) {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.root, { paddingTop: insets.top + spacing.lg }, style]}>
      {children}
      {showLogout && (
        <>
          <IconButton
            accessibilityRole="button"
            accessibilityLabel="Abrir perfil"
            onPress={() => router.push('/profile')}
            style={[styles.profileButton, { top: insets.top + spacing.lg }]}
          >
            <Feather name="user" size={18} color={colors.textMuted} />
          </IconButton>
          <IconButton
            accessibilityRole="button"
            accessibilityLabel="Sair da conta"
            onPress={() => router.replace('/login')}
            style={[styles.logoutButton, { top: insets.top + spacing.lg }]}
          >
            <Feather name="log-out" size={18} color={colors.textMuted} />
          </IconButton>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  logoutButton: {
    position: 'absolute',
    right: spacing.xl,
  },
  profileButton: {
    position: 'absolute',
    right: spacing.xl + 42,
  },
})
