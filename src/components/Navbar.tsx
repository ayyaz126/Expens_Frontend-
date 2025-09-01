// ... imports remain unchanged
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import LogoImage from "../assets/Logo.png";
import { useAuthStore } from "../store/auth.store";
import { useThemeStore } from "../store/themeStore";
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isExpensesOpen, setIsExpensesOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lang: 'en' | 'ur') => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    setIsOpen(false);
    setIsExpensesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success(t("logout"));
    navigate("/login");
  };

  const navBackground = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-md text-gray-900 dark:bg-gray-800 dark:text-white"
    : "bg-gradient-to-r from-gray-800 to-gray-900 text-white dark:from-gray-900 dark:to-black";

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
      location.pathname === path
        ? scrolled
          ? "text-indigo-600 font-semibold"
          : "text-indigo-300 font-semibold"
        : scrolled
        ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
        : "text-white hover:text-indigo-300"
    }`;

  const mobileLinkClass = (path: string) =>
    `block w-full text-left px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
      location.pathname === path
        ? "bg-indigo-100 dark:bg-gray-700 text-indigo-700 dark:text-white font-semibold"
        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  const renderLinks = () => {
    const baseLinks = [
      { path: "/", label: t("home") },
      ...(!user
        ? [
            { path: "/login", label: t("login") },
            { path: "/register", label: t("register") },
          ]
        : []),
    ];

    return baseLinks.map((link) => (
      <Link key={link.path} to={link.path} className={linkClass(link.path)}>
        {link.label}
      </Link>
    ));
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={LogoImage}
              alt="Logo"
              className={`h-10 w-10 rounded-full transition duration-300 ${
                scrolled ? "border-2 border-indigo-100" : "border-2 border-white/30"
              }`}
            />
            <span
              className={`text-2xl font-bold transition duration-300 ${
                scrolled
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                  : "text-white dark:text-white"
              }`}
            >
              {t("expenseTracker")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {renderLinks()}

            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsExpensesOpen(!isExpensesOpen)}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-1 ${
                    scrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                      : "text-white hover:text-indigo-300"
                  }`}
                >
                  {t("expenses")} <ChevronDown className="w-4 h-4" />
                </button>
                {isExpensesOpen && (
                  <div className="absolute top-full mt-1 left-0 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 w-48">
                    <Link to="/expenses" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">{t("allExpenses")}</Link>
                    <Link to="/expenses/me" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">{t("myExpenses")}</Link>
                    <Link to="/categories" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">{t("categories")}</Link>
                    <Link to="/expenses/filter/date" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">{t("filterByDate")}</Link>
                    <Link to="/send-email" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">{t("sendEmail")}</Link>
                  </div>
                )}
              </div>
            )}

            {user?.role === "admin" && (
              <div className="relative group">
                <button
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-1 ${
                    scrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                      : "text-white hover:text-indigo-300"
                  }`}
                >
                  {t("admin")} <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full mt-1 left-0 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 w-48">
                  <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">{t("adminDashboard")}</Link>
                  <Link to="/admin/categories" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">{t("adminCategories")}</Link>
                </div>
              </div>
            )}

            {/* Language Buttons */}
            {user && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleChangeLanguage('en')}
                  className="px-2 py-1 text-sm rounded border hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  English
                </button>
                <button
                  onClick={() => handleChangeLanguage('ur')}
                  className="px-2 py-1 text-sm rounded border hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  اردو
                </button>
              </div>
            )}

            {/* Theme toggle & Logout */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {user && (
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg font-medium ${
                  scrolled ? "text-red-600 hover:bg-gray-100" : "text-red-300 hover:bg-white/10"
                }`}
              >
                {t("logout")}
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                scrolled ? "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen bg-white dark:bg-gray-900 shadow-lg" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-1">
          {renderLinks()}

          {user && (
            <>
              <Link to="/expenses" className={mobileLinkClass("/expenses")}>{t("allExpenses")}</Link>
              <Link to="/expenses/me" className={mobileLinkClass("/expenses/me")}>{t("myExpenses")}</Link>
              <Link to="/categories" className={mobileLinkClass("/categories")}>{t("categories")}</Link>
              <Link to="/expenses/filter/date" className={mobileLinkClass("/expenses/filter/date")}>{t("filterByDate")}</Link>
              <Link to="/send-email" className={mobileLinkClass("/send-email")}>{t("sendEmail")}</Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className={mobileLinkClass("/admin/dashboard")}>{t("adminDashboard")}</Link>
              <Link to="/admin/categories" className={mobileLinkClass("/admin/categories")}>{t("adminCategories")}</Link>
            </>
          )}

          {user && (
            <>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t("logout")}
              </button>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleChangeLanguage('en')}
                  className="flex-1 px-2 py-1 text-sm rounded border hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  English
                </button>
                <button
                  onClick={() => handleChangeLanguage('ur')}
                  className="flex-1 px-2 py-1 text-sm rounded border hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  اردو
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
