import React, {ChangeEvent} from "react";
import {Note} from "../models/Note";

interface Props {
    noteList: Note[];
    deleteNote: (noteId: number) => void
    completeNote: (noteId: number, isChecked: boolean) => void
    setNotePriority: (noteId: number, priority: number) => void
    showAllNotes: boolean
}


export const NoteListComponent = ({noteList, deleteNote, completeNote, setNotePriority, showAllNotes}: Props) => {

    const handleDeleteClick = (noteId: number) => {
        deleteNote(noteId)
    }

    const handleCheckedChange = (noteId: number, event: ChangeEvent<HTMLInputElement>) => {
        completeNote(noteId, event.target.checked);
    }

    const handlePriorityClick = (noteId: number, priority: number) => {
        setNotePriority(noteId, priority)
    }

    return (
        <div className="list-notes">
            {noteList.map(note => ((showAllNotes || !note.checked) &&
                <div key={note.id}>
                    <input type="checkbox" checked={note.checked} onChange={(e) => handleCheckedChange(note.id, e)}
                           key={note.id}/>
                    <div className={"note-priorities note-priority-" + note.priority}>
                        <span onClick={() => handlePriorityClick(note.id, 1)}>
                            &#128498;
                        </span>
                        <span onClick={() => handlePriorityClick(note.id, 2)}>
                            &#128498;
                        </span>
                        <span onClick={() => handlePriorityClick(note.id, 3)}>
                            &#128498;
                        </span>
                    </div>
                    <span className={(note.checked) ? "note-checked" : ""}>{note.name}</span>
                    <button onClick={() => handleDeleteClick(note.id)} type="button">Löschen</button>
                </div>
            ))}
        </div>
    );
}
