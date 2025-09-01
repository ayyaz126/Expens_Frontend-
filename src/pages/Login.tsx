import { AtSymbolIcon, LockClosedIcon, FingerPrintIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../store/auth.store";
import toast from "react-hot-toast";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  // --- LOGIC (No changes here) ---
  const { loginData, setLoginData, resetLoginForm, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("براہ کرم تمام فیلڈز کو پُر کریں۔");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/auth/login", loginData);
      const { accessToken, user } = response.data;
      setUser(user, accessToken);
      toast.success("Login successful! Welcome back.");
      resetLoginForm();
      if (user.role === "admin") {
        navigate("/admin/categories");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  // --- END OF LOGIC ---


  // --- UI / JSX (Improved CSS) ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-white/10">
        
        {/* === IMPROVED: Header with Logo Placeholder === */}
        <div className="p-8 text-center bg-black/20 border-b border-white/10">
          <FingerPrintIcon className="w-16 h-16 mx-auto text-purple-400" />
          <h2 className="text-3xl font-bold text-white mt-4">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Sign in to continue to your account</p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <div className="relative">
                <AtSymbolIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                  // === IMPROVED: Input styling and transitions ===
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-transparent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all duration-300"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-400">
                  Password
                </label>
                {/* === IMPROVED: Forgot Password Link Styling === */}
                <a
                  href="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                  // === IMPROVED: Input styling and transitions ===
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-transparent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                // === IMPROVED: Button styling with better hover/active effects ===
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Logging in...</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* === IMPROVED: "Create Account" link section === */}
          <div className="text-center text-sm text-gray-400 pt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Create one now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}