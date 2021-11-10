import React, {useState} from "react";
import {Note} from "../models/Note";
import {AddNoteComponent} from "./AddNoteComponent";
import {NoteListComponent} from "./NoteListComponent";
import {ShowAllNotesComponent} from "./ShowAllNotesComponent";
import {Grid, Typography} from "@mui/material";
import {SortOrder} from "../models/SortOrder";
import {ColumnName} from "../utils/ColumnName";
import {NoteOrder} from "../models/NoteOrder";

export const NotesComponent = () => {

    const [noteList, setNoteList] = useState<Note[]>([]);
    const [searchParam, setSearchParam] = useState("")
    const [showAll, setShowAll] = useState(false)
    const [idCounter, setIdCounter] = useState(0)
    const [noteOrder, setNoteOrder] = React.useState({
        sortColumn: ColumnName.NAME,
        sortOrder: SortOrder.ASC,
    });

    const addNewNote = (name: string): void => {
        const newNote = {
            name: name,
            priority: 0,
            id: idCounter,
            isComplete: false
        }
        let tempNoteListArray = [...noteList];
        tempNoteListArray.push(newNote)
        tempNoteListArray = sortNoteList(tempNoteListArray, noteOrder);

        setNoteList(tempNoteListArray);
        setIdCounter(idCounter + 1)
        setSearchParam("")
    }

    const deleteNote = (noteId: number): void => {
        let tempNoteListArray = [...noteList];
        tempNoteListArray.forEach((item, index) => {
            if (item.id === noteId) {
                tempNoteListArray.splice(index, 1);
            }
        });

        setNoteList(tempNoteListArray);
    }

    const setNotePriority = (noteId: number, priority: number): void => {
        let tempNoteListArray = [...noteList];
        tempNoteListArray.forEach((item) => {
            if (item.id === noteId) {
                item.priority = priority;
            }
        });

        setNoteList(tempNoteListArray);
    }

    const filterNoteList = (searchParam: string): void => {
        setSearchParam(searchParam);
    }

    const completeNote = (noteId: number, isComplete: boolean): void => {
        let tempNoteListArray = [...noteList];
        tempNoteListArray.forEach((item) => {
            if (item.id === noteId) {
                item.isComplete = isComplete;
            }
        });

        setNoteList(tempNoteListArray);
    }

    const changeNoteName = (noteId: number, noteName: string): void => {
        let tempNoteListArray = [...noteList];
        tempNoteListArray.forEach((item) => {
            if (item.id === noteId) {
                item.name = noteName;
            }
        });

        setNoteList(tempNoteListArray);
    }

    const showAllNotes = (showAll: boolean): void => {
        setShowAll(showAll);
    }

    const sortNoteList = (noteList: Note[], noteOrder: NoteOrder): Note[] => {
        const notes = noteList.sort((firstNote, secondNote) => {
            if (firstNote[noteOrder.sortColumn] > secondNote[noteOrder.sortColumn]) {
                return noteOrder.sortOrder === SortOrder.DESC ? 1 : -1
            } else if (firstNote[noteOrder.sortColumn] < secondNote[noteOrder.sortColumn]) {
                return noteOrder.sortOrder === SortOrder.DESC ? -1 : 1
            }
            return 0;
        });
        return notes
    }

    const changeSortOrder = (noteOrder: NoteOrder): void => {
        let tempNoteListArray = [...noteList];
        tempNoteListArray = sortNoteList(tempNoteListArray, noteOrder);
        setNoteList(tempNoteListArray);
        console.log(noteOrder.sortOrder)
        setNoteOrder(noteOrder)
    }

    return (
        <Grid container spacing={2} justifyContent="center" style={{maxWidth: '600px', margin: '0 auto'}}>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <Typography variant="h1">Notiz App</Typography>
            </Grid>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <AddNoteComponent addNewNote={addNewNote} filterNoteList={filterNoteList}/>
            </Grid>
            <Grid item xs={12}>
                <ShowAllNotesComponent showAllNotes={showAllNotes}/>
            </Grid>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <NoteListComponent noteList={noteList}
                                   showAllNotes={showAll}
                                   searchParam={searchParam}
                                   noteOrder={noteOrder}
                                   setNotePriority={setNotePriority}
                                   completeNote={completeNote}
                                   deleteNote={deleteNote}
                                   changeNoteName={changeNoteName}
                                   changeSortOrder={changeSortOrder}
                />

            </Grid>
        </Grid>
    );
}
