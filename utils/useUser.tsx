import { useEffect, useState, createContext, useContext, Dispatch, SetStateAction } from 'react';
import {
  useUser as useSupaUser,
  User
} from '@supabase/supabase-auth-helpers/react';
import { Note, UserDetails } from 'types';
import { SupabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  notes: Note[];
  updateNotes: Dispatch<SetStateAction<Note[]>>;
  updateNote: (note: Note, updateState: boolean) => void;
  removeNote: (local_id: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  supabaseClient: SupabaseClient;
  [propName: string]: any;
}

export const CoderPushUserProvider = (props: Props) => {
  const { supabaseClient: supabase } = props;
  const { user, accessToken, isLoading: isLoadingUser } = useSupaUser();
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const localNotesString = localStorage.getItem("notes");
    if (localNotesString) {
      const localNotes = JSON.parse(localNotesString) as Note[];
      setNotes(localNotes);
    }

    document.body.classList?.remove('loading');
  }, []);

  const getUserDetails = () =>
    supabase.from<UserDetails>('users').select('*').single();
  const getNotes = () =>
    supabase
      .from<Note>('notes')
      .select('*')
      .in('user_id', [`${user?.id}`]);

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails(), getNotes()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const notesPromise = results[1];

          if (userDetailsPromise.status === 'fulfilled')
            setUserDetails(userDetailsPromise.value.data);

          if (notesPromise.status === 'fulfilled' && notesPromise.value.data != null)
            concatNotes(notesPromise.value.data, user.id);
          setIsloadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const concatNotes = async (notesFromDb: Note[], userId: string) => {
    //get unchanged notes
    const unchangedNotes = notesFromDb.filter(n => notes.filter(x => x.id == n.id && x.content == n.content && x.updated_at == n.updated_at).length > 0);
    const totalNotes = notes.concat(unchangedNotes).map(n => {
      if (!n.user_id) {
        n.user_id = userId;
      }
      return n;
    });
    const { data, error } = await supabase.from<Note>('notes').upsert(totalNotes);
    if (error) {
      console.log(error);
    }
    else {
      setNotes(data);
    }
  }

  const updateNote = async (note: Note, updateState: boolean) => {
    const noteInLocal = notes.filter(n => !n.active);
    noteInLocal.push(note);
    noteInLocal.sort((a, b) => Number(b.updated_at) - Number(a.updated_at))

    localStorage.setItem("notes", JSON.stringify(noteInLocal));

    if (updateState) {
      const query = await supabase
        .from<Note>('notes')
        .select('id')
        .eq('local_id', note.local_id)
        .single();

      const noteInDb = query.data;
      if (noteInDb) {
        noteInDb.content = note.content;
        noteInDb.updated_at = note.updated_at;
        await supabase.from<Note>('notes').update(noteInDb);
      } else {
        await supabase.from<Note>('notes').insert(note);
      }

      setNotes(noteInLocal);
    }
  }

  const removeNote = async (local_id: string) => {
    await supabase.from<Note>('notes').delete().eq('local_id', local_id);
  }

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    notes,
    updateNotes: setNotes,
    updateNote,
    removeNote
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a CoderPushUserProvider.`);
  }
  return context;
};
