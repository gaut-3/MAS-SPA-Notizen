import React, {ChangeEvent, useState} from "react";
import {Note} from "../models/Note";
import {Button, Checkbox, ListItem, ListItemIcon, TextField, Typography} from "@mui/material";
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

    const handleCheckedChange = (noteId: number, event: ChangeEvent<HTMLInputElement>) => {
        completeNote(noteId, event.target.checked);
    }

    const handlePriorityClick = (noteId: number, priority: number) => {
        setNotePriority(noteId, priority)
    }

    return (
        <ListItem key={note.id}>
            <Checkbox checked={note.checked}
                      onChange={(event) => handleCheckedChange(note.id, event)}></Checkbox>
            <div className={"note-priorities note-priority-" + note.priority}>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 1)}/>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 2)}/>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 3)}/>
            </div>
            <Typography className={(note.checked) ? "note-checked" : ""} variant="body1">{note.name}</Typography>
            <Button size="small" variant="outlined" onClick={() => handleDeleteClick(note.id)}>Löschen</Button>
        </ListItem>
    );
}
