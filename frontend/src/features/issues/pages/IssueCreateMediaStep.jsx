import { useRef, useState } from "react";
import { motion, nodeGroup } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import ProgressSteps from "../components/media/ProgressSteps";
import MediaUploader from "../components/media/MediaUploader";
import MediaPreviewGrid from "../components/media/MediaPreviewGrid";
import MediaValidation from "../components/media/MediaValidation";
import MediaFooter from "../components/media/MediaFooter";
import { uploadImagesBatch } from "../../../utils/cloudinary";
import useEvidenceService from "../hooks/evidenceServiceHook";
import { normalizeCloudinaryEvidence } from "../utils";
import { errorToast } from "../../../utils/Toaster";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";



const IssueCreateMediaStep = () => {
  const {id} = useParams();
  const {addEvidence} = useEvidenceService();
  const [cloudinaryLoading, setCloudinaryLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loadingPreviews, setLoadingPreviews] = useState([]);
  const canContinue = images.length >= 2;

  const handleSubmit = async() => {

    try {
      const results = await uploadImagesBatch(images,setCloudinaryLoading);
      const normalizedResults = results.map(normalizeCloudinaryEvidence);
      await addEvidence({id,req:{evidences:normalizedResults}}).unwrap();
      navigate(`/issue/${id}/behavioral-prompts`);
    } catch (err) {
      const message = extractErrorMessage(err); 
      errorToast({title:"Evidence upload failed",description:`${message || 'An error occurred during evidence upload.'}`});
    }
    finally{
      setCloudinaryLoading(false);
    }
  };  
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <motion.main
        className="max-w-2xl mx-auto px-6 pt-12 space-y-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* 🟦 Header */}
        <header>
          <h1 className="text-3xl font-bold text-slate-900">
            Add Evidence
          </h1>
          <p className="text-slate-500 mt-3">
            Upload clear photos of the issue to help authorities act faster.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Minimum 2 photos • Maximum 3 photos
          </p>
        </header>

        {/* 🟦 Progress */}
        <ProgressSteps currentStep={3} />

        {/* 🟦 Upload */}
        <MediaUploader 
          imageUrls={imageUrls} 
          setImageUrls={setImageUrls}
          images={images}
          setImages={setImages}
          setLoadingPreviews={setLoadingPreviews}
          
          fileInputRef={fileInputRef}
        />

        {/* 🟦 Preview */}
        <MediaPreviewGrid
          images={imageUrls}
          removeImage={(index) =>{
            setImages((prev) => prev.filter((_, i) => i !== index))
            setImageUrls((prev) => prev.filter((_, i) => i !== index))
            setLoadingPreviews((prev) => prev.filter((_, i) => i !== index));
          }
          }
          loadingPreviews={loadingPreviews}
          setLoadingPreviews={setLoadingPreviews}
        />

        {/* 🟦 Validation */}
        <MediaValidation imagesCount={images.length} />

        {/* 🟦 Footer Actions */}
        <MediaFooter
          canContinue={canContinue}
          onBack={() => navigate(-1)}
          onNext={handleSubmit}
          cloudinaryLoading={cloudinaryLoading}
        />
      </motion.main>
    </div>
  );
};

export default IssueCreateMediaStep;