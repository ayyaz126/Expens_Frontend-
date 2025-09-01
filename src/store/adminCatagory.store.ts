import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Category {
  id: number;
  name: string;
}

interface AdminCategoryState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export const useAdminCategoryStore = create<AdminCategoryState>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
    }),
    {
      name: "admin-categories", // 🔑 localStorage key
    }
  )
);
