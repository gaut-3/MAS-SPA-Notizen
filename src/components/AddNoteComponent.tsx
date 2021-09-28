import React, {ChangeEvent, useState} from "react";


export const AddNoteComponent = () => {
    const [text, setText] = useState("");
    let textInput = React.createRef();

    const updateText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const handleClickEvent = () => {
        console.log(text);
    }

    return (
        <div className="add-notes">
            <input onChange={updateText} type="text" placeholder="Aufgabe..." id="add-note-textfield" name="add-note-textfield"/>
            <button type="button" onClick={handleClickEvent}>Hinzufügen</button>
        </div>
    );
}
