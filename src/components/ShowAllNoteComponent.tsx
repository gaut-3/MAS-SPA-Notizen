import React, {ChangeEvent, useState} from "react";
import { Note } from "../models/Note";
import {Checkbox, FormControlLabel} from "@mui/material";


interface Props {
    showAllNotes: (arg: boolean) => void
}

export const ShowAllNoteComponent = ({showAllNotes}: Props) => {

    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        showAllNotes(event.target.checked);
    }

    return (
        <div>
            <FormControlLabel control={<Checkbox onChange={handleChangeEvent} />} label="Alle Anzeigen" />
        </div>
    );
}
