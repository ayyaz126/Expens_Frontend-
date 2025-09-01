import { useEffect, useState } from "react";
import api from "../service/api";
import { useAuthStore } from "../store/auth.store";
import toast from "react-hot-toast";
import {
  Tag, Utensils, Car, Home, ShoppingCart, HeartPulse, Briefcase,
  BookOpen, Plane, Receipt, DollarSign, Gift, Coffee, Dumbbell,
  Wallet, Monitor, Bus, Train, Landmark, Flower, PawPrint,
  Gamepad2, Lightbulb, Router, Shirt, Headphones, Slice,
  Banknote, GraduationCap, Syringe, Sofa,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
}

const iconMap: Record<string, React.ElementType> = {
  food: Utensils,
  eat: Utensils,
  restaurant: Utensils,
  groceries: ShoppingCart,
  pizza: Slice,
  coffee: Coffee,
  car: Car,
  fuel: Car,
  transport: Bus,
  bus: Bus,
  train: Train,
  travel: Plane,
  plane: Plane,
  home: Home,
  rent: Home,
  utilities: Lightbulb,
  electricity: Lightbulb,
  internet: Router,
  furniture: Sofa,
  shopping: ShoppingCart,
  clothes: Shirt,
  fashion: Shirt,
  electronics: Monitor,
  gadgets: Headphones,
  health: HeartPulse,
  medical: Syringe,
  gym: Dumbbell,
  fitness: Dumbbell,
  work: Briefcase,
  office: Briefcase,
  salary: Banknote,
  education: BookOpen,
  school: BookOpen,
  university: GraduationCap,
  bills: Receipt,
  payments: DollarSign,
  bank: Landmark,
  gift: Gift,
  entertainment: Gamepad2,
  pets: PawPrint,
  nature: Flower,
  personal: Wallet,
};

const getCategoryIcon = (categoryName: string): React.ElementType => {
  const lowerName = categoryName.toLowerCase();
  for (const keyword in iconMap) {
    if (lowerName.includes(keyword)) {
      return iconMap[keyword];
    }
  }
  return Tag;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { token, rehydrated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        toast.error("Categories load karne mein nakami hui.");
      } finally {
        setLoading(false);
      }
    };

    if (rehydrated) {
      if (token) {
        fetchCategories();
      } else {
        setLoading(false);
      }
    }
  }, [token, rehydrated]);

  if (!rehydrated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
            Expense Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse all available expense categories with intuitive icons
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading categories...</p>
          </div>
        )}

        {!loading && categories.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-8 max-w-md mx-auto text-center border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-gray-500 dark:text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">
              No Categories Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Please check back later or contact your administrator
            </p>
          </div>
        )}

        {!loading && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.name);
              return (
                <div
                  key={category.id}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="p-5 flex flex-col items-center">
                    <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-full mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center mb-1">
                      {category.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      ID: {category.id}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
