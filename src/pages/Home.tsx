import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-cover bg-center px-4 py-16 md:py-24 lg:py-32 font-inter overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(21, 27, 38, 0.95) 0%, rgba(32, 38, 50, 0.95) 100%), url('https://www.transparenttextures.com/patterns/subtle-dots.png')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-gradient-shift opacity-20 pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl w-full max-w-3xl mx-auto border border-white/20 transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          {user
            ? `Welcome back, ${user.name}!` // ✅ Full name shown
            : "Track Your Expenses, Simplify Your Life"}
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 font-normal max-w-xl mx-auto leading-relaxed">
          {user
            ? "Your financial dashboard awaits. Continue managing your expenses and gaining insights into your spending habits."
            : "Effortlessly manage your finances. Our intuitive platform helps you track every penny, set budgets, and achieve your financial goals."}
        </p>

        {!user && (
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link
              to="/login"
              className="relative overflow-hidden border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="relative z-10">Login</span>
            </Link>
          </div>
        )}

        {user && (
          <Link
            to={user.role === "admin" ? "/admin/categories" : "/expenses"}
            className="inline-block mt-8 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
