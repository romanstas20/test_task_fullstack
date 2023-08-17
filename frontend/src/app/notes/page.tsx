"use client"

import {useState} from "react";
import { Grid } from "@mui/material";

import GetNoteForm from "@/components/GetNoteForm";
import SingleNote from "@/components/SingleNote";

export default function Notes(){
    const [note, setNote] = useState({title: "", body: ""});
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={4}>
        <GetNoteForm setNote={setNote}/>
      </Grid>
      <Grid item xs={8}>
        <SingleNote title={note.title} noteBody={note.body}/>
      </Grid>
    </Grid>
  )
}
