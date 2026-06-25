import { BookingFormProvider } from "./BookingFormProvider";
import { DateStep } from "./steps/DateStep";
import { RoomStep } from "./steps/RoomStep";
import { BoardStep } from "./steps/BoardStep";
import { SummaryStep } from "./steps/SummaryStep";

interface BookingFormProps {
  initialRoomType?: string;
}

export function BookingForm({ initialRoomType }: BookingFormProps) {
  return (
    <BookingFormProvider initialRoomType={initialRoomType}>
      <DateStep />
      <RoomStep />
      <BoardStep />
      <SummaryStep />
    </BookingFormProvider>
  );
}
