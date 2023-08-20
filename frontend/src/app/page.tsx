import {Box, Typography} from '@mui/material'

import NotesForm from '@/components/NotesForm'
import Header from "@/components/Header";

function Home() {

    return (
        <Header>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: ' center'
            }}>
                <Box sx={{
                    textAlign: 'center'
                }}>
                    <Typography variant='h4'>IncognitoNotes: Your Anonymous Memoir</Typography>
                    <Typography variant='h5'>Unveil Anonymity, Embrace Privacy</Typography>
                </Box>
                <NotesForm/>
            </Box>
        </Header>
    )
}

export default Home;
