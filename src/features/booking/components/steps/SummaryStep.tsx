"use client";

import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/it";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { BookingFormValues } from "@/features/booking/schemas/bookingFormSchema";

export function SummaryStep() {
  const { register, watch, formState: { errors } } = useFormContext<BookingFormValues>();
  const values = watch();

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Riepilogo prenotazione
        </Typography>
        <Stack spacing={0.5}>
          <Typography variant="body2">
            <strong>Arrivo:</strong>{" "}
            {values.checkIn ? dayjs(values.checkIn).format("DD MMMM YYYY") : "—"}
          </Typography>
          <Typography variant="body2">
            <strong>Partenza:</strong>{" "}
            {values.checkOut ? dayjs(values.checkOut).format("DD MMMM YYYY") : "—"}
          </Typography>
          <Typography variant="body2">
            <strong>Camera:</strong> {values.roomType || "—"}
          </Typography>
          <Typography variant="body2">
            <strong>Pensione:</strong> {values.boardType || "—"}
          </Typography>
        </Stack>
      </Box>

      <Typography variant="h6" component="h2">
        I tuoi dati
      </Typography>
      <TextField
        label="Nome e Cognome"
        {...register("guestName")}
        error={!!errors.guestName}
        helperText={errors.guestName?.message}
        fullWidth
        required
        autoComplete="name"
      />
      <TextField
        label="Indirizzo email"
        type="email"
        {...register("guestEmail")}
        error={!!errors.guestEmail}
        helperText={errors.guestEmail?.message}
        fullWidth
        required
        autoComplete="email"
      />
      <TextField
        label="Note aggiuntive"
        {...register("notes")}
        error={!!errors.notes}
        helperText={
          errors.notes?.message ??
          "Esigenze particolari, richieste speciali, allergie, ecc."
        }
        fullWidth
        multiline
        rows={3}
        autoComplete="off"
      />
    </Stack>
  );
}
