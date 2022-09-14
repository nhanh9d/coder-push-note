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
  // notes: Note[];
  // updateNotes: Dispatch<SetStateAction<Note[]>>
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  supabaseClient: SupabaseClient;
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const { supabaseClient: supabase } = props;
  const { user, accessToken, isLoading: isLoadingUser } = useSupaUser();
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  // const [notes, setNotes] = useState<Note[]>([]);

  const getUserDetails = () =>
    supabase.from<UserDetails>('users').select('*').single();
  const getNotes = () =>
    supabase
      .from<Note>('notes')
      .select('*, prices(*, products(*))')
      .in('userId', [`${user?.id}`]);

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
            // setNotes(notesPromise.value.data);

          setIsloadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    // notes,
    // updateNotes: setNotes
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
