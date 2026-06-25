import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BookingForm } from "@/features/booking/components/BookingForm";

export const metadata = {
  title: "Prenota — Hotel Pomelia",
  description: "Richiedi la tua prenotazione presso Hotel Pomelia. Risposta entro 24 ore, nessun pagamento anticipato.",
};

interface PrenotaPageProps {
  searchParams: Promise<{ room?: string }>;
}

export default async function PrenotaPage({ searchParams }: PrenotaPageProps) {
  const { room } = await searchParams;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#FAF7F0", minHeight: "70vh" }}>
      <Container maxWidth="sm">
        <Typography
          variant="overline"
          sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em" }}
        >
          Richiesta di prenotazione
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          sx={{ mt: 0.5, mb: 1, fontSize: { xs: "1.6rem", md: "2rem" } }}
        >
          Prenota il tuo soggiorno
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Compila il modulo e ti risponderemo entro 24 ore. Nessun pagamento anticipato richiesto.
        </Typography>

        <BookingForm initialRoomType={room} />

        <Alert severity="info" sx={{ mt: 3 }} icon={false}>
          <Typography variant="caption" sx={{ lineHeight: 1.7 }}>
            Inviando questo modulo accetti che i tuoi dati vengano utilizzati esclusivamente per
            gestire la tua richiesta di soggiorno. Nessuna conservazione a lungo termine, nessuna
            cessione a terzi.
          </Typography>
        </Alert>
      </Container>
    </Box>
  );
}
