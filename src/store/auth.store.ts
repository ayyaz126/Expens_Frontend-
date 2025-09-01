import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthState {
  registerData: RegisterData;
  setRegisterData: (data: Partial<RegisterData>) => void;
  resetRegisterForm: () => void;

  loginData: LoginData;
  setLoginData: (data: Partial<LoginData>) => void;
  resetLoginForm: () => void;

  user: User | null;
  token: string | null;
  setUser: (user: User, token: string) => void;
  logout: () => void;

  rehydrated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      registerData: { name: "", email: "", password: "" },
      setRegisterData: (data) =>
        set((state) => ({
          registerData: { ...state.registerData, ...data },
        })),
      resetRegisterForm: () =>
        set({ registerData: { name: "", email: "", password: "" } }),

      loginData: { email: "", password: "" },
      setLoginData: (data) =>
        set((state) => ({
          loginData: { ...state.loginData, ...data },
        })),
      resetLoginForm: () => set({ loginData: { email: "", password: "" } }),

      user: null,
      token: null,
      setUser: (user, token) =>
        set({
          user,
          token,
          loginData: { email: "", password: "" },
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          registerData: { name: "", email: "", password: "" },
          loginData: { email: "", password: "" },
        }),

      rehydrated: false, // ✅ keep only in memory
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => {
        return () => {
          useAuthStore.setState({ rehydrated: true }); // ✅ Trigger when restored
        };
      },
    }
  )
);

