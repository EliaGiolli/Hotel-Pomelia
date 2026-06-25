import { BookingFormProvider } from "./BookingFormProvider";
import { DateStep } from "./steps/DateStep";
import { RoomStep } from "./steps/RoomStep";
import { BoardStep } from "./steps/BoardStep";
import { SummaryStep } from "./steps/SummaryStep";
import { prisma } from "@/core/database/prisma";

interface BookingFormProps {
  initialRoomType?: string;
}

export async function BookingForm({ initialRoomType }: BookingFormProps) {
  const rooms = await prisma.room.findMany({ select: { name: true } });
  const roomNames = rooms.map((r) => r.name);

  return (
    <BookingFormProvider initialRoomType={initialRoomType}>
      <DateStep />
      <RoomStep roomNames={roomNames} />
      <BoardStep />
      <SummaryStep />
    </BookingFormProvider>
  );
}
