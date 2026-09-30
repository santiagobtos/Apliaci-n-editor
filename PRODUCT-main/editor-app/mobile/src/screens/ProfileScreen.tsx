/**
 * ProfileScreen — conectada al backend Even API
 *
 * Cambios respecto a la versión original:
 *  1. `onUpdateEmail` / `onUpdatePassword` hacen PATCH al servidor con el JWT.
 *  2. El cambio de idioma persiste en el servidor (PATCH /auth/language) y
 *     aplica traducciones en toda la pantalla con un hook i18n mínimo.
 *  3. `onDeleteAccount` hace DELETE /auth/account.
 *  4. Se añade el helper `apiClient` para centralizar headers y base URL.
 */

import { useState } from 'react';
import {
  Alert, Keyboard, KeyboardAvoidingView, Linking, Modal,
  Platform, Pressable, ScrollView, StyleSheet, Switch, Text,
  TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell, CaretRight, Check, Globe, Link as LinkIcon,
  Lock, PencilSimple, Plus, Question, Trash, UsersFour,
} from 'phosphor-react-native';
import type { Project, TeamMember } from '../types';
import { colors, fonts, radius, spacing } from '../theme';
import { AnimatedPressable } from '../components/AnimatedPressable';

// ─── i18n mínimo ─────────────────────────────────────────────────────────────

type Lang = 'es' | 'en';
type Translations = {
  profile: string; myTeam: string; add: string; noMembers: string;
  owner: string; member: string; usageThisMonth: string; projects: string;
  storage: string; automations: string; notifications: string; connections: string;
  language: string; security: string; help: string; logout: string;
  addMember: string; emailLabel: string; roleLabel: string; addToTeam: string;
  languageTitle: string; driveTitle: string; driveSoon: string; understood: string;
  secTitle: string; changeEmail: string; changePassword: string; deleteAccount: string;
  newEmail: string; saveEmail: string; currentPassword: string; newPassword: string;
  savePassword: string; saving: string; back: string; show: string; hide: string;
  deleteConfirmTitle: string; deleteConfirmMsg: string; cancel: string; delete: string;
  errorTitle: string; successTitle: string; emailUpdated: string; passwordUpdated: string;
  invalidEmail: string; fillBothPasswords: string; passwordTooShort: string;
  emailPlaceholder: string; minCharsPlaceholder: string; dotDotDot: string;
  upgradeToPlus: string; upgradeToUltra: string; free: string;
};

const TRANSLATIONS: Record<Lang, Translations> = {
  es: {
    profile: 'Perfil',
    myTeam: 'Mi equipo',
    add: 'Agregar',
    noMembers: 'Aún no has agregado miembros. Agrégalos para asignarlos a proyectos.',
    owner: 'Propietario',
    member: 'Miembro',
    usageThisMonth: 'Uso este mes',
    projects: 'Proyectos',
    storage: 'Almacenamiento',
    automations: 'Automatizaciones',
    notifications: 'Notificaciones',
    connections: 'Conexiones (Google Drive)',
    language: 'Idioma',
    security: 'Cuenta y seguridad',
    help: 'Ayuda y soporte',
    logout: 'Cerrar sesión',
    addMember: 'Agregar miembro',
    emailLabel: 'Email',
    roleLabel: 'Rol',
    addToTeam: 'Agregar al equipo',
    languageTitle: 'Idioma',
    driveTitle: 'Google Drive',
    driveSoon: 'La integración con Google Drive está en camino. Pronto podrás conectar tu cuenta y acceder a tus archivos directamente desde Even.',
    understood: 'Entendido',
    secTitle: 'Cuenta y seguridad',
    changeEmail: 'Cambiar email',
    changePassword: 'Cambiar contraseña',
    deleteAccount: 'Eliminar cuenta',
    newEmail: 'Nuevo email',
    saveEmail: 'Guardar email',
    currentPassword: 'Contraseña actual',
    newPassword: 'Nueva contraseña',
    savePassword: 'Guardar contraseña',
    saving: 'Guardando…',
    back: '← Volver',
    show: 'Ver',
    hide: 'Ocultar',
    deleteConfirmTitle: '¿Eliminar cuenta?',
    deleteConfirmMsg: 'Esta acción es irreversible. Se eliminarán todos tus proyectos y datos.',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    errorTitle: 'Error',
    successTitle: 'Listo',
    emailUpdated: 'Email actualizado correctamente',
    passwordUpdated: 'Contraseña actualizada',
    invalidEmail: 'Ingresá un email válido',
    fillBothPasswords: 'Completá ambas contraseñas',
    passwordTooShort: 'La nueva contraseña debe tener al menos 6 caracteres',
    emailPlaceholder: 'correo@ejemplo.com',
    minCharsPlaceholder: 'Mín. 6 caracteres',
    dotDotDot: '••••••••',
    upgradeToPlus: 'Mejorar a Plus',
    upgradeToUltra: 'Mejorar a Ultra',
    free: 'Gratis',
  },
  en: {
    profile: 'Profile',
    myTeam: 'My team',
    add: 'Add',
    noMembers: "You haven't added any members yet. Add them to assign to projects.",
    owner: 'Owner',
    member: 'Member',
    usageThisMonth: 'Usage this month',
    projects: 'Projects',
    storage: 'Storage',
    automations: 'Automations',
    notifications: 'Notifications',
    connections: 'Connections (Google Drive)',
    language: 'Language',
    security: 'Account & security',
    help: 'Help & support',
    logout: 'Log out',
    addMember: 'Add member',
    emailLabel: 'Email',
    roleLabel: 'Role',
    addToTeam: 'Add to team',
    languageTitle: 'Language',
    driveTitle: 'Google Drive',
    driveSoon: 'Google Drive integration is coming soon. Youll be able to connect your account and access your files directly from Even.',
    understood: 'Got it',
    secTitle: 'Account & security',
    changeEmail: 'Change email',
    changePassword: 'Change password',
    deleteAccount: 'Delete account',
    newEmail: 'New email',
    saveEmail: 'Save email',
    currentPassword: 'Current password',
    newPassword: 'New password',
    savePassword: 'Save password',
    saving: 'Saving…',
    back: '← Back',
    show: 'Show',
    hide: 'Hide',
    deleteConfirmTitle: 'Delete account?',
    deleteConfirmMsg: 'This action is irreversible. All your projects and data will be deleted.',
    cancel: 'Cancel',
    delete: 'Delete',
    errorTitle: 'Error',
    successTitle: 'Done',
    emailUpdated: 'Email updated successfully',
    passwordUpdated: 'Password updated',
    invalidEmail: 'Enter a valid email',
    fillBothPasswords: 'Fill in both passwords',
    passwordTooShort: 'New password must be at least 6 characters',
    emailPlaceholder: 'email@example.com',
    minCharsPlaceholder: 'Min. 6 characters',
    dotDotDot: '••••••••',
    upgradeToPlus: 'Upgrade to Plus',
    upgradeToUltra: 'Upgrade to Ultra',
    free: 'Free',
  },
};

