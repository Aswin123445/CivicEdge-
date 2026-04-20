import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Power,
  Trash2,
  GripVertical,
  X,
  Loader2,
  Tag,
  Layers,
  Search,
  AlertCircle,
} from "lucide-react";
import useListCategory from "../hooks/category/listCategory";
import Pagination from "../../../components/common/PaginationBar";
import TableSkeleton from "../../issues_execution/components/pending_review_page/TableSkelton";
import useCreateCategory from "../hooks/category/createCategory";
import { errorToast, successToast } from "../../../utils/Toaster";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import useUpdateCategory from "../hooks/category/updateCategory";
import useToggleCategory from "../hooks/category/categoryToggle";

// --- MAIN PAGE COMPONENT ---
const CategoryManagementPage = () => {
  const { categories, categoryLoading, categoryFetching, pagination } =
    useListCategory();

  const { createCategory, createCategoryLoading } = useCreateCategory();

  const { updateCategory, updateCategoryLoading } = useUpdateCategory();

  const { toggleCategory, toggleCategoryLoading } = useToggleCategory();
  // --- STATE ---
  const isLoading = categoryLoading ;
  const isProcessing = createCategoryLoading || updateCategoryLoading;

  // Modal States
  const [modalMode, setModalMode] = useState("create"); // 'create' | 'edit'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    display_order: 1,
  });

  // --- HANDLERS ---
  const handleOpenModal = (mode, category = null) => {
    setModalMode(mode);
    if (mode === "edit" && category) {
      setSelectedCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        icon: category.icon,
        display_order: category.display_order,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        icon: "",
        display_order: categories.length + 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleToggleStatus = async(id) => {
    try{
      await toggleCategory(id).unwrap();
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Error", description: message });
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalMode === "create") {
        await createCategory(formData).unwrap();
      } else {
        await updateCategory({
          id: selectedCategory.id,
          data: formData,
        }).unwrap();
      }
      setIsModalOpen(false);
      successToast({
        title: "Success",
        description: "Category has been created successfully.",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Error", description: message });
    }
  };

  return (
    <div className=" bg-[#1e1e1e] text-slate-100 p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* SECTION 6.1: Page Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Category Management
            </h1>
            <p className="text-slate-400">
              Manage issue categories used across the platform
            </p>
          </div>
          <button
            onClick={() => handleOpenModal("create")}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Add Category
          </button>
        </header>
        <div className="relative flex-1 max-w-[400px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search activity message..."
            value={pagination.searchValue}
            onChange={(e) => pagination.setSearchValue(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-blue-500 outline-none transition-all"
          />
        </div>
        {/* SECTION 6.2: Category Table */}
        <main className="bg-[#1e1e1e] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          {categoryFetching ? (
            <div className="p-6">
              <TableSkeleton />
            </div>
          ) : categories.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1e1e1e]/50 border-b border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Name & Context
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                      Order
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 text-blue-400">
                            <Tag size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-100">
                              {cat.name}
                            </p>
                            <p className="text-xs text-slate-400 line-clamp-1">
                              {cat.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-300">
                          {cat.display_order}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            cat.is_active
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${cat.is_active ? "bg-green-400" : "bg-red-400"}`}
                          />
                          {cat.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal("edit", cat)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                            title="Edit Category"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(cat.id)}
                            className={`p-2 rounded-lg transition-all ${
                              cat.is_active
                                ? "text-red-400 hover:bg-red-400/10"
                                : "text-green-400 hover:bg-green-400/10"
                            }`}
                            title={cat.is_active ? "Deactivate" : "Activate"}
                          >
                            <Power size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <Layers size={48} className="mx-auto text-slate-700" />
              <div>
                <p className="text-xl font-bold">No categories found</p>
                <p className="text-slate-400">
                  Create your first category to organize discussions.
                </p>
              </div>
            </div>
          )}
        </main>
        {!pagination.isSinglePage && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            isFirstPage={pagination.isFirstPage}
            isLastPage={pagination.isLastPage}
            onPageChange={pagination.goToPage}
          />
        )}
      </div>

      {/* SECTION 7 & 8: Category Modal (Create/Update) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1e1e1e] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden scale-in-center">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {modalMode === "create" ? (
                  <Plus className="text-blue-500" />
                ) : (
                  <Edit2 className="text-blue-500" size={18} />
                )}
                {modalMode === "create" ? "Add Category" : "Update Category"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Category Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Road Issues"
                    className="w-full bg-[#1e1e1e] border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Briefly describe what issues fall under this category..."
                    className="w-full bg-[#1e1e1e] border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:border-blue-500 outline-none transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Icon Identifier
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                      placeholder="e.g. road-map"
                      className="w-full bg-[#1e1e1e] border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          display_order: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-[#1e1e1e] border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                >
                  {isProcessing && (
                    <Loader2 size={18} className="animate-spin" />
                  )}
                  {modalMode === "create" ? "Create Category" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagementPage;
