// import NotesContext from "@/utils/notesContext";
import { useUser } from "@/utils/useUser";
import { FocusEvent, KeyboardEvent, useContext, useEffect, useState } from "react";
import { Note } from "types";
import './NoteDetail.module.css'

const NoteDetail = () => {
    const { notes, updateNote, userDetails } = useUser()
    const [currentNote, setCurrentNote] = useState<Note | null>(null);

    useEffect(() => {
        const filter = notes.filter(n => n.active);
        const activeNote = filter && filter.length ? filter[0] : null;

        setCurrentNote(activeNote);
    }, [notes]);

    const onEditorBlur = (event: FocusEvent) => {
        const editor = event.currentTarget as HTMLDivElement;
        saveNote(editor);
    }

    const getShortDescription = (nodeNo: number, listNodes: NodeListOf<ChildNode>): string | null => {
        let content = listNodes[nodeNo].textContent;
        if ((content == null || content.length == 0) && nodeNo++ < listNodes.length - 1) {
            content = getShortDescription(nodeNo, listNodes);
        }
        return content;
    }

    const onEditorKeyUp = (event: KeyboardEvent) => {
        const editor = event.currentTarget as HTMLDivElement;
        const firstChild = editor.firstChild;

        //because firstChild always text node so have to change back to element node
        if (firstChild != null && firstChild.nodeType === 3) {
            const h3 = document.createElement('h3');
            h3.className = "font-bold text-lg";
            h3.innerHTML = `${firstChild.textContent}`;

            editor.insertBefore(h3, firstChild);
            editor.removeChild(firstChild);
        }

        saveNote(editor, false);
    }

    const saveNote = (editor: HTMLDivElement, updateState = true) => {
        const innerHtml = editor.innerHTML;
        const childNodes = editor.childNodes;

        if (currentNote != null && childNodes.length) {
            const title = childNodes[0].textContent;
            currentNote.title = title;

            const shortDescription = childNodes.length > 1 ? getShortDescription(1, childNodes) : null;
            currentNote.short_description = shortDescription;

            currentNote.content = innerHtml;
            currentNote.updated_at = new Date();

            if (userDetails != null) {
                currentNote.user_id = userDetails.id;
            }

            updateNote(currentNote, updateState);
        }
    }

    return (currentNote != null ?
        <div
            id="editor"
            contentEditable
            onBlur={onEditorBlur}
            onKeyUp={onEditorKeyUp}
            className="h-full p-4 overflow-auto"
            tabIndex={1}
            dangerouslySetInnerHTML={{ __html: currentNote.content ?? '' }}
        ></div>
        : <></>
    );
}

export default NoteDetail;