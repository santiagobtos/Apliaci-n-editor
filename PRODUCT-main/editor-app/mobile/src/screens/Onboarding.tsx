import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Alert,
  BackHandler,
  Keyboard,
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import type {
  AppScreen,
  Project,
  ProjectDraft,
  TeamMember
} from '../types';

import { SwipeBack } from '../components/SwipeBack';

import { WelcomeScreen } from './WelcomeScreen';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';
import { NameScreen } from './NameScreen';
import { ValuePropScreen } from './ValuePropScreen';
import { AutoFlowScreen } from './AutoFlowScreen';
import { ManualFlowScreen } from './ManualFlowScreen';
import { HomeEmptyScreen } from './HomeEmptyScreen';
import { NewProjectScreen } from './NewProjectScreen';
import { HomeActiveScreen } from './HomeActiveScreen';
import { ProjectDetailScreen } from './ProjectDetailScreen';
import { ProfileScreen } from './ProfileScreen';
import { ClassifierScreen } from './ClassifierScreen';
import type { ProjectPatch } from './ClassifierScreen';

import { useAuthStore } from '../shared/auth.store';
import { projectsApi, adaptProject } from '../shared/api';

import {
  House,
  Plus,
  UserCircle,
} from 'phosphor-react-native';

const EMPTY_DRAFT: ProjectDraft = {
  name: '',
  colors: ['#3B82F6', '#0F1729', '#F8FAFC'],
  typography: 'Plus Jakarta Sans',
  startDate: new Date(),
  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  deliverables: [],
  notes: '',
  links: [],
  status: 'pendiente',
  members: [],
};

const ROOT_SCREENS: AppScreen[] = [
  'welcome',
  'home',
  'homeactive',
  'login',
  'register'
];

