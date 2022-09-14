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
  disable: boolean;
  hide?: boolean;
}

export interface Note {
  title: string | null,
  shortDescription: string | null,
  content: string | null,
  date: Date,
  userId?: string;
  active: boolean;
}

export interface NotesContextType {
  notes: Note[],
  setNotes: Function,
}