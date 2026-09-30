import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { colors, fonts, radius } from '../theme';

interface Props {
  name: string;
  setName: (v: string) => void;
  onConfirm: () => void;
}

export function NameScreen({ name, setName, onConfirm }: Props) {
  const valid = name.trim().length >= 2;

  return (
    <View style={S.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>

              <View style={S.header}>
                <Text style={S.h1}>{'¿Cómo quieres que te\nllamemos?'}</Text>
                <Text style={S.subtitle}>
                  Así podemos personalizar tu día a día en la app.
                </Text>
              </View>

              <View style={S.inputWrap}>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Tu nombre"
                  placeholderTextColor={colors.textSecondary}
                  style={S.input}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={valid ? onConfirm : Keyboard.dismiss}
                  textAlign="center"
                />
                <View style={S.underline} />
              </View>

              <View style={{ flex: 1 }} />

              <View style={S.cta}>
                <AnimatedPressable
                  onPress={valid ? onConfirm : undefined}
                  style={({ pressed }) => [S.btn, !valid && S.btnDisabled, pressed && valid && S.pressed]}
                >
                  <Text style={S.btnText}>Confirmar</Text>
                </AnimatedPressable>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  header: { paddingHorizontal: 24, paddingTop: 48, gap: 8 },
  h1: { fontFamily: fonts.bold, fontSize: 28, color: colors.textOnDark, letterSpacing: -1, lineHeight: 34 },
  subtitle: { fontFamily: fonts.regular, fontSize: 16, color: colors.textOnDarkMuted, letterSpacing: -0.4 },

  inputWrap: { paddingHorizontal: 24, marginTop: 64 },
  input: {
    fontFamily: fonts.medium,
    fontSize: 22,
    color: colors.primary,
    letterSpacing: -1,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  underline: { height: 1, backgroundColor: 'rgba(255,255,255,0.12)', marginTop: 2 },

  cta: { paddingHorizontal: 64, paddingBottom: 32 },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: 24,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  btnDisabled: { backgroundColor: colors.surfaceCard, shadowOpacity: 0, elevation: 0 },
  btnText: { fontFamily: fonts.semibold, fontSize: 17, color: '#fff', letterSpacing: 0.2 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
