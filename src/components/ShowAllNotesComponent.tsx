import React, {ChangeEvent, useEffect, useState} from "react";
import {Checkbox, FormControlLabel, Grid} from "@mui/material";


interface Props {
    showAllNotes: (arg: boolean) => void
}

export const ShowAllNotesComponent = ({showAllNotes}: Props) => {

    const [sortByLastAdded, setSortByLastAdded] = useState(true)

    const handleShowAllChange = (event: ChangeEvent<HTMLInputElement>) => {
        showAllNotes(event.target.checked);
    }

    const handleSortByLastAddedChange = (event: ChangeEvent<HTMLInputElement>) => {
        showAllNotes(event.target.checked);
    }


    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <FormControlLabel control={<Checkbox onChange={handleShowAllChange}/>} label="Alle Anzeigen"/>
                {/*<FormControlLabel control={<Checkbox checked={true} onChange={handleSortByLastAddedChange} />} label="Sortieren nach zuletzt Hinzugefügt"/>*/}
            </Grid>
        </Grid>
    );
}
