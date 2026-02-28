// ReviewSubmitNotice.jsx
import { AlertCircle } from "lucide-react";

export default function ReviewSubmitNotice() {
  return (
    <div className="bg-blue-50/60 rounded-3xl p-6 border border-blue-100 flex gap-4">
      <AlertCircle className="text-blue-600" />
      <p className="text-sm text-blue-900">
        Once submitted, this issue cannot be edited.
      </p>
    </div>
  );
}