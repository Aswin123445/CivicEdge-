// ReviewFooter.jsx
import {  Send } from "lucide-react";
import DottedLoaderIndicator from "../../../../components/common/DottedLoaderIndicator";

export default function ReviewFooter({  onSubmit, isSubmitting }) {
  return (
    <footer className="flex justify-center md:justify-end pt-8 mb-6 border-t">

      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-10 py-3 rounded-xl flex  gap-2 min-w-[200px]"
      >
        {isSubmitting ? (<div className="ml-11"><DottedLoaderIndicator className="border-white"/></div>) : "Submit Issue"}
        {!isSubmitting && <Send size={18} />}
      </button>
    </footer>
  );
}