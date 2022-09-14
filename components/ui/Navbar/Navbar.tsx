import s from './Navbar.module.css';

import { useUser } from 'utils/useUser';
import { useRouter } from 'next/router';
import { MouseEvent, useContext, useEffect, useState } from 'react';
import NotesContext from '@/utils/notesContext';
import ListBtn from '../Buttons/ListBtn';
import GalleryBtn from '../Buttons/GalleryBtn';
import DeleteBtn from '../Buttons/DeleteBtn';
import NewBtn from '../Buttons/NewBtn';

const Navbar = () => {
  const router = useRouter();

  const { user } = useUser();
  const { notes, setNotes } = useContext(NotesContext);
  const [isDisableNewButton, setDisableNewButton] = useState(false);
  const [isDisableDeleteButton, setDisableDeleteButton] = useState(false);
  const currentNotes = notes.map(x => x);

  useEffect(() => {
    const hasNote = notes.length > 0;
    const isActiveNoteEmpty = notes.filter(n => n.active && n.content).length == 0 && hasNote;

    setDisableDeleteButton(!hasNote);
    setDisableNewButton(isActiveNoteEmpty);
  }, [notes])

  const onDelete = (event: MouseEvent) => {
    const remainingNotes = notes.filter(n => !n.active);
    setNotes(remainingNotes);
  }

  const onShowAsGallery = (event: MouseEvent) => {

  }

  const onShowAsList = (event: MouseEvent) => {

  }

  const onAddNew = (event: MouseEvent) => {
    //append to list
    currentNotes.forEach(n => n.active = false);
    currentNotes.push({
      title: null,
      shortDescription: null,
      content: null,
      date: new Date(),
      userId: user ? user.id : '',
      active: true
    });

    setNotes(currentNotes);
    setDisableNewButton(true);
  }

  return (
    <nav className={s.root}>
      <div className="mx-auto px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-2 items-center">
            <nav className="space-x-2 hidden lg:block">
              <ListBtn mouseEventHandler={onShowAsList} disable={false} />
              <GalleryBtn mouseEventHandler={onShowAsGallery} disable={false} />
              <DeleteBtn mouseEventHandler={onDelete} disable={isDisableDeleteButton} />
              <NewBtn mouseEventHandler={onAddNew} disable={isDisableNewButton} />
            </nav>
          </div>

          {/* <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <Link href="/api/auth/logout">
                <a className={s.link}>Sign out</a>
              </Link>
            ) : (
              <Link href="/signin">
                <a className={s.link}>Sign in to sync your notes</a>
              </Link>
            )}
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
