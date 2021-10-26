import React from "react";
import {Note} from "../models/Note";
import {Grid} from "@mui/material";
import {NoteComponent} from "./NoteComponent";

interface Props {
    noteList: Note[];
    deleteNote: (noteId: number) => void
    completeNote: (noteId: number, isChecked: boolean) => void
    setNotePriority: (noteId: number, priority: number) => void
    showAllNotes: boolean
    searchParam: string
}


export const NoteListComponent = ({
                                      noteList,
                                      deleteNote,
                                      completeNote,
                                      setNotePriority,
                                      showAllNotes,
                                      searchParam
                                  }: Props) => {

    return (
        <Grid container spacing={0} rowSpacing={2} alignItems="center" direction="row"
              justifyContent="center">
            {noteList.filter(note => {
                    if (searchParam !== "") {
                        return note.name.toLowerCase().includes(searchParam.toLowerCase())
                    } else {
                        return note
                    }
                }
            ).filter(note => (showAllNotes || !note.isComplete)).map((note) => {
                    return (
                        <NoteComponent note={note} completeNote={completeNote} setNotePriority={setNotePriority}
                                       deleteNote={deleteNote}/>

                    );
                })}
        </Grid>
    );
}
