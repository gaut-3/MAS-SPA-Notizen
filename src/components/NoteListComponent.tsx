import React, {ChangeEvent, useState} from "react";
import {Note} from "../models/Note";
import {Button, Grid, Link, Typography} from "@mui/material";
import {NoteComponent} from "./NoteComponent";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {ArrowDownward} from "@mui/icons-material";

interface Props {
    noteList: Note[];
    searchParam: string
    showAllNotes: boolean
    setNotePriority: (noteId: number, priority: number) => void
    deleteNote: (noteId: number) => void
    completeNote: (noteId: number, isComplete: boolean) => void
    changeNoteName: (noteId: number, noteName: string) => void
    setSortType: (sortType: string) => void
}


export const NoteListComponent = ({
                                      noteList,
                                      searchParam,
                                      showAllNotes,
                                      deleteNote,
                                      completeNote,
                                      setNotePriority,
                                      changeNoteName,
                                      setSortType
                                  }: Props) => {

    const [sortPriority, setSortPriority] = useState("")
    const [sortName, setSortName] = useState("")

    const handleSortClick = (sortCloumn: string, event: React.MouseEvent) => {

    }


    const switchSort = (sortIcon: string): string =>  {
        if(sortIcon === "sort-icon-up") {
            return "sort-icon-down";
        } else if(sortIcon ===  "sort-icon-down") {
            return "sort-icon-up";
        } else {
            return "sort-icon-up";
        }
    }

    return (
        <Grid container spacing={2} rowSpacing={2} alignItems="center" direction="row" justifyContent="center">

            <Grid item style={{textAlign: "right"}} xs={4}>
                <Link onClick={e => handleSortClick("priority", e)} underline="none"><Typography className={"sort-icon " + sortPriority}>Wichtigkeit</Typography></Link>
            </Grid>
            <Grid style={{textAlign: "left"}} item xs={8}>
                <Link onClick={e => handleSortClick("priority", e)} underline="none"><Typography className={"sort-icon " + sortName}>Aufgabe</Typography></Link>
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
