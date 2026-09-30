export type AppScreen =
  | 'welcome'
  | 'login'
  | 'register'
  | 'name'
  | 'valueprop'
  | 'auto'
  | 'manual'
  | 'home'
  | 'newproject'
  | 'homeactive'
  | 'detail'
  | 'edit'
  | 'profile'
  | 'classifier';

export type ProjectStatus = 'pendiente' | 'en progreso' | 'completado';

export interface Deliverable {
  label: string;
  done: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'member';
  color: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  colors: string[];
  typography: string;
  startDate: Date;
  deadline: Date;
  progress: number;
  deliverables: Deliverable[];
  status: ProjectStatus;
  notes: string;
  links: string[];
  members?: TeamMember[];
}

export interface ProjectDraft {
  name: string;
  colors: string[];
  typography: string;
  startDate: Date;
  deadline: Date;
  deliverables: Deliverable[];
  notes: string;
  links: string[];
  status: ProjectStatus;
  members: TeamMember[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  specialties: string[];
}
