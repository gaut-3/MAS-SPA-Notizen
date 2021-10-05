import React, {ChangeEvent, useState} from "react";
import { Note } from "../models/Note";


interface Props {
    noteList: Note[];
    addNewNote: (arg: string) => void
}

export const AddNoteComponent = ({noteList, addNewNote}: Props) => {

    const refTextInput = React.useRef<HTMLInputElement>(null)

    const handleClickEvent = () => {
        const inputElement = refTextInput.current;
        if (inputElement != null && inputElement.value != "") {
            addNewNote(String(inputElement.value));
            inputElement.value = "";
        }
    }

    return (
        <div className="add-notes">
            <input ref={refTextInput} type="text" placeholder="Aufgabe..." id="add-note-textfield"
                   name="add-note-textfield"/>
            <button type="button" onClick={handleClickEvent}>Hinzufügen</button>
        </div>
    );
}
