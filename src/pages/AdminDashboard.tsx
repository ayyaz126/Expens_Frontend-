import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchAdminDashboardStats,
  fetchCategorySummary,
} from "../service/adminApi";
import CategoryBarChart from "../components/CategoryBarChart";
import AdminCategoryPanel from "../pages/AdminCateory";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    categories: 0,
    expenses: 0,
  });

  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, summaryRes] = await Promise.all([
          fetchAdminDashboardStats(),
          fetchCategorySummary(),
        ]);
        setStats(statsRes.data);
        setSummary(summaryRes.data.summary);
      } catch (err) {
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-800 dark:text-gray-100">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-24 px-4 pb-12"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
        >
          📊 Admin Dashboard
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[300px] max-h-[80vh] overflow-y-auto"
          >
            <AdminCategoryPanel />
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow text-center"
              >
                <h2 className="text-lg font-semibold">Users</h2>
                <p className="text-3xl font-bold mt-2">{stats.users}</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow text-center"
              >
                <h2 className="text-lg font-semibold">Categories</h2>
                <p className="text-3xl font-bold mt-2">{stats.categories}</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-6 rounded-xl shadow text-center"
              >
                <h2 className="text-lg font-semibold">Expenses</h2>
                <p className="text-3xl font-bold mt-2">{stats.expenses}</p>
              </motion.div>
            </div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
            >
              <CategoryBarChart data={summary} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
