import { Loader2, AlertCircle } from "lucide-react";
import FormField, { inputCls } from "./FormField";
import ImageUploader from "./ImageUploader";

/**
 * CreatePostForm
 *
 * Props:
 *   fields        {object}    - { title, content, categoryId }
 *   onChange      {function}  - (field: string, value: string) => void
 *   errors        {object}    - keyed error messages
 *   categories    {Array}     - [{ id, name }]
 *   previews      {string[]}  - image blob URLs
 *   isSubmitting  {boolean}
 *   isLoadingCats {boolean}
 *   onAddImages   {function}  - (FileList) => void
 *   onRemoveImage {function}  - (index) => void
 *   onSubmit      {function}
 *   onCancel      {function}
 */
const CreatePostForm = ({
  fields = {},
  onChange,
  errors = {},
  categories = [],
  previews = [],
  isSubmitting = false,
  isLoadingCats = false,
  onAddImages,
  onRemoveImage,
  onSubmit,
  onCancel,
}) => {
  const { title = "", content = "", categoryId = "" } = fields;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <form onSubmit={onSubmit} className="p-6 md:p-8 space-y-5">

        {/* Title */}
        <FormField label="Issue Title" error={errors.title}>
          <input
            type="text"
            placeholder="What's in your mind for the society?"
            value={title}
            onChange={(e) => onChange?.("title", e.target.value)}
            className={inputCls(errors.title)}
          />
        </FormField>

        {/* Category */}
        <FormField label="Category" error={errors.categoryId}>
          <div className="relative">
            <select
              value={categoryId}
              disabled={isLoadingCats}
              onChange={(e) => onChange?.("categoryId", e.target.value)}
              className={`${inputCls(errors.categoryId)} appearance-none pr-9 disabled:opacity-50 disabled:cursor-wait`}
            >
              <option value="">
                {isLoadingCats ? "Loading categories…" : "Select a category"}
              </option>
              {(categories ?? []).map((cat) =>
                cat?.id ? (
                  <option key={cat.id} value={cat.id}>
                    {cat.name ?? ""}
                  </option>
                ) : null
              )}
            </select>
            {/* Custom chevron */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </FormField>

        {/* Description */}
        <FormField
          label="Description"
          error={errors.content}
          hint={`${content.length} chars`}
        >
          <textarea
            rows={5}
            placeholder="Provide more details it..."
            value={content}
            onChange={(e) => onChange?.("content", e.target.value)}
            className={`${inputCls(errors.content)} resize-none leading-relaxed`}
          />
        </FormField>

        {/* Image uploader */}
        <FormField label="share Images for maximum impact" hint="Optional · max 5">
          <ImageUploader
            previews={previews}
            error={errors.images}
            onAdd={onAddImages}
            onRemove={onRemoveImage}
          />
        </FormField>

        {/* Form-level error */}
        {errors.form && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
            <AlertCircle size={15} className="shrink-0" />
            {errors.form}
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 border-t border-slate-100 flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Posting…
              </>
            ) : (
              "Submit Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
