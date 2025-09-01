import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

export default function Expenses() {
  const { token, rehydrated } = useAuthStore();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [receipt, setReceipt] = useState<File | null>(null); // ✅ new state for file

  useEffect(() => {
    if (!rehydrated) return;

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:4000/v1/api/categories/all", {
        withCredentials: true,
      })
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, [token, navigate, rehydrated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("category_id", categoryId);
      if (receipt) {
        formData.append("receipt", receipt); // ✅ image file append
      }

      await axios.post("http://localhost:4000/v1/api/expenses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("Expense added successfully!");
      navigate("/expenses/me");
    } catch (err: any) {
      console.error("Failed to create expense", err.response?.data || err);
      alert("Error creating expense");
    }
  };

  if (!rehydrated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-white p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transform transition-all duration-300 hover:scale-[1.01]">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-600 p-6 text-white text-center">
          <h2 className="text-3xl font-extrabold mb-1">Add New Expense</h2>
          <p className="text-blue-100 text-lg">Track your spending smartly</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-7" encType="multipart/form-data">
          {/* Amount Input */}
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-base font-medium text-gray-700 dark:text-gray-300">Amount (Rs)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-lg text-gray-500 dark:text-gray-400">Rs</span>
              <input
                id="amount"
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 500.00"
                className="w-full pl-14 pr-5 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition duration-200 shadow-sm"
              />
            </div>
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label htmlFor="category" className="block text-base font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              id="category"
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none bg-no-repeat bg-right-center pr-10 shadow-sm"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%239CA3AF'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")` }}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Receipt Upload */}
          <div className="space-y-2">
            <label htmlFor="receipt" className="block text-base font-medium text-gray-700 dark:text-gray-300">Upload Receipt (optional)</label>
            <input
              id="receipt"
              type="file"
              accept="image/*"
              onChange={(e) => setReceipt(e.target.files?.[0] || null)}
              className="w-full text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-white dark:hover:file:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 px-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}