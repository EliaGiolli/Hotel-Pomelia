import mongoose, { Schema, model, models } from "mongoose";

export interface IBooking {
  roomId: mongoose.Types.ObjectId;
  guestName: string;
  guestEmail: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);
export default Booking;
