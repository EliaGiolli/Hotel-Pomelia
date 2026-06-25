"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useBookingFormLogic } from "@/features/booking/hooks/useBookingFormLogic";

const STEP_LABELS = ["Date soggiorno", "Tipo camera", "Tipo pensione", "Riepilogo"];

interface BookingFormProviderProps {
  initialRoomType?: string;
  children: React.ReactNode;
}

export function BookingFormProvider({ initialRoomType, children }: BookingFormProviderProps) {
  const {
    methods,
    step,
    stepIndex,
    isPending,
    dialog,
    onSubmit,
    goNext,
    goBack,
    closeDialog,
  } = useBookingFormLogic({ initialRoomType });

  const steps = React.Children.toArray(children);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
      <FormProvider {...methods}>
        <Box sx={{ maxWidth: 600, mx: "auto", p: { xs: 2, sm: 3 } }}>
          <Stepper activeStep={stepIndex} alternativeLabel sx={{ mb: 4 }}>
            {STEP_LABELS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            {steps[stepIndex]}

            <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
              <Button variant="outlined" onClick={goBack} disabled={step === 1}>
                Indietro
              </Button>

              {step < 4 ? (
                <Button variant="contained" onClick={goNext}>
                  Avanti
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isPending}
                  startIcon={
                    isPending ? (
                      <CircularProgress size={18} color="inherit" aria-hidden="true" />
                    ) : undefined
                  }
                >
                  {isPending ? "Invio in corso…" : "Invia richiesta"}
                </Button>
              )}
            </Stack>
          </form>

          <Dialog
            open={dialog.open}
            onClose={closeDialog}
            aria-labelledby="booking-result-title"
            aria-describedby="booking-result-description"
          >
            <DialogTitle
              id="booking-result-title"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {dialog.success ? (
                <CheckCircleOutlineIcon color="success" aria-hidden="true" />
              ) : (
                <ErrorOutlineIcon color="error" aria-hidden="true" />
              )}
              {dialog.success ? "Prenotazione ricevuta!" : "Errore nell'invio"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="booking-result-description">
                {dialog.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} autoFocus>
                Chiudi
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </FormProvider>
    </LocalizationProvider>
  );
}
