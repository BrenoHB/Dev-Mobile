import { AppText } from '@/components/atoms/app-text'
import { AppCard } from '@/components/molecules/app-card'
import { AppShell } from '@/components/organisms/app-shell'
import { colors, radius, spacing } from '@/theme'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Switch, TextInput, View } from 'react-native'

type SettingRowProps = {
  icon: keyof typeof Feather.glyphMap
  label: string
  value?: string
  onPress?: () => void
}

function SettingRow({ icon, label, value, onPress }: SettingRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.settingRow, pressed && styles.pressed]}>
      <View style={styles.settingIcon}>
        <Feather name={icon} size={17} color={colors.gold} />
      </View>
      <AppText variant="label" style={styles.settingLabel}>
        {label}
      </AppText>
      {value && <AppText color={colors.textMuted}>{value}</AppText>}
      <Feather name="chevron-right" size={18} color={colors.textMuted} />
    </Pressable>
  )
}

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [name, setName] = useState('João Silva')
  const [email, setEmail] = useState('joao.silva@email.com')
  const [draftName, setDraftName] = useState(name)
  const [draftEmail, setDraftEmail] = useState(email)
  const [editVisible, setEditVisible] = useState(false)

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
  const canSave = draftName.trim().length >= 2 && draftEmail.includes('@')

  const openEditor = () => {
    setDraftName(name)
    setDraftEmail(email)
    setEditVisible(true)
  }

  const saveProfile = () => {
    if (!canSave) return
    setName(draftName.trim())
    setEmail(draftEmail.trim())
    setEditVisible(false)
  }

  return (
    <AppShell>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <Feather name="arrow-left" size={20} color={colors.text} />
          </Pressable>
          <View>
            <AppText variant="caption" color={colors.gold}>
              Maré · Conta
            </AppText>
            <AppText variant="title">Perfil</AppText>
          </View>
        </View>

        <AppCard style={styles.identityCard}>
          <View style={styles.avatar}>
            <AppText style={styles.avatarText}>{initials}</AppText>
          </View>
          <View style={styles.identityCopy}>
            <AppText variant="label">{name}</AppText>
            <AppText color={colors.textMuted}>{email}</AppText>
            <AppText variant="caption" color={colors.gold} style={styles.memberSince}>
              Membro desde 2024
            </AppText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Editar perfil"
            onPress={openEditor}
            style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}>
            <Feather name="edit-2" size={16} color={colors.gold} />
          </Pressable>
        </AppCard>

        <View>
          <AppText variant="caption" style={styles.sectionTitle}>
            Preferências
          </AppText>
          <AppCard style={styles.settingsCard}>
            <SettingRow icon="dollar-sign" label="Moeda principal" value="BRL" />
            <View style={styles.divider} />
            <SettingRow icon="globe" label="Idioma" value="Português" />
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingIcon}>
                <Feather name="bell" size={17} color={colors.gold} />
              </View>
              <AppText variant="label" style={styles.settingLabel}>
                Notificações
              </AppText>
              <Switch
                accessibilityLabel="Ativar notificações"
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.surfaceRaised, true: colors.gold }}
                thumbColor={colors.text}
              />
            </View>
          </AppCard>
        </View>

        <View>
          <AppText variant="caption" style={styles.sectionTitle}>
            Conta
          </AppText>
          <AppCard style={styles.settingsCard}>
            <SettingRow
              icon="briefcase"
              label="Planejador de viagem"
              onPress={() => router.push('/trip')}
            />
            <View style={styles.divider} />
            <SettingRow
              icon="bell"
              label="Alertas de cotação"
              onPress={() => router.push('/alerts')}
            />
            <View style={styles.divider} />
            <SettingRow icon="help-circle" label="Central de ajuda" />
            <View style={styles.divider} />
            <SettingRow icon="shield" label="Privacidade e segurança" />
            <View style={styles.divider} />
            <SettingRow icon="info" label="Sobre o Maré" value="v1.0.0" />
          </AppCard>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
          onPress={() => router.replace('/login')}
          style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
          <Feather name="log-out" size={17} color={colors.negative} />
          <AppText style={styles.logoutLabel}>Sair da conta</AppText>
        </Pressable>
      </ScrollView>

      <Modal
        visible={editVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditVisible(false)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setEditVisible(false)} />
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View>
                <AppText variant="caption" color={colors.gold}>Conta pessoal</AppText>
                <AppText variant="label">Editar perfil</AppText>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Fechar edição de perfil"
                onPress={() => setEditVisible(false)}
                style={styles.closeButton}>
                <Feather name="x" size={20} color={colors.textMuted} />
              </Pressable>
            </View>

            <View style={styles.field}>
              <AppText variant="caption">Nome completo</AppText>
              <TextInput
                value={draftName}
                onChangeText={setDraftName}
                autoCapitalize="words"
                placeholder="Seu nome"
                placeholderTextColor={colors.textMuted}
                selectionColor={colors.gold}
                style={styles.input}
              />
            </View>
            <View style={styles.field}>
              <AppText variant="caption">E-mail</AppText>
              <TextInput
                value={draftEmail}
                onChangeText={setDraftEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="voce@email.com"
                placeholderTextColor={colors.textMuted}
                selectionColor={colors.gold}
                style={styles.input}
              />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Salvar alterações do perfil"
              disabled={!canSave}
              onPress={saveProfile}
              style={({ pressed }) => [styles.saveButton, !canSave && styles.disabled, pressed && styles.pressed]}>
              <AppText style={styles.saveButtonLabel}>Salvar alterações</AppText>
            </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  avatar: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    backgroundColor: colors.gold,
  },
  avatarText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '700',
  },
  identityCopy: {
    flex: 1,
    gap: 4,
    marginLeft: spacing.md,
  },
  memberSince: {
    marginTop: 4,
    fontSize: 9,
  },
  editButton: {
    padding: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  settingsCard: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  settingRow: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
  },
  settingLabel: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  logoutLabel: {
    color: colors.negative,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.65,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  modalSheet: {
    gap: spacing.lg,
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  closeButton: {
    padding: spacing.sm,
  },
  field: {
    gap: spacing.sm,
  },
  input: {
    height: 52,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: 15,
  },
  saveButton: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.gold,
  },
  saveButtonLabel: {
    color: colors.background,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.4,
  },
})