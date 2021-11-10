import { Grid, Link, Typography } from "@mui/material";
import { Fragment } from "react";
import { Note } from "../models/Note";
import { NoteOrder } from "../models/NoteOrder";
import { ColumnName } from "../models/ColumnName";
import { SortOrder } from "../models/SortOrder";
import { NoteComponent } from "./NoteComponent";

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


    const handleSortClick = (column: ColumnName) => {
        const icon = switchSort(sortOrder.icon)
        const noteSortOrder = {
            sortColumn: column,
            sortOrder: switchSortOrder(sortOrder.sortOrder),
            icon: icon,
        }
        changeSortOrder(noteSortOrder)
    }

    const switchSortOrder = (sortOrder: string): SortOrder => {
        if (sortOrder === SortOrder.DESC) {
            return SortOrder.ASC;
        } else if (sortOrder === SortOrder.ASC) {
            return SortOrder.DESC;
        } else {
            return SortOrder.ASC;
        }
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

    const getIconClass = (sortOrder: string): string => {
        if (sortOrder === SortOrder.ASC) {
            return "sort-icon-down";
        }
        if (sortOrder === SortOrder.DESC) {
            return "sort-icon-up";
        }

        return "";
    }

    return (
        <Grid container spacing={2} rowSpacing={2} alignItems="center" direction="row" justifyContent="center">
            {noteList.length > 0 &&
            <Fragment>
                <Grid item style={{textAlign: "right"}} xs={4}>
                    <Link onClick={() => handleSortClick(ColumnName.PRIORITY)} underline="none"><Typography
                        className={"sort-icon " + (sortOrder.sortColumn === ColumnName.PRIORITY ? getIconClass(sortOrder.sortOrder) : "")}>Wichtigkeit</Typography></Link>
                </Grid>
                <Grid style={{textAlign: "left"}} item xs={8}>
                    <Link onClick={() => handleSortClick(ColumnName.NAME,)} underline="none"><Typography
                        className={"sort-icon " + (sortOrder.sortColumn === ColumnName.NAME ? getIconClass(sortOrder.sortOrder) : "")}>Aufgabe</Typography></Link>
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