// ─── API client ───────────────────────────────────────────────────────────────

// Importá / exportá `getToken` desde tu módulo de autenticación.
// Aquí se espera que devuelva el JWT almacenado (AsyncStorage, SecureStore, etc.).
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE = 'http://192.168.1.10:8000/api'; // ← ajustá según tu entorno

async function apiPatch<T>(path: string, body: object): Promise<T> {
const token = await AsyncStorage.getItem('auth_token');  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.detail ?? data?.message ?? 'Error desconocido');
  return data as T;
}

async function apiDelete(path: string): Promise<void> {
const token = await AsyncStorage.getItem('auth_token');  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.detail ?? data?.message ?? 'Error desconocido');
  }
}

// ─── Plan config ──────────────────────────────────────────────────────────────

const MEMBER_COLORS = ['#3B82F6','#8B5CF6','#EC4899','#10B981','#F59E0B','#EF4444','#06B6D4','#84CC16'];
let colorIdx = 0;
const nextColor = () => MEMBER_COLORS[colorIdx++ % MEMBER_COLORS.length];

interface Props {
  name: string;
  plan: 'Basic' | 'Plus' | 'Ultra';
  /** idioma inicial, normalmente viene del store/auth context */
  initialLanguage?: Lang;
  projects: Project[];
  teamMembers: TeamMember[];
  onUpdateTeamMembers: (members: TeamMember[]) => void;
  onLogout: () => void;
  /** Callback opcional para reaccionar al cambio de idioma en el resto de la app */
  onLanguageChange?: (lang: Lang) => void;
}

const getPlanConfig = (t: typeof TRANSLATIONS['es']) => ({
  Basic: {
    color: '#435170', label: 'Basic', price: t.free,
    tagline: t === TRANSLATIONS.es ? 'Ideal para comenzar' : 'Ideal to get started',
    features: t === TRANSLATIONS.es
      ? ['2 proyectos simultáneos', 'Revisión básica con cliente', 'Almacenamiento 2 GB']
      : ['2 simultaneous projects', 'Basic client review', '2 GB storage'],
    showUpgrade: true, upgradeLabel: t.upgradeToPlus,
    projects: '2', storage: '2 GB', automations: '0',
  },
  Plus: {
    color: colors.primary, label: 'Plus', price: '$9 / mes',
    tagline: t === TRANSLATIONS.es ? 'Para freelancers en crecimiento' : 'For growing freelancers',
    features: t === TRANSLATIONS.es
      ? ['5 proyectos simultáneos', 'Revisión con cliente avanzada', 'Automatización IA básica']
      : ['5 simultaneous projects', 'Advanced client review', 'Basic AI automation'],
    showUpgrade: true, upgradeLabel: t.upgradeToUltra,
    projects: '5', storage: '20 GB', automations: '10',
  },
  Ultra: {
    color: '#7C3AED', label: 'Ultra', price: '$29 / mes',
    tagline: t === TRANSLATIONS.es ? 'Potencia total para estudios' : 'Full power for studios',
    features: t === TRANSLATIONS.es
      ? ['Proyectos ilimitados', 'Automatización IA avanzada', 'Almacenamiento ilimitado']
      : ['Unlimited projects', 'Advanced AI automation', 'Unlimited storage'],
    showUpgrade: false, upgradeLabel: '',
    projects: '∞', storage: '∞', automations: '∞',
  },
} as const);

