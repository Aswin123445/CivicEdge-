import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const MediaValidation = ({ imagesCount }) => {
  if (imagesCount < 2) {
    return (
      <div className="flex items-center gap-2 text-slate-500">
        <AlertCircle size={16} />
        <p className="text-sm font-medium">
          Please add at least 2 photos to continue.
        </p>
      </div>
    );
  }

  if (imagesCount === 3) {
    return (
      <div className="flex items-center gap-2 text-blue-600">
        <CheckCircle2 size={16} />
        <p className="text-sm font-medium">
          You’ve added the maximum number of photos.
        </p>
      </div>
    );
  }

  return (
    <p className="text-sm text-slate-500">
      You can add one more photo for extra clarity.
    </p>
  );
};

export default MediaValidation;