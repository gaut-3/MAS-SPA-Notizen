import React, {useEffect, useState} from "react";
import {Note} from "../models/Note";
import {AddNoteComponent} from "./AddNoteComponent";
import {NoteListComponent} from "./NoteListComponent";
import {ShowAllNoteComponent} from "./ShowAllNoteComponent";

export const NotesComponent = () => {

    const [noteList, setNoteList] = useState<Note[]>([]);
    const [filteredNoteList, setFilteredNoteList] = useState<Note[]>([]);
    const [showAll, setShowAll] = useState(false)
    const [counter, setCounter] = useState(0)

    const addNewNote = (name: string): void => {
        let newNote = {
            name: name,
            priority: 0,
            id: counter,
            checked: false
        }
        let tempNoteListArray = [...noteList];
        tempNoteListArray.push(newNote)
        tempNoteListArray.sort((firstNote, secondNote) => compareNotes(firstNote, secondNote))
        console.log(tempNoteListArray);

        setNoteList(tempNoteListArray);
        setCounter(counter + 1)
    }


    useEffect(() => {
        setFilteredNoteList(noteList);
    }, [noteList])


    const deleteNote = (noteId: number): void => {
        let tempNoteListArray = [...noteList];
        tempNoteListArray.forEach((item, index) => {
            if (item.id === noteId) {
                tempNoteListArray.splice(index, 1);
            }
        });

        setNoteList(tempNoteListArray);
        console.log(noteList)
    }

    const compareNotes = (a: Note, b: Note): number => {
        if (a.id > b.id) {
            return -1;
        }
        if (a.id < b.id) {
            return 1;
        }
        return 0;
    }

    const setNotePriority = (noteId: number, priority: number): void => {
        let tempNoteListArray = [...noteList];
        tempNoteListArray.forEach((item) => {
            if (item.id === noteId) {
                item.priority = priority;
            }
        });

        setNoteList(tempNoteListArray);
        console.log(noteList)
    }

    const filterNoteList = (searchParam: string): void => {
        if (searchParam === "") {
            setFilteredNoteList(noteList);
        } else {
            const notes = noteList.filter(note => note.name.toLowerCase().startsWith(searchParam.toLowerCase()));
            setFilteredNoteList(notes);
        }
    }

    const completeNote = (noteId: number, isChecked: boolean): void => {
        let tempNoteListArray = [...noteList];
        tempNoteListArray.forEach((item) => {
            if (item.id === noteId) {
                item.checked = isChecked;
            }
        });

        setNoteList(tempNoteListArray);
        console.log(noteList)
    }

    const showAllNotes = (showAll: boolean): void => {
        setShowAll(showAll);
    }

    return (
        <div className="container">
            <AddNoteComponent noteList={noteList} addNewNote={addNewNote} filterNoteList={filterNoteList}/>
            <ShowAllNoteComponent showAllNotes={showAllNotes}/>
            <NoteListComponent setNotePriority={setNotePriority} completeNote={completeNote} deleteNote={deleteNote}
                               showAllNotes={showAll} noteList={filteredNoteList}/>
        </div>
    );
}
