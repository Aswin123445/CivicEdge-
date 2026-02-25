import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const DeleteDraftModal = ({ draft, onClose, onConfirm, draftDeleteLoading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <motion.div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
      >
        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
          <Trash2 className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          Discard this draft?
        </h3>
        <p className="text-slate-500 mt-2">
          All information for "{draft.title}" will be permanently removed.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-100 rounded-xl"
          >
            Keep Draft
          </button>
          {draftDeleteLoading? (<div className="flex-1 px-6 py-3 bg-slate-100 rounded-xl flex items-center justify-center">wait...</div>) :<button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl"
          >
            Discard
          </button>}
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteDraftModal;