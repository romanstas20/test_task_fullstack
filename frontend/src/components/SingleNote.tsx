import { Box, Typography } from "@mui/material";

interface SingleNote {
  title: string;
  noteBody: string;
}
export default function SingleNote({
  noteBody,
  title
}: SingleNote){
  return (
    <Box sx={{
      width: '100%',
      padding: 2,
      border: "solid #1976d2 2px",
      borderRadius: "12px"
    }}>
      {title !== "" ?
          <>
            <Typography variant="h3" mb={1}>{title}</Typography>
            <Typography>{noteBody}</Typography>
          </>:
        <Typography variant="h3" mb={1}>Enter yor secret key!!!</Typography>
      }
    </Box>
  )
}
