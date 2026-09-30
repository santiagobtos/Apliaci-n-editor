import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { colors, fonts, radius } from '../theme';

interface Props {
  onPhone: () => void;
  onGoogle: () => void;
}

function GoogleG() {
  return (
    <View style={S.gCircle}>
      <Text style={S.gText}>G</Text>
    </View>
  );
}

export function GetStarterScreen({ onPhone, onGoogle }: Props) {
  return (
    <View style={S.root}>
      {/* White area — logo centered */}
      <SafeAreaView edges={['top']} style={S.logoArea}>
        <Image
          source={require('../../assets/branding/logo.png')}
          style={S.logo}
          resizeMode="contain"
          tintColor={colors.primary}
        />
      </SafeAreaView>

      {/* Ink bottom sheet */}
      <View style={S.sheet}>
        <View style={S.sheetContent}>
          <View style={S.textBlock}>
            <Text style={S.title}>¡Empecemos!</Text>
            <Text style={S.subtitle}>
              Inicia sesión, automatiza tus tareas y olvídate de las complicaciones.
            </Text>
          </View>

          <View style={S.buttons}>
            <AnimatedPressable
              onPress={onPhone}
              style={({ pressed }) => [S.btnPrimary, pressed && S.pressed]}
            >
              <Text style={S.btnPrimaryText}>Continuar con teléfono</Text>
            </AnimatedPressable>

            <AnimatedPressable
              onPress={onGoogle}
              style={({ pressed }) => [S.btnSecondary, pressed && S.pressed]}
            >
              <GoogleG />
              <Text style={S.btnSecondaryText}>Continuar con Google</Text>
            </AnimatedPressable>
          </View>
        </View>
        <SafeAreaView edges={['bottom']} />
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  logoArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 176,
    height: 159,
  },

  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  sheetContent: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 24,
  },

  textBlock: { gap: 8 },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.textOnDark,
    letterSpacing: -1,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textOnDarkMuted,
    letterSpacing: -0.5,
    lineHeight: 23,
  },

  buttons: { gap: 10 },
  btnPrimary: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  btnPrimaryText: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: '#fff',
    letterSpacing: 0.2,
  },
  btnSecondary: {
    backgroundColor: colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: radius.pill,
    paddingVertical: 18,
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
  gCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#4285F4',
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