export function Onboarding() {
  const {
    token,
    userName: storedName,
    logout,
    setActiveProject: setActiveProjectStore,
    saveProjects,
    loadProjects,
  } = useAuthStore();

  const [history, setHistory] = useState<AppScreen[]>(['welcome']);
  const isForward = useRef(true);

  const [projects, setProjects] =
  useState<Project[]>([]);

const [activeProjectId, setActiveProjectId] =
  useState<string | null>(null);

const activeProject =
  projects.find(
    p => p.id === activeProjectId
  ) || null;
  const [draft, setDraft] =
    useState<ProjectDraft>(EMPTY_DRAFT);

  const [userName, setUserName] = useState('');

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const screen = history[history.length - 1];

  const canGoBack =
    history.length > 1 &&
    !ROOT_SCREENS.includes(screen);

  const go = useCallback((s: AppScreen) => {
    isForward.current = true;
    setHistory(prev => [...prev, s]);
  }, []);

  const reset = useCallback((s: AppScreen) => {
    isForward.current = true;
    setHistory([s]);
  }, []);

  const goBack = useCallback(() => {
    isForward.current = false;

    setHistory(prev =>
      prev.length > 1
        ? prev.slice(0, -1)
        : prev
    );
  }, []);

  const homeScreen = (): AppScreen =>
    projects.length > 0
      ? 'homeactive'
      : 'home';

  useEffect(() => {
    const sub = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (canGoBack) {
          goBack();
          return true;
        }

        return false;
      }
    );

    return () => sub.remove();
  }, [canGoBack, goBack]);

  // On mount: if there's already a token (session restored by auth.store),
  // load cached projects immediately so the UI isn't empty while the API call runs,
  // then refresh from the server in the background.
  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    const bootstrap = async () => {
      // 1. Paint cached projects instantly (offline-first)
      const cached = await loadProjects();
      if (cached && cached.length > 0 && !cancelled) {
        setProjects(cached);
        setUserName(storedName || '');
        reset('homeactive');
      }

      // 2. Refresh from server
      try {
        const data = await projectsApi.list(token);
        if (cancelled) return;
        const fresh = data.map(adaptProject).map(p => ({
          ...p,
          startDate: new Date(p.startDate),
          deadline:  new Date(p.deadline),
        }));
        setProjects(fresh);
        await saveProjects(fresh);
        if (!cancelled) {
          reset(fresh.length > 0 ? 'homeactive' : 'home');
        }
      } catch {
        // Server unreachable — cached data already shown, stay there
      }
    };

    bootstrap();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs only once on mount

  const renderScreen = (s: AppScreen) => {
    switch (s) {

      case 'welcome':
        return (
          <WelcomeScreen
            onGoogle={() =>
              Linking.openURL(
                'http://192.168.1.11:8000/api/auth/google'
              )
            }
            onEmail={() => go('login')}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onLogin={async (email) => {
              const {
                token: newToken
              } = useAuthStore.getState();

              setUserName(
                useAuthStore.getState().userName ||
                email.split('@')[0]
              );

              if (newToken) {
                try {
                  const data =
                    await projectsApi.list(newToken);

                  const adapted = data
  .map(adaptProject)
  .map(p => ({
    ...p,
    startDate: new Date(p.startDate),
    deadline: new Date(p.deadline),
  }));
                  setProjects(adapted);
                  await saveProjects(adapted);

                  reset(
                    adapted.length > 0
                      ? 'homeactive'
                      : 'home'
                  );
                } catch {
                  reset('home');
                }
              } else {
                reset('home');
              }
            }}

            onGoSignUp={() => go('register')}
          />
        );

      case 'register':
        return (
          <RegisterScreen
            onRegister={async () => {
              const {
                token: newToken,
                userName: newName
              } = useAuthStore.getState();

              setUserName(newName || '');

              if (newToken) {
                try {
                  const data =
                    await projectsApi.list(newToken);

                  const adapted = data
  .map(adaptProject)
  .map(p => ({
    ...p,
    startDate: new Date(p.startDate),
    deadline: new Date(p.deadline),
  }));
                  setProjects(adapted);
                  await saveProjects(adapted);

                  reset(
                    adapted.length > 0
                      ? 'homeactive'
                      : 'home'
                  );
                } catch {
                  reset('home');
                }
              } else {
                reset('home');
              }
            }}

            onGoLogin={() => go('login')}
          />
        );

      case 'valueprop':
        return (
          <ValuePropScreen
            onAuto={() => go('auto')}
            onManual={() => go('manual')}
            onSkip={() => reset(homeScreen())}
          />
        );

      case 'auto':
        return (
          <AutoFlowScreen
            onDone={() => reset(homeScreen())}
          />
        );

      case 'manual':
        return (
          <ManualFlowScreen
            onDone={() => reset('home')}
          />
        );

      case 'home':
        return (
          <HomeEmptyScreen
            name={userName || 'tú'}
            onNewProject={() => { setDraft({ ...EMPTY_DRAFT }); go('newproject'); }}
            onAutomate={() => go('auto')}
            onProfile={() => go('profile')}
          />
        );

      case 'newproject':
        return (
          <NewProjectScreen
            draft={draft}
            setDraft={setDraft}
            isEdit={false}
            teamMembers={teamMembers}

            onSave={async d => {
              if (token) {
                try {
                  const created =
                   await projectsApi.create(
  {
    name: d.name || 'Nuevo proyecto',

    startDate: d.startDate,

    notes: d.notes,

    links: d.links,

    colors: d.colors,

    typography: d.typography,

    deadline: d.deadline,

    deliverables: d.deliverables,

    members: d.members,

    status: d.status,
  },
  token
);
                  const p = {
                    ...adaptProject(created),
                    startDate: new Date(adaptProject(created).startDate),
                    deadline: new Date(adaptProject(created).deadline),
                  };

                  const nextProjects = [p, ...projects];
                  setProjects(nextProjects);
                  await saveProjects(nextProjects);
                  setDraft({ ...EMPTY_DRAFT });
                  reset('homeactive');

                } catch (e: any) {
                  Alert.alert(
                    'Error',
                    e.message ||
                    'No se pudo crear el proyecto'
                  );
                }

              } else {

                const p: Project = {
                  id: Date.now().toString(),
                  name: d.name || 'Nuevo proyecto',
                  client: 'Tú',
                  deliverables: d.deliverables,
                  colors: d.colors,
                  typography: d.typography || 'Plus Jakarta Sans',
                  startDate: d.startDate,
                  deadline: d.deadline,
                  progress: d.status === 'completado' ? 100 : 5,
                  status: d.status,
                  notes: d.notes,
                  links: d.links,
                  members: d.members,
                };

                const nextProjects = [p, ...projects];
                setProjects(nextProjects);
                await saveProjects(nextProjects);
                setDraft({ ...EMPTY_DRAFT });
                reset('homeactive');
              }
            }}
          />
        );

      case 'homeactive':
  return (
    <HomeActiveScreen
      name={userName || storedName || 'tú'}
      projects={projects}
      onNewProject={() => { setDraft({ ...EMPTY_DRAFT }); go('newproject'); }}
      onAutomate={() => go('auto')}
      onOpenProject={async p => {
        setActiveProjectId(p.id);
        if (token) {
          await projectsApi.setActive(p.id, token).catch(console.error);
          await setActiveProjectStore(p.id, p.name);
        }
        go('detail');
      }}
      onUpdateProject={updated => {
        const next = projects.map(x => x.id === updated.id ? updated : x);
        setProjects(next);
        saveProjects(next);
      }}
      onDeleteProjects={async ids => {
        for (const id of ids) {
          if (token) {
            await projectsApi.delete(id, token).catch(console.error);
          }
        }
        const remaining = projects.filter(x => !ids.includes(x.id));
        setProjects(remaining);
        await saveProjects(remaining);
        setActiveProjectId(null);
        if (remaining.length === 0) {
          reset('home');
        }
      }}
      onProfile={() => go('profile')}
    />
  );

      case 'detail': {
        if (!activeProject) return null;
        return (
          <ProjectDetailScreen
            project={activeProject}

            onEdit={p => {
              setDraft({
                name: p.name,
                colors: [...p.colors],
                typography: p.typography,
                startDate: new Date(p.startDate),
                deadline: new Date(p.deadline),
                deliverables: p.deliverables.map(d => ({ ...d })),
                notes: p.notes,
                links: [...(p.links || [])],
                status: p.status,
                members: [...(p.members || [])],
              });

              go('edit');
            }}

            onDelete={async p => {
              try {

                if (token) {
                  await projectsApi.delete(
                    p.id,
                    token
                  );
                }

                const remaining = projects.filter(x => x.id !== p.id);
                setProjects(remaining);
                await saveProjects(remaining);
                setActiveProjectId(null);
                if (remaining.length === 0) {
                  reset('home');
                } else {
                  reset('homeactive');
                }

              } catch (e: any) {

                Alert.alert(
                  'Error',
                  e.message ||
                  'No se pudo eliminar el proyecto'
                );
              }
            }}

            onUpdateProject={updated => {
              const next = projects.map(x => x.id === updated.id ? updated : x);
              setProjects(next);
              saveProjects(next);
              setActiveProjectId(updated.id);
            }}

            onClassify={() => go('classifier')}
          />
        );
      }

      case 'edit':
        return (
          <NewProjectScreen
            draft={draft}
            setDraft={setDraft}
            isEdit={true}

onSave={async d => {

  if (activeProject) {

    const updated: Project = {
      ...activeProject,

      name:
        d.name ||
        activeProject.name,

      colors: d.colors,

      typography: d.typography,

      startDate: d.startDate,

      deadline: d.deadline,

      deliverables: d.deliverables,

      status: d.status,

      progress:
        d.status === 'completado'
          ? 100
          : d.status === 'en progreso'
          ? 0
          : 50,

      notes: d.notes,

      links: d.links,

      members: d.members,
    };

    try {

      if (token) {

        await projectsApi.update(
          activeProject.id,
          {
            name: updated.name,

            description:
              updated.client,

            status:
              updated.status,

            notes:
              updated.notes,

            links:
              updated.links,

            colors:
              updated.colors,

            typography:
              updated.typography,

            deadline:
              updated.deadline,

            deliverables:
              updated.deliverables,

            members:
              updated.members,
          },
          token
        );
      }

      const next = projects.map(x =>
        x.id === activeProject.id ? updated : x
      );
      setProjects(next);
      await saveProjects(next);
      setActiveProjectId(updated.id);
      setDraft({ ...EMPTY_DRAFT });
      goBack();

    } catch (e: any) {

      Alert.alert(
        'Error',
        e.message ||
        'No se pudo actualizar el proyecto'
      );
    }
  }
            }}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            name={userName || storedName || 'tú'}

            plan="Plus"

            projects={projects}

            teamMembers={teamMembers}

            onUpdateTeamMembers={
              setTeamMembers
            }

            onLogout={async () => {
              await logout(); // clears all AsyncStorage keys including cached_projects
              setUserName('');
              setProjects([]);
              setActiveProjectId(null);
              reset('welcome');
            }}
          />
        );

      case 'classifier':
        if (!activeProject) return null;
        return (
          <ClassifierScreen
            projectId={activeProject.id}
            projectName={activeProject.name}
            onBack={goBack}
            onApply={async (patch: ProjectPatch) => {
              const updated = {
                ...activeProject,
                ...(patch.notes !== undefined && {
                  notes: activeProject.notes
                    ? `${activeProject.notes}

--- IA ---
${patch.notes}`
                    : patch.notes,
                }),
                ...(patch.deadline !== undefined && { deadline: patch.deadline }),
                ...(patch.status   !== undefined && { status:   patch.status   }),
                ...(patch.deliverables && patch.deliverables.length > 0 && {
                  deliverables: [
                    ...activeProject.deliverables,
                    ...patch.deliverables.filter(nd =>
                      !activeProject.deliverables.some(ed => ed.label === nd.label)
                    ),
                  ],
                }),
                ...(patch.links && patch.links.length > 0 && {
                  links: Array.from(new Set([
                    ...(activeProject.links ?? []),
                    ...patch.links,
                  ])),
                }),
              };
              // Persist locally
              const next = projects.map(p => p.id === activeProject.id ? updated : p);
              setProjects(next);
              await saveProjects(next);
              // Persist to server
              if (token) {
                projectsApi.update(activeProject.id, {
                  notes:        updated.notes,
                  deadline:     updated.deadline,
                  status:       updated.status,
                  deliverables: updated.deliverables,
                  links:        updated.links,
                }, token).catch(console.error);
              }
              goBack();
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={S.root}>
      {history.map((s, index) => {

        const isCurrent =
          index === history.length - 1;

        const isPrevious =
          index === history.length - 2;

        if (!isCurrent && !isPrevious) {
          return null;
        }

        return (
          <View
            key={`${s}-${index}`}
            style={[
              StyleSheet.absoluteFill,
              {
                zIndex:
                  isCurrent ? 1 : 0
              }
            ]}
          >
            <SwipeBack
              onBack={goBack}
              enabled={canGoBack && isCurrent}
              screenKey={`${s}-${index}`}
              isForward={
                isForward.current &&
                isCurrent &&
                index > 0
              }
            >
              {renderScreen(s)}
            </SwipeBack>
          </View>
        );
      })}

      {[
        'home',
        'homeactive',
        
        'profile'
      ].includes(screen) && (
        <>
          <View style={S.bottomNav}>

            <TouchableOpacity
              style={S.navItem}
              onPress={() =>
                reset(
                  projects.length > 0
                    ? 'homeactive'
                    : 'home'
                )
              }
            >
              <House
                size={22}
                color="#3B82F6"
                weight="fill"
              />

              <Text style={S.navActive}>
                Inicio
              </Text>
            </TouchableOpacity>

            <View style={{ width: 72 }} />

            <TouchableOpacity
              style={S.navItem}
              onPress={() => go('profile')}
            >
              <UserCircle
                size={22}
                color="#94A3B8"
              />

              <Text style={S.navText}>
                Perfil
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => { setDraft({ ...EMPTY_DRAFT }); go('newproject'); }}
            style={S.fab}
          >
            <Plus
              size={28}
              color="#fff"
              weight="bold"
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const S = StyleSheet.create({

  root: {
    flex: 1
  },

  bottomNav: {
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,

    height: 88,

    backgroundColor: '#0F172A',

    borderTopWidth: 0.4,

    borderTopColor: '#1E293B',

    flexDirection: 'row',

    alignItems: 'flex-start',

    justifyContent: 'space-around',

    paddingTop: 12,

    paddingHorizontal: 24,

    zIndex: 999,

    elevation: 999,
  },

  navItem: {
    alignItems: 'center',
    gap: 3,
  },

  navText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },

  navActive: {
    fontSize: 11,
    color: '#3B82F6',
    fontWeight: '600',
  },

  fab: {
    position: 'absolute',

    alignSelf: 'center',

    left: '50%',

    marginLeft: -32,

    bottom: 42,

    width: 64,

    height: 64,

    borderRadius: 32,

    backgroundColor: '#3B82F6',

    alignItems: 'center',

    justifyContent: 'center',

    elevation: 1000,

    zIndex: 1000,
  },
});