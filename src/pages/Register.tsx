import { useAuthStore } from "../store/auth.store";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import api from "../service/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() 
{
  const { registerData, setRegisterData, resetRegisterForm } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.name || !registerData.email || !registerData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", registerData);
      const { previewUrl } = res.data;

      toast.success(
        <div>
          ✅ Registration successful!
          <br />
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-300"
          >
            View Email Preview
          </a>
        </div>,
        {
          duration: 5000,
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #4f46e5",
          },
          position: "top-right",
        }
      );

      resetRegisterForm();
      setTimeout(() => navigate("/login"), 5000);
    } catch (error: any) {
      console.error("Registration Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 pt-16">
      <div className="w-full max-w-md bg-gray-800/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-white/10 max-h-[80vh] overflow-y-auto">
        <div className="p-6 text-center bg-black/20 border-b border-white/10">
          <UserPlusIcon className="w-14 h-14 mx-auto text-purple-400" />
          <h2 className="text-2xl font-bold text-white mt-3">Create an Account</h2>
          <p className="text-gray-400 mt-1 text-sm">Join us and start tracking your expenses</p>
        </div>

        <div className="p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Full Name</label>
              <div className="relative">
                <UserIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-transparent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all duration-300"
                  placeholder="Enter Name"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Email Address</label>
              <div className="relative">
                <AtSymbolIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-transparent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all duration-300"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Password</label>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-transparent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:bg-white/10 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-purple-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="text-center text-sm text-gray-400 pt-2">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
