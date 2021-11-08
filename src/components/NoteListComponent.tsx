import React, {Fragment} from "react";
import {Note} from "../models/Note";
import {Grid, Link, Typography} from "@mui/material";
import {NoteComponent} from "./NoteComponent";
import {NoteSortColumn} from "../models/NoteSortColumn";
import {NoteSortOrder} from "../models/NoteSortOrder";
import {NoteOrder} from "../models/NoteOrder";

interface Props {
    noteList: Note[];
    searchParam: string
    showAllNotes: boolean
    setNotePriority: (noteId: number, priority: number) => void
    deleteNote: (noteId: number) => void
    completeNote: (noteId: number, isComplete: boolean) => void
    changeNoteName: (noteId: number, noteName: string) => void
    changeSortOrder: (noteOrder: NoteOrder) => void
    sortOrder: NoteOrder
}


export const NoteListComponent = ({
                                      noteList,
                                      searchParam,
                                      showAllNotes,
                                      deleteNote,
                                      completeNote,
                                      setNotePriority,
                                      changeNoteName,
                                      sortOrder,
                                      changeSortOrder
                                  }: Props) => {


    const handleSortClick = (column: NoteSortColumn) => {
        const icon = switchSort(sortOrder.icon);
        let noteSortOrder = {
            sortColumn: column,
            sortOrder: NoteSortOrder.ASC,
            icon: icon,
        }
        changeSortOrder(noteSortOrder)
    }

    const switchSort = (sortIcon: string): string => {
        if (sortIcon === "sort-icon-up") {
            return "sort-icon-down";
        } else if (sortIcon === "sort-icon-down") {
            return "sort-icon-up";
        } else {
            return "sort-icon-up";
        }
    }

    return (
        <Grid container spacing={2} rowSpacing={2} alignItems="center" direction="row" justifyContent="center">
            {noteList.length > 0 &&
            <Fragment>
                <Grid item style={{textAlign: "right"}} xs={4}>
                    <Link onClick={() => handleSortClick(NoteSortColumn.PRIORITY)} underline="none"><Typography
                        className={"sort-icon " + (sortOrder.sortColumn === NoteSortColumn.PRIORITY ? sortOrder.icon : "")}>Wichtigkeit</Typography></Link>
                </Grid>
                <Grid style={{textAlign: "left"}} item xs={8}>
                    <Link onClick={() => handleSortClick(NoteSortColumn.NAME,)} underline="none"><Typography
                        className={"sort-icon " + (sortOrder.sortColumn === NoteSortColumn.NAME ? sortOrder.icon : "")}>Aufgabe</Typography></Link>
                </Grid>
            </Fragment>}
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
