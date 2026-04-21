import {
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  HelpCircle,
  Eye,
  ArrowLeft,
  Loader2,
  Calendar,
} from "lucide-react";
import useAdminCreatePoll from "../hooks/admin/adminCreatePoll";
import AdminCreatePageHeader from "../components/admin_create_poll_page/AdminCreatePageHeader";
import AdminCreateFormSection from "../components/admin_create_poll_page/AdminCreateFormSection";
import AdminCreateGuidance from "../components/admin_create_poll_page/AdminCreateGuidance";

const AdminCreatePollPage = () => {
  const {
    formData,
    setFormData,
    createPollLoading,
    isUploading,
    setIsUploading,
    isSubmitting,
    setIsSubmitting,
    handleAddOption,
    handleRemoveOption,
    handleOptionChange,
    duplicateIndices,
    isValid,
    getOptionGuidance,
    handleImageUpload,
    handleSubmit,
    navigate,
    errors
  } = useAdminCreatePoll();

  return (
    <div className=" bg-[#1e1e1e] text-slate-100 font-sans selection:bg-blue-500/30 pb-20">
      {/* 5.1 Page Header */}
      <AdminCreatePageHeader navigate={navigate} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* 5.2 Main Form Section (LEFT) */}
          < AdminCreateFormSection
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            handleImageUpload={handleImageUpload}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            isSubmitting={isSubmitting}
            duplicateIndices = {duplicateIndices}
            handleAddOption = {handleAddOption}
            getOptionGuidance = {getOptionGuidance}
            isValid = {isValid}
            createPollLoading={createPollLoading}
            handleOptionChange = {handleOptionChange}
            handleRemoveOption = {handleRemoveOption}
            validationErrors = {errors}
           />

          {/* 5.3 Guidance Panel & Preview (RIGHT) */}
          <AdminCreateGuidance formData={formData} />
        </div>
      </main>
    </div>
  );
};

export default AdminCreatePollPage;
