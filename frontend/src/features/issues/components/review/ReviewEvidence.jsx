// ReviewEvidence.jsx
import { Image as ImageIcon } from "lucide-react";
import ReviewCard from "./ReviewCard";
import EvidenceSkeleton from "../../ui/skeltons/EvidenceSkelton";

export default function ReviewEvidence({ images,isLoadingReview }) {
  return (
    <ReviewCard title="Evidence" icon={<ImageIcon size={18} />}>
      <div className="grid grid-cols-3 gap-3">
        {images?.map((image) => {
          return (
            <img
              key={image.id}
              src={image.cloudinary_url}
              alt="Evidence"
              className="rounded-xl object-cover"
            />
          );
        })}
      </div>
    </ReviewCard>
  );
}
