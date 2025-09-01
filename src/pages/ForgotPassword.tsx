import { useState } from "react";
import api from "../service/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Check your email for the reset link!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        <label className="block mb-2">Email Address</label>
        <input
          type="email"
          className="w-full p-2 rounded bg-gray-700 text-white mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 w-full py-2 rounded font-semibold"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
