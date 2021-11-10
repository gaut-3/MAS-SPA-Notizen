import {Grid, Link, Typography} from "@mui/material";
import {Fragment} from "react";
import {Note} from "../models/Note";
import {NoteOrder} from "../models/NoteOrder";
import {ColumnName} from "../utils/ColumnName";
import {SortOrder} from "../models/SortOrder";
import {NoteComponent} from "./NoteComponent";

interface Props {
    noteList: Note[];
    searchParam: string
    showAllNotes: boolean
    setNotePriority: (noteId: number, priority: number) => void
    deleteNote: (noteId: number) => void
    completeNote: (noteId: number, isComplete: boolean) => void
    changeNoteName: (noteId: number, noteName: string) => void
    changeSortOrder: (noteOrder: NoteOrder) => void
    noteOrder: NoteOrder
}


export const NoteListComponent = ({
                                      noteList,
                                      searchParam,
                                      showAllNotes,
                                      deleteNote,
                                      completeNote,
                                      setNotePriority,
                                      changeNoteName,
                                      noteOrder,
                                      changeSortOrder
                                  }: Props) => {


    const handleSortClick = (column: ColumnName) => {
        const noteSortOrder = {
            sortColumn: column,
            sortOrder: switchSortOrder(noteOrder.sortOrder),
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

    const getIconClass = (sortOrder: string): string => {
        if (sortOrder === SortOrder.ASC) {
            return "sort-icon-up";
        }
        if (sortOrder === SortOrder.DESC) {
            return "sort-icon-down";
        }

        return "";
    }

    return (
        <Grid container className="note-list-container" rowSpacing={2} alignItems="center" direction="row"
              justifyContent="center">
            {noteList.length > 0 &&
            <Fragment>
                <Grid item style={{textAlign: "right", paddingRight: "10px"}} xs={3}>
                    <Link color="inherit" onClick={() => handleSortClick(ColumnName.PRIORITY)} underline="none"><Typography
                        className={"sort-icon " + (noteOrder.sortColumn === ColumnName.PRIORITY ? getIconClass(noteOrder.sortOrder) : "")}>Wichtigkeit</Typography></Link>
                </Grid>
                <Grid item style={{textAlign: "left", paddingLeft: "10px"}} xs={9}>
                    <Link color="inherit" onClick={() => handleSortClick(ColumnName.NAME,)} underline="none"><Typography
                        className={"sort-icon " + (noteOrder.sortColumn === ColumnName.NAME ? getIconClass(noteOrder.sortOrder) : "")}>Aufgabe</Typography></Link>
                </Grid>
                <Grid item className="note-list-item-separator" xs={12} />
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
                    <Fragment>
                        <NoteComponent note={note}
                                       completeNote={completeNote}
                                       changeNotePriority={setNotePriority}
                                       deleteNote={deleteNote}
                                       changeNoteName={changeNoteName}/>
                        <Grid className="note-list-item-separator" item
                              xs={12} />
                    </Fragment>
                );
            })}
        </Grid>
    );
}
