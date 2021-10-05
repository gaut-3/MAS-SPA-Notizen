import React, {ChangeEvent, useState} from "react";
import { Note } from "../models/Note";


interface Props {
    showAllNotes: (arg: boolean) => void
}

export const ShowAllNoteComponent = ({showAllNotes}: Props) => {


    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        showAllNotes(event.target.checked);
    }

    return (
        <div >
            <input type="checkbox" onChange={handleChangeEvent}/>
            <span>Alle anzeigen</span>
        </div>
    );
}
