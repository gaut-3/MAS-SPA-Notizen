import React from "react";
import {Note} from "../models/Note";

interface Props {
    noteList: Note[];
    deleteNote: (arg: number) => void
    checkNote: (arg: number) => void
}


export const NoteListComponent = ({noteList, deleteNote, checkNote}: Props) => {

    const handleDelete = (noteId: number) => {
        console.log("" + noteId);
        deleteNote(noteId)
    }

    const handleChecked = (noteId: number) => {
        console.log(noteId)
        checkNote(noteId);
    }

    return (
        <div>
            {noteList.map(note => (
                <div key={note.id}><input type="checkbox" onChange={() => handleChecked(note.id)} key={note.id}/>
                    <span className={(note.checked) ? "note-checked" : ""}>{note.name}</span>
                    <button onClick={() => handleDelete(note.id)} type="button">Löschen</button>
                </div>
            ))}
        </div>
    );
}
