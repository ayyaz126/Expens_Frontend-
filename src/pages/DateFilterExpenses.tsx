import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/auth.store";

type Expense = {
  id: number;
  amount: number;
  created_at: string;
};

export default function DateFilterExpenses() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { rehydrated } = useAuthStore();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/api/expenses/filter/date`,
        {
          params: { from, to },
          withCredentials: true,
        }
      );

      const fetchedExpenses = res.data?.expenses ?? [];
      const totalAmount = res.data?.totalAmount ?? 0;

      setExpenses(fetchedExpenses);
      setTotal(totalAmount);
      setError("");
    } catch (err: any) {
      console.error("❌ Error fetching expenses:", err);
      if (err.response) {
        setError(
          `Server Error ${err.response.status}: ${
            err.response.data?.message || "Something went wrong"
          }`
        );
      } else if (err.request) {
        setError("No response from server. Check your backend.");
      } else {
        setError("Request setup error");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!rehydrated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl w-full border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🗓️ Filter Expenses By Date
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
            disabled={!from || !to || loading}
          >
            {loading ? "Filtering..." : "Filter Expenses"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 p-3 rounded-md mb-4 text-center">
            {error}
          </p>
        )}

        <div className="text-lg font-bold mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-center">
          💰 Total Expenses: Rs. {total}
        </div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading expenses...
          </p>
        ) : expenses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            No expenses found in the selected date range.
          </p>
        ) : (
          <ul className="space-y-3 mt-4">
            {expenses.map((exp) => (
              <li
                key={exp.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-sm flex justify-between items-center"
              >
                <span className="font-medium text-lg">Rs. {exp.amount}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(exp.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}