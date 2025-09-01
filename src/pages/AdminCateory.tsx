import { useEffect, useState } from "react";
import api from "../service/adminApi";
import { useAdminCategoryStore } from "../store/adminCatagory.store";
import toast from "react-hot-toast";
import { Plus, Edit, Save, XCircle, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next"; // ✅ Add i18n hook

export default function AdminCategory() {
  const { categories, setCategories } = useAdminCategoryStore();
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");
  const [loadingAction, setLoadingAction] = useState<boolean>(false);
  const { t } = useTranslation(); // ✅ Hook initialized

  const fetchCategories = async () => {
    try {
      const res = await api.get("/");
      setCategories(res.data.categories);
    } catch (err) {
      toast.error(t("fetchCategoriesError"));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!newCategory.trim()) {
      toast.error(t("nameRequired"));
      return;
    }
    setLoadingAction(true);
    try {
      await api.post("/", { name: newCategory });
      toast.success(t("categoryCreated"));
      setNewCategory("");
      fetchCategories();
    } catch (err: any) {
      toast.error(err.response?.data?.message || t("categoryCreateError"));
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUpdate = async () => {
    if (!editedName.trim() || editingId === null) {
      toast.error(t("nameRequired"));
      return;
    }
    setLoadingAction(true);
    try {
      await api.put(`/${editingId}`, { name: editedName });
      toast.success(t("categoryUpdated"));
      setEditingId(null);
      setEditedName("");
      fetchCategories();
    } catch (err) {
      toast.error(t("categoryUpdateError"));
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(t("confirmDeleteCategory"))) return;

    setLoadingAction(true);
    try {
      await api.delete(`/${id}`);
      toast.success(t("categoryDeleted"));
      fetchCategories();
    } catch (err) {
      toast.error(t("categoryDeleteError"));
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    
    <div className="w-full min-h-[590px] bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4 space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
          {t("adminCategories")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {t("adminCategoriesSubheading")}
        </p>
      </div>

      {/* Add Category */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder={t("newCategoryPlaceholder")}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleCreate}
          disabled={loadingAction}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <Plus className="w-4 h-4" />
          {t("add")}
        </button>
      </div>

      {/* Category List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {t("existingCategories")}
        </h3>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("noCategoriesFound")}
          </p>
        ) : (
          <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                {editingId === cat.id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-3 py-1.5 rounded text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-sm text-gray-800 dark:text-white font-medium">
                      {cat.name}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(cat.id);
                          setEditedName(cat.name);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        disabled={loadingAction}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
