import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChatCircle,
  Camera,
  Microphone,
  ShareNetwork,
} from 'phosphor-react-native';
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

function PlatformTile({ kind }: { kind: 'wa' | 'ig' | 'audio' | 'share' }) {
  const bgMap = { wa: '#25D366', ig: '#C13584', audio: colors.primaryBg, share: colors.surfaceCardHi };
  const renderIcon = () => {
    switch (kind) {
      case 'wa': return <ChatCircle size={18} color="#fff" weight="fill" />;
      case 'ig': return <Camera size={18} color="#fff" weight="fill" />;
      case 'audio': return <Microphone size={18} color={colors.primaryLight} weight="fill" />;
      case 'share': return <ShareNetwork size={18} color={colors.textOnDark} weight="bold" />;
    }
  };
  return (
    <View style={[S.platformTile, { backgroundColor: bgMap[kind] }]}>
      {renderIcon()}
    </View>
  );
}

function AutoStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <View style={S.autoStep}>
      <StepDot n={n} />
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={S.stepTitle}>{title}</Text>
        <Text style={S.stepBody}>{body}</Text>
      </View>
    </View>
  );
}

export function AutoFlowScreen({ onDone }: Props) {
  return (
    <View style={S.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={S.content}>
          <View style={S.headerBlock}>
            <Text style={S.badge}>FLUJO AUTOMÁTICO</Text>
            <Text style={S.h1}>Comparte un mensaje, recibe un proyecto.</Text>
            <Text style={S.body}>Nuestra IA organiza branding, fechas y notas desde cualquier conversación.</Text>
          </View>
          <View style={S.platformRow}>
            <PlatformTile kind="wa" />
            <PlatformTile kind="ig" />
            <PlatformTile kind="audio" />
            <PlatformTile kind="share" />
            <Text style={S.platformCaption}>WhatsApp,{'\n'}Instagram{'\n'}y más</Text>
          </View>
          <View style={S.stepsBlock}>
            <AutoStep n="1" title="Abre la conversación" body="Ve al chat del cliente en WhatsApp, Instagram o la app que uses." />
            <AutoStep n="2" title="Toca Compartir y elige Even" body="Selecciona el mensaje, la nota de voz o el hilo completo." />
            <AutoStep n="3" title="Listo — Even organiza el proyecto" body="En segundos tendrás branding, fechas y notas estructurados." />
          </View>
        </View>
        <View style={S.ctaGroup}>
          <AnimatedPressable onPress={onDone} style={({ pressed }) => [S.btnPrimary, pressed && S.pressed]}>
            <Text style={S.btnPrimaryText}>Entendido, empezar</Text>
          </AnimatedPressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const S = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: 60, gap: 22 },
  headerBlock: { gap: 10 },
  badge: { fontFamily: fonts.bold, fontSize: 12, color: colors.primaryLight, letterSpacing: 2 },
  h1: { fontFamily: fonts.bold, fontSize: 28, color: colors.textOnDark, letterSpacing: -1, lineHeight: 33 },
  body: { fontFamily: fonts.regular, fontSize: 15, color: colors.textOnDarkMuted, lineHeight: 22, letterSpacing: -0.3 },
  platformRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surfaceCard, borderWidth: 0.4, borderColor: colors.stroke, borderRadius: 20, padding: 14 },
  platformTile: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  platformCaption: { fontFamily: fonts.regular, fontSize: 12, color: colors.textOnDarkMuted, lineHeight: 16, marginLeft: 'auto', textAlign: 'right' },
  stepsBlock: { gap: 20 },
  autoStep: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  stepDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primaryBg, borderWidth: 1, borderColor: colors.strokeBlue, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepDotText: { fontFamily: fonts.bold, fontSize: 14, color: colors.primaryLight },
  stepTitle: { fontFamily: fonts.semibold, fontSize: 16, color: colors.textOnDark, letterSpacing: -0.4 },
  stepBody: { fontFamily: fonts.regular, fontSize: 13, color: 'rgba(255,255,255,0.62)', lineHeight: 19, letterSpacing: -0.2 },
  ctaGroup: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, gap: 12, alignItems: 'center' },
  btnPrimary: { width: '100%', backgroundColor: colors.primary, borderRadius: radius.pill, paddingHorizontal: 24, paddingVertical: 18, alignItems: 'center', shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 16, elevation: 6 },
  btnPrimaryText: { fontFamily: fonts.semibold, fontSize: 17, color: '#fff', letterSpacing: 0.2 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  backLinkText: { fontFamily: fonts.medium, fontSize: 15, color: colors.textOnDarkFaint, textDecorationLine: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)', paddingVertical: 4 },
});
