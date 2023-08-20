"use client"
import {useState} from "react";
import {Grid} from "@mui/material";

import GetNoteForm from "@/components/GetNoteForm";
import SingleNote from "@/components/SingleNote";
import Header from "@/components/Header";

function Notes() {
    const [note, setNote] = useState({title: "", body: ""});
    return (
        <Header>
            <Grid container spacing={2} padding={2}>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                    <GetNoteForm setNote={setNote}/>
                </Grid>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                    <SingleNote title={note.title} noteBody={note.body}/>
                </Grid>
            </Grid>
        </Header>
    )
}

export default Notes;
