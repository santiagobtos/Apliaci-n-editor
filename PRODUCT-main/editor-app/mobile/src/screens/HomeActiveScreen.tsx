import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CaretDown,
  CaretRight,
  CaretUp,
  Lightning,
  CheckCircle,
  Trash
} from 'phosphor-react-native';

import type {
  Project,
  ProjectStatus,
  Deliverable
} from '../types';

import {
  colors,
  fonts,
  radius,
  spacing
} from '../theme';

import { AnimatedListEntrance } from '../components/AnimatedListEntrance';
import { AnimatedPressable } from '../components/AnimatedPressable';

import { projectsApi } from '../shared/api';
import { useAuthStore } from '../shared/auth.store';

interface Props {
  name: string;

  projects: Project[];

  onNewProject: () => void;

  onAutomate: () => void;

  onOpenProject: (p: Project) => void;

  onUpdateProject: (updated: Project) => void;

  onDeleteProjects: (
    ids: string[]
  ) => Promise<void>;

  onProfile: () => void;
}

const STATUS_OPTIONS: {
  label: string;
  value: ProjectStatus;
}[] = [
  {
    label: 'Pendiente',
    value: 'pendiente'
  },
  {
    label: 'En progreso',
    value: 'en progreso'
  },
  {
    label: 'Completado',
    value: 'completado'
  },
];

function StatCard({
  value,
  label,
  accent = false
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <View
      style={[
        S.statCard,
        accent && S.statCardAccent
      ]}
    >
      <Text
        style={[
          S.statValue,
          accent && S.statValueAccent
        ]}
      >
        {value}
      </Text>

      <Text style={S.statLabel}>
        {label}
      </Text>
    </View>
  );
}

function ProgressBar({
  progress
}: {
  progress: number;
}) {
  return (
    <View style={S.progressTrack}>
      <View
        style={[
          S.progressFill,
          {
            width: `${progress}%`
          }
        ]}
      />
    </View>
  );
}

const calculateProgress = (
  dels?: Deliverable[]
) => {
  if (!dels || dels.length === 0) {
    return 0;
  }

  return Math.round(
    (
      dels.filter(x => x.done).length /
      dels.length
    ) * 100
  );
};

