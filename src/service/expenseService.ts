// src/services/expenseService.ts

export const downloadCSV = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/v1/api/expenses/export/csv`,
      {
        method: "GET",
        credentials: "include", // ✅ Cookie-based auth
      }
    );
  
    if (!response.ok) {
      throw new Error("CSV download failed");
    }
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  