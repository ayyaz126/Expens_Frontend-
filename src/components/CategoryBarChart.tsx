import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTranslation } from 'react-i18next'; // 👈 translation import

interface SummaryItem {
  category: string;
  total_spent: number;
}

interface Props {
  data: SummaryItem[];
}

export default function CategoryBarChart({ data }: Props) {
  const { t } = useTranslation(); // 👈 hook call

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">💸 {t('expense_by_category')}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_spent" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
