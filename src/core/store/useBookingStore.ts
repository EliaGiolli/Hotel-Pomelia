import { create } from "zustand";

// The booking form has 4 steps:
// 1 → Dates, 2 → Room & Board, 3 → Guest details, 4 → Summary/confirm
export type BookingStep = 1 | 2 | 3 | 4;

export type BoardType = "Pensione Completa" | "Mezza Pensione" | "Colazione" | "";

interface BookingState {
  step: BookingStep;
  checkIn: string;
  checkOut: string;
  roomType: string;
  boardType: BoardType;
  guestName: string;
  guestEmail: string;
  notes: string;
  isSubmitting: boolean;
  isSuccess: boolean;

  setStep: (step: BookingStep) => void;
  setField: <K extends keyof Omit<BookingState, "step" | "isSubmitting" | "isSuccess" | "setStep" | "setField" | "reset" | "setSubmitting" | "setSuccess">>(
    key: K,
    value: BookingState[K]
  ) => void;
  setSubmitting: (val: boolean) => void;
  setSuccess: (val: boolean) => void;
  reset: () => void;
}

const initialState = {
  step: 1 as BookingStep,
  checkIn: "",
  checkOut: "",
  roomType: "",
  boardType: "" as BoardType,
  guestName: "",
  guestEmail: "",
  notes: "",
  isSubmitting: false,
  isSuccess: false,
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  setField: (key, value) => set({ [key]: value } as Partial<BookingState>),

  setSubmitting: (val) => set({ isSubmitting: val }),

  setSuccess: (val) => set({ isSuccess: val }),

  reset: () => set(initialState),
}));
