import {Box, Grid, Typography} from "@mui/material";
import {ISingleNote} from "@/interfaces";

export default function SingleNote(
    {
        noteBody,
        title
    }: ISingleNote) {
    return (
        <Grid item xs={12} md={8} lg={6}>
            <Box sx={{
                width: '100%',
                padding: 2,
                border: "solid #1976d2 2px",
                borderRadius: "12px"
            }}>
                {title !== "" ?
                    <>
                        <Typography variant="h4" mb={1} sx={{textTransform: "capitalize"}}>{title}</Typography>
                        <Typography fontSize={"22px"}>{noteBody}</Typography>
                    </> :
                    <Typography variant="h4" mb={1}>Enter yor secret key!!!</Typography>
                }
            </Box>
        </Grid>
    )
}
