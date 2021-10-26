import React, {useEffect, useState} from "react";
import {Note} from "../models/Note";
import {AddNoteComponent} from "./AddNoteComponent";
import {NoteListComponent} from "./NoteListComponent";
import {ShowAllNotesComponent} from "./ShowAllNotesComponent";
import {Grid} from "@mui/material";

export const NotesComponent = () => {

    const [noteList, setNoteList] = useState<Note[]>([]);
    const [filteredNoteList, setFilteredNoteList] = useState<Note[]>([]);
    const [searchParam, setSearchParam] = useState("")
    const [showAll, setShowAll] = useState(false)
    const [counter, setCounter] = useState(0)

    const addNewNote = (name: string): void => {
        let newNote = {
            name: name,
            priority: 0,
            id: counter,
            isComplete: false
        }
        let tempNoteListArray = [...noteList];
        tempNoteListArray.push(newNote)
        tempNoteListArray.sort((firstNote, secondNote) => compareNotes(firstNote, secondNote))
        console.log(tempNoteListArray);

        setNoteList(tempNoteListArray);
        setCounter(counter + 1)
        setSearchParam("")
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
            const notes = noteList.filter(note => note.name.toLowerCase().includes(searchParam.toLowerCase()));
            setFilteredNoteList(notes);
        }
        setSearchParam(searchParam);
        console.log(searchParam)
    }

    const completeNote = (noteId: number, isChecked: boolean): void => {
        let tempNoteListArray = [...noteList];
        tempNoteListArray.forEach((item) => {
            if (item.id === noteId) {
                item.isComplete = isChecked;
            }
        });

        setNoteList(tempNoteListArray);
    }

    const showAllNotes = (showAll: boolean): void => {
        setShowAll(showAll);
    }

    return (
        <Grid container spacing={2} justifyContent="center" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <AddNoteComponent addNewNote={addNewNote} filterNoteList={filterNoteList}/>
            </Grid>
            <Grid item xs={12}>
                <ShowAllNotesComponent showAllNotes={showAllNotes}/>
            </Grid>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <NoteListComponent setNotePriority={setNotePriority} completeNote={completeNote} deleteNote={deleteNote}
                                   showAllNotes={showAll} noteList={noteList} searchParam={searchParam}/>
            </Grid>
        </Grid>
    );
}
