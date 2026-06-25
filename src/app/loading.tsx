import { Box, CircularProgress, Typography } from "@mui/material";

export default function RootLoading() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh" gap={2}>
      <CircularProgress color="primary" />
      <Typography variant="body1" color="text.secondary">Caricamento in corso...</Typography>
    </Box>
  );
}
