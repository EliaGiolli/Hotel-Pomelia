"use client";

import { Controller, useFormContext } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { BookingFormValues } from "@/features/booking/schemas/bookingFormSchema";

interface RoomStepProps {
  roomNames: string[];
}

export function RoomStep({ roomNames }: RoomStepProps) {
  const { control, formState: { errors } } = useFormContext<BookingFormValues>();

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2">
        Quale camera preferisci?
      </Typography>
      <Controller
        name="roomType"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.roomType} required>
            <FormLabel>Tipologia di camera</FormLabel>
            <RadioGroup {...field}>
              {roomNames.map((name) => (
                <FormControlLabel
                  key={name}
                  value={name}
                  control={<Radio />}
                  label={name}
                />
              ))}
            </RadioGroup>
            {errors.roomType && (
              <FormHelperText>{errors.roomType.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Stack>
  );
}
