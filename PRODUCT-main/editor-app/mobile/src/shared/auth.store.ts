import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Project } from '../types';

const STORAGE_KEYS = {
  TOKEN:                'auth_token',
  USER_ID:              'user_id',
  USER_NAME:            'user_name',
  ACTIVE_PROJECT_ID:    'active_project_id',
  ACTIVE_PROJECT_NAME:  'active_project_name',
  PROJECTS:             'cached_projects',
} as const;

interface AuthState {
  token:               string | null;
  userId:              string | null;
  userName:            string | null;
  activeProjectId:     string | null;
  activeProjectName:   string | null;
  isLoading:           boolean;

  setAuth:             (token: string, userId: string, userName: string) => Promise<void>;
  setActiveProject:    (id: string, name: string) => Promise<void>;
  saveProjects:        (projects: Project[]) => Promise<void>;
  loadProjects:        () => Promise<Project[] | null>;
  loadFromStorage:     () => Promise<void>;
  logout:              () => Promise<void>;
}

// Serialize/deserialize dates because AsyncStorage only stores strings
function serializeProjects(projects: Project[]): string {
  return JSON.stringify(projects.map(p => ({
    ...p,
    startDate: p.startDate instanceof Date ? p.startDate.toISOString() : p.startDate,
    deadline:  p.deadline  instanceof Date ? p.deadline.toISOString()  : p.deadline,
  })));
}

function deserializeProjects(raw: string): Project[] {
  const parsed = JSON.parse(raw) as any[];
  return parsed.map(p => ({
    ...p,
    startDate: new Date(p.startDate),
    deadline:  new Date(p.deadline),
  }));
}

export const useAuthStore = create<AuthState>((set) => ({
  token:               null,
  userId:              null,
  userName:            null,
  activeProjectId:     null,
  activeProjectName:   null,
  isLoading:           true,

  setAuth: async (token, userId, userName) => {
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TOKEN,    token],
        [STORAGE_KEYS.USER_ID,  userId],
        [STORAGE_KEYS.USER_NAME, userName],
      ]);
      // Clear any leftover active project from a previous session/user
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACTIVE_PROJECT_ID,
        STORAGE_KEYS.ACTIVE_PROJECT_NAME,
      ]);
    } catch (e) {
      console.warn('[auth.store] setAuth storage error:', e);
    }
    set({
      token,
      userId,
      userName,
      activeProjectId:   null,
      activeProjectName: null,
    });
  },

  setActiveProject: async (id, name) => {
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.ACTIVE_PROJECT_ID,   id],
        [STORAGE_KEYS.ACTIVE_PROJECT_NAME, name],
      ]);
    } catch (e) {
      console.warn('[auth.store] setActiveProject storage error:', e);
    }
    set({ activeProjectId: id, activeProjectName: name });
  },

  saveProjects: async (projects) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PROJECTS, serializeProjects(projects));
    } catch (e) {
      console.warn('[auth.store] saveProjects error:', e);
    }
  },

  loadProjects: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!raw) return null;
      return deserializeProjects(raw);
    } catch (e) {
      console.warn('[auth.store] loadProjects error:', e);
      return null;
    }
  },

  loadFromStorage: async () => {
    try {
      const values = await AsyncStorage.multiGet([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.USER_ID,
        STORAGE_KEYS.USER_NAME,
        STORAGE_KEYS.ACTIVE_PROJECT_ID,
        STORAGE_KEYS.ACTIVE_PROJECT_NAME,
      ]);
      const [token, userId, userName, activeProjectId, activeProjectName] =
        values.map(([, v]) => v);

      set({
        token,
        userId,
        userName,
        activeProjectId,
        activeProjectName,
        isLoading: false,
      });
    } catch (e) {
      // Storage completely unavailable — let the app boot to welcome
      console.warn('[auth.store] loadFromStorage error:', e);
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (e) {
      console.warn('[auth.store] logout storage error:', e);
    }
    set({
      token:               null,
      userId:              null,
      userName:            null,
      activeProjectId:     null,
      activeProjectName:   null,
      isLoading:           false,
    });
  },
}));