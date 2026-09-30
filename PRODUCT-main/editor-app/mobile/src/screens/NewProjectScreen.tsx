import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Platform, KeyboardAvoidingView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'phosphor-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { ProjectDraft, ProjectStatus, TeamMember } from '../types';
import { colors, fonts, radius, spacing } from '../theme';
import { AnimatedPressable } from '../components/AnimatedPressable';
import { AnimatedTextInput } from '../components/AnimatedTextInput';

interface Props {
  draft: ProjectDraft;
  setDraft: (d: ProjectDraft) => void;
  isEdit: boolean;
  onSave: (d: ProjectDraft) => void;
  teamMembers?: TeamMember[];
}

const PALETTES = [
  { label: 'Rojo',      colors: ['#EF4444', '#1F0A0A', '#FEE2E2'] },
  { label: 'Naranja',   colors: ['#F97316', '#1F1108', '#FFEDD5'] },
  { label: 'Ámbar',     colors: ['#F59E0B', '#1F1408', '#FEF6E7'] },
  { label: 'Lima',      colors: ['#84CC16', '#111A06', '#ECFCCB'] },
  { label: 'Verde',     colors: ['#22C55E', '#071F12', '#DCFCE7'] },
  { label: 'Turquesa',  colors: ['#14B8A6', '#061F1C', '#CCFBF1'] },
  { label: 'Cyan',      colors: ['#06B6D4', '#061A1F', '#CFFAFE'] },
  { label: 'Azul',      colors: ['#3B82F6', '#0F1729', '#F8FAFC'] },
  { label: 'Índigo',    colors: ['#6366F1', '#13102B', '#E0E7FF'] },
  { label: 'Púrpura',   colors: ['#A855F7', '#1A0D2E', '#F3E8FF'] },
  { label: 'Rosa',      colors: ['#E85D75', '#2B1030', '#FDEEF2'] },
  { label: 'Fucsia',    colors: ['#D946EF', '#250D29', '#FAE8FF'] },
];

function SectionCard({ children }: { children: React.ReactNode }) {
  return <View style={S.sectionCard}>{children}</View>;
}

const STATUS_OPTIONS: { label: string; value: ProjectStatus }[] = [
  { label: 'Pendiente', value: 'pendiente' },
  { label: 'En progreso', value: 'en progreso' },
  { label: 'Completado', value: 'completado' },
];

function FieldLabel({ children }: { children: string }) {
  return <Text style={S.fieldLabel}>{children}</Text>;
}

