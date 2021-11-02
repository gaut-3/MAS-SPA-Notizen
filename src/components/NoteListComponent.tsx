import React from "react";
import {Note} from "../models/Note";
import {Grid, Typography} from "@mui/material";
import {NoteComponent} from "./NoteComponent";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface Props {
    noteList: Note[];
    searchParam: string
    showAllNotes: boolean
    setNotePriority: (noteId: number, priority: number) => void
    deleteNote: (noteId: number) => void
    completeNote: (noteId: number, isComplete: boolean) => void
    changeNoteName: (noteId: number, noteName: string) => void
}


export const NoteListComponent = ({
                                      noteList,
                                      searchParam,
                                      showAllNotes,
                                      deleteNote,
                                      completeNote,
                                      setNotePriority,
                                      changeNoteName
                                  }: Props) => {

    return (
        <Grid container spacing={2} rowSpacing={2} alignItems="center" direction="row" justifyContent="center">

            <Grid item  style={{textAlign: "right"}} xs={4}>
                <Typography>Wichtigkeit<ArrowUpwardIcon fontSize="small" fontStyle=""/></Typography>
            </Grid>
            <Grid style={{textAlign: "left"}} item xs={8}>
                <Typography>Aufgabe</Typography>
            </Grid>

            {noteList.filter(note => {
                    if (searchParam !== "") {
                        return note.name.toLowerCase().includes(searchParam.toLowerCase())
                    } else {
                        return note
                    }
                }
            ).filter(note => (showAllNotes || !note.isComplete)).map((note) => {
                return (
                    <NoteComponent note={note}
                                   completeNote={completeNote}
                                   changeNotePriority={setNotePriority}
                                   deleteNote={deleteNote}
                                   changeNoteName={changeNoteName}/>
                );
            })}
        </Grid>
    );
}
