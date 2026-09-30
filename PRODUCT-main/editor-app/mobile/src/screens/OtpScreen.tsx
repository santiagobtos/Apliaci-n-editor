import { useEffect, useRef, useState } from 'react';
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
  code: string;
  setCode: (v: string) => void;
  phone: string;
  onConfirm: () => void;
  onBack: () => void;
}

export function OtpScreen({ code, setCode, phone, onConfirm, onBack }: Props) {
  const ref0 = useRef<TextInput>(null);
  const ref1 = useRef<TextInput>(null);
  const ref2 = useRef<TextInput>(null);
  const ref3 = useRef<TextInput>(null);
  const refs = [ref0, ref1, ref2, ref3];

  const [seconds, setSeconds] = useState(28);
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const masked = `+57 ••••••${phone.slice(-3) || '···'}`;
  const complete = code.length === 4;

  const handleDigit = (i: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const chars = code.padEnd(4, '').split('');
    chars[i] = digit;
    const next = chars.join('').trimEnd();
    setCode(next);
    if (digit && i < 3) refs[i + 1].current?.focus();
    if (!digit && i > 0) refs[i - 1].current?.focus();
  };

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
                <Text style={S.h1}>{'Ingresa el código\nque te enviamos'}</Text>

                <View style={S.phoneRow}>
                  <Text style={S.phoneLabel}>{masked}</Text>
                  <AnimatedPressable onPress={onBack} hitSlop={8}>
                    <Text style={S.changeLink}>Me equivoqué de número</Text>
                  </AnimatedPressable>
                </View>

                <View style={S.otpRow}>
                  {[0, 1, 2, 3].map(i => (
                    <TextInput
                      key={i}
                      ref={refs[i]}
                      value={code[i] ?? ''}
                      onChangeText={v => handleDigit(i, v)}
                      keyboardType="number-pad"
                      maxLength={1}
                      style={[S.otpBox, !!code[i] && S.otpBoxFilled]}
                      selectionColor={colors.primary}
                      textAlign="center"
                      autoFocus={i === 0}
                    />
                  ))}
                </View>

                <Text style={S.resend}>
                  {seconds > 0
                    ? `Reenviar código después de 00:${String(seconds).padStart(2, '0')}`
                    : 'Reenviar código'}
                </Text>
              </View>

              <View style={{ flex: 1 }} />

              <View style={S.cta}>
                <AnimatedPressable
                  onPress={complete ? onConfirm : undefined}
                  style={({ pressed }) => [S.btn, !complete && S.btnDisabled, pressed && complete && S.pressed]}
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

  header: { paddingHorizontal: 24, paddingTop: 48, gap: 16 },
  h1: { fontFamily: fonts.bold, fontSize: 28, color: colors.textOnDark, letterSpacing: -1, lineHeight: 34 },

  phoneRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12, rowGap: 6 },
  phoneLabel: { fontFamily: fonts.bold, fontSize: 15, color: colors.textOnDark, letterSpacing: -0.3 },
  changeLink: { fontFamily: fonts.bold, fontSize: 14, color: colors.primary, textDecorationLine: 'underline', textDecorationColor: colors.primary, letterSpacing: -0.2 },

  otpRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
  otpBox: {
    flex: 1, height: 66, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)',
    color: colors.textOnDark, fontFamily: fonts.bold, fontSize: 28, letterSpacing: -1,
  },
  otpBoxFilled: { backgroundColor: colors.primaryBg, borderColor: colors.primary },

  resend: { fontFamily: fonts.bold, fontSize: 13, color: colors.textSecondary, textAlign: 'center', letterSpacing: -0.2 },

  cta: { paddingHorizontal: 64, paddingBottom: 32 },
  btn: {
    backgroundColor: colors.primary, borderRadius: radius.pill, paddingHorizontal: 24, paddingVertical: 18, alignItems: 'center',
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 6,
  },
  btnDisabled: { backgroundColor: colors.surfaceCard, shadowOpacity: 0, elevation: 0 },
  btnText: { fontFamily: fonts.semibold, fontSize: 17, color: '#fff', letterSpacing: 0.2 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
