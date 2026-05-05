import React, { useState, useEffect } from "react";
import {
  Plus,
  ToggleLeft,
  ToggleRight,
  X,
  ChevronRight,
  MoreHorizontal,
  HelpCircle,
  PlusCircle,
  Trash2,
  Loader2,
  CheckCircle2,
  Search,
} from "lucide-react";
import useBehavioralList from "../hooks/behavioral/behavioralList";
import Pagination from "../../../components/common/PaginationBar";
import useToggleBehavioral from "../hooks/behavioral/behavioralToggle";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../utils/Toaster";
import useBehavioralCreate from "../hooks/behavioral/behavioralCreate";

// COMPONENT: BehavioralPromptTableSkeleton
// Move to: components/admin/prompts/BehavioralPromptTableSkeleton.jsx

function BehavioralPromptTableSkeleton() {
  const rows = Array.from({ length: 6 });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        {/* Header (keep visible for better UX) */}
        <thead className="bg-[#1e1e1e]/50 border-b border-slate-700 text-xs font-bold text-slate-600 uppercase tracking-widest">
          <tr>
            <th className="px-6 py-4">Question</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Order</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800">
          {rows.map((_, index) => (
            <tr key={index} className="animate-pulse">
              {/* Question */}
              <td className="px-6 py-4">
                <div className="h-4 w-48 bg-slate-700 rounded" />
              </td>

              {/* Type Badge */}
              <td className="px-6 py-4">
                <div className="h-5 w-20 bg-slate-700 rounded" />
              </td>

              {/* Category */}
              <td className="px-6 py-4">
                <div className="h-4 w-24 bg-slate-700 rounded" />
              </td>

              {/* Order */}
              <td className="px-6 py-4">
                <div className="h-4 w-10 bg-slate-700 rounded" />
              </td>

              {/* Status Toggle */}
              <td className="px-6 py-4">
                <div className="h-6 w-12 bg-slate-700 rounded-full" />
              </td>

              {/* Action (3 dots) */}
              <td className="px-6 py-4 text-right">
                <div className="h-4 w-4 bg-slate-700 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
/**
 * CIVICEDGE ADMIN: BEHAVIORAL PROMPT MANAGEMENT
 * --------------------------------------------
 * Component Split Guide:
 * - ./components/admin/prompts/PageHeader.jsx
 * - ./components/admin/prompts/PromptTable.jsx
 * - ./components/admin/prompts/PromptModal.jsx
 * - ./components/admin/prompts/DynamicOptionFields.jsx
 */

const BehavioralPromptPage = () => {
  const {
    behavioralList: prompts,
    behavioralListLoading,
    behavioralListFetching,
    pagination,
  } = useBehavioralList();

  const { toggleBehavioral, toggleBehavioralLoading } = useToggleBehavioral();
  const { createBehavioral, createBehavioralLoading } = useBehavioralCreate();
  const isLoading = behavioralListLoading || behavioralListFetching;
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSubmitting = createBehavioralLoading;
  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    question_text: "",
    response_type: "YES_NO",
    category: "",
    display_order: 1,
    // Dynamic fields
    mc_options: ["", ""], // For MULTIPLE_CHOICE
    scale: { min: 1, max: 5 }, // For SCALE
  });

  // --- HANDLERS ---
  const handleToggleStatus = async (id) => {
    try {
      await toggleBehavioral(id).unwrap();
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Error", description: message });
    }
  };

  const handleAddMCOption = () => {
    setFormData((prev) => ({ ...prev, mc_options: [...prev.mc_options, ""] }));
  };

  const handleRemoveMCOption = (index) => {
    if (formData.mc_options.length > 2) {
      const newOptions = formData.mc_options.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, mc_options: newOptions }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatOptions = (options) => {
      return options.map((opt) => ({
        key: opt.toLowerCase().replace(/\s+/g, "_"),
        label: opt,
      }));
    };
    console.log(formData);
    let payload = null;
    // Dynamic Payload Formatting
    let finalOptions = null;
    if (formData.response_type === "MULTIPLE_CHOICE") {
      finalOptions = formData.mc_options.filter((opt) => opt.trim() !== "");
      payload = {
        question_text: formData.question_text,
        response_type: formData.response_type,
        display_order: formData.display_order,
        options: formatOptions(finalOptions),
      };
    }else {
      payload = {
        question_text: formData.question_text,
        response_type: formData.response_type,
        display_order: formData.display_order,
      };
    }

    try {
      await createBehavioral(payload).unwrap();
      successToast({
        title: "Success",
        description: "Behavioral prompt has been created successfully.",
      });
      setFormData({
        question_text: "",
        response_type: "YES_NO",
        category: "",
        display_order: 1,
        mc_options: ["", ""],
        scale: { min: 1, max: 5 },
      });
      setIsModalOpen(false);
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Error", description: message });
    }
  };

  return (
    <div className=" bg-[#1e1e1e] text-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* COMPONENT: PageHeader */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Behavioral Prompt Management
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Create and manage structured input prompts for citizens and
              solvers.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Create Prompt
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
        {/* COMPONENT: PromptTable Section */}
        <main className="grid grid-cols-12">
          <div className="col-span-12 bg-[#1e1e1e]/50 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
            {isLoading ? (
              <BehavioralPromptTableSkeleton />
            ) : prompts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#1e1e1e]/50 border-b border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Question</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Order</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {prompts.map((prompt) => (
                      <tr
                        key={prompt.id}
                        className="hover:bg-slate-800/40 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium truncate max-w-xs">
                            {prompt.question_text}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-bold border border-slate-700">
                            {prompt.response_type}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm font-mono text-slate-500">
                          {prompt.display_order}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleStatus(prompt.id)}
                            className="transition-colors focus:outline-none"
                          >
                            {prompt.is_active ? (
                              <ToggleRight
                                className="text-blue-500"
                                size={28}
                              />
                            ) : (
                              <ToggleLeft
                                className="text-slate-600"
                                size={28}
                              />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* COMPONENT: EmptyState */
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="bg-slate-800 p-4 rounded-full mb-4">
                  <HelpCircle className="text-slate-600" size={40} />
                </div>
                <h3 className="text-lg font-semibold">
                  No prompts created yet
                </h3>
                <p className="text-slate-400 max-w-sm mt-2">
                  Prompts allow you to collect specific data points from users
                  during issue registration.
                </p>
              </div>
            )}
          </div>
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
        {/* COMPONENT: PromptModal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/80 backdrop-blur-sm">
            <div className="bg-[#1e1e1e]/50 border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center sticky top-0 bg-[#1e1e1e]/50 z-10">
                <h2 className="text-xl font-bold">Create Behavioral Prompt</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Fields */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">
                    Question Text
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full bg-[#1e1e1e] border border-slate-700 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                    placeholder="e.g. Is there any immediate danger to pedestrians?"
                    value={formData.question_text}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        question_text: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">
                      Response Type
                    </label>
                    <select
                      className="w-full bg-[#1e1e1e] border border-slate-700 rounded-xl p-3 outline-none"
                      value={formData.response_type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          response_type: e.target.value,
                        })
                      }
                    >
                      <option value="YES_NO">YES_NO</option>
                      <option value="MULTIPLE_CHOICE">MULTIPLE_CHOICE</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">
                      Display Order
                    </label>
                    <input
                      type="number"
                      className="w-full bg-[#1e1e1e] border border-slate-700 rounded-xl p-3 outline-none"
                      value={formData.display_order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          display_order: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* COMPONENT: Dynamic Fields */}
                <div className="bg-[#1e1e1e]/50 p-6 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest">
                    Type-Specific Configuration
                  </h3>

                  {formData.response_type === "YES_NO" && (
                    <div className="flex items-center gap-3 text-slate-400">
                      <CheckCircle2 size={18} className="text-green-500" />
                      <p className="text-sm">
                        This question will automatically use Yes/No responses.
                      </p>
                    </div>
                  )}

                  {formData.response_type === "SCALE" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">
                          Minimum Value
                        </label>
                        <input
                          type="number"
                          className="w-full bg-[#1e1e1e]/50 border border-slate-700 rounded-lg p-2"
                          value={formData.scale.min}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              scale: { ...formData.scale, min: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-500">
                          Maximum Value
                        </label>
                        <input
                          type="number"
                          className="w-full bg-[#1e1e1e]/50 border border-slate-700 rounded-lg p-2"
                          value={formData.scale.max}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              scale: { ...formData.scale, max: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {formData.response_type === "MULTIPLE_CHOICE" && (
                    <div className="space-y-3">
                      {formData.mc_options.map((option, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            required
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            className="flex-1 bg-[#1e1e1e]/50 border border-slate-700 rounded-lg p-2 text-sm"
                            value={option}
                            onChange={(e) => {
                              const newOpts = [...formData.mc_options];
                              newOpts[index] = e.target.value;
                              setFormData({ ...formData, mc_options: newOpts });
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveMCOption(index)}
                            disabled={formData.mc_options.length <= 2}
                            className="p-2 text-slate-600 hover:text-red-500 disabled:opacity-30 disabled:hover:text-slate-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddMCOption}
                        className="flex items-center gap-2 text-blue-500 text-sm font-bold hover:text-blue-400"
                      >
                        <PlusCircle size={16} /> Add Option
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl font-semibold text-slate-400 hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 px-8 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2"
                  >
                    {isSubmitting && (
                      <Loader2 size={18} className="animate-spin" />
                    )}
                    Create Prompt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BehavioralPromptPage;
