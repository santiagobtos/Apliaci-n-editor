import type { Project, ProjectStatus } from '../types';
import type { ProjectDraft } from '../types';

const BASE_URL = 'http://192.168.1.10:8000/api';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Error desconocido' }));
    throw new Error(error.detail || `Error ${response.status}`);
  }

  // 204 No Content (e.g. DELETE) — nothing to parse
  if (response.status === 204) return undefined as unknown as T;

  return response.json();
}

// ─── Status mapping ────────────────────────────────────────────────────────────

export function mapFrontendStatusToBackend(status: ProjectStatus): string {
  switch (status) {
    case 'pendiente':   return 'inactive';
    case 'en progreso': return 'active';
    case 'completado':  return 'completed';
    default:            return 'inactive';
  }
}

function mapBackendStatusToFrontend(status: string): ProjectStatus {
  switch (status) {
    case 'active':    return 'en progreso';
    case 'inactive':  return 'pendiente';
    case 'completed': return 'completado';
    default:          return 'pendiente';
  }
}

// ─── Project adapter ───────────────────────────────────────────────────────────

export function adaptProject(p: any): Project {
  const deliverables = p.deliverables || [];

  // Use real deliverable completion, not a fixed value per status
  const progress = deliverables.length > 0
    ? Math.round((deliverables.filter((d: any) => d.done).length / deliverables.length) * 100)
    : p.status === 'completed' ? 100 : 0;

  return {
    id:         p.id,
    name:       p.name,
    client:     p.description || 'Sin descripción',
    status:     mapBackendStatusToFrontend(p.status),
    progress,
    startDate:  p.start_date ? new Date(p.start_date) : new Date(),
    deadline:   p.deadline   ? new Date(p.deadline)   : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    colors:     p.colors?.length >= 3 ? p.colors : ['#3B82F6', '#0F1729', '#F8FAFC'],
    typography: p.typography  || 'Plus Jakarta Sans',
    deliverables,
    notes:      p.notes  || '',
    links:      p.links  || [],
    members:    p.members || [],
  };
}

// ─── Auth API ──────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    apiRequest<{ access_token: string; user_id: string; name: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    apiRequest<{ access_token: string; user_id: string; name: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
};

// ─── Projects API ──────────────────────────────────────────────────────────────

export const projectsApi = {
  list: (token: string) =>
    apiRequest<any[]>('/projects/', {}, token),

  get: (id: string, token: string) =>
    apiRequest<any>(`/projects/${id}`, {}, token),

  create: (project: ProjectDraft, token: string) =>
    apiRequest<any>('/projects/', {
      method: 'POST',
      body: JSON.stringify({
        name:         project.name,
        description:  project.notes,
        notes:        project.notes,
        links:        project.links,
        colors:       project.colors,
        typography:   project.typography,
        deadline:     project.deadline,
        deliverables: project.deliverables,
        members:      project.members,
        status:       mapFrontendStatusToBackend(project.status),
      }),
    }, token),

  quickCreate: (name: string, token: string) =>
    apiRequest<any>('/projects/quick-create', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }, token),

  setActive: (projectId: string, token: string) =>
    apiRequest('/messages/set-active-project', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId }),
    }, token),

  update: (id: string, data: Record<string, any>, token: string) => {
    // If caller passes a frontend status string, map it before sending
    const payload = { ...data };
    if (payload.status && ['pendiente', 'en progreso', 'completado'].includes(payload.status)) {
      payload.status = mapFrontendStatusToBackend(payload.status as ProjectStatus);
    }
    return apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, token);
  },

  // Fix: token was missing — DELETE always failed silently
  delete: (id: string, token: string) =>
    apiRequest(`/projects/${id}`, { method: 'DELETE' }, token),
};

// ─── Messages API ──────────────────────────────────────────────────────────────

export const messagesApi = {
  fromWhatsapp: (messages: string[], token: string, sender?: string) =>
    apiRequest('/messages/from-whatsapp', {
      method: 'POST',
      body: JSON.stringify({ messages, sender }),
    }, token),

  list: (projectId: string, token: string) =>
    apiRequest<any[]>(`/messages/${projectId}`, {}, token),
};

