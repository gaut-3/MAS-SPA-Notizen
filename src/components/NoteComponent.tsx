import BoltIcon from "@mui/icons-material/Bolt";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Checkbox, Grid, TextField } from "@mui/material";
import { ChangeEvent, Fragment } from "react";
import { Note } from "../models/Note";


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
            <Grid item style={{textAlign: "left"}} xs={1}>
                <Checkbox checked={note.isComplete}
                          onChange={(event) => handleIsCompleteChange(note.id, event)}/>
            </Grid>
            <Grid item className={"note-priorities note-priority-" + note.priority} xs={2}>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 1)}/>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 2)}/>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 3)}/>
            </Grid>
            <Grid item style={{textAlign: "left"}} xs={7}>
                <TextField fullWidth
                           style={{overflowWrap: "break-word", paddingLeft: "10px"}}
                           onChange={e => handleNoteNameChange(note.id, e)} value={note.name}
                           // note-checked class needs to be set like this, because in Firefox it does not work otherwise
                           InputProps={{disableUnderline: true, classes: { input: (note.isComplete) ? "note-completed-text" : ""}}}
                           variant="standard"/>
            </Grid>
            <Grid item style={{textAlign: "right"}} xs={2}>
                <Button size="small" variant="outlined"  onClick={() => handleDeleteClick(note.id)}><DeleteIcon fontSize="small" /></Button>
            </Grid>
        </Fragment>

    );
}
