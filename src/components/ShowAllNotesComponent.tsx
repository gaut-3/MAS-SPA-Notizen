import React, {ChangeEvent} from "react";
import {Checkbox, FormControlLabel, Grid} from "@mui/material";


interface Props {
    showAllNotes: (arg: boolean) => void
}

export const ShowAllNotesComponent = ({showAllNotes}: Props) => {

    const handleShowAllChange = (event: ChangeEvent<HTMLInputElement>) => {
        showAllNotes(event.target.checked);
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <FormControlLabel control={<Checkbox onChange={handleShowAllChange}/>} label="Alle Anzeigen"/>
            </Grid>
        </Grid>
    );
}
