import { create } from "zustand";

export type BookingStep = 1 | 2 | 3 | 4;

interface BookingStore {
  step: BookingStep;
  preSelectedRoomType: string;
  setStep: (step: BookingStep) => void;
  preSelectRoom: (roomType: string) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  step: 1,
  preSelectedRoomType: "",

  setStep: (step) => set({ step }),

  preSelectRoom: (roomType) => set({ preSelectedRoomType: roomType, step: 1 }),

  reset: () => set({ step: 1, preSelectedRoomType: "" }),
}));
