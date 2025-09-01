import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useThemeStore } from "../store/themeStore";

export default function Layout() {
  const { theme } = useThemeStore();

  // Update the HTML root class for dark mode
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer at Bottom */}
      <Footer />
    </div>
  );
}
