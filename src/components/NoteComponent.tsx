import React, {ChangeEvent, Fragment} from "react";
import {Note} from "../models/Note";
import {Button, Checkbox, Grid, Typography} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";


interface Props {
    note: Note;
    deleteNote: (noteId: number) => void
    completeNote: (noteId: number, isChecked: boolean) => void
    setNotePriority: (noteId: number, priority: number) => void
}

export const NoteComponent = ({note, deleteNote, completeNote, setNotePriority}: Props) => {

    const handleDeleteClick = (noteId: number) => {
        deleteNote(noteId)
    }

    const handleIsCompleteChange = (noteId: number, event: ChangeEvent<HTMLInputElement>) => {
        completeNote(noteId, event.target.checked);
    }

    const handlePriorityClick = (noteId: number, priority: number) => {
        setNotePriority(noteId, priority)
    }

    return (
        <Fragment>
            <Grid style={{textAlign: "left"}} item xs={1}>
                <Checkbox checked={note.isComplete}
                          onChange={(event) => handleIsCompleteChange(note.id, event)} />
            </Grid>
            <Grid item className={"note-priorities note-priority-" + note.priority} xs={2}>
                    <BoltIcon onClick={() => handlePriorityClick(note.id, 1)}/>
                    <BoltIcon onClick={() => handlePriorityClick(note.id, 2)}/>
                    <BoltIcon onClick={() => handlePriorityClick(note.id, 3)}/>
            </Grid>
            <Grid style={{textAlign: "left"}} item xs={6}>
                <Typography className={(note.isComplete) ? "note-checked" : ""} variant="body1">{note.name}</Typography>
            </Grid>
            <Grid style={{textAlign: "right"}} item xs={3}>
                <Button size="small" variant="outlined" onClick={() => handleDeleteClick(note.id)}>Löschen</Button>
            </Grid>
        </Fragment>

    );
}
