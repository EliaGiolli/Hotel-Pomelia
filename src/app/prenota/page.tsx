"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useBookingStore } from "@/store/useBookingStore";

const STEPS = ["Date", "Camera & Pensione", "I tuoi dati", "Riepilogo"];

const ROOM_OPTIONS = [
  { value: "suite-gelsomino", label: "Suite Gelsomino — Terrazzo panoramico, King-size" },
  { value: "camera-mandorlo", label: "Camera Mandorlo — Vista giardino, Doppia" },
  { value: "familiare-carruba", label: "Familiare Carruba — Fino a 4 persone, 2 bagni" },
  { value: "junior-suite-zagara", label: "Junior Suite Zagara — Patio privato, Queen" },
];

const BOARD_OPTIONS = [
  { value: "Colazione", label: "Solo colazione biologica" },
  { value: "Mezza Pensione", label: "Mezza pensione (colazione + cena)" },
  { value: "Pensione Completa", label: "Pensione completa (colazione + pranzo + cena)" },
];

// Reads ?room= from the URL and pre-fills the room type in the store.
// Must be wrapped in <Suspense> because useSearchParams() opts out of static rendering.
function RoomPreFiller() {
  const searchParams = useSearchParams();
  const setField = useBookingStore((s) => s.setField);

  useEffect(() => {
    const room = searchParams.get("room");
    if (room) setField("roomType", room);
  }, [searchParams, setField]);

  return null;
}

// ── Step 1: Dates ──────────────────────────────────────────────────
function StepDates() {
  const { checkIn, checkOut, setField } = useBookingStore();
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
        Scegli le date del tuo soggiorno. Riceverai conferma via email entro 24 ore.
      </Typography>
      <TextField
        label="Data di arrivo"
        type="date"
        value={checkIn}
        onChange={(e) => setField("checkIn", e.target.value)}
        inputProps={{ min: today, "aria-label": "Data di arrivo" }}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
      />
      <TextField
        label="Data di partenza"
        type="date"
        value={checkOut}
        onChange={(e) => setField("checkOut", e.target.value)}
        inputProps={{ min: checkIn || today, "aria-label": "Data di partenza" }}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
        disabled={!checkIn}
        helperText={!checkIn ? "Seleziona prima la data di arrivo" : ""}
      />
    </Box>
  );
}

