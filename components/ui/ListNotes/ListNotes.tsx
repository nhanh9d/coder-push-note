// import NotesContext from "@/utils/notesContext";
import { useContext } from "react";
import format from "date-fns/format";
import { DEFAULT_PLACEHOLDER } from "@/utils/constants";
import { isToday, parseISO } from "date-fns";
import { useUser } from "@/utils/useUser";

const ListNotes = () => {
    const { notes, updateNotes } = useUser();

    const changeActiveNote = (idx: number) => {
        const activeNote = notes[idx];

        //if this is not an active note, we change the active state
        if (!activeNote.active) {
            const newNotes = notes.filter((note, i) => {
                note.active = i === idx;
                return note;
            });

            updateNotes(newNotes);
        }
    }

    return (
        <div className="w-[300px] overflow-auto">
            {
                notes.length ?
                    notes.map((note, idx) => {
                        //sometimes note date is string so need to convert back to Date object
                        if (typeof note.updated_at === "string") {
                            note.updated_at = parseISO(note.updated_at)
                        }
                        //get Date string
                        const dateStr = format(note.updated_at, "dd/MM/yyyy");
                        const today = isToday(note.updated_at);
                        const timeStr = format(note.updated_at, "hh:mm aaaaa'm'")
                        let shortDescription = note.short_description ? note.short_description : DEFAULT_PLACEHOLDER;
                        if (shortDescription.length > 20) {
                            shortDescription = `${shortDescription.substring(0, 15)}...`;
                        }

                        return (
                            <div className="border-b-2 border-[#ececec] cursor-pointer" key={idx} onClick={() => { changeActiveNote(idx) }} >
                                <div className={`my-1 mr-4 ml-4 sm: ml-6 p-3 ${note.active && "bg-[#f2e7c7]"} rounded-lg`}>
                                    <div className="flex font-bold text-lg text-[#4e4631]">
                                        <p className={today ? "flex-none w-[120px] hover:text-clip truncate" : ""}>{note.title ? note.title : "New Note"}</p>
                                        {today ? <p className="flex-1"> - {dateStr}</p> : <></>}
                                    </div>
                                    <p className="hover:text-clip truncate">
                                        <span className="pr-2">{today ? timeStr : dateStr}</span>
                                        <span className="text-[#a59f87]">{shortDescription}</span>
                                    </p>
                                </div>
                            </div>
                        );
                    }) :
                    <p className="text-center text-[#4e4631] font-bold pt-4">Leave the memorization to me</p>
            }
        </div>
    );
}

export default ListNotes;