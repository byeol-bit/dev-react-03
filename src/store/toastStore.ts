import { create } from "zustand";

export type ToastType = "success" | "error" | "warning" | "info";

export interface IToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastStoreState {
  toasts: IToastItem[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: number) => void;
}

const useToastStore = create<ToastStoreState>((set) => ({
  toasts: [],
  addToast: (message, type = "info") => {
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), message, type }],
    }));
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export default useToastStore;
