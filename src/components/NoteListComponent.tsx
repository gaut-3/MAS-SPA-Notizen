import React, {ChangeEvent, useEffect, useState} from "react";
import { Note } from "../models/Note";

interface Props {
    noteList: Note[];
}

export const NoteListComponent = ({noteList}: Props) => {
    return (
        <div>
            {noteList.map(note => (
                <div key={note.id}>{note.name}</div>
            ))}
        </div>
    );
}
