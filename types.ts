import { MouseEventHandler } from 'react';

export interface PageMeta {
  title: string;
  description: string;
  cardImage: string;
}

export interface UserDetails {
  id: string /* primary key */;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
}

export interface IconProps {
  className?: string;
  mouseEventHandler: MouseEventHandler;
  hide?: boolean;
}

export interface Note {
  id?: string,
  title: string | null,
  short_description: string | null,
  content: string | null,
  created_at: Date,
  updated_at: Date,
  user_id?: string;
  active: boolean;
  local_id: string;
}

export interface NotesContextType {
  notes: Note[],
  setNotes: Function,
}