function ProjectRow({
  project,
  onOpen,
  onUpdate,
  selectionMode,
  selected,
  onToggleSelect,
  onLongPress,
  token
}: {
  project: Project;

  token: string;

  onOpen: () => void;

  onUpdate: (
    p: Project
  ) => void;

  selectionMode: boolean;

  selected: boolean;

  onToggleSelect: () => void;

  onLongPress: () => void;
}) {

  const [expanded, setExpanded] =
    useState(false);

  const [menuVisible, setMenuVisible] =
    useState(false);

  const statusLabel =
    STATUS_OPTIONS.find(
      o => o.value === project.status
    )?.label || 'En progreso';

  return (
    <View
      style={[
        S.projectRowWrap,

        selected && {
          borderColor: colors.primary,
          borderWidth: 1.5
        }
      ]}
    >
      <AnimatedPressable
        onPress={() =>
          selectionMode
            ? onToggleSelect()
            : setExpanded(e => !e)
        }

        onLongPress={() =>
          !selectionMode &&
          onLongPress()
        }

        delayLongPress={300}

        style={({ pressed }) => [
          S.projectRow,

          pressed && {
            opacity: 0.9
          },

          selected && {
            backgroundColor:
              'rgba(59,130,246,0.05)'
          }
        ]}
      >

        {!selectionMode && (
          <View
            style={[
              S.projectAccentBar,
              {
                backgroundColor:
                  project.colors[0]
              }
            ]}
          />
        )}

        {selectionMode && (
          <View
            style={{
              paddingLeft: 14,
              justifyContent: 'center'
            }}
          >
            {selected ? (
              <CheckCircle
                size={22}
                color={colors.primary}
                weight="fill"
              />
            ) : (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor:
                    colors.strokeBlue
                }}
              />
            )}
          </View>
        )}

        <View
          style={[
            S.projectRowContent,

            selectionMode && {
              paddingLeft: 10
            }
          ]}
        >
          <View
            style={{
              flex: 1,
              gap: 3
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Text
                style={S.projectName}
                numberOfLines={1}
              >
                {project.name}
              </Text>

              <View
                style={[
                  S.rowStatusBadge,

                  project.status ===
                    'completado' && {
                    backgroundColor:
                      'rgba(16,185,129,0.15)'
                  },

                  project.status ===
                    'pendiente' && {
                    backgroundColor:
                      'rgba(245,158,11,0.15)'
                  }
                ]}
              >
                <Text
                  style={[
                    S.rowStatusText,

                    project.status ===
                      'completado' && {
                      color:
                        colors.success
                    },

                    project.status ===
                      'pendiente' && {
                      color:
                        colors.warning
                    }
                  ]}
                >
                  {statusLabel}
                </Text>
              </View>
            </View>

            <Text style={S.projectClient}>
              {project.client} ·{' '}
              {project.deliverables?.length || 0}
              {' '}entregables
            </Text>
          </View>

          <View
            style={{
              alignItems: 'flex-end',
              gap: 4
            }}
          >
            <Text style={S.projectDeadline}>
              Entrega:{' '}
              {formatShortDate(
                project.deadline
              )}
            </Text>

            {expanded ? (
              <CaretUp
                size={12}
                color={colors.textSecondary}
                weight="bold"
              />
            ) : (
              <CaretDown
                size={12}
                color={colors.textSecondary}
                weight="bold"
              />
            )}
          </View>
        </View>
      </AnimatedPressable>

      {expanded && (
        <View style={S.expandedPreview}>

          <View style={S.previewRow}>
            <Text style={S.previewLabel}>
              Branding
            </Text>

            <View
              style={{
                flexDirection: 'row',
                gap: 5
              }}
            >
              {project.colors.map(c => (
                <View
                  key={c}
                  style={[
                    S.previewSwatch,
                    {
                      backgroundColor: c,

                      borderWidth:
                        c.startsWith('#F') ||
                        c.startsWith('#E') ||
                        c.startsWith('#D') ||
                        c.startsWith('#C')
                          ? 0.4
                          : 0,

                      borderColor:
                        colors.stroke
                    }
                  ]}
                />
              ))}
            </View>
          </View>

          <View style={S.previewRow}>
            <Text style={S.previewLabel}>
              Tipografía
            </Text>

            <Text style={S.previewValue}>
              {project.typography}
            </Text>
          </View>

          <View style={{ gap: 6 }}>

            <View style={S.previewRow}>
              <Text style={S.previewLabel}>
                Progreso
              </Text>

              <Text style={S.previewValue}>
                {project.progress}%
              </Text>
            </View>

            <ProgressBar
              progress={project.progress}
            />
          </View>

          <View style={S.actionsRow}>

            <AnimatedPressable
              onPress={() =>
                setMenuVisible(true)
              }

              style={S.quickStatusChip}
            >
              <View
                style={[
                  S.statusDot,

                  project.status ===
                    'completado' && {
                    backgroundColor:
                      colors.success
                  },

                  project.status ===
                    'pendiente' && {
                    backgroundColor:
                      colors.warning
                  }
                ]}
              />

              <Text
                style={S.quickStatusChipText}
              >
                {statusLabel}
              </Text>

              <CaretDown
                size={10}
                color={colors.textSecondary}
                weight="bold"
              />
            </AnimatedPressable>

            <AnimatedPressable
              onPress={onOpen}

              style={({ pressed }) => [
                S.openProjectBtn,

                pressed && {
                  opacity: 0.85
                }
              ]}
            >
              <Text style={S.openProjectText}>
                Abrir
              </Text>

              <CaretRight
                size={12}
                color={colors.primaryLight}
                weight="bold"
              />
            </AnimatedPressable>
          </View>
        </View>
      )}

      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"

        onRequestClose={() =>
          setMenuVisible(false)
        }
      >
        <Pressable
          style={S.menuOverlay}

          onPress={() =>
            setMenuVisible(false)
          }
        >
          <View style={S.menuPanel}>

            <Text style={S.menuTitle}>
              Cambiar estado
            </Text>

            {STATUS_OPTIONS.map(
              (opt, i) => {

              const isActive =
                project.status ===
                opt.value;

              return (
                <View key={opt.value}>

                  {i > 0 && (
                    <View
                      style={S.menuDivider}
                    />
                  )}

                  <AnimatedPressable
                    style={S.menuItem}

                    onPress={async () => {

                      setMenuVisible(false);

                      const updatedProject: Project = {
                        ...project,

                        status: opt.value,

                        progress:
                          opt.value ===
                          'completado'
                            ? 100
                            : opt.value ===
                              'en progreso'
                            ? 50
                            : 0
                      };

                      onUpdate(updatedProject);

                      try {

                        await projectsApi.update(
                          project.id,
                          {
                            status:
                              opt.value ===
                              'pendiente'
                                ? 'inactive'
                                : opt.value ===
                                  'en progreso'
                                ? 'active'
                                : 'completed',
                          },
                          token
                        );

                      } catch (err) {

                        console.log(
                          'ERROR ACTUALIZANDO STATUS',
                          err
                        );
                      }
                    }}
                  >
                    <View
                      style={[
                        S.statusDot,

                        opt.value ===
                          'completado' && {
                          backgroundColor:
                            colors.success
                        },

                        opt.value ===
                          'pendiente' && {
                          backgroundColor:
                            colors.warning
                        },

                        opt.value ===
                          'en progreso' && {
                          backgroundColor:
                            colors.primaryLight
                        }
                      ]}
                    />

                    <Text
                      style={[
                        S.menuItemText,

                        isActive &&
                        S.menuItemTextActive
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </AnimatedPressable>
                </View>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

function AutomationBanner({
  onPress
}: {
  onPress: () => void;
}) {

  return (
    <AnimatedPressable
      onPress={onPress}

      style={({ pressed }) => [
        S.banner,

        pressed && {
          opacity: 0.85
        }
      ]}
    >
      <View style={S.bannerIcon}>
        <Lightning
          size={16}
          color={colors.primaryLight}
          weight="fill"
        />
      </View>

      <View
        style={{
          flex: 1,
          gap: 2
        }}
      >
        <Text style={S.bannerTitle}>
          Automatiza tu próximo proyecto
        </Text>

        <Text style={S.bannerSubtitle}>
          Comparte un mensaje y Even organiza todo.
        </Text>
      </View>

      <CaretRight
        size={14}
        color={colors.primaryLight}
        weight="bold"
      />
    </AnimatedPressable>
  );
}

function isWithin7Days(
  date: Date
) {

  if (
    !date ||
    !(date instanceof Date)
  ) {
    return false;
  }

  const now = new Date();

  now.setHours(
    0,
    0,
    0,
    0
  );

  const target =
    new Date(date);

  target.setHours(
    0,
    0,
    0,
    0
  );

  const diffTime =
    target.getTime() -
    now.getTime();

  const diffDays =
    Math.ceil(
      diffTime /
      (
        1000 *
        60 *
        60 *
        24
      )
    );

  return (
    diffDays >= 0 &&
    diffDays <= 7
  );
}

const formatShortDate = (
  d: Date
) => {

  if (!d) return '';

  const months = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic'
  ];

  return `${d.getDate()} ${months[d.getMonth()]}`;
};

export function HomeActiveScreen({
  name,
  projects,
  onNewProject,
  onAutomate,
  onOpenProject,
  onUpdateProject,
  onDeleteProjects,
  onProfile
}: Props) {

  const token =
    useAuthStore(
      state => state.token
    );

  const [
    selectedProjects,
    setSelectedProjects
  ] = useState<Set<string>>(
    new Set()
  );

  const selectionMode =
    selectedProjects.size > 0;

  const toggleSelection = (
    projectId: string
  ) => {

    setSelectedProjects(prev => {

      const next =
        new Set(prev);

      if (
        next.has(projectId)
      ) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }

      return next;
    });
  };

  const enProgreso =
    projects.filter(
      p =>
        p.status ===
        'en progreso'
    ).length;

  const pendientes =
    projects.filter(
      p =>
        p.status ===
        'pendiente'
    ).length;

  const completados =
    projects.filter(
      p =>
        p.status ===
        'completado'
    ).length;

  const proximos =
    projects.filter(
      p =>
        isWithin7Days(
          p.deadline
        )
    ).length;

  return (
    <View style={S.root}>

      <SafeAreaView style={{ flex: 1 }}>

        <ScrollView
          contentContainerStyle={
            S.scrollContent
          }

          showsVerticalScrollIndicator={
            false
          }
        >

          {selectionMode ? (

            <View style={S.selectionHeader}>

              <AnimatedPressable
                onPress={() =>
                  setSelectedProjects(
                    new Set()
                  )
                }

                hitSlop={10}
              >
                <Text
                  style={
                    S.selectionCancelText
                  }
                >
                  Cancelar
                </Text>
              </AnimatedPressable>

              <Text
                style={S.selectionTitle}
              >
                {
                  selectedProjects.size
                }
                {' '}
                seleccionado
                {
                  selectedProjects.size !== 1
                    ? 's'
                    : ''
                }
              </Text>

              <AnimatedPressable
                onPress={async () => {

                  try {

                    const ids =
                      Array.from(
                        selectedProjects
                      );

                    await onDeleteProjects(
                      ids
                    );

                    setSelectedProjects(
                      new Set()
                    );

                  } catch (err) {

                    console.log(
                      'ERROR ELIMINANDO',
                      err
                    );
                  }
                }}

                hitSlop={10}
              >
                <Trash
                  size={22}
                  color={colors.danger}
                />
              </AnimatedPressable>
            </View>

          ) : (

            <View style={S.header}>

              <View
                style={{
                  gap: 2
                }}
              >
                <Text style={S.greeting}>
                  Bienvenido de nuevo
                </Text>

                <Text style={S.title}>
                  Hola, {name}
                </Text>
              </View>
            </View>
          )}

          <ScrollView
            horizontal

            showsHorizontalScrollIndicator={
              false
            }

            style={S.statScroll}

            contentContainerStyle={
              S.statRow
            }
          >

            <StatCard
              value={String(enProgreso)}
              label="Proyectos activos"
              accent
            />

            <StatCard
              value={String(pendientes)}
              label="Pendientes"
            />

            <StatCard
              value={String(completados)}
              label="Tareas completadas"
            />

            <StatCard
              value={String(proximos)}
              label="Próximos vencimientos"
            />
          </ScrollView>

          <AutomationBanner
            onPress={onAutomate}
          />

          <View style={S.sectionHeader}>

            <Text style={S.sectionTitle}>
              Proyectos activos
            </Text>

            <Text style={S.sectionCount}>
              {projects.length}
            </Text>
          </View>

          <View style={S.projectsList}>

            {projects.map(
              (p, index) => (
              <AnimatedListEntrance
                key={p.id}
                index={index}
              >

                <ProjectRow
                  project={p}

                  onOpen={() =>
                    onOpenProject(p)
                  }

                  onUpdate={
                    onUpdateProject
                  }

                  selectionMode={
                    selectionMode
                  }

                  selected={
                    selectedProjects.has(
                      p.id
                    )
                  }

                  onToggleSelect={() =>
                    toggleSelection(p.id)
                  }

                  onLongPress={() =>
                    toggleSelection(p.id)
                  }

                  token={
                    token!
                  }
                />
              </AnimatedListEntrance>
            ))}
          </View>

          <View
            style={{
              height: 100
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const S = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:
      colors.bg
  },

  scrollContent: {
    paddingHorizontal:
      spacing.lg,

    paddingTop:
      spacing.md,

    gap: 16
  },

  header: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    justifyContent:
      'space-between'
  },

  greeting: {
    fontFamily:
      fonts.regular,

    fontSize: 12,

    color:
      colors.textSecondary,

    letterSpacing: -0.2
  },

  title: {
    fontFamily:
      fonts.bold,

    fontSize: 22,

    color:
      colors.textOnDark,

    letterSpacing: -0.8
  },

  statScroll: {
    marginHorizontal:
      -spacing.lg
  },

  statRow: {
    gap: 10,

    paddingHorizontal:
      spacing.lg
  },

  statCard: {
    width: 130,

    backgroundColor:
      colors.surfaceCard,

    borderWidth: 0.4,

    borderColor:
      colors.stroke,

    borderRadius: 18,

    padding: 16,

    gap: 6
  },

  statCardAccent: {
    backgroundColor:
      colors.primaryBg,

    borderColor:
      colors.strokeBlue
  },

  statValue: {
    fontFamily:
      fonts.extrabold,

    fontSize: 28,

    color:
      colors.textOnDark,

    letterSpacing: -1
  },

  statValueAccent: {
    color:
      colors.primaryLight
  },

  statLabel: {
    fontFamily:
      fonts.regular,

    fontSize: 12,

    color:
      colors.textSecondary,

    lineHeight: 16,

    letterSpacing: -0.2
  },

  banner: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 12,

    backgroundColor:
      colors.primaryBg,

    borderWidth: 0.4,

    borderColor:
      colors.strokeBlue,

    borderRadius: 16,

    padding: 14
  },

  bannerIcon: {
    width: 34,

    height: 34,

    borderRadius: 9,

    backgroundColor:
      'rgba(59,130,246,0.2)',

    alignItems: 'center',

    justifyContent: 'center'
  },

  bannerTitle: {
    fontFamily:
      fonts.semibold,

    fontSize: 13,

    color:
      colors.textOnDark,

    letterSpacing: -0.3
  },

  bannerSubtitle: {
    fontFamily:
      fonts.regular,

    fontSize: 12,

    color:
      colors.primaryLight,

    letterSpacing: -0.2
  },

  sectionHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8
  },

  sectionTitle: {
    fontFamily:
      fonts.bold,

    fontSize: 18,

    color:
      colors.textOnDark,

    letterSpacing: -0.6,

    flex: 1
  },

  sectionCount: {
    fontFamily:
      fonts.semibold,

    fontSize: 14,

    color:
      colors.textSecondary
  },

  projectsList: {
    gap: 10
  },

  projectRowWrap: {
    backgroundColor:
      colors.surfaceCard,

    borderWidth: 0.4,

    borderColor:
      colors.stroke,

    borderRadius: 20,

    overflow: 'hidden'
  },

  projectRow: {
    flexDirection: 'row',

    alignItems: 'stretch'
  },

  projectAccentBar: {
    width: 4,

    borderRadius: 4,

    margin: 4
  },

  projectRowContent: {
    flex: 1,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 14,

    paddingVertical: 14,

    gap: 10
  },

  projectName: {
    fontFamily:
      fonts.semibold,

    fontSize: 15,

    color:
      colors.textOnDark,

    letterSpacing: -0.4
  },

  projectClient: {
    fontFamily:
      fonts.regular,

    fontSize: 12,

    color:
      colors.textSecondary,

    letterSpacing: -0.2
  },

  projectDeadline: {
    fontFamily:
      fonts.medium,

    fontSize: 12,

    color:
      colors.textSecondary
  },

  expandedPreview: {
    paddingHorizontal: 18,

    paddingBottom: 16,

    gap: 12,

    borderTopWidth: 0.4,

    borderTopColor:
      colors.stroke
  },

  previewRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between'
  },

  previewLabel: {
    fontFamily:
      fonts.regular,

    fontSize: 12,

    color:
      colors.textSecondary
  },

  previewValue: {
    fontFamily:
      fonts.medium,

    fontSize: 12,

    color:
      colors.textOnDark
  },

  previewSwatch: {
    width: 14,

    height: 14,

    borderRadius: 7
  },

  progressTrack: {
    height: 4,

    backgroundColor:
      colors.surfaceCardHi,

    borderRadius: 2,

    overflow: 'hidden'
  },

  progressFill: {
    height: 4,

    backgroundColor:
      colors.primary,

    borderRadius: 2
  },

  openProjectBtn: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 6,

    backgroundColor:
      colors.primaryBg,

    borderRadius:
      radius.pill,

    paddingHorizontal: 12,

    paddingVertical: 8
  },

  openProjectText: {
    fontFamily:
      fonts.semibold,

    fontSize: 13,

    color:
      colors.primaryLight,

    letterSpacing: -0.2
  },

  actionsRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    paddingTop: 6
  },

  quickStatusChip: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 6,

    backgroundColor:
      colors.surfaceCardHi,

    borderWidth: 0.4,

    borderColor:
      colors.stroke,

    borderRadius:
      radius.pill,

    paddingHorizontal: 10,

    paddingVertical: 6
  },

  statusDot: {
    width: 6,

    height: 6,

    borderRadius: 3,

    backgroundColor:
      colors.primaryLight
  },

  quickStatusChipText: {
    fontFamily:
      fonts.medium,

    fontSize: 12,

    color:
      colors.textSecondary,

    letterSpacing: -0.2
  },

  menuOverlay: {
    flex: 1,

    backgroundColor:
      'rgba(0,0,0,0.55)',

    justifyContent:
      'center',

    alignItems: 'center',

    padding:
      spacing.lg
  },

  menuPanel: {
    width: 220,

    backgroundColor:
      '#1C2742',

    borderWidth: 0.4,

    borderColor:
      colors.stroke,

    borderRadius: 20,

    overflow: 'hidden'
  },

  menuTitle: {
    fontFamily:
      fonts.semibold,

    fontSize: 13,

    color:
      colors.textOnDarkFaint,

    textAlign: 'center',

    paddingVertical: 12,

    borderBottomWidth: 0.4,

    borderBottomColor:
      colors.stroke
  },

  menuItem: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 10,

    paddingHorizontal: 16,

    paddingVertical: 14
  },

  menuItemText: {
    fontFamily:
      fonts.medium,

    fontSize: 14,

    color:
      colors.textOnDark,

    letterSpacing: -0.3
  },

  menuItemTextActive: {
    color:
      colors.primaryLight
  },

  menuDivider: {
    height: 0.4,

    backgroundColor:
      colors.stroke
  },

  rowStatusBadge: {
    backgroundColor:
      'rgba(59,130,246,0.15)',

    paddingHorizontal: 6,

    paddingVertical: 2,

    borderRadius:
      radius.pill
  },

  rowStatusText: {
    fontFamily:
      fonts.medium,

    fontSize: 10,

    color:
      colors.primaryLight
  },

  selectionHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    paddingVertical: 4,

    height: 40,
  },

  selectionTitle: {
    fontFamily:
      fonts.semibold,

    fontSize: 16,

    color:
      colors.textOnDark,
  },

  selectionCancelText: {
    fontFamily:
      fonts.medium,

    fontSize: 15,

    color:
      colors.primaryLight,
  },
});