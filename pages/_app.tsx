import 'styles/main.css';
import 'styles/chrome-bug.css';
import { useEffect, useState } from 'react';
import React from 'react';

import Layout from 'components/Layout';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { AppProps } from 'next/app';
import { CoderPushUserProvider } from 'utils/useUser';
// import NotesContext from 'utils/notesContext';
import { Note } from 'types';
import Navbar from '@/components/ui/Navbar';

export default function MyApp({ Component, pageProps }: AppProps) {


  return (
    <div className="">
      <UserProvider supabaseClient={supabaseClient}>
        <CoderPushUserProvider supabaseClient={supabaseClient}>
          {/* <NotesContext.Provider value={{ notes, setNotes }}> */}
            <Layout {...pageProps} >
              <Navbar />
              <Component {...pageProps} />
            </Layout>
          {/* </NotesContext.Provider> */}
        </CoderPushUserProvider>
      </UserProvider>
    </div>
  );
}
