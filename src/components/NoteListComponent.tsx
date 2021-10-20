import React, {ChangeEvent} from "react";
import {Note} from "../models/Note";
import {Button, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import BoltIcon from '@mui/icons-material/Bolt';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';

interface Props {
    noteList: Note[];
    deleteNote: (noteId: number) => void
    completeNote: (noteId: number, isChecked: boolean) => void
    setNotePriority: (noteId: number, priority: number) => void
    showAllNotes: boolean
}


export const NoteListComponent = ({noteList, deleteNote, completeNote, setNotePriority, showAllNotes}: Props) => {

    const handleDeleteClick = (noteId: number) => {
        deleteNote(noteId)
    }

    const handleCheckedChange = (noteId: number, event: ChangeEvent<HTMLInputElement>) => {
        completeNote(noteId, event.target.checked);
    }

    const handlePriorityClick = (noteId: number, priority: number) => {
        setNotePriority(noteId, priority)
    }

    return (
        <div className="list-notes">
            {noteList.map(note => ((showAllNotes || !note.checked) &&
                <div key={note.id}>
                    <Checkbox checked={note.checked} onChange={(event) => handleCheckedChange(note.id, event)} ></Checkbox>
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
            ))}
            <List className="note-list" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: "0 auto" }}>
                {noteList.filter(note => (showAllNotes || !note.checked)).map((note) => {

                    return (
                        <ListItem
                            key={note.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <Button size="small" variant="outlined" onClick={() => handleDeleteClick(note.id)}>Löschen</Button>
                                </IconButton>
                            }
                            disablePadding>
                            <ListItemIcon>
                                <Checkbox
                                    checked={note.checked}
                                    onChange={(event) => handleCheckedChange(note.id, event)}
                                />
                            </ListItemIcon>
                            <div className={"note-priorities note-priority-" + note.priority}>
                                <BoltIcon onClick={() => handlePriorityClick(note.id, 1)} />
                                <BoltIcon onClick={() => handlePriorityClick(note.id, 2)} />
                                <BoltIcon onClick={() => handlePriorityClick(note.id, 3)} />
                            </div>
                            <ListItemText className={(note.checked) ? "note-checked" : ""} primary={note.name} />

                        </ListItem>
                    );
                })}
            </List>

        </div>
    );
}
