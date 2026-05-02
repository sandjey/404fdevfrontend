"use client";

import { create } from "zustand";

type State = {
  open: boolean;
  source: string;
  openModal: (source?: string) => void;
  closeModal: () => void;
};

export const useContactModal = create<State>((set) => ({
  open: false,
  source: "",
  openModal: (source = "") => set({ open: true, source }),
  closeModal: () => set({ open: false }),
}));
