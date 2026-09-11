import { useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { router } from 'expo-router'
import { AppText } from '@/components/atoms/app-text'
import { AppShell } from '@/components/organisms/app-shell'
import { colors, radius, spacing } from '@/theme'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <AppShell style={styles.shell}>
      <View style={styles.header}>
        <AppText variant="caption" color={colors.gold}>
          Maré · Câmbio
        </AppText>
        <AppText variant="title">Entrar</AppText>
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <AppText variant="caption">E-mail</AppText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="voce@email.com"
            placeholderTextColor={colors.textMuted}
            selectionColor={colors.gold}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <AppText variant="caption">Senha</AppText>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            selectionColor={colors.gold}
            style={styles.input}
          />
        </View>
      </View>

      <Pressable
        onPress={() => router.replace('/converter')}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <AppText style={styles.buttonLabel}>Entrar</AppText>
      </Pressable>

      <Pressable style={styles.link}>
        <AppText color={colors.textMuted}>Criar uma conta</AppText>
      </Pressable>
    </AppShell>
  )
}

const styles = StyleSheet.create({
  shell: {
    justifyContent: 'center',
    gap: spacing.xxl,
  },
  header: {
    gap: spacing.sm,
  },
  form: {
    gap: spacing.xl,
  },
  field: {
    gap: spacing.sm,
  },
  input: {
    height: 52,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16,
  },
  button: {
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gold,
  },
  buttonLabel: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
  link: {
    alignItems: 'center',
  },
})
