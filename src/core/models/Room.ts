import mongoose, { Schema, model, models } from "mongoose";

export interface IRoom {
  name: string;
  type: string; // es. 'deluxe', 'suite'
  pricePerNight: number;
  description?: string;
  images: string[];
  available: boolean;
  createdAt: Date;
}

const RoomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  description: { type: String },
  images: { type: [String], default: [] },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Room = models.Room || model<IRoom>("Room", RoomSchema);
export default Room;
