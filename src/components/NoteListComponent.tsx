import React from "react";
import {Note} from "../models/Note";
import {List} from "@mui/material";
import {NoteComponent} from "./NoteComponent";

interface Props {
    noteList: Note[];
    deleteNote: (noteId: number) => void
    completeNote: (noteId: number, isChecked: boolean) => void
    setNotePriority: (noteId: number, priority: number) => void
    showAllNotes: boolean
}


export const NoteListComponent = ({noteList, deleteNote, completeNote, setNotePriority, showAllNotes}: Props) => {

    return (
        /* <div className="list-notes">
             {noteList.map(note => ((showAllNotes || !note.checked) &&
                 <div key={note.id}>
                     <Checkbox checked={note.checked}
                               onChange={(event) => handleCheckedChange(note.id, event)}></Checkbox>
                     <div className={"note-priorities note-priority-" + note.priority}>
                         <span onClick={() => handlePriorityClick(note.id, 1)}>
                             &#128498;
                         </span>
                         <span onClick={() => handlePriorityClick(note.id, 2)}>
                             &#128498;
                         </span>
                         <span onClick={() => handlePriorityClick(note.id, 3)}>
                             &#128498;
                         </span>
                     </div>
                     <span className={(note.checked) ? "note-checked" : ""}>{note.name}</span>
                     <Button size="small" variant="outlined" onClick={() => handleDeleteClick(note.id)}>Löschen</Button>
                 </div>
             ))}*/
        <List className="note-list"
              sx={{width: '100%', maxWidth: "100%", bgcolor: 'background.paper', margin: "0 auto"}}>
            {noteList.filter(note => (showAllNotes || !note.checked)).map((note) => {

                return (
                    <NoteComponent note={note} completeNote={completeNote} setNotePriority={setNotePriority}
                                   deleteNote={deleteNote}/>

                );
            })}
        </List>

        /*</div>*/
    );
}
