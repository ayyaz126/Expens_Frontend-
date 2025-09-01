import { FormEvent } from "react";
import { useEmailStore } from "../store/email.store";
import { sendTestEmailService } from "../service/email.service";

export default function SendEmail() {
  const {
    email,
    message,
    loading,
    previewUrl,
    setEmail,
    setMessage,
    setLoading,
    setPreviewUrl,
  } = useEmailStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await sendTestEmailService({ email, message });
      setPreviewUrl(data.previewUrl);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="max-w-xl w-full p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-8">
          📧 Send Test Email
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Recipient's Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            required
          />
          <textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={7}
            className="w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y min-h-[120px]"
            required
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-lg"
          >
            {loading ? "Sending Email..." : "Send Email"}
          </button>
        </form>

        {previewUrl && (
          <div className="mt-8 p-5 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg text-center shadow-inner">
            <p className="text-green-700 dark:text-green-300 font-semibold mb-3 text-lg">
              ✅ Email sent successfully!
            </p>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition duration-200 text-md font-medium"
            >
              View Email Preview
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}