import axios from "axios";

export const sendTestEmailService = async ({
  email,
  message,
}: {
  email: string;
  message: string;
}) => {
  const response = await axios.post(
    "http://localhost:4000/v1/api/email/send",
    { email, message },
    { withCredentials: true }
  );
  return response.data;
};
