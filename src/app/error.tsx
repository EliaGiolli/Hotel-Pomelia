"use client";

import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function RootError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh" gap={2} p={4}>
      <Typography variant="h5" color="error">Si è verificato un errore imprevisto</Typography>
      <Button variant="contained" onClick={() => reset()}>Riprova</Button>
    </Box>
  );
}
