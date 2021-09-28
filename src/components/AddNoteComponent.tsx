import React, {ChangeEvent, useEffect, useState} from "react";
import { Note } from "../models/Note";

interface Props {
    noteList: Note[];
    addNewNote: (arg: string) => void
}

export const AddNoteComponent = ({noteList, addNewNote}: Props) => {

    const [text, setText] = useState("");

    const updateText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const handleClickEvent = () => {
        console.log(text);
        addNewNote(text);
    }

    return (
        <div className="add-notes">
            <input onChange={updateText} type="text" placeholder="Aufgabe..." id="add-note-textfield" name="add-note-textfield"/>
            <button type="button" onClick={handleClickEvent}>Hinzufügen</button>
        </div>
    );
}