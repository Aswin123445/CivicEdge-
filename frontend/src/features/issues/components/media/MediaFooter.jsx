import { ChevronLeft, ChevronRight } from "lucide-react";
import DottedLoaderIndicator from "../../../../components/common/DottedLoaderIndicator";

const MediaFooter = ({ canContinue, onBack, onNext ,cloudinaryLoading}) => (
  <footer className="flex flex-col sm:flex-row justify-center md:justify-end items-center gap-6 pt-8 border-t">

<button
  onClick={onNext}
  disabled={!canContinue || cloudinaryLoading}
  className={`
    px-12 py-4 rounded-2xl font-bold flex items-center gap-2 min-w-[168px]
    ${
      canContinue || !cloudinaryLoading
        ? "bg-blue-600 text-white"
        : "bg-slate-200 text-slate-400 cursor-not-allowed"
    }
  `}
>
  {cloudinaryLoading ? (
    (<div className="ml-6"><DottedLoaderIndicator className="border-white"/></div>)
  ) : (
    <>
      <span>Continue</span>
      <ChevronRight size={18} />
    </>
  )}
</button>
  </footer>
);

export default MediaFooter;