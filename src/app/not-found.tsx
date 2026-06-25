import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="60vh" gap={2}>
      <Typography variant="h4">404 - Pagina non trovata</Typography>
      <Typography color="text.secondary">La pagina dell&apos;hotel che cerchi non esiste o è stata spostata.</Typography>
      <Link href="/" passHref legacyBehavior>
        <Button variant="contained">Torna alla Home</Button>
      </Link>
    </Box>
  );
}
