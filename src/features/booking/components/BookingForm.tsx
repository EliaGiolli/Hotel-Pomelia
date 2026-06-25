import { BookingFormProvider } from "./BookingFormProvider";
import { DateStep } from "./steps/DateStep";
import { RoomStep } from "./steps/RoomStep";
import { BoardStep } from "./steps/BoardStep";
import { SummaryStep } from "./steps/SummaryStep";
import dbConnect from "../../../core/database/mongoose";
import Room, { IRoom } from "@/core/models/Room";

interface BookingFormProps {
  initialRoomType?: string;
}

export async function BookingForm({ initialRoomType }: BookingFormProps) {
  await dbConnect();
  const rooms = await Room.find<IRoom>({}, { name: 1 }).lean();
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
