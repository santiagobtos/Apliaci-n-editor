import { useMemo, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CaretDown, MagnifyingGlass, X } from 'phosphor-react-native';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { colors, fonts, radius } from '../theme';

interface Country { flag: string; name: string; dial: string; }

const COUNTRIES: Country[] = [
  { flag: '🇨🇴', name: 'Colombia',          dial: '+57'   },
  { flag: '🇺🇸', name: 'Estados Unidos',     dial: '+1'    },
  { flag: '🇲🇽', name: 'México',             dial: '+52'   },
  { flag: '🇪🇸', name: 'España',             dial: '+34'   },
  { flag: '🇦🇷', name: 'Argentina',          dial: '+54'   },
  { flag: '🇨🇱', name: 'Chile',              dial: '+56'   },
  { flag: '🇵🇪', name: 'Perú',              dial: '+51'   },
  { flag: '🇻🇪', name: 'Venezuela',          dial: '+58'   },
  { flag: '🇪🇨', name: 'Ecuador',            dial: '+593'  },
  { flag: '🇧🇴', name: 'Bolivia',            dial: '+591'  },
  { flag: '🇵🇾', name: 'Paraguay',           dial: '+595'  },
  { flag: '🇺🇾', name: 'Uruguay',            dial: '+598'  },
  { flag: '🇨🇷', name: 'Costa Rica',         dial: '+506'  },
  { flag: '🇵🇦', name: 'Panamá',            dial: '+507'  },
  { flag: '🇬🇹', name: 'Guatemala',          dial: '+502'  },
  { flag: '🇭🇳', name: 'Honduras',           dial: '+504'  },
  { flag: '🇸🇻', name: 'El Salvador',        dial: '+503'  },
  { flag: '🇳🇮', name: 'Nicaragua',          dial: '+505'  },
  { flag: '🇨🇺', name: 'Cuba',               dial: '+53'   },
  { flag: '🇩🇴', name: 'Rep. Dominicana',    dial: '+1809' },
  { flag: '🇧🇷', name: 'Brasil',             dial: '+55'   },
  { flag: '🇵🇹', name: 'Portugal',           dial: '+351'  },
  { flag: '🇬🇧', name: 'Reino Unido',        dial: '+44'   },
  { flag: '🇩🇪', name: 'Alemania',           dial: '+49'   },
  { flag: '🇫🇷', name: 'Francia',            dial: '+33'   },
  { flag: '🇮🇹', name: 'Italia',             dial: '+39'   },
  { flag: '🇨🇦', name: 'Canadá',            dial: '+1'    },
  { flag: '🇦🇺', name: 'Australia',          dial: '+61'   },
  { flag: '🇯🇵', name: 'Japón',             dial: '+81'   },
  { flag: '🇰🇷', name: 'Corea del Sur',      dial: '+82'   },
  { flag: '🇨🇳', name: 'China',              dial: '+86'   },
  { flag: '🇮🇳', name: 'India',              dial: '+91'   },
];

interface Props {
  phone: string;
  setPhone: (v: string) => void;
  onNext: () => void;
}

