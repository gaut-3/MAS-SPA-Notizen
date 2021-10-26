import React, {ChangeEvent, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";


interface Props {
    addNewNote: (arg: string) => void
    filterNoteList: (arg: string) => void
}

export const AddNoteComponent = ({addNewNote, filterNoteList}: Props) => {

    const [text, setText] = useState("");

    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
        filterNoteList(event.target.value);
    }

    const handleClickEvent = () => {
        if (text !== "") {
            addNewNote(String(text));
            setText("");
        }
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={8}>
                <TextField fullWidth value={text} variant={"outlined"} onChange={handleChangeEvent}
                           placeholder="Aufgabe..."/>
            </Grid>
            <Grid item xs={4}>
                <Button fullWidth style={{height: "100%"}} size="large" variant="outlined"
                        onClick={handleClickEvent}>Hinzufügen</Button>
            </Grid>
        </Grid>
    );
}
