import { useState } from 'react';
import { NotesContextType } from 'types';

import { useUser } from 'utils/useUser';
import ListNotes from '../ListNotes';
import NoteDetail from '../NoteDetail';

import s from './NoteWrapper.module.css';

const NoteWrapper = () => {
  const { user, isLoading } = useUser();

  return (
    <section className="border-t-2 border-t-[#dcdcdc]-500">
      <div className={s.main}>
        <div className="flex sm:align-center h-full">
          <div className="left-menu flex-initial border-r-2 border-r-[#dcdcdc]-500 h-full">
            <ListNotes />
          </div>
          <div className="flex-1 h-full cursor-text">
            <NoteDetail />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NoteWrapper;