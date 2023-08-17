'use client'
import { Box, Button, List, ListItem, Typography, Link } from "@mui/material";
import { useState } from "react";
import NextLink from "next/link";
import { grey } from "@mui/material/colors";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Modal from "./Modal";
import {instructions} from "@/data/instructions";

export default function Header(){
  const [openInstr, setOpenInstr] = useState(false);
  const modalHandler = () => setOpenInstr(!openInstr);
  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
        borderBottom: `1px solid ${grey[100]}`
      }}>
       <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Link component={NextLink} href='/' mr={1}>
          <NoteAltIcon fontSize="large"/>
        </Link>
        <Link href='/notes'>
          <Typography>Notes</Typography>
        </Link>
       </Box>
        <Button
          color="primary"
          variant="contained"
          onClick={modalHandler}
        >
          INSCRUCTION
        </Button>
      </Box>
      <Modal open={openInstr} closeModal={modalHandler} closeBtnText="Got it">
        <Typography variant="h4" textAlign='center'>Instruction</Typography>
        <List>
          {instructions.map(({ stepNumber, description }) => (
            <ListItem key={stepNumber}>
              <Typography>{`${stepNumber}. ${description}`}</Typography>
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  )
}
