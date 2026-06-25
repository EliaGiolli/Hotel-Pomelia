"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { FieldPath, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookingFormSchema,
  BookingFormValues,
} from "@/features/booking/schemas/bookingFormSchema";
import { submitBooking } from "@/features/booking/actions/submitBooking";
import { useBookingStore, BookingStep } from "@/core/store/useBookingStore";

const STEP_FIELDS: FieldPath<BookingFormValues>[][] = [
  ["checkIn", "checkOut"],
  ["roomType"],
  ["boardType"],
  ["guestName", "guestEmail"],
];

interface UseBookingFormLogicOptions {
  initialRoomType?: string;
}

interface DialogState {
  open: boolean;
  success: boolean;
  message: string;
}

export function useBookingFormLogic({ initialRoomType }: UseBookingFormLogicOptions = {}) {
  const { step, setStep, preSelectedRoomType, reset: resetStore } = useBookingStore();
  const [isPending, startTransition] = useTransition();
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    success: false,
    message: "",
  });

  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      roomType: initialRoomType || preSelectedRoomType || "",
      guestName: "",
      guestEmail: "",
      notes: "",
    },
  });

  const stepIndex = step - 1;

  const goNext = async () => {
    const valid = await methods.trigger(STEP_FIELDS[stepIndex]);
    if (valid) setStep((step + 1) as BookingStep);
  };

  const goBack = () => setStep((step - 1) as BookingStep);

  const onSubmit: SubmitHandler<BookingFormValues> = (data) => {
    startTransition(async () => {
      const result = await submitBooking(data);
      if (result.success) {
        setDialog({
          open: true,
          success: true,
          message:
            "La tua richiesta è stata inviata con successo. Ti contatteremo al più presto per confermare la disponibilità.",
        });
      } else {
        setDialog({ open: true, success: false, message: result.error });
      }
    });
  };

  const closeDialog = () => {
    const wasSuccess = dialog.success;
    setDialog((prev) => ({ ...prev, open: false }));
    if (wasSuccess) {
      methods.reset();
      resetStore();
    }
  };

  return {
    methods,
    step,
    stepIndex,
    isPending,
    dialog,
    onSubmit,
    goNext,
    goBack,
    closeDialog,
  };
}
