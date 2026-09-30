import { useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { colors, fonts, radius, spacing } from '../theme';

interface Props {
  onGoogle: () => void;
  onEmail: () => void;
}

function GoogleG() {
  return (
    <View style={S.gCircle}>
      <Text style={S.gText}>G</Text>
    </View>
  );
}

export function WelcomeScreen({ onGoogle, onEmail }: Props) {  const [phase, setPhase] = useState<'welcome' | 'auth'>('welcome');

  const welcomeOpacity = useRef(new Animated.Value(1)).current;
  const authOpacity   = useRef(new Animated.Value(0)).current;
  const authSlide     = useRef(new Animated.Value(20)).current;

  const handleEmpezar = () => {
    Animated.timing(welcomeOpacity, {
      toValue: 0,
      duration: 180,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setPhase('auth');
      Animated.parallel([
        Animated.timing(authOpacity, {
          toValue: 1, duration: 260,
          easing: Easing.out(Easing.ease), useNativeDriver: true,
        }),
        Animated.timing(authSlide, {
          toValue: 0, duration: 260,
          easing: Easing.out(Easing.quad), useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <SafeAreaView style={S.safe}>
      <View style={S.container}>

        {/* ── Logo + copy (always visible) ── */}
        <View style={S.logoWrap}>
          <Image
            source={require('../../assets/branding/logo.png')}
            style={S.logo}
            resizeMode="contain"
          />

          {phase === 'welcome' ? (
            <Animated.View style={[S.sloganBlock, { opacity: welcomeOpacity }]}>
              <Text style={S.headline}>Diseña sin{'\n'}complicaciones.</Text>
              <Text style={S.tagline}>Gestión de proyectos creativos{'\n'}en piloto automático.</Text>
            </Animated.View>
          ) : (
            <Animated.View style={[S.authHeadBlock, { opacity: authOpacity, transform: [{ translateY: authSlide }] }]}>
              <Text style={S.authTitle}>Tu espacio creativo{'\n'}te espera</Text>
              <Text style={S.authSubtitle}>
                Crea tu cuenta en segundos y empieza a organizar tus proyectos como nunca antes.
              </Text>
            </Animated.View>
          )}
        </View>

        {/* ── Bottom CTA area ── */}
        <View style={S.bottom}>
          {phase === 'welcome' ? (
            <Animated.View style={[S.fullWidth, { opacity: welcomeOpacity }]}>
              <AnimatedPressable
                onPress={handleEmpezar}
                style={({ pressed }) => [S.btnEmpezar, pressed && S.pressed]}
                accessibilityRole="button"
              >
                <Text style={S.btnEmpezarText}>Comenzar</Text>
              </AnimatedPressable>
            </Animated.View>
          ) : (
            <Animated.View style={[S.fullWidth, S.authButtons, { opacity: authOpacity, transform: [{ translateY: authSlide }] }]}>
              <AnimatedPressable
                onPress={onGoogle}
                style={({ pressed }) => [S.btnSecondary, pressed && S.pressed]}
              >
                <GoogleG />
                <Text style={S.btnSecondaryText}>Continuar con Google</Text>
              </AnimatedPressable>
              <AnimatedPressable
  onPress={onEmail}
  style={({ pressed }) => [S.btnSecondary, pressed && S.pressed]}
>
  <Text style={S.btnSecondaryText}>Continuar con email</Text>
</AnimatedPressable>

              <Text style={S.terms}>
                Al continuar, aceptas nuestros{' '}
                <Text style={S.termsLink}>Términos de servicio</Text>
                {' '}y{' '}
                <Text style={S.termsLink}>Política de privacidad</Text>
              </Text>
            </Animated.View>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    justifyContent: 'space-between',
  },

  logoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  logo: { width: 140, height: 140, marginBottom: 4 },

  // ── Welcome phase ──
  sloganBlock: { alignItems: 'center', gap: 14 },
  headline: {
    fontFamily: fonts.extrabold,
    fontSize: 32,
    color: colors.textOnDark,
    textAlign: 'center',
    letterSpacing: -1.2,
    lineHeight: 38,
  },
  tagline: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textOnDarkMuted,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.2,
  },

  // ── Auth phase ──
  authHeadBlock: { alignItems: 'center', gap: 12, paddingHorizontal: 4 },
  authTitle: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.textOnDark,
    letterSpacing: -1,
    textAlign: 'center',
    lineHeight: 34,
  },
  authSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textOnDarkMuted,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.3,
  },

  bottom: { gap: 10 },
  fullWidth: { width: '100%' },
  authButtons: { gap: 12 },

  btnEmpezar: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: 24, paddingVertical: 18,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  btnEmpezarText: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: '#fff',
    letterSpacing: 0.3,
  },

  btnSecondary: {
    backgroundColor: colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: radius.pill,
    paddingHorizontal: 24, paddingVertical: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  btnSecondaryText: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: colors.textOnDark,
    letterSpacing: 0.2,
  },

  // ── Terms ──
  terms: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textOnDarkFaint,
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: -0.1,
    marginTop: 4,
  },
  termsLink: {
    color: colors.primaryLight,
  },

  gCircle: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  gText: { fontFamily: fonts.bold, fontSize: 13, color: '#4285F4' },

  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
