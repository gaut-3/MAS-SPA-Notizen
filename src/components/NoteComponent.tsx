import React, {ChangeEvent, Fragment} from "react";
import {Note} from "../models/Note";
import {Button, Checkbox, Grid, TextField} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";


interface Props {
    note: Note;
    deleteNote: (noteId: number) => void
    completeNote: (noteId: number, isComplete: boolean) => void
    changeNotePriority: (noteId: number, priority: number) => void
    changeNoteName: (noteId: number, noteName: string) => void
}

export const NoteComponent = ({note, deleteNote, completeNote, changeNotePriority, changeNoteName}: Props) => {

    const handleDeleteClick = (noteId: number) => {
        deleteNote(noteId)
    }

    const handleIsCompleteChange = (noteId: number, event: ChangeEvent<HTMLInputElement>) => {
        completeNote(noteId, event.target.checked);
    }

    const handlePriorityClick = (noteId: number, priority: number) => {
        changeNotePriority(noteId, priority)
    }

    const handleNoteNameChange = (noteId: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        changeNoteName(noteId, event.target.value)
    }

    return (
        <Fragment>
            <Grid style={{textAlign: "left"}} item xs={1}>
                <Checkbox checked={note.isComplete}
                          onChange={(event) => handleIsCompleteChange(note.id, event)}/>
            </Grid>
            <Grid item className={"note-priorities note-priority-" + note.priority} xs={3}>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 1)}/>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 2)}/>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 3)}/>
            </Grid>
            <Grid style={{textAlign: "left"}} item xs={6}>
                <TextField fullWidth
                           style={{overflowWrap: "break-word"}}
                           className={(note.isComplete) ? "note-checked" : ""}
                           onChange={e => handleNoteNameChange(note.id, e)} value={note.name}
                           InputProps={{disableUnderline: true}}
                           variant="standard"/>
            </Grid>
            <Grid style={{textAlign: "right"}} item xs={2}>
                <Button size="small" variant="outlined" onClick={() => handleDeleteClick(note.id)}>Löschen</Button>
            </Grid>
        </Fragment>

    );
}
