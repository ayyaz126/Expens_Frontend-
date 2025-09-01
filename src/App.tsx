import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Expenses from "./pages/Expenses";
import Categories from "./pages/Category";
import AdminCategory from "./pages/AdminCateory";
import MyExpenses from "./pages/MyExpenses";
import SendEmail from "./pages/SendEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ResetSuccess from "./pages/ResetSuccess";
import DateFilterExpenses from "./pages/DateFilterExpenses";
import AdminDashboard from "./pages/AdminDashboard"; // ✅ 🆕 Import added

import { useAuthStore } from "./store/auth.store";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

// ✅ Private Route
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, rehydrated } = useAuthStore();

  if (!rehydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

// ✅ Admin Route
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, rehydrated } = useAuthStore();

  if (!rehydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return user?.role === "admin" ? children : <Navigate to="/login" replace />;
};

function App() {
  const { user, token, rehydrated } = useAuthStore();

  useEffect(() => {
    console.log("🧠 Zustand Auth Store:");
    console.log("🔐 Token:", token);
    console.log("👤 User:", user);
    console.log("♻️ Rehydrated:", rehydrated);
  }, [rehydrated, user, token]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1e293b",
              color: "#fff",
              border: "1px solid #4f46e5",
            },
          }}
        />

        <Navbar />

        <div className="flex-1">
          <Routes>
            {/* ✅ Public */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-success" element={<ResetSuccess />} />
            <Route path="/send-email" element={<SendEmail />} />

            {/* ✅ User Protected */}
            <Route path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
            <Route path="/expenses/me" element={<PrivateRoute><MyExpenses /></PrivateRoute>} />
            <Route path="/expenses/filter/date" element={<PrivateRoute><DateFilterExpenses /></PrivateRoute>} />
            <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />

            {/* ✅ Admin Protected */}
            <Route path="/admin/categories" element={<AdminRoute><AdminCategory /></AdminRoute>} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> {/* ✅ 🆕 Added */}
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
