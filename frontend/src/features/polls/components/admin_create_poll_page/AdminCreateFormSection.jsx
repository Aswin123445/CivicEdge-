import {
  Calendar,
  CheckCircle2,
  Clock,
  ImageIcon,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
const AdminCreateFormSection = ({
  formData,
  setFormData,
  handleSubmit,
  handleImageUpload,
  isUploading,
  duplicateIndices,
  handleAddOption,
  getOptionGuidance,
  isSubmitting,
  createPollLoading,
  handleOptionChange,
  validationErrors,
}) => {
  return (
    <div className="col-span-12 lg:col-span-8">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e1e1e] border border-slate-700 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 space-y-8">
          {/* Field 1: Question */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300 flex justify-between">
              Poll Question{" "}
              <span className="text-xs font-normal text-slate-500">
                {formData.question.length}/500
              </span>
            </label>
            <textarea
              required
              maxLength={500}
              placeholder="e.g., Should the city increase the budget for park maintenance?"
              className="w-full bg-[#1e1e1e] border border-slate-700 rounded-xl p-4 text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all min-h-[100px] resize-none"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
            />
            {validationErrors.question && (
              <p className="text-red-500 text-xs">
                {validationErrors.question}
              </p>
            )}
          </div>

          {/* Field 2 & 3: Context & Did You Know */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">
                Context / Background
              </label>
              <textarea
                required
                placeholder="Provide the reasoning behind this decision..."
                className="w-full bg-[#1e1e1e] border border-slate-700 rounded-xl p-4 text-slate-100 placeholder:text-slate-600 focus:border-blue-500 outline-none h-40 resize-none text-sm leading-relaxed"
                value={formData.context}
                onChange={(e) =>
                  setFormData({ ...formData, context: e.target.value })
                }
              />
              {validationErrors.context && (
                <p className="text-red-500 text-xs">
                  {validationErrors.context}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">
                Did You Know? (Optional)
              </label>
              <textarea
                placeholder="Add a fun fact or awareness tip..."
                className="w-full bg-[#1e1e1e] border border-slate-700 rounded-xl p-4 text-slate-100 placeholder:text-slate-600 focus:border-blue-500 outline-none h-40 resize-none text-sm leading-relaxed"
                value={formData.did_you_know}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    did_you_know: e.target.value,
                  })
                }
              />
              {validationErrors.did_you_know && (
                <p className="text-red-500 text-xs">
                  {validationErrors.did_you_know}
                </p>
              )}
            </div>
          </div>

          {/* Field 4: Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">
              Poll Image (Optional)
            </label>

            <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-blue-500 transition">
              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                id="poll-image-upload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleImageUpload(file);
                }}
              />

              {/* Upload UI */}
              {!formData.image_url && !isUploading && (
                <label
                  htmlFor="poll-image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2 text-slate-400 hover:text-blue-400 transition"
                >
                  <ImageIcon size={28} />
                  <span className="text-sm font-semibold">
                    Click to upload image
                  </span>
                  <span className="text-xs text-slate-500">
                    PNG, JPG up to 2MB
                  </span>
                </label>
              )}

              {/* Uploading State */}
              {isUploading && (
                <p className="text-sm text-blue-400 font-semibold">
                  Uploading image...
                </p>
              )}

              {/* Preview */}
              {formData.image_url && !isUploading && (
                <div className="space-y-3">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="rounded-lg max-h-40 mx-auto object-cover border border-slate-700"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        image_file: null,
                        image_url: "",
                      })
                    }
                    className="text-xs text-red-400 hover:text-red-300 font-semibold"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Field 5: Options (CRITICAL SECTION) */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex flex-col mb-6">
              <h3 className="text-lg font-bold text-slate-100">Options</h3>
              <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">
                Add clear and distinct choices for citizens. 2–4 options is
                ideal.
              </p>
            </div>

            {/* COMPONENT: OptionsSection - Move to: components/admin/polls/OptionsSection.jsx */}
            <div className="space-y-4">
              {formData.options.map((option, index) => (
                <div key={option.id} className="relative group">
                  <input
                    type="text"
                    maxLength={255}
                    placeholder={`Option ${index + 1}`}
                    className={`w-full bg-[#1e1e1e] border rounded-xl py-3.5 px-4 pr-12 text-sm outline-none transition-all ${
                      duplicateIndices.includes(index)
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-slate-700 focus:border-blue-500"
                    }`}
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(option.id, e.target.value)
                    }
                  />
                  {validationErrors.options && (
                    <p className="text-red-500 text-xs">
                      {validationErrors.options}
                    </p>
                  )}
                  {formData.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(option.id)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  {duplicateIndices.includes(index) && (
                    <p className="text-[10px] text-red-400 font-bold uppercase mt-1 ml-1">
                      Duplicate option detected
                    </p>
                  )}
                </div>
              ))}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleAddOption}
                  disabled={formData.options.length >= 5}
                  className="flex items-center gap-2 text-blue-500 text-xs font-black uppercase tracking-widest hover:text-blue-400 disabled:text-slate-700 disabled:cursor-not-allowed"
                >
                  <Plus size={16} strokeWidth={3} /> Add Option
                </button>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${getOptionGuidance().color}`}
                >
                  {getOptionGuidance().text}
                </span>
              </div>
            </div>
          </div>

          {/* Field 6: Expiry */}
          <div className="pt-6 border-t border-slate-800">
            <label className="text-sm font-bold text-slate-300 block mb-2">
              Poll Expiry
            </label>

            <div className="flex gap-4 max-w-md">
              {/*  Date Picker */}
              <div className="relative w-1/2">
                <Calendar
                  className="absolute left-4 mt-6 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="date"
                  required
                  className="w-full bg-[#1e1e1e] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:border-blue-500 outline-none text-sm"
                  value={formData.expiry_date || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expiry_date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="relative w-1/2">
                <Clock
                  className="absolute left-4 mt-6 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <select
                  required
                  className="w-full bg-[#1e1e1e] border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:border-blue-500 outline-none text-sm appearance-none"
                  value={formData.expiry_time || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expiry_time: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Select time
                  </option>

                  {Array.from({ length: 24 * 2 }).map((_, i) => {
                    const hours = Math.floor(i / 2)
                      .toString()
                      .padStart(2, "0");
                    const minutes = i % 2 === 0 ? "00" : "30";
                    const value = `${hours}:${minutes}`;

                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
                              {validationErrors.expires_at && (
                  <p className="text-red-500 text-xs block">
                    {validationErrors.expires_at}
                  </p>
                )}
              </div>
            </div>

            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase">
              Poll must expire at a future date and time.
            </p>
          </div>
        </div>

        {/* 5.4 Action Section */}
        <div className="bg-slate-800/50 p-6 flex flex-col sm:flex-row gap-4 border-t border-slate-700">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all shadow-lg ${
              isSubmitting
                ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/20 active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <CheckCircle2 size={18} />
            )}
            {isSubmitting || createPollLoading
              ? "Creating Poll..."
              : "Create Poll"}
          </button>
          <button
            type="button"
            className="px-8 py-4 bg-[#1e1e1e] border border-slate-700 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl font-bold text-sm transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateFormSection;
