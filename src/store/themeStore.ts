import { create } from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

// Helper function to get saved theme or fallback
const getInitialTheme = (): "light" | "dark" => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return "dark";
  return "light";
};

export const useThemeStore = create<ThemeStore>((set) => {
  const initialTheme = getInitialTheme();
  // Apply the theme class to <html>
  document.documentElement.classList.toggle("dark", initialTheme === "dark");

  return {
    theme: initialTheme,
    toggleTheme: () => {
      set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        // Save in localStorage
        localStorage.setItem("theme", newTheme);
        // Toggle class on root html
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        return { theme: newTheme };
      });
    },
  };
});
