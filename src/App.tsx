import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AddNoteComponent} from "./components/AddNoteComponent";

function App() {
    return (
        <div className="container">
            <AddNoteComponent />
            <div className="list-notes">

            </div>
        </div>
    );
}


export default App;
