"use client";

import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/it";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { BookingFormValues } from "@/features/booking/schemas/bookingFormSchema";

export function DateStep() {
  const { control, formState: { errors } } = useFormContext<BookingFormValues>();

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2">
        Quando vorresti soggiornare?
      </Typography>
      <Controller
        name="checkIn"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Data di arrivo"
            value={field.value ? dayjs(field.value) : null}
            onChange={(d) => field.onChange(d?.toDate())}
            disablePast
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
                error: !!errors.checkIn,
                helperText: errors.checkIn?.message,
              },
            }}
          />
        )}
      />
      <Controller
        name="checkOut"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Data di partenza"
            value={field.value ? dayjs(field.value) : null}
            onChange={(d) => field.onChange(d?.toDate())}
            disablePast
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
                error: !!errors.checkOut,
                helperText: errors.checkOut?.message,
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
