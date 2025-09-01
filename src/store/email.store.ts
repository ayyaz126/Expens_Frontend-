import { create } from "zustand";

interface EmailState {
  email: string;
  message: string;
  loading: boolean;
  previewUrl: string;
  setEmail: (email: string) => void;
  setMessage: (message: string) => void;
  setLoading: (loading: boolean) => void;
  setPreviewUrl: (url: string) => void;
}

export const useEmailStore = create<EmailState>((set) => ({
  email: "",
  message: "",
  loading: false,
  previewUrl: "",
  setEmail: (email) => set({ email }),
  setMessage: (message) => set({ message }),
  setLoading: (loading) => set({ loading }),
  setPreviewUrl: (url) => set({ previewUrl: url }),
}));
