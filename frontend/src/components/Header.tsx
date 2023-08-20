'use client'
import React, {ReactNode, useState} from "react";
import {Box, Button, Link, List, ListItem, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import NextLink from "next/link";

import {instructions} from "@/data/instructions";
import Modal from "./Modal";
import {useLogout} from "@/hooks/useLogout";
import {IInstructionStep} from "@/interfaces";

export default function Header({children}: { children: ReactNode }) {
    const [openInstr, setOpenInstr] = useState(false);

    const modalHandler = () => setOpenInstr(!openInstr);
    const {logout} = useLogout();
    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1,
                borderBottom: `1px solid ${grey[100]}`
            }}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Link component={NextLink} href='/' mr={1}>
                        <NoteAltIcon fontSize="large"/>
                    </Link>
                    <Link href={'/notes'}>
                        <Typography>Notes</Typography>
                    </Link>
                </Box>
                <Box sx={{display: "flex", gap: "10px"}}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={modalHandler}
                    >
                        INSTRUCTION
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={logout}
                    >
                        Log Out
                    </Button>
                </Box>
            </Box>
            <Modal open={openInstr} closeModal={modalHandler} closeBtnText="Got it">
                <Typography variant="h4" textAlign='center'>Instruction</Typography>
                <List>
                    {instructions.map(({stepNumber, description}: IInstructionStep) => (
                        <ListItem key={stepNumber}>
                            <Typography>{`${stepNumber}. ${description}`}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Modal>
            {children}
        </>
    );
}
