import { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';import { SafeAreaView } from 'react-native-safe-area-context';
import { EnvelopeSimple, Eye, EyeSlash, GoogleLogo, Lock, At } from 'phosphor-react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { AnimatedTextInput } from '../components/AnimatedTextInput';
import { authApi } from '../shared/api';
import { useAuthStore } from '../shared/auth.store';

interface Props {
  onLogin: (email: string, password: string) => void;
  onGoSignUp: () => void;
}

export function LoginScreen({ onLogin, onGoSignUp }: Props) {
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Completa correo y contraseña');
      return;
    }
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      await setAuth(data.access_token, data.user_id, data.name);
      onLogin(email, password);
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };
  // ... el resto del JSX queda igual
return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={S.root}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={S.scroll}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={S.headerBlock}>
                <Text style={S.badge}>BIENVENIDO DE VUELTA</Text>
                <Text style={S.h1}>Inicia sesión en tu cuenta.</Text>
                <Text style={S.body}>Accede a tus proyectos y continúa donde lo dejaste.</Text>
              </View>

              <View style={S.fields}>
                <View style={S.inputWrap}>
                  <EnvelopeSimple size={18} color={colors.textSecondary} weight="regular" />
                  <AnimatedTextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor={colors.textSecondary}
                    style={S.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    returnKeyType="next"
                  />
                </View>

                <View style={S.inputWrap}>
                  <Lock size={18} color={colors.textSecondary} weight="regular" />
                  <AnimatedTextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Contraseña"
                    placeholderTextColor={colors.textSecondary}
                    style={S.input}
                    secureTextEntry={!showPw}
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                  />
                  <AnimatedPressable onPress={() => setShowPw(v => !v)} hitSlop={8}>
                    {showPw
                      ? <EyeSlash size={18} color={colors.textSecondary} weight="regular" />
                      : <Eye size={18} color={colors.textSecondary} weight="regular" />}
                  </AnimatedPressable>
                </View>

                <AnimatedPressable hitSlop={8} style={{ alignSelf: 'flex-end' }}>
                  <Text style={S.forgotText}>¿Olvidaste tu contraseña?</Text>
                </AnimatedPressable>
              </View>

              <View style={S.bottomArea}>
                <AnimatedPressable
                  onPress={handleLogin}
                  disabled={loading}
                  style={({ pressed }) => [S.btnPrimary, pressed && S.pressed, loading && { opacity: 0.6 }]}
                >
                  <Text style={S.btnPrimaryText}>
                    {loading ? 'Entrando...' : 'Iniciar sesión'}
                  </Text>
                </AnimatedPressable>

                <AnimatedPressable onPress={onGoSignUp} hitSlop={12}>
                  <Text style={S.switchText}>
                    ¿No tienes cuenta? <Text style={S.switchLink}>Crear cuenta</Text>
                  </Text>
                </AnimatedPressable>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const S = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
 scroll: { paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: 40, gap: 14 },
fields: { gap: 14 },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    gap: 14,
  },

  headerBlock: {
    gap: 10,
    marginBottom: 8,
  },

  badge: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.primaryLight,
    letterSpacing: 2,
  },

  h1: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.textOnDark,
    letterSpacing: -1,
    lineHeight: 33,
  },

  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textOnDarkMuted,
    lineHeight: 22,
    letterSpacing: -0.3,
  },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textOnDark,
    letterSpacing: -0.2,
    padding: 0,
  },

  forgotText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.primaryLight,
    letterSpacing: -0.2,
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },

  dividerLine: {
    flex: 1,
    height: 0.4,
    backgroundColor: colors.stroke,
  },

  dividerText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },

  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: radius.pill,
    paddingVertical: 16,
  },

  socialBtnText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.textOnDark,
    letterSpacing: -0.2,
  },

  bottomArea: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: 14,
    alignItems: 'center',
  },

  btnPrimary: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 18,
    alignItems: 'center',
  },

  btnPrimaryText: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: '#fff',
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  switchText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },

  switchLink: {
    fontFamily: fonts.semibold,
    color: colors.primaryLight,
  },
});