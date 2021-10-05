import React, {useState} from "react";
import {Note} from "../models/Note";
import {AddNoteComponent} from "./AddNoteComponent";
import {NoteListComponent} from "./NoteListComponent";

export const NotesComponent = () => {

    const [noteList, setNoteList] = useState<Note[]>([]);

    const newNoteAdded = (name: string): void => {
        let newNote = {
            name: name,
            priority: 0,
            id: noteList.length + 1,
            checked: false
        }
        setNoteList(oldNoteList => [...oldNoteList, newNote]);
    }

    const deleteNote = (noteId: number): void => {
        let tempNoteListArray = [... noteList];
        tempNoteListArray.forEach((item, index) => {
            if (item.id === noteId) {
                tempNoteListArray.splice(index, 1);
            }
        });

        setNoteList(tempNoteListArray);
        console.log(noteList)
    }

    const checkNote = (noteId: number): void => {
        let tempNoteListArray = [... noteList];
        tempNoteListArray.forEach((item, index) => {
            if (item.id === noteId) {
                item.checked = true;
            }
        });
        setNoteList(tempNoteListArray);
        console.log(noteList)
    }

    return (
        <div className="container">
            <AddNoteComponent noteList={noteList} addNewNote={newNoteAdded}/>
            <div className="list-notes">
                <NoteListComponent checkNote={checkNote} deleteNote={deleteNote} noteList={noteList}/>
            </div>
        </div>
    );
}
