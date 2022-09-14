import { createContext } from "react";
import { NotesContextType } from "../types";

const NotesContext = createContext<NotesContextType>({
    notes: [],
    setNotes: () => { }
});

export default NotesContext;