export function PhoneScreen({ phone, setPhone, onNext }: Props) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState('');

  const valid = phone.length >= 6;

  const filtered = useMemo(() =>
    COUNTRIES.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search)
    ),
    [search]
  );

  const selectCountry = (c: Country) => {
    setCountry(c);
    setPickerOpen(false);
    setSearch('');
  };

  const openPicker = () => {
    Keyboard.dismiss();
    setPickerOpen(true);
  };

  return (
    <View style={S.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>

              <View style={S.header}>
                <Text style={S.h1}>¿Cuál es tu número?</Text>
                <Text style={S.subtitle}>Te enviaremos un código para confirmarlo</Text>
              </View>

              {/* ── Input row ── */}
              <View style={S.inputRow}>
                <Pressable onPress={openPicker} style={S.countryPill}>
                  <Text style={S.flag}>{country.flag}</Text>
                  <Text style={S.dial}>{country.dial}</Text>
                  <CaretDown size={13} color="rgba(255,255,255,0.7)" weight="bold" />
                </Pressable>

                <TextInput
                  value={phone}
                  onChangeText={v => setPhone(v.replace(/\D/g, ''))}
                  placeholder="Número de teléfono"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="phone-pad"
                  style={S.input}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={valid ? onNext : Keyboard.dismiss}
                />
              </View>

              <View style={{ flex: 1 }} />

              {/* ── CTA ── */}
              <View style={S.cta}>
                <AnimatedPressable
                  onPress={valid ? onNext : undefined}
                  style={({ pressed }) => [S.btn, !valid && S.btnDisabled, pressed && valid && S.pressed]}
                >
                  <Text style={S.btnText}>Recibir código</Text>
                </AnimatedPressable>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* ── Country picker modal ── */}
      <Modal
        visible={pickerOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setPickerOpen(false)}
      >
        <KeyboardAvoidingView
          style={S.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={S.sheet}>
            <View style={S.handle} />

            <View style={S.sheetHeader}>
              <Text style={S.sheetTitle}>Selecciona tu país</Text>
              <Pressable onPress={() => { setPickerOpen(false); setSearch(''); Keyboard.dismiss(); }} hitSlop={12}>
                <X size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            {/* Search — sin autoFocus para que la lista sea visible de entrada */}
            <View style={S.searchRow}>
              <MagnifyingGlass size={16} color={colors.textSecondary} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar país o código"
                placeholderTextColor={colors.textSecondary}
                style={S.searchInput}
                returnKeyType="search"
              />
            </View>

            <FlatList
              data={filtered}
              keyExtractor={c => c.dial + c.name}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              renderItem={({ item: c }) => (
                <Pressable
                  onPress={() => selectCountry(c)}
                  style={({ pressed }) => [S.countryRow, pressed && { backgroundColor: colors.surfaceCardHi }]}
                >
                  <Text style={S.rowFlag}>{c.flag}</Text>
                  <Text style={S.rowName} numberOfLines={1}>{c.name}</Text>
                  <Text style={S.rowDial}>{c.dial}</Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={S.separator} />}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  header: { paddingHorizontal: 24, paddingTop: 48, gap: 6 },
  h1: { fontFamily: fonts.bold, fontSize: 28, color: colors.textOnDark, letterSpacing: -1, lineHeight: 34 },
  subtitle: { fontFamily: fonts.regular, fontSize: 16, color: colors.textOnDarkMuted, letterSpacing: -0.4 },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 52,
    gap: 12,
  },
  countryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexShrink: 0,
  },
  flag: { fontSize: 20 },
  dial: { fontFamily: fonts.semibold, fontSize: 15, color: '#fff', letterSpacing: -0.3 },
  input: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 22,
    color: colors.textOnDark,
    letterSpacing: -1,
    backgroundColor: 'transparent',
  },

  cta: { paddingHorizontal: 64, paddingBottom: 32 },
  btn: {
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
  btnDisabled: { backgroundColor: colors.surfaceCard, shadowOpacity: 0, elevation: 0 },
  btnText: { fontFamily: fonts.semibold, fontSize: 17, color: '#fff', letterSpacing: 0.2 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  sheet: {
    backgroundColor: '#1A2338',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '80%',
    paddingBottom: 24,
  },
  handle: {
    width: 36, height: 4, borderRadius: 2,
    backgroundColor: colors.stroke,
    alignSelf: 'center',
    marginTop: 12, marginBottom: 4,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  sheetTitle: { fontFamily: fonts.bold, fontSize: 17, color: colors.textOnDark, letterSpacing: -0.5 },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: 14,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textOnDark,
    letterSpacing: -0.2,
  },

  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  rowFlag: { fontSize: 24, width: 30, textAlign: 'center' },
  rowName: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textOnDark,
    letterSpacing: -0.3,
  },
  rowDial: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.textSecondary,
    letterSpacing: -0.2,
  },
  separator: { height: 0.4, backgroundColor: colors.stroke, marginHorizontal: 20 },
});
