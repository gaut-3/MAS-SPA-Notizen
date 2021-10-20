import React, {ChangeEvent, useState} from "react";
import {Note} from "../models/Note";
import {Button, Checkbox, ListItemIcon, TextField, Typography} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";


interface Props {
    note: Note;
    handleDeleteClick: (noteId: number) => void
    handleCheckedChange: (noteId: number, isChecked: boolean) => void
    handlePriorityClick: (noteId: number, priority: number) => void
}

export const NoteComponent = ({note, handleCheckedChange, handleDeleteClick, handlePriorityClick}: Props) => {

    return (
        <div key={note.id}>
            <Checkbox checked={note.checked}
                      onChange={(event) => handleCheckedChange(note.id, event)}></Checkbox>
            <div className={"note-priorities note-priority-" + note.priority}>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 1)}/>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 2)}/>
                <BoltIcon onClick={() => handlePriorityClick(note.id, 3)}/>
            </div>
            <Typography className={(note.checked) ? "note-checked" : ""} variant="body1">{note.name}</Typography>
            <Button size="small" variant="outlined" onClick={() => handleDeleteClick(note.id)}>Löschen</Button>
        </div>
    );
}
