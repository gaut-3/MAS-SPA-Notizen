import React, {ChangeEvent, useEffect, useState} from "react";
import { Note } from "../models/Note";
import {AddNoteComponent} from "./AddNoteComponent";
import {NoteListComponent} from "./NoteListComponent";

export const NotesComponent = () => {

    const [noteList, setNoteList] = useState<Note[]>( []);

    const newNoteAdded = (name: string): void => {
        let newNote = {
            name: name,
            priority: 0,
            id: noteList.length + 1
        }
        setNoteList(oldNoteList => [...oldNoteList, newNote]);
    }

    return (
        <div className="container">
            <AddNoteComponent noteList={noteList} addNewNote={newNoteAdded}/>
            <div className="list-notes">
                <NoteListComponent noteList={noteList}/>
            </div>
        </div>
    );
}
