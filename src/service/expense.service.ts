import axios from "axios";

const API = "http://localhost:4000/v1/api/expenses";

export const createExpense = async (
  data: { amount: number; category_id: number }
) => {
  const res = await axios.post(API, data, {
    withCredentials: true, // ✅ Send cookies (access token) with request
  });
  return res.data.expense;
};
