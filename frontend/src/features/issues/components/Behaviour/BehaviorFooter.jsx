import { ChevronLeft, ChevronRight } from "lucide-react";

const BehaviorFooter = ({ canContinue, onBack, onNext }) => (
  <footer className="mt-10 flex justify-center md:justify-end  items-center  gap-6 pt-8 border-t">


    <button
      onClick={onNext}
      disabled={!canContinue}
      className={`px-12 py-4 rounded-2xl font-semibold flex items-center gap-2
        ${
          canContinue
            ? "bg-blue-600 text-white"
            : "bg-slate-300 text-slate-500 cursor-not-allowed"
        }`}
    >
      Review my issue
      <ChevronRight size={18} />
    </button>
  </footer>
);

export default BehaviorFooter;