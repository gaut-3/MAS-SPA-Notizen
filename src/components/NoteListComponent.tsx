import React, {Fragment, useState} from "react";
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
    setSortColumn: (sortColumn: keyof Note) => void
    setSortType: (sortOrder: string) => void
    setSortOrder: (noteOrder: NoteOrder) => void
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
                                      setSortColumn,
                                      setSortType,
                                      sortOrder,
                                      setSortOrder
                                  }: Props) => {

    const [sortPriority, setSortPriority] = useState("")
    const [sortName, setSortName] = useState("")


    const handleSortClick = (column: NoteSortColumn, event: React.MouseEvent) => {
        const icon = switchSort(sortOrder.icon);
        let noteSortOrder = {
            sortColumn: column,
            sortOrder: NoteSortOrder.ASC,
            icon: icon,
        }
        setSortOrder(noteSortOrder)
        //resetSorting();
       // setSortColumn(NoteSortColumn.NAME);
        //changeSortOrder(NoteSortColumn.NAME, NoteSortOrder.ASC);
        //setSortName(switchSort(sortName));
    }

    const resetSorting = () => {
        setSortPriority("");
        setSortName("");
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

    const header = () => {
       /* if (noteList.length > 0) {
            return (
                <Fragment>
                    <Grid item style={{textAlign: "right"}} xs={4}>
                        <Link onClick={e => handleSortClick(NoteSortColumn.PRIORITY, e)} underline="none"><Typography
                            className={"sort-icon " + sortPriority}>Wichtigkeit</Typography></Link>
                    </Grid>
                    <Grid style={{textAlign: "left"}} item xs={8}>
                        <Link onClick={e =>  handleSortClick(NoteSortColumn.PRIORITY, e)} underline="none"><Typography
                            className={"sort-icon " + (sortOrder.sortColumn === NoteSortColumn.PRIORITY ? sortOrder.icon : "")}>Aufgabe</Typography></Link>
                    </Grid>
                </Fragment>)
        }*/
    }

    return (
        <Grid container spacing={2} rowSpacing={2} alignItems="center" direction="row" justifyContent="center">
            {noteList.length > 0 &&
            <Fragment>
                <Grid item style={{textAlign: "right"}} xs={4}>
                    <Link onClick={e => handleSortClick(NoteSortColumn.PRIORITY, e)} underline="none"><Typography
                        className={"sort-icon " + (sortOrder.sortColumn === NoteSortColumn.PRIORITY ? sortOrder.icon : "")}>Wichtigkeit</Typography></Link>
                </Grid>
                <Grid style={{textAlign: "left"}} item xs={8}>
                    <Link onClick={e => handleSortClick(NoteSortColumn.NAME, e)} underline="none"><Typography
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
