import React, { useState } from "react";
import {
  Plus,
  Tag,
  Clock,
  Hash,
  AlertCircle,
  Loader2,
  X,
  CheckCircle2,
  Power,
  Search,
  Inbox,
} from "lucide-react";
import useCategoryList from "../../hooks/admin/categoryList";
import Pagination from "../../../../components/common/PaginationBar";
import useToggleCategory from "../../hooks/admin/adminToggleCategory";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import useCategoryCreate from "../../hooks/admin/createCategory";
import { EventTableSkeleton } from "../../../volunteer_army/components/admin_event_list_page/EventTable";

// --- SUB-COMPONENT: SKELETON LOADING ---
const CategoriesSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="h-16 b g-[#1e1e1e]/60 border border-slate-800 rounded-lg"
      />
    ))}
  </div>
);

// --- SUB-COMPONENT: EMPTY STATE ---
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 g-[#1e1e1e]/30 border border-dashed border-slate-800 rounded-2xl text-center">
    <Inbox className="text-slate-600 w-12 h-12 mb-4" />
    <h3 className="text-xl font-bold text-slate-100">No categories found</h3>
    <p className="text-slate-400 mt-2">
      Create categories to organize discussions effecively.
    </p>
  </div>
);

// --- MAIN PAGE COMPONENT ---
const AdminCategoriesPage = () => {
  const { categories, isLoadingCategory, isFetchingCategory, pagination } =
    useCategoryList();

  const { toggleCategoryLoading, toggleCategory } = useToggleCategory();
  const { createCategoryLoading, createCategory } = useCategoryCreate();
  // --- STATE ---
  const isLoading = isLoadingCategory || isFetchingCategory;

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isToggleModalOpen, setIsToggleModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Form States
  const [newCategoryName, setNewCategoryName] = useState("");
  const [createError, setCreateError] = useState("");
  const isProcessing = toggleCategoryLoading || createCategoryLoading;

  // --- HANDLERS ---
  const handleCreateCategory = async () => {
    setCreateError("");
    if (!newCategoryName.trim()) {
      setCreateError("Category name cannot be empty");
      return;
    }
    const newCat = {
      name: newCategoryName,
    };
    try {
      await createCategory(newCat).unwrap();
      successToast({
        title: "Success",
        description: "Category created successfully.",
      });
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({ title: "Error", description: message });
    } finally {
      setIsCreateModalOpen(false);
      setNewCategoryName("");
    }
  };

  const handleToggleStatus = async () => {
    try {
      await toggleCategory(selectedCategory.id).unwrap();
      successToast({
        title: "Success",
        description: "Category status toggled successfully.",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Error", description: message });
    } finally {
      setIsToggleModalOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="bg-[#1e1e1e] text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* SECTION: PageHeader & Add Button */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-slate-400 text-sm">
              Manage and organize discussion topics across the platform.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Add Category
          </button>
        </header>
        <div className="flex items-center gap-3 bg-[#1e1e1e] px-4 py-2 rounded-xl border border-slate-700 w-full max-w-md">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            value={pagination.searchValue}
            onChange={(e) => pagination.setSearchValue(e.target.value)}
            placeholder="searach by category name, reference id..."
            className="bg-transparent outline-none text-white placeholder-slate-400 w-full"
          />
        </div>
        {/* MAIN CONTENT AREA */}
        <main className="bg-[#1e1e1e] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="p-6">
              <EventTableSkeleton />
            </div>
          ) : categories.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1e1e1e]/50 border-b border-slate-800">
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Reference ID
                    </th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {categories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="group hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span className="text-sm font-bold text-slate-100">
                          {cat.name}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-slate-500 font-mono text-xs">
                          <Hash size={12} />
                          {cat.reference_id}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                          <Clock size={12} />
                          {new Date(cat.created_at).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            cat.is_active
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {cat.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsToggleModalOpen(true);
                          }}
                          className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all border ${
                            cat.is_active
                              ? "bg-slate-800 text-red-400 border-slate-700 hover:bg-red-600 hover:text-white hover:border-red-500"
                              : "bg-slate-800 text-green-400 border-slate-700 hover:bg-green-600 hover:text-white hover:border-green-500"
                          }`}
                        >
                          <Power size={14} />
                          {cat.is_active ? "Disable" : "Enable"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState />
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

      {/* COMPONENT: CreateCategoryModal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/90 backdrop-blur-sm">
          <div className="g-[#1e1e1e] border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Tag size={20} className="text-blue-500" />
                  Create Category
                </h3>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Category Name
                </label>
                <input
                  type="text"
                  autoFocus
                  value={newCategoryName}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                    setCreateError("");
                  }}
                  placeholder="e.g. Public Safety"
                  className={`w-full bg-[#1e1e1e] border ${createError ? "border-red-500" : "border-slate-800"} rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-all`}
                />
                {createError && (
                  <p className="flex items-center gap-1.5 text-red-500 text-xs font-bold pt-1">
                    <AlertCircle size={14} /> {createError}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 text-sm font-bold text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCategory}
                  disabled={isProcessing}
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2"
                >
                  {isProcessing && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPONENT: ToggleStatusModal */}
      {isToggleModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/90 backdrop-blur-sm">
          <div className="g-[#1e1e1e] border border-slate-700 w-full max-w-sm rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center space-y-4">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${selectedCategory.is_active ? "bg-red-500/10" : "bg-green-500/10"}`}
              >
                <Power
                  size={32}
                  className={
                    selectedCategory.is_active
                      ? "text-red-500"
                      : "text-green-500"
                  }
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold">Change Category Status</h3>
                <p className="text-slate-400 text-sm">
                  Are you sure you want to{" "}
                  <span className="text-slate-200 font-bold">
                    {selectedCategory.is_active ? "disable" : "enable"}
                  </span>{" "}
                  the category:
                </p>
                <div className="bg-[#1e1e1e] py-2 rounded-lg border border-slate-800 inline-block px-4 font-bold text-blue-400">
                  {selectedCategory.name}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsToggleModalOpen(false)}
                  className="flex-1 py-2.5 text-sm font-bold text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleToggleStatus}
                  disabled={isProcessing}
                  className={`flex-1 py-2.5 text-sm font-bold text-white rounded-lg flex items-center justify-center gap-2 ${
                    selectedCategory.is_active
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isProcessing && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