export function NewProjectScreen({ draft, setDraft, isEdit, onSave, teamMembers = [] }: Props) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const notesLen = draft.notes.length;

  const formatShortDate = (d: Date) => {
    if (!d) return '';
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${d.getDate()} ${months[d.getMonth()]}`;
  };

  const update = <K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) => {
    setDraft({ ...draft, [key]: value });
  };

  return (
    <View style={S.root}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* App bar */}
        <View style={S.appBar}>
          <Text style={S.appBarTitle}>{isEdit ? 'Editar proyecto' : 'Nuevo proyecto'}</Text>
        </View>

        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={S.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
          {/* Nombre */}
          <SectionCard>
            <FieldLabel>Nombre del proyecto</FieldLabel>
            <AnimatedTextInput
              value={draft.name}
              onChangeText={v => update('name', v)}
              placeholder="Escribe el nombre..."
              placeholderTextColor={colors.textSecondary}
              style={S.textInput}
              returnKeyType="done"
            />
          </SectionCard>

          {/* Estado */}
          <SectionCard>
            <FieldLabel>Estado del proyecto</FieldLabel>
            <View style={S.statusRow}>
              {STATUS_OPTIONS.map(opt => {
                const isActive = draft.status === opt.value;
                return (
                  <AnimatedPressable
                    key={opt.value}
                    onPress={() => update('status', opt.value)}
                    style={[
                      S.statusChip, 
                      isActive && opt.value === 'pendiente' && S.statusChipPending,
                      isActive && opt.value === 'en progreso' && S.statusChipProgress,
                      isActive && opt.value === 'completado' && S.statusChipSuccess,
                    ]}
                  >
                    <Text style={[
                      S.statusChipText, 
                      isActive && opt.value === 'pendiente' && S.statusTextPending,
                      isActive && opt.value === 'en progreso' && S.statusTextProgress,
                      isActive && opt.value === 'completado' && S.statusTextSuccess,
                    ]}>
                      {opt.label}
                    </Text>
                  </AnimatedPressable>
                );
              })}
            </View>
          </SectionCard>

          {/* Branding */}
          <SectionCard>
            <FieldLabel>Branding</FieldLabel>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={S.paletteScroll}
              contentContainerStyle={S.paletteScrollContent}
            >
              {PALETTES.map((p, idx) => {
                const isSelected = JSON.stringify(draft.colors) === JSON.stringify(p.colors);
                return (
                  <AnimatedPressable
                    key={p.label}
                    onPress={() => update('colors', p.colors)}
                    style={[S.paletteOption, isSelected && S.paletteSelected, idx < PALETTES.length - 1 && { marginRight: 10 }]}
                  >
                    <View style={S.swatchRow}>
                      {p.colors.map(c => {
                        const isLight = c.startsWith('#F') || c.startsWith('#E') || c.startsWith('#D') || c.startsWith('#C');
                        return (
                          <View key={c} style={[S.swatch, { backgroundColor: c,
                            borderWidth: isLight ? 0.4 : 0,
                            borderColor: colors.stroke }]} />
                        );
                      })}
                    </View>
                    <Text style={[S.paletteLabel, isSelected && { color: p.colors[0] }]}>{p.label}</Text>
                  </AnimatedPressable>
                );
              })}
            </ScrollView>
          </SectionCard>

          {/* Asignar equipo */}
          <SectionCard>
            <FieldLabel>Asignar equipo</FieldLabel>
            {teamMembers.length > 0 ? (
              <View style={S.memberRow}>
                {teamMembers.map(m => {
                  const isSelected = (draft.members ?? []).some(x => x.id === m.id);
                  return (
                    <AnimatedPressable
                      key={m.id}
                      onPress={() => {
                        const cur = draft.members ?? [];
                        update('members', isSelected
                          ? cur.filter(x => x.id !== m.id)
                          : [...cur, m]);
                      }}
                      style={[S.memberChip, isSelected && S.memberChipActive]}
                    >
                      <View style={[S.memberAvatar, { backgroundColor: m.color }]}>
                        <Text style={S.memberAvatarText}>{m.name[0].toUpperCase()}</Text>
                      </View>
                      <Text style={[S.memberChipText, isSelected && S.memberChipTextActive]}>
                        {m.name}
                      </Text>
                      {isSelected && <Check size={13} color={colors.primaryLight} weight="bold" />}
                    </AnimatedPressable>
                  );
                })}
              </View>
            ) : (
              <Pressable disabled style={{ paddingVertical: 12, alignItems: 'center', opacity: 0.5, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: radius.pill, borderWidth: 0.5, borderColor: colors.stroke }}>
                <Text style={{ fontFamily: fonts.medium, fontSize: 14, color: colors.textSecondary }}>Aún no hay miembros en el equipo</Text>
              </Pressable>
            )}
          </SectionCard>

          {/* Tipografía */}
          <SectionCard>
            <FieldLabel>Tipografía</FieldLabel>
            <View style={S.typoRow}>
              <View style={S.typoSample}>
                <Text style={S.typoSampleText}>Aa</Text>
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <AnimatedTextInput
                  value={draft.typography}
                  onChangeText={v => update('typography', v)}
                  placeholder="Ej. Plus Jakarta Sans"
                  placeholderTextColor={colors.textSecondary}
                  style={[S.textInput, { paddingHorizontal: 0, paddingVertical: 0, backgroundColor: 'transparent', borderWidth: 0, fontFamily: fonts.medium, fontSize: 14 }]}
                  returnKeyType="done"
                />
              </View>
              <View style={S.typoCheck}>
                <Check size={14} color={colors.success} weight="bold" />
              </View>
            </View>
          </SectionCard>

          {/* Fechas */}
          <SectionCard>
            <FieldLabel>Fechas del proyecto</FieldLabel>
            <View style={{ gap: 10 }}>
              <View style={S.dateRow}>
                <Text style={S.dateLabel}>Inicio</Text>
                <AnimatedPressable onPress={() => setShowStartPicker(true)} style={S.dateInputBtn}>
                  <Text style={[S.dateInputBtnText, !draft.startDate && { color: colors.textSecondary }]}>
                    {draft.startDate ? formatShortDate(new Date(draft.startDate)) : 'Seleccionar...'}
                  </Text>
                </AnimatedPressable>
                {showStartPicker && (
                  <>
                    <DateTimePicker
                      value={draft.startDate ? new Date(draft.startDate) : new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      themeVariant="dark"
                      onChange={(e, selected) => {
                        if (Platform.OS === 'android') setShowStartPicker(false);
                        if (selected) update('startDate', selected);
                      }}
                    />
                    {Platform.OS === 'ios' && (
                      <Pressable onPress={() => setShowStartPicker(false)} style={{ alignSelf: 'flex-end', paddingHorizontal: 12, paddingVertical: 6 }}>
                        <Text style={{ fontFamily: fonts.semibold, fontSize: 15, color: colors.primaryLight }}>Listo</Text>
                      </Pressable>
                    )}
                  </>
                )}
              </View>
              <View style={S.dateDivider} />
              <View style={S.dateRow}>
                <Text style={S.dateLabel}>Entrega</Text>
                <AnimatedPressable onPress={() => setShowDeadlinePicker(true)} style={S.dateInputBtn}>
                  <Text style={[S.dateInputBtnText, !draft.deadline && { color: colors.textSecondary }]}>
                    {draft.deadline ? formatShortDate(new Date(draft.deadline)) : 'Seleccionar...'}
                  </Text>
                </AnimatedPressable>
                {showDeadlinePicker && (
                  <>
                    <DateTimePicker
                      value={draft.deadline ? new Date(draft.deadline) : new Date()}
                      minimumDate={draft.startDate ? new Date(draft.startDate) : undefined}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      themeVariant="dark"
                      onChange={(e, selected) => {
                        if (Platform.OS === 'android') setShowDeadlinePicker(false);
                        if (selected) update('deadline', selected);
                      }}
                    />
                    {Platform.OS === 'ios' && (
                      <Pressable onPress={() => setShowDeadlinePicker(false)} style={{ alignSelf: 'flex-end', paddingHorizontal: 12, paddingVertical: 6 }}>
                        <Text style={{ fontFamily: fonts.semibold, fontSize: 15, color: colors.primaryLight }}>Listo</Text>
                      </Pressable>
                    )}
                  </>
                )}
              </View>
            </View>
          </SectionCard>

          {/* Entregables */}
          <SectionCard>
            <FieldLabel>Entregables</FieldLabel>
            {draft.deliverables.map((del, i) => (
              <View key={i} style={S.linkRow}>
                <AnimatedTextInput
                  value={del.label}
                  onChangeText={v => {
                    const newDels = [...draft.deliverables];
                    newDels[i] = { ...newDels[i], label: v };
                    update('deliverables', newDels);
                  }}
                  placeholder="Ej. Diseño UI"
                  placeholderTextColor={colors.textSecondary}
                  style={[S.textInput, { flex: 1, paddingVertical: 10 }]}
                  autoCapitalize="sentences"
                />
                <AnimatedPressable onPress={() => update('deliverables', draft.deliverables.filter((_, j) => j !== i))} hitSlop={8}>
                  <Text style={S.linkRemove}>×</Text>
                </AnimatedPressable>
              </View>
            ))}
            <AnimatedPressable onPress={() => update('deliverables', [...draft.deliverables, { label: '', done: false }])} style={S.addLinkBtn}>
              <Text style={S.addLinkText}>+ Añadir entregable</Text>
            </AnimatedPressable>
          </SectionCard>

          {/* Notas */}
          <SectionCard>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <FieldLabel>Notas de proyecto</FieldLabel>
              <Text style={S.counter}>{notesLen}/500</Text>
            </View>
            <AnimatedTextInput
              value={draft.notes}
              onChangeText={v => v.length <= 500 && update('notes', v)}
              placeholder="Instrucciones del cliente, referencias, consideraciones..."
              placeholderTextColor={colors.textSecondary}
              style={[S.textInput, S.notesInput]}
              multiline
              textAlignVertical="top"
            />
          </SectionCard>

          {/* Links */}
          <SectionCard>
            <FieldLabel>Project Links</FieldLabel>
            {draft.links.map((link, i) => (
              <View key={i} style={S.linkRow}>
                <AnimatedTextInput
                  value={link}
                  onChangeText={v => {
                    const newLinks = [...draft.links];
                    newLinks[i] = v;
                    update('links', newLinks);
                  }}
                  placeholder="https://"
                  placeholderTextColor={colors.textSecondary}
                  style={[S.textInput, { flex: 1, paddingVertical: 10 }]}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <AnimatedPressable
                  onPress={() => update('links', draft.links.filter((_, j) => j !== i))}
                  hitSlop={8}
                >
                  <Text style={S.linkRemove}>×</Text>
                </AnimatedPressable>
              </View>
            ))}
            <AnimatedPressable
              onPress={() => update('links', [...draft.links, ''])}
              style={S.addLinkBtn}
            >
              <Text style={S.addLinkText}>+ Añadir enlace</Text>
            </AnimatedPressable>
          </SectionCard>

          <View style={{ height: 100 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {/* Sticky CTA */}
      <View style={S.stickyBottom}>
        <AnimatedPressable
          onPress={() => onSave(draft)}
          style={({ pressed }) => [S.btnPrimary, pressed && S.pressed]}
        >
          <Text style={S.btnPrimaryText}>
            {isEdit ? 'Guardar cambios' : 'Crear proyecto'}
          </Text>
        </AnimatedPressable>
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    gap: 12,
  },
  appBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.textOnDark,
    letterSpacing: -0.4,
  },

  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: 8,
    gap: 12,
  },

  sectionCard: {
    backgroundColor: colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  fieldLabel: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.textOnDark,
    letterSpacing: -0.3,
  },

  textInput: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textOnDark,
    backgroundColor: colors.surfaceCardHi,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    letterSpacing: -0.2,
  },

  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceCardHi,
    borderWidth: 0.4,
    borderColor: colors.stroke,
  },
  statusChipText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textSecondary,
    letterSpacing: -0.2,
  },
  statusChipProgress: {
    backgroundColor: 'rgba(59,130,246,0.15)',
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  statusTextProgress: {
    color: colors.primary,
  },
  statusChipPending: {
    backgroundColor: 'rgba(245,158,11,0.15)',
    borderColor: colors.warning,
    borderWidth: 1.5,
  },
  statusTextPending: {
    color: colors.warning,
  },
  statusChipSuccess: {
    backgroundColor: 'rgba(16,185,129,0.15)',
    borderColor: colors.success,
    borderWidth: 1.5,
  },
  statusTextSuccess: {
    color: colors.success,
  },

  notesInput: {
    height: 100,
    paddingTop: 12,
  },
  counter: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },

  // Palette
  paletteScroll: {
    marginHorizontal: -16,
  },
  paletteScrollContent: {
    paddingHorizontal: 16,
  },
  paletteOption: {
    width: 80,
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceCardHi,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: 14,
    padding: 10,
  },
  paletteSelected: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  swatchRow: {
    flexDirection: 'row',
    gap: 3,
  },
  swatch: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  paletteLabel: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.textSecondary,
    letterSpacing: -0.2,
  },

  // Typography
  typoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surfaceCardHi,
    borderRadius: 12,
    padding: 12,
  },
  typoSample: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typoSampleText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primaryLight,
  },
  typoCheck: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(16,185,129,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },

  // Dates
  dateRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dateLabel: { fontFamily: fonts.medium, fontSize: 14, color: colors.textOnDark },
  dateInputBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.surfaceCardHi,
  },
  dateInputBtnText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textOnDark,
  },
  dateDivider: { height: 0.4, backgroundColor: colors.stroke },

  // Links
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceCardHi,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  linkText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.primaryLight,
    letterSpacing: -0.2,
  },
  linkRemove: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  addLinkBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  addLinkText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.primaryLight,
    letterSpacing: -0.2,
  },

  // Sticky bottom
  stickyBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.lg,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopWidth: 0.4,
    borderTopColor: colors.stroke,
  },
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
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  // Equipo
  memberRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  memberChip: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 0.5, borderColor: colors.stroke,
  },
  memberChipActive: {
    backgroundColor: colors.primaryBg,
    borderColor: colors.strokeBlue,
  },
  memberAvatar: {
    width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center',
  },
  memberAvatarText: { fontFamily: fonts.bold, fontSize: 11, color: '#fff' },
  memberChipText: { fontFamily: fonts.medium, fontSize: 13, color: colors.textSecondary },
  memberChipTextActive: { color: colors.textOnDark },
});
