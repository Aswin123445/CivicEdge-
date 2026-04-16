import { ArrowLeft } from "lucide-react";
import uselistCategory from "../../hooks/citizen/listCategory";
import CreatePostForm from "../../components/citizen/create_post_page/CreatePostForm";
import useCreatePost from "../../hooks/citizen/createPosts";

// ─── Page ─────────────────────────────────────────────────────────────────────
const CreatePostPage = () => {
  const { categories, isLoadingCategory, isFetchingCategory } = uselistCategory();
  const {
    fields,
    previews,
    errors,
    isSubmitting,
    handleChange,
    handleAddImages,
    handleRemoveImage,
    handleSubmit,
    handleCancel,
  } = useCreatePost();

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-7">
          <button
            onClick={handleCancel}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-5 group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back to Forum
          </button>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create a Post
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Share an issue, idea, or start a discussion in your community.
          </p>
        </div>

        {/* Form card */}
        <CreatePostForm
          fields={fields}
          onChange={handleChange}
          errors={errors}
          categories={categories ?? []}
          previews={previews}
          isSubmitting={isSubmitting}
          isLoadingCats={isLoadingCategory || isFetchingCategory}
          onAddImages={handleAddImages}
          onRemoveImage={handleRemoveImage}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {/* Footer note */}
        <p className="mt-5 text-center text-xs text-slate-400">
          By submitting, you agree to our{" "}
          <span className="underline underline-offset-2 cursor-pointer hover:text-slate-600 transition-colors">
            Community Guidelines
          </span>
          . Posts are reviewed for public safety and civility.
        </p>
      </div>
    </div>
  );
};

export default CreatePostPage;
