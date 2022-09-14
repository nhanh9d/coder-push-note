import NotesContext from "@/utils/notesContext";
import dynamic from "next/dynamic";
import { FocusEvent, KeyboardEvent, useContext, useEffect, useState } from "react";
import { Note } from "types";
import './NoteDetail.module.css'

const NoteDetail = () => {
    const { notes, setNotes } = useContext(NotesContext);
    const [currentNote, setCurrentNote] = useState<Note | null>(null);

    useEffect(() => {
        const filter = notes.filter(n => n.active);
        const activeNote = filter && filter.length ? filter[0] : null;

        const editor = document.getElementById("editor");
        if (editor && activeNote) {
            editor.focus();
        }

        setCurrentNote(activeNote);
    }, [notes]);

    const onEditorBlur = (event: FocusEvent) => {
        const innerHtml = event.currentTarget.innerHTML;
        const childNodes = event.currentTarget.childNodes;
        if (currentNote != null && childNodes.length) {
            const title = childNodes[0].textContent;
            currentNote.title = title;

            const shortDescription = childNodes.length > 1 ? getShortDescription(1, childNodes) : null;
            currentNote.shortDescription = shortDescription;

            currentNote.content = innerHtml;
            currentNote.date = new Date();

            const otherNotes = notes.filter(n => !n.active);
            otherNotes.push(currentNote);
            otherNotes.sort((a, b) => Number(b.date) - Number(a.date))

            setNotes(otherNotes);
        }
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

        if (firstChild != null && firstChild.nodeType === 3) {
            const h3 = document.createElement('h3');
            h3.className = "font-bold text-lg";
            h3.innerHTML = `${firstChild.textContent}`;

            editor.insertBefore(h3, firstChild);
            editor.removeChild(firstChild);
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