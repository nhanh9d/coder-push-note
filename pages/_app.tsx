import 'styles/main.css';
import 'styles/chrome-bug.css';
import { useEffect, useState } from 'react';
import React from 'react';

import Layout from 'components/Layout';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { AppProps } from 'next/app';
import { MyUserContextProvider } from 'utils/useUser';
import NotesContext from 'utils/notesContext';
import { Note } from 'types';
import Navbar from '@/components/ui/Navbar';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const localNotesString = localStorage.getItem("notes");
    if (localNotesString) {
      const localNotes = JSON.parse(localNotesString) as Note[];
      setNotes(localNotes);
    }

    document.body.classList?.remove('loading');
  }, []);


  return (
    <div className="">
      <UserProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider supabaseClient={supabaseClient}>
          <NotesContext.Provider value={{ notes, setNotes }}>
            <Layout {...pageProps} >
              <Navbar />
              <Component {...pageProps} />
            </Layout>
          </NotesContext.Provider>
        </MyUserContextProvider>
      </UserProvider>
    </div>
  );
}
