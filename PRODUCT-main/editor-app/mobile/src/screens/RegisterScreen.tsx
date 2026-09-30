import { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EnvelopeSimple, Eye, EyeSlash, Lock, User } from 'phosphor-react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { AnimatedTextInput } from '../components/AnimatedTextInput';
import { authApi } from '../shared/api';
import { useAuthStore } from '../shared/auth.store';

interface Props {
  onRegister: () => void;
  onGoLogin: () => void;
}

export function RegisterScreen({ onRegister, onGoLogin }: Props) {
  const { setAuth } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.register(name, email, password);
      await setAuth(res.access_token, res.user_id, res.name);
      Alert.alert('¡Cuenta creada!', `Bienvenido, ${res.name} 🎉`, [
        { text: 'Continuar', onPress: onRegister }
      ]);
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={S.root}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={S.scroll}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={S.headerBlock}>
                <Text style={S.badge}>NUEVA CUENTA</Text>
                <Text style={S.h1}>Crea tu cuenta.</Text>
                <Text style={S.body}>Empieza a organizar tus proyectos creativos.</Text>
              </View>

              <View style={S.fields}>
                <View style={S.inputWrap}>
                  <User size={18} color={colors.textSecondary} weight="regular" />
                  <AnimatedTextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Tu nombre"
                    placeholderTextColor={colors.textSecondary}
                    style={S.input}
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                </View>

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
                    returnKeyType="next"
                  />
                </View>

                <View style={S.inputWrap}>
                  <Lock size={18} color={colors.textSecondary} weight="regular" />
                  <AnimatedTextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Contraseña (mín. 6 caracteres)"
                    placeholderTextColor={colors.textSecondary}
                    style={S.input}
                    secureTextEntry={!showPw}
                    returnKeyType="done"
                    onSubmitEditing={handleRegister}
                  />
                  <AnimatedPressable onPress={() => setShowPw(v => !v)} hitSlop={8}>
                    {showPw
                      ? <EyeSlash size={18} color={colors.textSecondary} weight="regular" />
                      : <Eye size={18} color={colors.textSecondary} weight="regular" />}
                  </AnimatedPressable>
                </View>
              </View>

              <View style={S.bottomArea}>
                <AnimatedPressable
                  onPress={handleRegister}
                  disabled={loading}
                  style={({ pressed }) => [S.btnPrimary, pressed && S.pressed, loading && { opacity: 0.6 }]}
                >
                  <Text style={S.btnPrimaryText}>
                    {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                  </Text>
                </AnimatedPressable>

                <AnimatedPressable onPress={onGoLogin} hitSlop={12}>
                  <Text style={S.switchText}>
                    ¿Ya tienes cuenta? <Text style={S.switchLink}>Iniciar sesión</Text>
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
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: 40, gap: 14 },
  headerBlock: { gap: 10, marginBottom: 8 },
  badge: { fontFamily: fonts.bold, fontSize: 12, color: colors.primaryLight, letterSpacing: 2 },
  h1: { fontFamily: fonts.bold, fontSize: 28, color: colors.textOnDark, letterSpacing: -1, lineHeight: 33 },
  body: { fontFamily: fonts.regular, fontSize: 15, color: colors.textOnDarkMuted, lineHeight: 22, letterSpacing: -0.3 },
  fields: { gap: 14 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surfaceCard, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 },
  input: { flex: 1, fontFamily: fonts.regular, fontSize: 15, color: colors.textOnDark, letterSpacing: -0.2, padding: 0 },
  bottomArea: { gap: 14, alignItems: 'center', marginTop: 10 },
  btnPrimary: { width: '100%', backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 18, alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 6 },
  btnPrimaryText: { fontFamily: fonts.semibold, fontSize: 17, color: '#fff', letterSpacing: 0.2 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  switchText: { fontFamily: fonts.regular, fontSize: 14, color: colors.textSecondary },
  switchLink: { fontFamily: fonts.semibold, color: colors.primaryLight },
});