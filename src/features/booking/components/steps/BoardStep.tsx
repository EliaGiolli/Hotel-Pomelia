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
import {
  BOARD_TYPES,
  type BookingFormValues,
} from "@/features/booking/schemas/bookingFormSchema";

export function BoardStep() {
  const { control, formState: { errors } } = useFormContext<BookingFormValues>();

  return (
    <Stack spacing={3}>
      <Typography variant="h6" component="h2">
        Che tipo di pensione preferisci?
      </Typography>
      <Controller
        name="boardType"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.boardType} required>
            <FormLabel>Regime di pensione</FormLabel>
            <RadioGroup {...field}>
              {BOARD_TYPES.map((board) => (
                <FormControlLabel
                  key={board}
                  value={board}
                  control={<Radio />}
                  label={board}
                />
              ))}
            </RadioGroup>
            {errors.boardType && (
              <FormHelperText>{errors.boardType.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Stack>
  );
}
