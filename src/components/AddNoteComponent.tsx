import React, {ChangeEvent, useState} from "react";
import { Note } from "../models/Note";
import {TextField, Button} from "@mui/material";


interface Props {
    noteList: Note[];
    addNewNote: (arg: string) => void
    filterNoteList:(arg: string) => void
}

export const AddNoteComponent = ({noteList, addNewNote, filterNoteList}: Props) => {

    const [text, setText] = useState("");

    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
        console.log(event.target.value)
        filterNoteList(event.target.value);
    }

    const handleClickEvent = () => {
        if (text !== "") {
            addNewNote(String(text));
            setText("");
        }
    }

    return (
        <div className="add-notes">
            <TextField value={text} variant={"outlined"} onChange={handleChangeEvent} placeholder="Aufgabe..."/>
            <Button variant="outlined" onClick={handleClickEvent}>Hinzufügen</Button>
        </div>
    );
}
