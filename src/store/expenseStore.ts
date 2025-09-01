import { create } from "zustand";
import { persist } from "zustand/middleware";

type Expense = {
  id: number;
  amount: number;
  category_id: number;
  created_at: string;
};

type ExpenseStore = {
  token: string;
  expenses: Expense[];
  setToken: (token: string) => void;
  addExpense: (expense: Expense) => void;
};

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      token: "",
      expenses: [],
      setToken: (token) => set({ token }),
      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, expense],
        })),
    }),
    {
      name: "expense-storage", // localStorage key
    }
  )
);