// ─── AI types ─────────────────────────────────────────────────────────────────

export interface ClassificationResult {
  metadata_id: string;
  summary:     string;
  confidence:  number;
  colorimetry: {
    color_space:    string | null;
    log_profile:    string | null;
    lut_required:   string | null;
    grade_notes:    string | null;
    mood_palette:   string | null;
    reference_film: string | null;
  };
  brand: {
    brand_name: string | null;
    product:    string | null;
    campaign:   string | null;
  };
  editorial: {
    edit_style:      string | null;
    rhythm:          string | null;
    duration_target: string | null;
    priority:        'alta' | 'media' | 'baja';
  };
  delivery: {
    platform:     string | null;
    aspect_ratio: string | null;
    deadline:     string | null;
  };
  // Full schema fields (backend may include these)
  audio: {
    music_ref:  string | null;
    voiceover:  string | null;
    sfx_notes:  string | null;
    audio_sync: string | null;
  } | null;
  source: {
    source_type:  string | null;
    camera_model: string | null;
    lens:         string | null;
    codec:        string | null;
    resolution:   string | null;
    frame_rate:   string | null;
    shoot_date:   string | null;
    location:     string | null;
  } | null;
  shot: {
    shot_type:         string | null;
    camera_movement:   string | null;
    take_quality:      string | null;
    continuity_notes:  string | null;
  } | null;
}

// ─── AI API ────────────────────────────────────────────────────────────────────

export const aiApi = {
  // project_name is passed so Llama sees the real name, not the UUID
  classify: (projectId: string, projectName: string, messages: string[], token: string) =>
    apiRequest<ClassificationResult>('/ai/classify', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectName, messages }),
    }, token),

  // Transcribe audio file via Whisper on Groq — send as multipart FormData
  transcribe: async (uri: string, filename: string, token: string): Promise<{ text: string }> => {
    const form = new FormData();
    form.append('file', { uri, name: filename, type: 'audio/m4a' } as any);
    const BASE_URL = 'http://192.168.1.10:8000/api';
    const res = await fetch(`${BASE_URL}/ai/transcribe`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Error desconocido' }));
      throw new Error(err.detail || `Error ${res.status}`);
    }
    return res.json();
  },

  // Describe image via Llama 4 Scout vision — send as multipart FormData
  describeImage: async (uri: string, filename: string, token: string): Promise<{ description: string }> => {
    const form = new FormData();
    form.append('file', { uri, name: filename, type: 'image/jpeg' } as any);
    const BASE_URL = 'http://192.168.1.10:8000/api';
    const res = await fetch(`${BASE_URL}/ai/describe-image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Error desconocido' }));
      throw new Error(err.detail || `Error ${res.status}`);
    }
    return res.json();
  },
};

// ─── Videos API ───────────────────────────────────────────────────────────────

export const videosApi = {
  create: (projectId: string, title: string, token: string) =>
    apiRequest<any>('/videos/', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId, title }),
    }, token),

  getByToken: (reviewToken: string) =>
    apiRequest<any>(`/videos/review/${reviewToken}`),

  listByProject: (projectId: string, token: string) =>
    apiRequest<any>(`/videos/project/${projectId}`, {}, token),
};

// ─── Comments API ─────────────────────────────────────────────────────────────

export const commentsApi = {
  add: (videoToken: string, authorName: string, content: string, timecodeSeconds: number) =>
    apiRequest('/comments/', {
      method: 'POST',
      body: JSON.stringify({
        video_token:      videoToken,
        author_name:      authorName,
        content,
        timecode_seconds: timecodeSeconds,
      }),
    }),

  list: (videoToken: string) =>
    apiRequest<any[]>(`/comments/${videoToken}`),
};

// ─── Payments API ─────────────────────────────────────────────────────────────

export const paymentsApi = {
  create: (projectId: string, amount: number, token: string) =>
    apiRequest<any>('/payments/', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId, amount }),
    }, token),
};