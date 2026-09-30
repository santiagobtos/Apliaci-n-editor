import { useState, useEffect } from 'react';
import {
  LayoutAnimation,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CalendarBlank,
  CaretDown,
  CaretRight,
  CheckCircle,
  CircleIcon,
  DotsThree,
  Lightning,
  Package,
  PencilSimple,
  Trash,
  Warning,
} from 'phosphor-react-native';

import type {
  Deliverable,
  Project,
  ProjectStatus,
} from '../types';

import {
  colors,
  fonts,
  radius,
  spacing,
} from '../theme';

import { AnimatedPressable } from '../components/AnimatedPressable';
import { AnimatedListEntrance } from '../components/AnimatedListEntrance';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  project:         Project;
  onEdit:          (p: Project) => void;
  onDelete:        (p: Project) => void;
  onUpdateProject: (p: Project) => void;
  onClassify?:     () => void;
}

const STATUS_OPTIONS: {
  label: string;
  value: ProjectStatus;
}[] = [
  { label: 'Pendiente', value: 'pendiente' },
  { label: 'En progreso', value: 'en progreso' },
  { label: 'Completado', value: 'completado' },
];

const formatShortDate = (
  d: Date | string
) => {
  if (!d) return '';

  const date =
    d instanceof Date
      ? d
      : new Date(d);

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
    'dic',
  ];

  return `${date.getDate()} ${
    months[date.getMonth()]
  }`;
};

const calculateProgress = (dels?: Deliverable[]) => {
  if (!dels || dels.length === 0) return 0;

  return Math.round(
    (dels.filter(x => x.done).length / dels.length) * 100
  );
};

function ProgressBar({
  progress,
}: {
  progress: number;
}) {
  return (
    <View style={S.progressTrack}>
      <View
        style={[
          S.progressFill,
          { width: `${progress}%` },
        ]}
      />
    </View>
  );
}

