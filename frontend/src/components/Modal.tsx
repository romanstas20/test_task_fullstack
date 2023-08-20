import {Box, Button, Modal as MuiModal} from "@mui/material";
import {grey} from "@mui/material/colors";
import {IModalProps} from "@/interfaces";


export default function Modal(
    {
        closeModal,
        open,
        closeBtnText,
        children
    }: IModalProps) {
    return (
        <MuiModal
            open={open}
            onClose={closeModal}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                borderRadius: 1,
                backgroundColor: 'white'
            }}>
                <Box sx={{padding: 2, borderBottom: `1px solid ${grey[100]}`}}>
                    {children}
                </Box>
                <Box sx={{padding: 1, display: 'flex', justifyContent: 'end'}}>
                    <Button variant="contained" onClick={closeModal}>{closeBtnText}</Button>
                </Box>
            </Box>
        </MuiModal>
    )
}
