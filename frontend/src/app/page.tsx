import {Box, Typography} from '@mui/material'
import NotesForm from '@/components/NotesForm'

export default function Home() {

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: ' center'
        }}>
            <Box sx={{
                textAlign: 'center'
            }}>
                <Typography variant='h3'>IncognitoNotes: Your Anonymous Memoir</Typography>
                <Typography>Unveil Anonymity, Embrace Privacy</Typography>
            </Box>
            <NotesForm/>
        </Box>
    )
}
