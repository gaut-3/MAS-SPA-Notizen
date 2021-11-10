import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { Note } from "../models/Note";
import { NoteOrder } from "../models/NoteOrder";
import { NoteSortColumn } from "../models/NoteSortColumn";
import { NoteSortOrder } from "../models/NoteSortOrder";
import { AddNoteComponent } from "./AddNoteComponent";
import { NoteListComponent } from "./NoteListComponent";
import { ShowAllNotesComponent } from "./ShowAllNotesComponent";

export const NotesComponent = () => {

    const [noteList, setNoteList] = useState<Note[]>([]);
    const [searchParam, setSearchParam] = useState("")
    const [showAll, setShowAll] = useState(false)
    const [idCounter, setIdCounter] = useState(0)
    const [sortOrder, setSortOrder] = React.useState({
        sortColumn: NoteSortColumn.NAME,
        sortOrder: NoteSortOrder.DESC,
        icon: "sort-icon-up"
    });

    const addNewNote = (name: string): void => {
        let newNote = {
            name: name,
            priority: 0,
            id: idCounter,
            isComplete: false
        }
        let tempNoteListArray = [...noteList];
        tempNoteListArray.push(newNote)
        console.log(sortOrder.icon)
        console.log(sortOrder.sortColumn)
        tempNoteListArray = sortNoteList(tempNoteListArray, sortOrder);
        //tempNoteListArray.sort((firstNote, secondNote) => compareNotes(firstNote, secondNote))
        console.log(tempNoteListArray)

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
        console.log(noteList)
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
    /* useEffect(() => {
         console.log("sort " + sortOrder.sortColumn)
         console.log("sort " + sortOrder.icon)
         let tempNoteListArray = [...noteList];
         tempNoteListArray = sortNoteList(tempNoteListArray);

         console.log("before");
         console.log(tempNoteListArray)
         console.log("after");
         setNoteList(tempNoteListArray);
         console.log(noteList)
     }, [sortOrder])*/

    const sortNoteList = (noteList: Note[], noteOrder: NoteOrder): Note[] => {
        const notes = noteList.sort((firstNote, secondNote) => {
            if (firstNote[noteOrder.sortColumn] > secondNote[noteOrder.sortColumn]) {
                return noteOrder.icon === "sort-icon-up" ? 1 : -1
            } else if (firstNote[noteOrder.sortColumn] < secondNote[noteOrder.sortColumn]) {
                return noteOrder.icon === "sort-icon-up" ? -1 : 1
            }
            return 0;
        });
        setNoteList(notes);
        return notes
    }

    const changeSortOrder = (noteOrder: NoteOrder): void => {
        let tempNoteListArray = [...noteList];
        tempNoteListArray = sortNoteList(tempNoteListArray, noteOrder);
        console.log("before");
        console.log(tempNoteListArray)
        console.log("after");
        // setNoteList(tempNoteListArray);
        setSortOrder(noteOrder)
        console.log(noteList)

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
                                   setNotePriority={setNotePriority}
                                   completeNote={completeNote}
                                   deleteNote={deleteNote}
                                   changeNoteName={changeNoteName}
                                   sortOrder={sortOrder}
                                   changeSortOrder={changeSortOrder}
                />

            </Grid>
        </Grid>
    );
}
