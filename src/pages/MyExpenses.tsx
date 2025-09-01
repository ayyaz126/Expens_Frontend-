import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface Expense {
  id: number;
  amount: number;
  created_at: string;
  category?: string | null;
  receipt_path?: string | null; // ✅ Added
}

export default function MyExpenses() {
  const { token, rehydrated } = useAuthStore();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rehydrated) return;

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:4000/v1/api/expenses/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        setExpenses(res.data.expenses || []);
      })
      .catch((err) => {
        console.error("Failed to fetch expenses", err);
        toast.error("Failed to load expenses");
      })
      .finally(() => setLoading(false));
  }, [token, navigate, rehydrated]);

  const handleCSVDownload = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/v1/api/expenses/export/csv",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to download CSV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expenses.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("CSV downloaded successfully!");
    } catch (error) {
      console.error("CSV download error:", error);
      toast.error("CSV download failed.");
    }
  };

  if (!rehydrated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-white">
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">My Expenses</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Here are all your recent expenses
            </p>
          </div>

          {expenses.length > 0 && (
            <button
              onClick={handleCSVDownload}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Download CSV
            </button>
          )}
        </div>

        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : expenses.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No expenses found.
          </div>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="px-6 py-3 text-sm font-medium">#</th>
                <th className="px-6 py-3 text-sm font-medium">Amount</th>
                <th className="px-6 py-3 text-sm font-medium">Category</th>
                <th className="px-6 py-3 text-sm font-medium">Date</th>
                <th className="px-6 py-3 text-sm font-medium">Receipt</th> {/* ✅ Added */}
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr
                  key={expense.id}
                  className={`border-t border-gray-200 dark:border-gray-700 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-900"
                  }`}
                >
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 text-sm">Rs {expense.amount}</td>
                  <td className="px-6 py-4 text-sm">
                    {expense.category ?? "Uncategorized"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(expense.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {expense.receipt_path ? (
                      <a
                        href={`http://localhost:4000${expense.receipt_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}