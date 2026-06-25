"use client";

import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/core/store/useBookingStore";

interface BookingTriggerButtonProps {
  roomName: string;
}

export function BookingTriggerButton({ roomName }: BookingTriggerButtonProps) {
  const router = useRouter();
  const preSelectRoom = useBookingStore((s) => s.preSelectRoom);

  return (
    <Button
      variant="contained"
      color="secondary"
      endIcon={<ArrowForwardIcon />}
      fullWidth
      aria-label={`Prenota ${roomName}`}
      onClick={() => {
        preSelectRoom(roomName);
        router.push("/prenota");
      }}
    >
      Prenota questa camera
    </Button>
  );
}