// ── Step 2: Room & Board ───────────────────────────────────────────
function StepRoomBoard() {
  const { roomType, boardType, setField } = useBookingStore();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
        Seleziona la tipologia di camera e il regime di pensione desiderato.
      </Typography>
      <TextField
        select
        label="Tipologia di camera"
        value={roomType}
        onChange={(e) => setField("roomType", e.target.value)}
        required
        fullWidth
        inputProps={{ "aria-label": "Tipologia di camera" }}
      >
        {ROOM_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Regime di pensione"
        value={boardType}
        onChange={(e) => setField("boardType", e.target.value as typeof boardType)}
        required
        fullWidth
        inputProps={{ "aria-label": "Regime di pensione" }}
      >
        {BOARD_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

// ── Step 3: Guest details ──────────────────────────────────────────
function StepGuestDetails() {
  const { guestName, guestEmail, notes, setField } = useBookingStore();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
        Inserisci i tuoi dati. Ti contatteremo all&apos;indirizzo email fornito per confermare la disponibilità.
      </Typography>
      <TextField
        label="Nome e cognome"
        value={guestName}
        onChange={(e) => setField("guestName", e.target.value)}
        required
        fullWidth
        autoComplete="name"
        inputProps={{ "aria-label": "Nome e cognome" }}
      />
      <TextField
        label="Indirizzo email"
        type="email"
        value={guestEmail}
        onChange={(e) => setField("guestEmail", e.target.value)}
        required
        fullWidth
        autoComplete="email"
        inputProps={{ "aria-label": "Indirizzo email" }}
      />
      <TextField
        label="Note e richieste speciali"
        multiline
        rows={4}
        value={notes}
        onChange={(e) => setField("notes", e.target.value)}
        fullWidth
        placeholder="Es. camera accessibile, allergie alimentari, letto aggiunto per bambino..."
        inputProps={{ "aria-label": "Note e richieste speciali" }}
        helperText="Facoltativo — qualsiasi esigenza specifica che vogliamo conoscere in anticipo."
      />
    </Box>
  );
}

// ── Step 4: Summary ────────────────────────────────────────────────
function StepSummary() {
  const { checkIn, checkOut, roomType, boardType, guestName, guestEmail, notes } = useBookingStore();

  const roomLabel = ROOM_OPTIONS.find((r) => r.value === roomType)?.label ?? roomType;
  const boardLabel = BOARD_OPTIONS.find((b) => b.value === boardType)?.label ?? boardType;

  const rows = [
    { label: "Arrivo", value: checkIn ? new Date(checkIn).toLocaleDateString("it-IT", { dateStyle: "long" }) : "—" },
    { label: "Partenza", value: checkOut ? new Date(checkOut).toLocaleDateString("it-IT", { dateStyle: "long" }) : "—" },
    { label: "Camera", value: roomLabel },
    { label: "Pensione", value: boardLabel },
    { label: "Nome", value: guestName },
    { label: "Email", value: guestEmail },
    ...(notes ? [{ label: "Note", value: notes }] : []),
  ];

  return (
    <Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
        Controlla i dettagli prima di inviare la richiesta. Riceverai conferma via email entro 24 ore.
      </Typography>
      <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
        {rows.map((row, i) => (
          <Box
            key={row.label}
            sx={{
              display: "flex",
              gap: 2,
              px: 3,
              py: 1.75,
              backgroundColor: i % 2 === 0 ? "#FAF7F0" : "#FFFFFF",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.secondary", minWidth: 90, flexShrink: 0, pt: 0.1 }}>
              {row.label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, wordBreak: "break-word" }}>
              {row.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ── Main page ──────────────────────────────────────────────────────
export default function PrenotaPage() {
  const {
    step,
    checkIn,
    checkOut,
    roomType,
    boardType,
    guestName,
    guestEmail,
    notes,
    setStep,
    isSubmitting,
    isSuccess,
    setSubmitting,
    setSuccess,
    reset,
  } = useBookingStore();

  function canAdvance(): boolean {
    if (step === 1) return Boolean(checkIn && checkOut && checkOut > checkIn);
    if (step === 2) return Boolean(roomType && boardType);
    if (step === 3) return Boolean(guestName.trim() && guestEmail.trim() && /\S+@\S+\.\S+/.test(guestEmail));
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // `notes` is already in scope from the destructured store — no stale closure
        body: JSON.stringify({ checkIn, checkOut, roomType, boardType, guestName, guestEmail, notes }),
      });
      if (!res.ok) throw new Error("Server error");
      setSuccess(true);
    } catch {
      alert("Si è verificato un errore. Riprova o contattaci via email: info@hotelpomelia.it");
    } finally {
      setSubmitting(false);
    }
  }

  const stepIndex = step - 1;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#FAF7F0", minHeight: "70vh" }}>
      {/* Reads ?room= from URL and pre-fills the store — Suspense required by Next.js for useSearchParams */}
      <Suspense fallback={null}>
        <RoomPreFiller />
      </Suspense>

      <Container maxWidth="sm">
        <Typography variant="overline" sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em" }}>
          Richiesta di prenotazione
        </Typography>
        <Typography variant="h2" sx={{ mt: 0.5, mb: 1, fontSize: { xs: "1.6rem", md: "2rem" } }}>
          Prenota il tuo soggiorno
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
          Compila il modulo e ti risponderemo entro 24 ore. Nessun pagamento anticipato richiesto.
        </Typography>

        {/* Progress stepper */}
        <Stepper activeStep={stepIndex} alternativeLabel sx={{ mb: 5 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": { fontSize: "0.75rem" },
                  "& .Mui-completed": { color: "#00A896" },
                  "& .Mui-active": { color: "#00A896" },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step content card */}
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            p: { xs: 3, md: 4 },
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
            {STEPS[stepIndex]}
          </Typography>

          {step === 1 && <StepDates />}
          {step === 2 && <StepRoomBoard />}
          {step === 3 && <StepGuestDetails />}
          {step === 4 && <StepSummary />}
        </Box>

        {/* Navigation buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => setStep((step - 1) as typeof step)}
            disabled={step === 1}
            aria-label="Torna al passo precedente"
          >
            Indietro
          </Button>

          {step < 4 ? (
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => setStep((step + 1) as typeof step)}
              disabled={!canAdvance()}
              aria-label="Vai al passo successivo"
            >
              Avanti
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              endIcon={
                isSubmitting ? <CircularProgress size={16} color="inherit" /> : <ArrowForwardIcon />
              }
              onClick={handleSubmit}
              disabled={isSubmitting}
              aria-label="Invia la richiesta di prenotazione"
            >
              {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
            </Button>
          )}
        </Box>

        <Alert severity="info" sx={{ mt: 3 }} icon={false}>
          <Typography variant="caption" sx={{ lineHeight: 1.7 }}>
            Inviando questo modulo accetti che i tuoi dati vengano utilizzati esclusivamente
            per gestire la tua richiesta di soggiorno. Nessuna conservazione a lungo termine, nessuna cessione a terzi.
          </Typography>
        </Alert>
      </Container>

      {/* ── Success dialog ── */}
      <Dialog
        open={isSuccess}
        onClose={() => {
          setSuccess(false);
          reset();
        }}
        maxWidth="sm"
        fullWidth
        aria-labelledby="success-dialog-title"
      >
        <DialogTitle id="success-dialog-title" sx={{ textAlign: "center", pt: 5 }}>
          <CheckCircleIcon
            sx={{ fontSize: 64, color: "#00A896", display: "block", mx: "auto", mb: 1 }}
            aria-hidden="true"
          />
          <Typography variant="h4" component="span" sx={{ display: "block", fontWeight: 700 }}>
            Richiesta inviata!
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pb: 5 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            Grazie per aver scelto Hotel Pomelia. Ti risponderemo entro{" "}
            <strong>24 ore</strong> all&apos;indirizzo email che hai fornito, con la conferma
            di disponibilità e tutti i dettagli del soggiorno.
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontStyle: "italic" }}>
            Nel frattempo, hai domande? Scrivici a{" "}
            <a href="mailto:info@hotelpomelia.it" style={{ color: "#00A896" }}>
              info@hotelpomelia.it
            </a>
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setSuccess(false);
              reset();
            }}
            aria-label="Chiudi il dialogo e torna alla home"
          >
            Torna alla home
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
