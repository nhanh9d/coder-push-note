import s from './Navbar.module.css';

import { useUser } from 'utils/useUser';
import { useRouter } from 'next/router';
import { MouseEvent, useContext, useEffect, useState } from 'react';
// import NotesContext from '@/utils/notesContext';
import ListBtn from '../Buttons/ListBtn';
import GalleryBtn from '../Buttons/GalleryBtn';
import DeleteBtn from '../Buttons/DeleteBtn';
import NewBtn from '../Buttons/NewBtn';
import CoderPushAuth from './CoderPushAuth';
import Link from 'next/link';

const Navbar = () => {
  const { user } = useUser();
  const { notes, updateNotes, removeNote } = useUser();
  const currentNotes = notes.map(x => x);

  const onDelete = (event: MouseEvent) => {
    const noteToDelete = notes.filter(n => n.active)[0];
    const remainingNotes = notes.filter(n => !n.active);

    removeNote(noteToDelete.local_id, remainingNotes);
  }

  const onShowAsGallery = (event: MouseEvent) => {

  }

  const onShowAsList = (event: MouseEvent) => {

  }

  const onAddNew = async (event: MouseEvent) => {
    //append to list
    const res = await fetch('/api/note/id');
    const body = await res.json();
    const local_id = body.local_id;
    currentNotes.forEach(n => n.active = false);
    currentNotes.push({
      title: null,
      short_description: null,
      content: null,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: user ? user.id : '',
      active: true,
      local_id: local_id
    });

    updateNotes(currentNotes);
  }

  return (
    <nav className={s.root + " main-nav"}>
      <div className="mx-auto px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-2 items-center">
            <nav className="space-x-2 list-action">
              <ListBtn mouseEventHandler={onShowAsList} />
              <GalleryBtn mouseEventHandler={onShowAsGallery} />
              <DeleteBtn mouseEventHandler={onDelete} />
              <NewBtn mouseEventHandler={onAddNew} />
            </nav>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <Link href="/api/auth/logout">
                <button type="button">Sign out</button>
              </Link>
            ) : (
              <CoderPushAuth />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
