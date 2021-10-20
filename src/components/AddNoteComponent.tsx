import React, {ChangeEvent, useState} from "react";
import { Note } from "../models/Note";


interface Props {
    noteList: Note[];
    addNewNote: (arg: string) => void
    filterNoteList:(arg: string) => void
}

export const AddNoteComponent = ({noteList, addNewNote, filterNoteList}: Props) => {

    const [text, setText] = useState("");

    const updateText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
        console.log(event.target.value)
        filterNoteList(event.target.value);
    }

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
            <input ref={refTextInput} type="text" onChange={updateText} placeholder="Aufgabe..." id="add-note-textfield"
                   name="add-note-textfield"/>
            <button type="button" onClick={handleClickEvent}>Hinzufügen</button>
        </div>
    );
}
