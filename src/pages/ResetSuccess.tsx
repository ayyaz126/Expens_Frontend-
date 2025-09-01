import { Link } from "react-router-dom";



export default function ResetSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center space-y-6">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
          🎉 Password Reset Successful!
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          You can now log in using your new password.
        </p>
        <Link
          to="/login"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