// ─── Component ────────────────────────────────────────────────────────────────

export function ProfileScreen({
  name, plan, initialLanguage = 'es', projects, teamMembers,
  onUpdateTeamMembers, onLogout, onLanguageChange,
}: Props) {
  // ── i18n ──
  const [lang, setLang] = useState<Lang>(initialLanguage);
  const t = TRANSLATIONS[lang];
  const cfg = getPlanConfig(t)[plan];

  const initial = name.trim().charAt(0).toUpperCase() || 'E';
  const email = `${name.toLowerCase().replace(/\s/g, '')}@even.app`;

  // ── Team modal ──
  const [addModal, setAddModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'owner' | 'member'>('member');

  // ── Notifications ──
  const [notifEnabled, setNotifEnabled] = useState(true);

  // ── Language modal ──
  const [langModal, setLangModal] = useState(false);

  // ── Drive modal ──
  const [driveModal, setDriveModal] = useState(false);

  // ── Security modal ──
  const [secModal, setSecModal] = useState(false);
  const [secView, setSecView] = useState<'menu' | 'email' | 'password'>('menu');
  const [secEmail, setSecEmail] = useState('');
  const [secCurrentPw, setSecCurrentPw] = useState('');
  const [secNewPw, setSecNewPw] = useState('');
  const [secLoading, setSecLoading] = useState(false);
  const [secShowCurrent, setSecShowCurrent] = useState(false);
  const [secShowNew, setSecShowNew] = useState(false);

  // ── Helpers ──
  const openModal = () => { setNewEmail(''); setNewRole('member'); setAddModal(true); };
  const closeModal = () => { Keyboard.dismiss(); setAddModal(false); };

  const openSec = (view: typeof secView) => {
    setSecView(view);
    setSecEmail('');
    setSecCurrentPw('');
    setSecNewPw('');
    setSecLoading(false);
    setSecModal(true);
  };
  const closeSec = () => { Keyboard.dismiss(); setSecModal(false); };

  // ── Update email (llama al servidor) ──
  const handleUpdateEmail = async () => {
    if (!secEmail.trim() || !secEmail.includes('@')) {
      Alert.alert(t.errorTitle, t.invalidEmail);
      return;
    }
    setSecLoading(true);
    try {
      await apiPatch('/auth/email', { new_email: secEmail.trim() });
      Alert.alert(t.successTitle, t.emailUpdated);
      closeSec();
    } catch (e: any) {
      Alert.alert(t.errorTitle, e?.message || t.errorTitle);
    } finally {
      setSecLoading(false);
    }
  };

  // ── Update password (llama al servidor) ──
  const handleUpdatePassword = async () => {
    if (!secCurrentPw || !secNewPw) {
      Alert.alert(t.errorTitle, t.fillBothPasswords);
      return;
    }
    if (secNewPw.length < 6) {
      Alert.alert(t.errorTitle, t.passwordTooShort);
      return;
    }
    setSecLoading(true);
    try {
      await apiPatch('/auth/password', {
        current_password: secCurrentPw,
        new_password: secNewPw,
      });
      Alert.alert(t.successTitle, t.passwordUpdated);
      closeSec();
    } catch (e: any) {
      Alert.alert(t.errorTitle, e?.message || t.errorTitle);
    } finally {
      setSecLoading(false);
    }
  };

  // ── Delete account ──
  const handleDeleteAccount = () => {
    Alert.alert(
      t.deleteConfirmTitle,
      t.deleteConfirmMsg,
      [
        { text: t.cancel, style: 'cancel' },
        {
          text: t.delete, style: 'destructive',
          onPress: async () => {
            setSecLoading(true);
            try {
              await apiDelete('/auth/account');
              onLogout(); // limpiar sesión localmente
            } catch (e: any) {
              Alert.alert(t.errorTitle, e?.message || t.errorTitle);
            } finally {
              setSecLoading(false);
            }
          },
        },
      ]
    );
  };

  // ── Change language (persiste en servidor + actualiza UI) ──
  const handleLangChange = async (newLang: Lang) => {
    setLang(newLang);
    setLangModal(false);
    onLanguageChange?.(newLang);
    // Fire-and-forget: si falla no bloqueamos al usuario
    apiPatch('/auth/language', { language: newLang }).catch(() => null);
  };

  // ── Team helpers ──
  const deriveName = (email: string) => {
    const local = email.split('@')[0].replace(/[._-]/g, ' ');
    return local.charAt(0).toUpperCase() + local.slice(1);
  };

  const addMember = () => {
    if (!newEmail.trim()) return;
    const m: TeamMember = {
      id: `${Date.now()}`,
      name: deriveName(newEmail.trim()),
      email: newEmail.trim(),
      role: newRole,
      color: nextColor(),
    };
    onUpdateTeamMembers([...teamMembers, m]);
    closeModal();
  };

  const removeMember = (id: string) => {
    onUpdateTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <View style={S.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={S.appBar}>
          <Text style={S.appBarTitle}>{t.profile}</Text>
        </View>

        <ScrollView contentContainerStyle={S.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={S.profileHeader}>
            <View style={S.avatarWrap}>
              <View style={S.avatar}>
                <Text style={S.avatarText}>{initial}</Text>
              </View>
              <View style={S.avatarEditBadge}>
                <PencilSimple size={12} color="#fff" weight="bold" />
              </View>
            </View>
            <Text style={S.profileName}>{name}</Text>
            <Text style={S.profileEmail}>{email}</Text>
          </View>

          {/* Plan card */}
          <View style={[S.planCard, { borderColor: cfg.color }]}>
            <View style={S.planCardInner}>
              <View style={S.planHeader}>
                <View style={[S.planBadge, { backgroundColor: cfg.color }]}>
                  <Text style={S.planBadgeText}>{cfg.label}</Text>
                </View>
                <Text style={S.planPrice}>{cfg.price}</Text>
              </View>
              <Text style={S.planTagline}>{cfg.tagline}</Text>
              <View style={S.featureList}>
                {cfg.features.map(f => (
                  <View key={f} style={S.featureRow}>
                    <Check size={14} color={cfg.color} weight="bold" />
                    <Text style={S.featureText}>{f}</Text>
                  </View>
                ))}
              </View>
              {cfg.showUpgrade && (
                <AnimatedPressable style={({ pressed }) => [S.upgradeBtn, { backgroundColor: cfg.color }, pressed && { opacity: 0.85 }]}>
                  <Text style={S.upgradeBtnText}>{cfg.upgradeLabel}</Text>
                </AnimatedPressable>
              )}
            </View>
          </View>

          {/* Usage */}
          <View style={S.usageCard}>
            <Text style={S.usageCardTitle}>{t.usageThisMonth}</Text>
            <View style={S.usageRow}>
              <View style={S.usageStat}>
                <Text style={S.usageValue}>{projects.length}<Text style={S.usageMax}>/{cfg.projects}</Text></Text>
                <Text style={S.usageLabel}>{t.projects}</Text>
              </View>
              <View style={S.usageDivider} />
              <View style={S.usageStat}>
                <Text style={S.usageValue}>8.4 GB<Text style={S.usageMax}>/{cfg.storage}</Text></Text>
                <Text style={S.usageLabel}>{t.storage}</Text>
              </View>
              <View style={S.usageDivider} />
              <View style={S.usageStat}>
                <Text style={S.usageValue}>7<Text style={S.usageMax}>/{cfg.automations}</Text></Text>
                <Text style={S.usageLabel}>{t.automations}</Text>
              </View>
            </View>
          </View>

          {/* Team */}
          <View style={S.teamCard}>
            <View style={S.teamCardHeader}>
              <UsersFour size={18} color={colors.primaryLight} weight="fill" />
              <Text style={S.teamCardTitle}>{t.myTeam}</Text>
              <AnimatedPressable onPress={openModal} style={S.teamAddBtn}>
                <Plus size={14} color={colors.primaryLight} weight="bold" />
                <Text style={S.teamAddBtnText}>{t.add}</Text>
              </AnimatedPressable>
            </View>
            {teamMembers.length === 0 ? (
              <Text style={S.teamEmpty}>{t.noMembers}</Text>
            ) : (
              <View style={S.teamList}>
                {teamMembers.map(m => (
                  <View key={m.id} style={S.teamMemberRow}>
                    <View style={[S.teamAvatar, { backgroundColor: m.color }]}>
                      <Text style={S.teamAvatarText}>{m.name.charAt(0).toUpperCase()}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={S.teamMemberName}>{m.name}</Text>
                      <Text style={S.teamMemberRole}>
                        {m.role === 'owner' ? t.owner : t.member}{m.email ? ` · ${m.email}` : ''}
                      </Text>
                    </View>
                    <AnimatedPressable onPress={() => removeMember(m.id)} hitSlop={10}>
                      <Trash size={16} color={colors.danger} weight="regular" />
                    </AnimatedPressable>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Settings */}
          <View style={S.settingsCard}>
            <View style={S.settingRow}>
              <Bell size={20} color={colors.textOnDarkMuted} weight="regular" />
              <Text style={S.settingLabel}>{t.notifications}</Text>
              <Switch
                value={notifEnabled}
                onValueChange={setNotifEnabled}
                trackColor={{ false: colors.surfaceCardHi, true: colors.primary }}
                thumbColor="#fff"
              />
            </View>
            <View style={S.settingDivider} />

            <AnimatedPressable onPress={() => setDriveModal(true)} style={({ pressed }) => [S.settingRow, pressed && { opacity: 0.8 }]}>
              <LinkIcon size={20} color={colors.textOnDarkMuted} weight="regular" />
              <Text style={S.settingLabel}>{t.connections}</Text>
              <CaretRight size={14} color={colors.textSecondary} weight="bold" />
            </AnimatedPressable>
            <View style={S.settingDivider} />

            <AnimatedPressable onPress={() => setLangModal(true)} style={({ pressed }) => [S.settingRow, pressed && { opacity: 0.8 }]}>
              <Globe size={20} color={colors.textOnDarkMuted} weight="regular" />
              <Text style={S.settingLabel}>{t.language}</Text>
              <View style={S.settingValueRow}>
                <Text style={S.settingValue}>{lang === 'es' ? 'Español' : 'English'}</Text>
                <CaretRight size={14} color={colors.textSecondary} weight="bold" />
              </View>
            </AnimatedPressable>
            <View style={S.settingDivider} />

            <AnimatedPressable onPress={() => openSec('menu')} style={({ pressed }) => [S.settingRow, pressed && { opacity: 0.8 }]}>
              <Lock size={20} color={colors.textOnDarkMuted} weight="regular" />
              <Text style={S.settingLabel}>{t.security}</Text>
              <CaretRight size={14} color={colors.textSecondary} weight="bold" />
            </AnimatedPressable>
            <View style={S.settingDivider} />

            <AnimatedPressable
              onPress={() => Linking.openURL('https://wa.me/573166798603?text=Hola%20Even%2C%20necesito%20ayuda')}
              style={({ pressed }) => [S.settingRow, pressed && { opacity: 0.8 }]}
            >
              <Question size={20} color={colors.textOnDarkMuted} weight="regular" />
              <Text style={S.settingLabel}>{t.help}</Text>
              <CaretRight size={14} color={colors.textSecondary} weight="bold" />
            </AnimatedPressable>
          </View>

          <AnimatedPressable onPress={onLogout} style={({ pressed }) => [S.logoutBtn, pressed && { opacity: 0.8 }]}>
            <Text style={S.logoutText}>{t.logout}</Text>
          </AnimatedPressable>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>

      {/* ── Language modal ── */}
      <Modal transparent visible={langModal} animationType="slide" onRequestClose={() => setLangModal(false)}>
        <Pressable style={S.modalKAV} onPress={() => setLangModal(false)}>
          <Pressable style={S.modalSheet} onPress={e => e.stopPropagation()}>
            <View style={S.modalHandle} />
            <Text style={S.modalTitle}>{t.languageTitle}</Text>
            <View style={{ gap: 10, marginTop: 20 }}>
              {(['es', 'en'] as const).map(l => (
                <Pressable
                  key={l}
                  onPress={() => handleLangChange(l)}
                  style={[S.langOption, lang === l && S.langOptionActive]}
                >
                  <Text style={[S.langOptionText, lang === l && S.langOptionTextActive]}>
                    {l === 'es' ? '🇨🇴  Español' : '🇺🇸  English'}
                  </Text>
                  {lang === l && <Check size={16} color={colors.primaryLight} weight="bold" />}
                </Pressable>
              ))}
            </View>
            <View style={S.modalSafeBottom} />
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── Google Drive modal ── */}
      <Modal transparent visible={driveModal} animationType="slide" onRequestClose={() => setDriveModal(false)}>
        <Pressable style={S.modalKAV} onPress={() => setDriveModal(false)}>
          <Pressable style={S.modalSheet} onPress={e => e.stopPropagation()}>
            <View style={S.modalHandle} />
            <View style={{ alignItems: 'center', gap: 16, paddingVertical: 12 }}>
              <View style={S.comingSoonIcon}>
                <LinkIcon size={32} color={colors.primaryLight} weight="regular" />
              </View>
              <Text style={S.modalTitle}>{t.driveTitle}</Text>
              <Text style={S.comingSoonText}>{t.driveSoon}</Text>
              <AnimatedPressable
                onPress={() => setDriveModal(false)}
                style={({ pressed }) => [S.modalConfirmBtn, pressed && { opacity: 0.85 }]}
              >
                <Text style={S.modalConfirmText}>{t.understood}</Text>
              </AnimatedPressable>
            </View>
            <View style={S.modalSafeBottom} />
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── Security modal ── */}
      <Modal transparent visible={secModal} animationType="slide" onRequestClose={closeSec}>
        <KeyboardAvoidingView
          style={S.modalKAV}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeSec} />
          <View style={S.modalSheet}>
            <View style={S.modalHandle} />

            {/* Menu */}
            {secView === 'menu' && (
              <>
                <Text style={S.modalTitle}>{t.secTitle}</Text>
                <View style={{ gap: 10, marginTop: 20 }}>
                  <Pressable onPress={() => setSecView('email')} style={S.secMenuItem}>
                    <Text style={S.secMenuItemText}>{t.changeEmail}</Text>
                    <CaretRight size={14} color={colors.textSecondary} weight="bold" />
                  </Pressable>
                  <Pressable onPress={() => setSecView('password')} style={S.secMenuItem}>
                    <Text style={S.secMenuItemText}>{t.changePassword}</Text>
                    <CaretRight size={14} color={colors.textSecondary} weight="bold" />
                  </Pressable>
                  <View style={S.settingDivider} />
                  <Pressable onPress={handleDeleteAccount} style={S.secMenuItemDanger}>
                    <Text style={S.secMenuItemDangerText}>{t.deleteAccount}</Text>
                  </Pressable>
                </View>
              </>
            )}

            {/* Change email */}
            {secView === 'email' && (
              <>
                <Pressable onPress={() => setSecView('menu')} style={{ marginBottom: 8 }}>
                  <Text style={S.secBack}>{t.back}</Text>
                </Pressable>
                <Text style={S.modalTitle}>{t.changeEmail}</Text>
                <View style={S.modalFields}>
                  <View style={S.modalField}>
                    <Text style={S.modalLabel}>{t.newEmail}</Text>
                    <TextInput
                      value={secEmail}
                      onChangeText={setSecEmail}
                      placeholder={t.emailPlaceholder}
                      placeholderTextColor={colors.textSecondary}
                      style={S.modalInput}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoFocus
                    />
                  </View>
                </View>
                <AnimatedPressable
                  onPress={handleUpdateEmail}
                  disabled={secLoading}
                  style={({ pressed }) => [S.modalConfirmBtn, pressed && { opacity: 0.85 }, secLoading && { opacity: 0.6 }]}
                >
                  <Text style={S.modalConfirmText}>{secLoading ? t.saving : t.saveEmail}</Text>
                </AnimatedPressable>
              </>
            )}

            {/* Change password */}
            {secView === 'password' && (
              <>
                <Pressable onPress={() => setSecView('menu')} style={{ marginBottom: 8 }}>
                  <Text style={S.secBack}>{t.back}</Text>
                </Pressable>
                <Text style={S.modalTitle}>{t.changePassword}</Text>
                <View style={S.modalFields}>
                  <View style={S.modalField}>
                    <Text style={S.modalLabel}>{t.currentPassword}</Text>
                    <View style={S.pwRow}>
                      <TextInput
                        value={secCurrentPw}
                        onChangeText={setSecCurrentPw}
                        placeholder={t.dotDotDot}
                        placeholderTextColor={colors.textSecondary}
                        style={[S.modalInput, { flex: 1 }]}
                        secureTextEntry={!secShowCurrent}
                        autoFocus
                      />
                      <Pressable onPress={() => setSecShowCurrent(v => !v)} style={S.pwEye} hitSlop={8}>
                        <Text style={S.pwEyeText}>{secShowCurrent ? t.hide : t.show}</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={S.modalField}>
                    <Text style={S.modalLabel}>{t.newPassword}</Text>
                    <View style={S.pwRow}>
                      <TextInput
                        value={secNewPw}
                        onChangeText={setSecNewPw}
                        placeholder={t.minCharsPlaceholder}
                        placeholderTextColor={colors.textSecondary}
                        style={[S.modalInput, { flex: 1 }]}
                        secureTextEntry={!secShowNew}
                      />
                      <Pressable onPress={() => setSecShowNew(v => !v)} style={S.pwEye} hitSlop={8}>
                        <Text style={S.pwEyeText}>{secShowNew ? t.hide : t.show}</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                <AnimatedPressable
                  onPress={handleUpdatePassword}
                  disabled={secLoading}
                  style={({ pressed }) => [S.modalConfirmBtn, pressed && { opacity: 0.85 }, secLoading && { opacity: 0.6 }]}
                >
                  <Text style={S.modalConfirmText}>{secLoading ? t.saving : t.savePassword}</Text>
                </AnimatedPressable>
              </>
            )}

            <View style={S.modalSafeBottom} />
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ── Add member modal ── */}
      <Modal transparent visible={addModal} animationType="slide" onRequestClose={closeModal}>
        <KeyboardAvoidingView
          style={S.modalKAV}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
          <View style={S.modalSheet}>
            <View style={S.modalHandle} />
            <Text style={S.modalTitle}>{t.addMember}</Text>
            <View style={S.modalFields}>
              <View style={S.modalField}>
                <Text style={S.modalLabel}>{t.emailLabel}</Text>
                <TextInput
                  value={newEmail}
                  onChangeText={setNewEmail}
                  placeholder={t.emailPlaceholder}
                  placeholderTextColor={colors.textSecondary}
                  style={S.modalInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
              <View style={S.modalField}>
                <Text style={S.modalLabel}>{t.roleLabel}</Text>
                <View style={S.roleRow}>
                  {(['member', 'owner'] as const).map(r => (
                    <Pressable
                      key={r}
                      onPress={() => setNewRole(r)}
                      style={[S.roleChip, newRole === r && S.roleChipActive]}
                    >
                      <Text style={[S.roleChipText, newRole === r && S.roleChipTextActive]}>
                        {r === 'owner' ? t.owner : t.member}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
            <AnimatedPressable
              onPress={addMember}
              style={({ pressed }) => [S.modalConfirmBtn, pressed && { opacity: 0.85 }, !newEmail.trim() && { opacity: 0.4 }]}
            >
              <Text style={S.modalConfirmText}>{t.addToTeam}</Text>
            </AnimatedPressable>
            <View style={S.modalSafeBottom} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

// ─── Styles (idénticos al original) ──────────────────────────────────────────

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  appBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingTop: 12, paddingBottom: 24 },
  appBarTitle: { flex: 1, textAlign: 'center', fontFamily: fonts.semibold, fontSize: 16, color: colors.textOnDark, letterSpacing: -0.4 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: 8, gap: 16 },
  profileHeader: { alignItems: 'center', gap: 8, paddingVertical: 8 },
  avatarWrap: { position: 'relative', marginBottom: 4 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primaryBg, borderWidth: 2, borderColor: colors.strokeBlue, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.extrabold, fontSize: 32, color: colors.primaryLight },
  avatarEditBadge: { position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.bg },
  profileName: { fontFamily: fonts.bold, fontSize: 22, color: colors.textOnDark, letterSpacing: -0.8 },
  profileEmail: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary, letterSpacing: -0.2 },
  planCard: { borderWidth: 1.5, borderRadius: 22, overflow: 'hidden' },
  planCardInner: { backgroundColor: colors.surfaceCard, padding: 20, gap: 14 },
  planHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  planBadge: { borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 5 },
  planBadgeText: { fontFamily: fonts.bold, fontSize: 14, color: '#fff', letterSpacing: 0.3 },
  planPrice: { fontFamily: fonts.extrabold, fontSize: 20, color: colors.textOnDark, letterSpacing: -0.8 },
  planTagline: { fontFamily: fonts.regular, fontSize: 13, color: colors.textOnDarkMuted, letterSpacing: -0.2, marginTop: -4 },
  featureList: { gap: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featureText: { fontFamily: fonts.regular, fontSize: 14, color: colors.textOnDark, letterSpacing: -0.2, flex: 1 },
  upgradeBtn: { borderRadius: radius.pill, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  upgradeBtnText: { fontFamily: fonts.semibold, fontSize: 15, color: '#fff', letterSpacing: 0.2 },
  usageCard: { backgroundColor: colors.surfaceCard, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: 20, padding: 18, gap: 16 },
  usageCardTitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.textOnDark, letterSpacing: -0.4 },
  usageRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  usageStat: { alignItems: 'center', gap: 4 },
  usageValue: { fontFamily: fonts.extrabold, fontSize: 22, color: colors.textOnDark, letterSpacing: -0.8 },
  usageMax: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary },
  usageLabel: { fontFamily: fonts.regular, fontSize: 11, color: colors.textSecondary, textAlign: 'center', letterSpacing: -0.2 },
  usageDivider: { width: 0.4, height: 40, backgroundColor: colors.stroke },
  settingsCard: { backgroundColor: colors.surfaceCard, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: 20, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 18, paddingVertical: 16 },
  settingLabel: { fontFamily: fonts.medium, fontSize: 15, color: colors.textOnDark, flex: 1, letterSpacing: -0.3 },
  settingDivider: { height: 0.4, backgroundColor: colors.stroke, marginHorizontal: 18 },
  logoutBtn: { alignItems: 'center', paddingVertical: 16, backgroundColor: 'rgba(239, 68, 68, 0.08)', borderWidth: 0.4, borderColor: 'rgba(239, 68, 68, 0.35)', borderRadius: 16 },
  logoutText: { fontFamily: fonts.semibold, fontSize: 16, color: colors.danger, letterSpacing: -0.2 },
  teamCard: { backgroundColor: colors.surfaceCard, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: 20, padding: 18, gap: 14 },
  teamCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  teamCardTitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.textOnDark, letterSpacing: -0.4, flex: 1 },
  teamAddBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.primaryBg, borderWidth: 0.5, borderColor: colors.strokeBlue, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6 },
  teamAddBtnText: { fontFamily: fonts.semibold, fontSize: 13, color: colors.primaryLight },
  teamEmpty: { fontFamily: fonts.regular, fontSize: 13, color: colors.textSecondary, lineHeight: 20, letterSpacing: -0.2 },
  teamList: { gap: 12 },
  teamMemberRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  teamAvatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  teamAvatarText: { fontFamily: fonts.bold, fontSize: 15, color: '#fff' },
  teamMemberName: { fontFamily: fonts.semibold, fontSize: 14, color: colors.textOnDark, letterSpacing: -0.3 },
  teamMemberRole: { fontFamily: fonts.regular, fontSize: 12, color: colors.textSecondary, marginTop: 1 },
  modalKAV: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: colors.bgSoft, borderTopLeftRadius: 32, borderTopRightRadius: 32, borderWidth: 0.4, borderColor: colors.stroke, paddingHorizontal: 24, paddingTop: 12 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: colors.stroke, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontFamily: fonts.bold, fontSize: 22, color: colors.textOnDark, letterSpacing: -0.7, marginBottom: 4 },
  modalFields: { gap: 16, marginTop: 20 },
  modalField: { gap: 8 },
  modalLabel: { fontFamily: fonts.semibold, fontSize: 12, color: colors.textSecondary, letterSpacing: 0.2, textTransform: 'uppercase' },
  modalInput: { fontFamily: fonts.regular, fontSize: 15, color: colors.textOnDark, backgroundColor: colors.surfaceCard, borderWidth: 0.5, borderColor: colors.stroke, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, letterSpacing: -0.2 },
  roleRow: { flexDirection: 'row', gap: 10 },
  roleChip: { flex: 1, alignItems: 'center', paddingVertical: 14, borderRadius: 14, backgroundColor: colors.surfaceCard, borderWidth: 0.5, borderColor: colors.stroke },
  roleChipActive: { backgroundColor: colors.primaryBg, borderColor: colors.primary, borderWidth: 1.5 },
  roleChipText: { fontFamily: fonts.medium, fontSize: 14, color: colors.textSecondary, letterSpacing: -0.2 },
  roleChipTextActive: { color: colors.primaryLight, fontFamily: fonts.semibold },
  modalConfirmBtn: { backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 17, alignItems: 'center', marginTop: 24, shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 6 },
  modalConfirmText: { fontFamily: fonts.semibold, fontSize: 16, color: '#fff', letterSpacing: 0.2 },
  modalSafeBottom: { height: 32 },
  langOption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceCard, borderWidth: 0.5, borderColor: colors.stroke, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 16 },
  langOptionActive: { backgroundColor: colors.primaryBg, borderColor: colors.primary, borderWidth: 1.5 },
  langOptionText: { fontFamily: fonts.medium, fontSize: 16, color: colors.textOnDark, letterSpacing: -0.3 },
  langOptionTextActive: { color: colors.primaryLight, fontFamily: fonts.semibold },
  comingSoonIcon: { width: 72, height: 72, borderRadius: 20, backgroundColor: colors.primaryBg, borderWidth: 0.5, borderColor: colors.strokeBlue, alignItems: 'center', justifyContent: 'center' },
  comingSoonText: { fontFamily: fonts.regular, fontSize: 14, color: colors.textOnDarkMuted, textAlign: 'center', lineHeight: 21, letterSpacing: -0.2, paddingHorizontal: 8 },
  secMenuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surfaceCard, borderWidth: 0.5, borderColor: colors.stroke, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 16 },
  secMenuItemText: { fontFamily: fonts.medium, fontSize: 15, color: colors.textOnDark, letterSpacing: -0.3 },
  secMenuItemDanger: { alignItems: 'center', paddingVertical: 14, backgroundColor: 'rgba(239,68,68,0.08)', borderWidth: 0.4, borderColor: 'rgba(239,68,68,0.3)', borderRadius: 14 },
  secMenuItemDangerText: { fontFamily: fonts.semibold, fontSize: 15, color: colors.danger },
  secBack: { fontFamily: fonts.medium, fontSize: 14, color: colors.primaryLight, letterSpacing: -0.2, marginBottom: 4 },
  pwRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pwEye: { paddingHorizontal: 12, paddingVertical: 14 },
  pwEyeText: { fontFamily: fonts.medium, fontSize: 13, color: colors.primaryLight },
  settingValueRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  settingValue: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary, letterSpacing: -0.2 },
});