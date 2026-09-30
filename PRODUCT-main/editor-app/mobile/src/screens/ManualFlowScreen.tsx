import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '../theme';
import { AnimatedPressable } from '../components/AnimatedPressable';

interface Props {
  onDone: () => void;
}



function StepDot({ n }: { n: string }) {
  return (
    <View style={S.stepDot}>
      <Text style={S.stepDotText}>{n}</Text>
    </View>
  );
}

function Vis1() {
  return (
    <View style={{ gap: 6, alignItems: 'flex-start' }}>
      <View style={S.vis1Input}>
        <Text style={S.vis1InputText}>Lanza</Text>
        <View style={S.cursor} />
      </View>
      <View style={[S.vis1Line, { width: 42 }]} />
      <View style={[S.vis1Line, { width: 28, opacity: 0.4 }]} />
    </View>
  );
}

function Vis2() {
  return (
    <View style={{ gap: 5 }}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {['#3B82F6', '#F8FAFC', '#0F1729'].map(c => (
          <View key={c} style={[S.swatch, { backgroundColor: c,
            borderWidth: c === '#0F1729' ? 1 : 0,
            borderColor: 'rgba(255,255,255,0.2)' }]} />
        ))}
      </View>
      <View style={S.vis2DatePill}>
        <Text style={S.vis2DateText}>abr</Text>
        <Text style={S.vis2DateText}>22</Text>
      </View>
      <View style={[S.vis2Line, { width: 52 }]} />
      <View style={[S.vis2Line, { width: 36, opacity: 0.45 }]} />
    </View>
  );
}

function StepCard({ n, title, body, vis }: { n: string; title: string; body: string; vis: React.ReactNode }) {
  return (
    <View style={S.stepCard}>
      <View style={S.stepIllustration}>
        {vis}
      </View>
      <View style={{ flex: 1, gap: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <StepDot n={n} />
          <Text style={S.stepTitle}>{title}</Text>
        </View>
        <Text style={S.stepBody}>{body}</Text>
      </View>
    </View>
  );
}

export function ManualFlowScreen({ onDone }: Props) {
  return (
    <View style={S.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={S.content}>
          {/* Header */}
          <View style={S.headerBlock}>
            <Text style={S.badge}>FLUJO MANUAL</Text>
            <Text style={S.h1}>Diseña tu primer proyecto.</Text>
            <Text style={S.body}>
              Arma el proyecto desde cero, paso a paso — tú mantienes el control.
            </Text>
          </View>

          {/* Step cards */}
          <View style={S.stepsBlock}>
            <StepCard
              n="1"
              title="Comienza"
              body="Crea el proyecto y ponle un nombre."
              vis={<Vis1 />}
            />
            <StepCard
              n="2"
              title="Personaliza"
              body="Define el branding, fechas y notas."
              vis={<Vis2 />}
            />
          </View>
        </View>

        {/* CTAs */}
        <View style={S.ctaGroup}>
          <AnimatedPressable
            onPress={onDone}
            style={({ pressed }) => [S.btnPrimary, pressed && S.pressed]}
          >
            <Text style={S.btnPrimaryText}>Empezar ahora</Text>
          </AnimatedPressable>

        </View>
      </SafeAreaView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    gap: 28,
  },
  headerBlock: { gap: 10 },
  badge: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.primaryLight,
    letterSpacing: 2,
  },
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

  stepsBlock: { gap: 14 },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: 24,
    padding: 16,
  },
  stepIllustration: {
    width: 80,
    height: 80,
    borderRadius: 18,
    backgroundColor: colors.primaryBg,
    borderWidth: 0.4,
    borderColor: colors.strokeBlue,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primaryBg,
    borderWidth: 1,
    borderColor: colors.strokeBlue,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepDotText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: colors.primaryLight,
  },
  stepTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.textOnDark,
    letterSpacing: -0.6,
  },
  stepBody: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textOnDarkMuted,
    lineHeight: 20,
    letterSpacing: -0.2,
  },

  // Vis1
  vis1Input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
    gap: 2,
  },
  vis1InputText: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: '#0F1729',
    letterSpacing: -0.3,
  },
  cursor: {
    width: 1.5,
    height: 9,
    backgroundColor: colors.primary,
  },
  vis1Line: {
    height: 3,
    backgroundColor: colors.strokeBlue,
    borderRadius: 2,
  },

  // Vis2
  swatch: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  vis2DatePill: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    gap: 4,
    alignSelf: 'flex-start',
  },
  vis2DateText: {
    fontFamily: fonts.bold,
    fontSize: 7,
    color: '#0F1729',
  },
  vis2Line: {
    height: 2.5,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 2,
  },

  // CTAs
  ctaGroup: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: 12,
    alignItems: 'center',
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
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  backLinkText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textOnDarkFaint,
    textDecorationLine: 'underline',
    textDecorationColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 4,
  },
});
