import NotesContext from "@/utils/notesContext";
import { useContext } from "react";
import format from "date-fns/format";
import { DEFAULT_PLACEHOLDER } from "@/utils/constants";
import { isToday, parseISO } from "date-fns";

const ListNotes = () => {
    const { notes, setNotes } = useContext(NotesContext);

    const changeActiveNote = (idx: number) => {
        const activeNote = notes[idx];

        //if this is not an active note, we change the active state
        if (!activeNote.active) {
            const newNotes = notes.filter((note, i) => {
                note.active = i === idx;
                return note;
            });

            setNotes(newNotes);
        }
    }

    return (
        <div className="w-[250px] overflow-auto">
            {
                notes.map((note, idx) => {
                    //sometimes note date is string so need to convert back to Date object
                    if (typeof note.date === "string") {
                        note.date = parseISO(note.date)
                    }
                    //get Date string
                    const dateStr = format(note.date, "dd/MM/yyyy");
                    const today = isToday(note.date);
                    const timeStr = format(note.date, "hh:mm aaaaa'm'")
                    let shortDescription = note.shortDescription ? note.shortDescription : DEFAULT_PLACEHOLDER;
                    if (shortDescription.length > 20) {
                        shortDescription = `${shortDescription.substring(0, 15)}...`;
                    }

                    return (
                        <div className="border-b-2 border-[#ececec] cursor-pointer" key={idx} onClick={() => { changeActiveNote(idx) }} >
                            <div className={`my-1 mr-4 p-3 ${note.active && "bg-[#f2e7c7]"} rounded-lg`}>
                                <div className="flex font-bold text-lg text-[#4e4631]">
                                    <p className={today ? "flex-none w-[90px] hover:text-clip truncate" : ""}>{note.title ? note.title : "New Note"}</p>
                                    {today ? <p className="flex-1"> - {dateStr}</p> : <></>}
                                </div>
                                <p className="hover:text-clip truncate">
                                    <span className="pr-2">{today ? timeStr : dateStr}</span>
                                    <span className="text-[#a59f87]">{shortDescription}</span>
                                </p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default ListNotes;