function DeliverableRow({
  label,
  done,
  onPress,
}: {
  label: string;
  done: boolean;
  onPress: () => void;
}) {
  const statusColor = done
    ? colors.success
    : colors.textSecondary;

  return (
    <AnimatedPressable
      onPress={onPress}
      style={S.deliverableRow}
    >
      {done ? (
        <CheckCircle
          size={18}
          color={statusColor}
          weight="fill"
        />
      ) : (
        <CircleIcon
          size={18}
          color={statusColor}
          weight="regular"
        />
      )}

      <Text
        style={[
          S.deliverableLabel,
          done && S.deliverableDone,
        ]}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

export function ProjectDetailScreen({
  project,
  onEdit,
  onDelete,
  onUpdateProject,
  onClassify,
}: Props) {
  const [menuVisible, setMenuVisible] =
    useState(false);

  const [deleteConfirm, setDeleteConfirm] =
    useState(false);

  const [notesExpanded, setNotesExpanded] =
    useState(false);

  const [linksExpanded, setLinksExpanded] =
    useState(false);

  // Reset local UI state whenever the project changes (prevents stale expanded/modal state)
  useEffect(() => {
    setMenuVisible(false);
    setDeleteConfirm(false);
    setNotesExpanded(false);
    setLinksExpanded(false);
  }, [project.id]);

  const handleDelete = () => {
    setDeleteConfirm(false);
    onDelete(project);
  };

  const toggleNotes = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setNotesExpanded(prev => !prev);
  };

  const toggleLinks = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setLinksExpanded(prev => !prev);
  };

  const openLink = async (link: string) => {
    try {
      let url = link.trim();

      if (
        !url.startsWith('http://') &&
        !url.startsWith('https://')
      ) {
        url = `https://${url}`;
      }

      const supported =
        await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log('Error opening URL:', error);
    }
  };

  const currentStatusLabel =
    STATUS_OPTIONS.find(
      o => o.value === project.status
    )?.label || 'En progreso';

  return (
    <View style={S.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View
          style={[
            S.hero,
            {
              backgroundColor:
                project.colors[0],
            },
          ]}
        >
          <SafeAreaView>
            <View style={S.heroBarSpacer} />

            <View style={S.heroContent}>
              <View style={S.statusBadge}>
                <View style={S.statusDot} />

                <Text style={S.statusText}>
                  {currentStatusLabel}
                </Text>
              </View>

              <Text style={S.heroTitle}>
                {project.name}
              </Text>

              <Text style={S.heroClient}>
                {project.client}
              </Text>

              <View style={S.heroProgress}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent:
                      'space-between',
                  }}
                >
                  <Text
                    style={
                      S.heroProgressLabel
                    }
                  >
                    Progreso general
                  </Text>

                  <Text
                    style={S.heroProgressPct}
                  >
                    {project.progress}%
                  </Text>
                </View>

                <ProgressBar
                  progress={project.progress}
                />
              </View>

              <View style={S.heroMeta}>
                <View style={S.metaChip}>
                  <View
                    style={S.metaChipContent}
                  >
                    <CalendarBlank
                      size={13}
                      color="#fff"
                      weight="bold"
                    />

                    <Text
                      style={S.metaChipText}
                    >
                      Entrega:{' '}
                      {formatShortDate(
                        project.deadline
                      )}
                    </Text>
                  </View>
                </View>

                <View style={S.metaChip}>
                  <View
                    style={S.metaChipContent}
                  >
                    <Package
                      size={13}
                      color="#fff"
                      weight="bold"
                    />

                    <Text
                      style={S.metaChipText}
                    >
                      {project
                        .deliverables?.length ||
                        0}{' '}
                      entregables
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* BODY */}
        <View style={S.body}>
          {/* ESTADO */}
          <View style={S.section}>
            <Text style={S.sectionTitle}>
              Estado
            </Text>

            <View style={S.statusSelectorRow}>
              {STATUS_OPTIONS.map(opt => {
                const isActive =
                  project.status ===
                  opt.value;

                return (
                  <AnimatedPressable
                    key={opt.value}
                    onPress={() =>
                      onUpdateProject({
                        ...project,
                        status: opt.value,
                        progress:
                          opt.value ===
                          'completado'
                            ? 100
                            : calculateProgress(
                                project.deliverables
                              ),
                      })
                    }
                    style={[
                      S.statusSelectBtn,

                      isActive &&
                        opt.value ===
                          'pendiente' &&
                        S.statusSelectBtnPending,

                      isActive &&
                        opt.value ===
                          'en progreso' &&
                        S.statusSelectBtnProgress,

                      isActive &&
                        opt.value ===
                          'completado' &&
                        S.statusSelectBtnSuccess,
                    ]}
                  >
                    <Text
                      style={[
                        S.statusSelectBtnText,

                        isActive &&
                          opt.value ===
                            'pendiente' &&
                          S.statusSelectTextPending,

                        isActive &&
                          opt.value ===
                            'en progreso' &&
                          S.statusSelectTextProgress,

                        isActive &&
                          opt.value ===
                            'completado' &&
                          S.statusSelectTextSuccess,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </AnimatedPressable>
                );
              })}
            </View>
          </View>

          {/* BRANDING */}
          <View style={S.section}>
            <Text style={S.sectionTitle}>
              Branding
            </Text>

            <View style={S.sectionCard}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent:
                    'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                  }}
                >
                  {project.colors.map(c => (
                    <View
                      key={c}
                      style={[
                        S.brandSwatch,
                        {
                          backgroundColor: c,
                          borderWidth:
                            c.startsWith(
                              '#F'
                            ) ||
                            c.startsWith(
                              '#E'
                            ) ||
                            c.startsWith(
                              '#D'
                            ) ||
                            c.startsWith(
                              '#C'
                            )
                              ? 0.4
                              : 0,
                          borderColor:
                            colors.stroke,
                        },
                      ]}
                    />
                  ))}
                </View>

                <View style={S.typoSample}>
                  <Text
                    style={[
                      S.typoText,
                      {
                        color:
                          project.colors[0],
                      },
                    ]}
                  >
                    Aa
                  </Text>
                </View>
              </View>

              <Text style={S.brandFontName}>
                {project.typography}
              </Text>
            </View>
          </View>

          {/* ENTREGABLES */}
          <View style={S.section}>
            <Text style={S.sectionTitle}>
              Entregables
            </Text>

            <View style={S.sectionCard}>
              {project.deliverables
                ?.length > 0 ? (
                project.deliverables.map(
                  (d, i) => (
                    <AnimatedListEntrance
                      key={i}
                      index={i}
                    >
                      <DeliverableRow
                        label={d.label}
                        done={d.done}
                        onPress={() => {
                          const newDels = [
                            ...project.deliverables,
                          ];

                          newDels[i] = {
                            ...d,
                            done: !d.done,
                          };

                          const progress =
                            calculateProgress(
                              newDels
                            );

                          onUpdateProject({
                            ...project,
                            deliverables:
                              newDels,
                            progress,

                            status:
                              progress ===
                              100
                                ? 'completado'
                                : project.status ===
                                  'completado'
                                ? 'en progreso'
                                : project.status,
                          });
                        }}
                      />
                    </AnimatedListEntrance>
                  )
                )
              ) : (
                <Text style={S.notesText}>
                  No hay entregables
                  configurados.
                </Text>
              )}
            </View>
          </View>

          {/* EQUIPO */}
          <View style={S.section}>
            <Text style={S.sectionTitle}>
              Equipo
            </Text>

            <View style={S.sectionCard}>
              {project.members &&
              project.members.length >
                0 ? (
                <View style={S.memberRow}>
                  {project.members.map(
                    m => (
                      <View
                        key={m.id}
                        style={
                          S.memberChip
                        }
                      >
                        <View
                          style={[
                            S.memberAvatar,
                            {
                              backgroundColor:
                                m.color,
                            },
                          ]}
                        >
                          <Text
                            style={
                              S.memberAvatarText
                            }
                          >
                            {m.name
                              .charAt(0)
                              .toUpperCase()}
                          </Text>
                        </View>

                        <View
                          style={{
                            flex: 1,
                          }}
                        >
                          <Text
                            style={
                              S.memberChipText
                            }
                          >
                            {m.name}
                          </Text>

                          <Text
                            style={
                              S.memberRole
                            }
                          >
                            {m.role ===
                            'owner'
                              ? 'Propietario'
                              : 'Miembro'}
                          </Text>
                        </View>
                      </View>
                    )
                  )}
                </View>
              ) : (
                <Text style={S.notesText}>
                  Sin miembros asignados.
                </Text>
              )}
            </View>
          </View>

          {/* NOTAS */}
          <View style={S.section}>
            <View style={S.sectionHeader}>
              <Text style={S.sectionTitle}>
                Notas
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={toggleNotes}
                style={S.expandBtn}
              >
                <Text
                  style={S.expandBtnText}
                >
                  {notesExpanded
                    ? 'Ocultar'
                    : 'Ver más'}
                </Text>

                {notesExpanded ? (
                  <CaretDown
                    size={14}
                    color={
                      colors.primaryLight
                    }
                    weight="bold"
                  />
                ) : (
                  <CaretRight
                    size={14}
                    color={
                      colors.primaryLight
                    }
                    weight="bold"
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={S.sectionCard}>
              <Text
                style={S.notesText}
                numberOfLines={
                  notesExpanded
                    ? undefined
                    : 3
                }
              >
                {project.notes ||
                  'Sin notas.'}
              </Text>
            </View>
          </View>

          {/* ENLACES */}
          <View style={S.section}>
            <View style={S.sectionHeader}>
              <Text style={S.sectionTitle}>
                Enlaces
              </Text>

              {project.links?.length >
                0 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={toggleLinks}
                  style={S.expandBtn}
                >
                  <Text
                    style={
                      S.expandBtnText
                    }
                  >
                    {linksExpanded
                      ? 'Ocultar'
                      : 'Ver todos'}
                  </Text>

                  {linksExpanded ? (
                    <CaretDown
                      size={14}
                      color={
                        colors.primaryLight
                      }
                      weight="bold"
                    />
                  ) : (
                    <CaretRight
                      size={14}
                      color={
                        colors.primaryLight
                      }
                      weight="bold"
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>

            <View style={S.sectionCard}>
              {project.links?.length >
              0 ? (
                (linksExpanded
                  ? project.links
                  : project.links.slice(
                      0,
                      2
                    )
                ).map(link => (
                  <TouchableOpacity
                    key={link}
                    activeOpacity={0.7}
                    style={S.linkRow}
                    onPress={() =>
                      openLink(link)
                    }
                  >
                    <Text
                      style={S.linkText}
                      numberOfLines={1}
                    >
                      {link}
                    </Text>

                    <CaretRight
                      size={12}
                      color={
                        colors.primaryLight
                      }
                      weight="bold"
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={S.notesText}>
                  No hay enlaces
                  configurados.
                </Text>
              )}
            </View>
          </View>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      {/* TOP RIGHT MENU */}
      <SafeAreaView
        edges={['top']}
        style={S.fixedTopBar}
        pointerEvents="box-none"
      >
        <View
          style={S.fixedTopRow}
          pointerEvents="box-none"
        >
          <View style={{ flex: 1 }} />

          <TouchableOpacity
            onPress={() =>
              setMenuVisible(true)
            }
            activeOpacity={0.6}
            style={S.heroMenuBtn}
            hitSlop={{
              top: 14,
              bottom: 14,
              left: 14,
              right: 14,
            }}
          >
            <DotsThree
              size={24}
              color="#fff"
              weight="bold"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* MENU MODAL */}
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
          <View
            style={S.menuPanel}
            onStartShouldSetResponder={() =>
              true
            }
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setMenuVisible(false);
                onEdit(project);
              }}
              style={S.menuItem}
            >
              <PencilSimple
                size={18}
                color={
                  colors.textOnDark
                }
                weight="regular"
              />

              <Text style={S.menuItemText}>
                Editar proyecto
              </Text>
            </TouchableOpacity>

            <View style={S.menuDivider} />

            {onClassify && (
              <>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setMenuVisible(false);
                    onClassify();
                  }}
                  style={S.menuItem}
                >
                  <Lightning
                    size={18}
                    color={colors.primaryLight}
                    weight="fill"
                  />
                  <Text style={[S.menuItemText, { color: colors.primaryLight }]}>
                    Clasificar mensajes IA
                  </Text>
                </TouchableOpacity>
                <View style={S.menuDivider} />
              </>
            )}

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setMenuVisible(false);
                setDeleteConfirm(
                  true
                );
              }}
              style={S.menuItem}
            >
              <Trash
                size={18}
                color={colors.danger}
                weight="regular"
              />

              <Text
                style={[
                  S.menuItemText,
                  {
                    color:
                      colors.danger,
                  },
                ]}
              >
                Eliminar proyecto
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        transparent
        visible={deleteConfirm}
        animationType="fade"
        onRequestClose={() =>
          setDeleteConfirm(false)
        }
      >
        <Pressable
          style={S.overlay}
          onPress={() =>
            setDeleteConfirm(false)
          }
        >
          <View
            style={S.dialog}
            onStartShouldSetResponder={() =>
              true
            }
          >
            <View style={S.dialogIconBox}>
              <Trash
                size={17}
                color="#F87171"
                weight="regular"
              />
            </View>

            <View style={S.dialogTextBlock}>
              <Text style={S.dialogTitle}>
                Eliminar proyecto
              </Text>

              <Text style={S.dialogBody}>
                <Text style={S.dialogName}>
                  "{project.name}"
                </Text>{' '}
                se eliminará
                permanentemente.
              </Text>
            </View>

            <View style={S.dialogWarning}>
              <Warning
                size={13}
                color="rgba(248,113,113,0.6)"
                weight="regular"
              />

              <Text
                style={
                  S.dialogWarningText
                }
              >
                Esta acción no se
                puede deshacer.
              </Text>
            </View>

            <View style={S.dialogActions}>
              <AnimatedPressable
                onPress={handleDelete}
                style={S.btnDelete}
              >
                <Text
                  style={S.btnDeleteText}
                >
                  Eliminar
                </Text>
              </AnimatedPressable>

              <AnimatedPressable
                onPress={() =>
                  setDeleteConfirm(
                    false
                  )
                }
                style={S.btnCancel}
              >
                <Text
                  style={S.btnCancelText}
                >
                  Cancelar
                </Text>
              </AnimatedPressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const S = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  hero: {
    paddingBottom: 28,
  },

  heroBarSpacer: {
    height: 52,
  },

  fixedTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  fixedTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: 8,
    paddingBottom: 4,
  },

  heroMenuBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor:
      'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: 16,
    gap: 14,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor:
      'rgba(0,0,0,0.25)',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },

  statusText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: '#fff',
    letterSpacing: 0.2,
  },

  heroTitle: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: '#fff',
    letterSpacing: -1,
    lineHeight: 33,
  },

  heroClient: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color:
      'rgba(255,255,255,0.75)',
    letterSpacing: -0.3,
  },

  heroProgress: {
    gap: 8,
  },

  heroProgressLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color:
      'rgba(255,255,255,0.75)',
  },

  heroProgressPct: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: '#fff',
  },

  progressTrack: {
    height: 5,
    backgroundColor:
      'rgba(255,255,255,0.25)',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 3,
  },

  heroMeta: {
    flexDirection: 'row',
    gap: 8,
  },

  metaChip: {
    backgroundColor:
      'rgba(0,0,0,0.20)',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  metaChipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  metaChipText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: '#fff',
  },

  body: {
    paddingHorizontal: spacing.lg,
    paddingTop: 24,
    gap: 20,
  },

  section: {
    gap: 10,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
  },

  expandBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  expandBtnText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.primaryLight,
  },

  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.textOnDark,
    letterSpacing: -0.5,
  },

  sectionCard: {
    backgroundColor:
      colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },

  brandSwatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  typoSample: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor:
      colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  typoText: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },

  brandFontName: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textSecondary,
    letterSpacing: -0.2,
  },

  deliverableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  deliverableLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textOnDark,
    flex: 1,
    letterSpacing: -0.2,
  },

  deliverableDone: {
    color: colors.textSecondary,
    textDecorationLine:
      'line-through',
  },

  notesText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color:
      colors.textOnDarkMuted,
    lineHeight: 21,
    letterSpacing: -0.2,
  },

  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },

  linkText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.primaryLight,
    letterSpacing: -0.2,
  },

  memberRow: {
    flexDirection: 'column',
    gap: 12,
  },

  memberChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  memberAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  memberAvatarText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#fff',
  },

  memberChipText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.textOnDark,
  },

  memberRole: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },

  menuOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    paddingBottom: 100,
    paddingRight: 20,
    alignItems: 'flex-end',
  },

  menuPanel: {
    backgroundColor: colors.bgSoft,
    borderWidth: 0.4,
    borderColor: colors.stroke,
    borderRadius: 18,
    overflow: 'hidden',
    minWidth: 200,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  menuItemText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.textOnDark,
    letterSpacing: -0.3,
  },

  menuDivider: {
    height: 0.4,
    backgroundColor: colors.stroke,
    marginHorizontal: 12,
  },

  statusSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },

  statusSelectBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radius.pill,
    backgroundColor:
      colors.surfaceCard,
    borderWidth: 0.4,
    borderColor: colors.stroke,
  },

  statusSelectBtnText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textSecondary,
    letterSpacing: -0.2,
  },

  statusSelectBtnProgress: {
    backgroundColor:
      colors.primaryBg,
    borderColor:
      colors.strokeBlue,
    borderWidth: 1.5,
  },

  statusSelectTextProgress: {
    color: colors.primaryLight,
  },

  statusSelectBtnPending: {
    backgroundColor:
      'rgba(245,158,11,0.15)',
    borderColor: colors.warning,
    borderWidth: 1.5,
  },

  statusSelectTextPending: {
    color: colors.warning,
  },

  statusSelectBtnSuccess: {
    backgroundColor:
      'rgba(16,185,129,0.15)',
    borderColor: colors.success,
    borderWidth: 1.5,
  },

  statusSelectTextSuccess: {
    color: colors.success,
  },

  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dialog: {
    width: '82%',
    backgroundColor: '#111827',
    borderRadius: 26,
    padding: 22,
    gap: 20,
    borderWidth: 0.5,
    borderColor:
      'rgba(255,255,255,0.07)',
  },

  dialogIconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor:
      'rgba(239,68,68,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dialogTextBlock: {
    gap: 6,
  },

  dialogTitle: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: '#fff',
    letterSpacing: -0.4,
  },

  dialogBody: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color:
      'rgba(255,255,255,0.35)',
    lineHeight: 20,
    letterSpacing: -0.1,
  },

  dialogName: {
    fontFamily: fonts.medium,
    color:
      'rgba(255,255,255,0.58)',
  },

  dialogWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  dialogWarningText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color:
      'rgba(248,113,113,0.5)',
    letterSpacing: -0.1,
  },

  dialogActions: {
    gap: 8,
  },

  btnDelete: {
    height: 50,
    borderRadius: 14,
    backgroundColor:
      'rgba(239,68,68,0.13)',
    borderWidth: 0.5,
    borderColor:
      'rgba(239,68,68,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnDeleteText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: '#F87171',
    letterSpacing: -0.3,
  },

  btnCancel: {
    height: 50,
    borderRadius: 14,
    backgroundColor:
      'rgba(255,255,255,0.04)',
    borderWidth: 0.5,
    borderColor:
      'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnCancelText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color:
      'rgba(255,255,255,0.35)',
    letterSpacing: -0.2,
  },
}); 