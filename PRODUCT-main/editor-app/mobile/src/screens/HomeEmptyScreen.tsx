import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lightning, CaretRight } from 'phosphor-react-native';
import { colors, fonts, radius, spacing } from '../theme';
import { AnimatedPressable } from '../components/AnimatedPressable';

interface Props {
  name: string;
  onNewProject: () => void;
  onAutomate: () => void;
  onProfile: () => void;
}

function EmptyStateArt() {
  return (
    <View style={S.artContainer}>
      <View style={S.artCardBack} />
      <View style={S.artCardFront}>
        <View style={S.artCardRow}>
          <View style={S.artAvatarPlaceholder} />
          <View style={{ flex: 1, gap: 5 }}>
            <View style={[S.artLine, { width: '70%' }]} />
            <View style={[S.artLine, { width: '45%', opacity: 0.5 }]} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={[S.artLine, { flex: 1 }]} />
          <View style={[S.artLine, { flex: 1 }]} />
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 'auto' }}>
          <View style={S.artChipPlaceholder} />
          <View style={[S.artChipPlaceholder, { width: 64 }]} />
        </View>
      </View>
    </View>
  );
}

function AutomationBanner({ onPress }: { onPress: () => void }) {
  return (
    <AnimatedPressable
      onPress={onPress}
      style={({ pressed }) => [S.banner, pressed && { opacity: 0.85 }]}
    >
      <View style={S.bannerIcon}>
        <Lightning size={18} color={colors.primaryLight} weight="fill" />
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text style={S.bannerTitle}>Automatiza tu próximo proyecto</Text>
        <Text style={S.bannerSubtitle}>
          Comparte un mensaje y Even organiza todo.
        </Text>
      </View>

      <View style={S.bannerChevron}>
        <CaretRight size={14} color={colors.primaryLight} weight="bold" />
      </View>
    </AnimatedPressable>
  );
}

export function HomeEmptyScreen({
  name,
  onAutomate,
}: Props) {
  return (
    <View style={[S.root, { paddingBottom: 90 }]}>
      <SafeAreaView
  style={{
    flex: 1,
    paddingBottom: 90,
  }}
>
        <View style={S.header}>
          <View>
            <Text style={S.greeting}>Hola, {name}</Text>
            <Text style={S.title}>Tus proyectos</Text>
          </View>
        </View>

        <View style={S.bannerWrap}>
          <AutomationBanner onPress={onAutomate} />
        </View>

        <View style={S.emptyState}>
          <EmptyStateArt />

          <View style={S.emptyTextBlock}>
            <Text style={S.emptyTitle}>
              Tu primer proyecto te espera
            </Text>

            <Text style={S.emptyBody}>
              Comparte un mensaje desde WhatsApp o crea uno desde
              cero. Even lo organiza por ti.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const S = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md
  },

  greeting: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
    letterSpacing: -0.2
  },

  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.textOnDark,
    letterSpacing: -1
  },

  bannerWrap: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md
  },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primaryBg,
    borderWidth: 0.4,
    borderColor: colors.strokeBlue,
    borderRadius: 16,
    padding: 14
  },

  bannerIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(59,130,246,0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  bannerTitle: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.textOnDark,
    letterSpacing: -0.3
  },

  bannerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.primaryLight,
    letterSpacing: -0.2
  },

  bannerChevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center'
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: spacing.lg
  },

  artContainer: {
    width: 260,
    height: 160,
    position: 'relative'
  },

  artCardBack: {
    position: 'absolute',
    left: 40,
    right: 40,
    top: 16,
    bottom: 0,
    backgroundColor: colors.surfaceCardHi,
    borderRadius: 20,
    transform: [{ rotate: '-4deg' }]
  },

  artCardFront: {
    position: 'absolute',
    left: 28,
    right: 28,
    top: 8,
    bottom: 0,
    backgroundColor: colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: 20,
    padding: 14,
    gap: 10
  },

  artCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },

  artAvatarPlaceholder: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: colors.primaryBg,
    borderWidth: 1,
    borderColor: colors.strokeBlue,
    borderStyle: 'dashed'
  },

  artLine: {
    height: 5,
    backgroundColor: colors.surfaceCardHi,
    borderRadius: 3
  },

  artChipPlaceholder: {
    height: 18,
    width: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceCardHi
  },

  emptyTextBlock: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8
  },

  emptyTitle: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.textOnDark,
    letterSpacing: -0.8,
    textAlign: 'center'
  },

  emptyBody: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 21,
    letterSpacing: -0.2,
    textAlign: 'center'
  },
});
