import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowDown,
  CalendarBlank,
  Microphone,
  Palette,
  Play,
} from 'phosphor-react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { AnimatedPressable } from '../components/AnimatedPressable';

interface Props {
  onAuto: () => void;
  onManual: () => void;
  onSkip: () => void;
}

const WAVEFORM = [4, 7, 12, 6, 10, 16, 8, 13, 6, 10, 14, 7, 11, 5, 8];

function MetaphorStack() {
  return (
    <View style={S.metaphorContainer}>
      {/* Message bubble — top left */}
      <View style={S.messageBubble}>
        <View style={S.messageHeader}>
          <View style={S.waTile}>
            <Text style={S.waTileText}>WA</Text>
          </View>
          <Text style={S.messageMeta}>Camila · cliente</Text>
          <Text style={S.messageTime}>9:12</Text>
        </View>
        <Text style={S.messageText}>
          Hola, necesito el branding para el lanzamiento — antes del 22 de abril. Te paso el audio.
        </Text>
        <View style={S.audioPill}>
          <View style={S.playBtn}>
            <Play size={10} color="#fff" weight="fill" />
          </View>
          <View style={S.waveformRow}>
            {WAVEFORM.map((h, i) => (
              <View key={i} style={[S.waveBar, { height: h }]} />
            ))}
          </View>
          <Text style={S.audioDuration}>0:18</Text>
        </View>
      </View>

      {/* Arrow circle — center */}
      <View style={S.arrowCircle}>
        <ArrowDown size={22} color={colors.textOnDark} weight="bold" />
      </View>

      {/* Project card — bottom right */}
      <View style={S.projectCard}>
        <View style={S.projectCardHeader}>
          <View style={S.projectAvatar}>
            <Text style={S.projectAvatarText}>C</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={S.projectName}>Lanzamiento Camila</Text>
            <Text style={S.projectMeta}>Branding · 3 deliverables</Text>
          </View>
          <View style={S.listo}>
            <Text style={S.listoText}>LISTO</Text>
          </View>
        </View>
        <View style={S.chipRow}>
          <View style={S.chip}>
            <View style={S.chipContent}>
              <CalendarBlank size={11} color="#435170" weight="bold" />
              <Text style={S.chipText}>22 abr</Text>
            </View>
          </View>
          <View style={S.chip}>
            <View style={S.chipContent}>
              <Palette size={11} color="#435170" weight="bold" />
              <Text style={S.chipText}>Branding</Text>
            </View>
          </View>
          <View style={S.chip}>
            <View style={S.chipContent}>
              <Microphone size={11} color="#435170" weight="bold" />
              <Text style={S.chipText}>0:18</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export function ValuePropScreen({ onAuto, onManual, onSkip }: Props) {
  return (
    <View style={S.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={S.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Badge */}
          <View style={S.badge}>
            <View style={S.badgeDot} />
            <Text style={S.badgeText}>ASÍ FUNCIONA EVEN</Text>
          </View>

          {/* Title */}
          <Text style={S.h1}>De un mensaje a un proyecto completo.</Text>

          {/* Body */}
          <Text style={S.body}>
            Comparte las instrucciones o audios de tu cliente desde tu móvil.
            Nuestra IA procesa automáticamente el branding, las fechas y las notas,
            organizándolo todo en un proyecto listo para revisar en cualquier dispositivo.
          </Text>

          {/* Visual */}
          <MetaphorStack />

          {/* Spacer — pushes CTAs to bottom on tablets */}
          <View style={{ flexGrow: 1 }} />

          {/* CTAs */}
          <View style={S.ctaGroup}>
            <AnimatedPressable
              onPress={onAuto}
              style={({ pressed }) => [S.btnPrimary, pressed && S.pressed]}
            >
              <Text style={S.btnPrimaryText}>Automatiza tu proyecto</Text>
            </AnimatedPressable>
            <AnimatedPressable
              onPress={onManual}
              style={({ pressed }) => [S.btnSecondary, pressed && S.pressed]}
            >
              <Text style={S.btnSecondaryText}>Hazlo manualmente</Text>
            </AnimatedPressable>
            <AnimatedPressable onPress={onSkip} hitSlop={12}>
              <Text style={S.skipText}>Omitir</Text>
            </AnimatedPressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const S = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    gap: 18,
  },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryBg,
    borderWidth: 0.4,
    borderColor: colors.strokeBlue,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primaryLight,
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 11,
    color: colors.primaryLight,
    letterSpacing: 1.8,
  },

  // Typography
  h1: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.textOnDark,
    letterSpacing: -1,
    lineHeight: 36,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textOnDarkMuted,
    lineHeight: 22,
    letterSpacing: -0.3,
  },

  // Metaphor visual
  metaphorContainer: {
    height: 230,
    marginVertical: 4,
  },
  messageBubble: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 44,
    backgroundColor: colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    padding: 12,
    gap: 8,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  waTile: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waTileText: {
    fontFamily: fonts.bold,
    fontSize: 7,
    color: '#fff',
  },
  messageMeta: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: '#B6C3D9',
    flex: 1,
  },
  messageTime: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.textSecondary,
  },
  messageText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textOnDark,
    lineHeight: 17,
    letterSpacing: -0.2,
  },
  audioPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primaryBg,
    borderWidth: 1,
    borderColor: colors.strokeBlue,
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  playBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1.5,
    flex: 1,
  },
  waveBar: {
    width: 2,
    backgroundColor: colors.primaryLight,
    borderRadius: 1,
  },
  audioDuration: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.primaryLight,
  },

  // Arrow
  arrowCircle: {
    position: 'absolute',
    top: 110,
    alignSelf: 'center',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  arrowCircleInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },

  // Project card
  projectCard: {
    position: 'absolute',
    bottom: 0,
    left: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    gap: 10,
    shadowColor: '#0F1729',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.45,
    shadowRadius: 32,
    elevation: 10,
  },
  projectCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  projectAvatar: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#0F1729',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectAvatarText: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    color: colors.primaryLight,
  },
  projectName: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: '#0F1729',
    letterSpacing: -0.4,
  },
  projectMeta: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: '#8998B0',
  },
  listo: {
    backgroundColor: '#EAF1FE',
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  listoText: {
    fontFamily: fonts.bold,
    fontSize: 10,
    color: '#2C62B8',
    letterSpacing: 0.8,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#F3F6FB',
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chipText: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    color: '#435170',
  },

  // CTAs
  ctaGroup: {
    gap: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  btnPrimary: {
    width: '100%',
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
  btnPrimaryText: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: '#fff',
    letterSpacing: 0.2,
  },
  btnSecondary: {
    width: '100%',
    backgroundColor: colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: radius.pill,
    paddingHorizontal: 24, paddingVertical: 18,
    alignItems: 'center',
  },
  btnSecondaryText: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: colors.textOnDarkMuted,
    letterSpacing: 0.2,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  skipText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textOnDarkFaint,
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 4,
  },
});
