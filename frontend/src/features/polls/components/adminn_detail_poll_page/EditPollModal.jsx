import { useEffect, useState } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

export default function EditPollModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  initialData = {},
}) {
  const [form, setForm] = useState({
    question: "",
    context: "",
    did_you_know: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm({
        question: initialData.question || "",
        context: initialData.context || "",
        did_you_know: initialData.did_you_know || "",
      });

      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const inputClass =
    "w-full bg-[#1e1e1e] border border-slate-800 rounded-xl py-3.5 px-4 text-sm focus:border-blue-500 outline-none text-slate-200 transition-all";

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
      non_field_error: "",
    }));
  };

const validate = () => {
  const newErrors = {};

  const trimmedQuestion = (form.question || "").trim();
  const trimmedContext = (form.context || "").trim();
  const trimmedDidYouKnow = (form.did_you_know || "").trim();

  const hasUsefulText = (value) => {
    // must contain at least one letter or number
    return /[a-zA-Z0-9]/.test(value);
  };

  const isOnlySpecialChars = (value) => {
    // only symbols/spaces/underscores etc
    return value && !/[a-zA-Z0-9]/.test(value);
  };
  if(trimmedQuestion === ""){
    newErrors.question = "Question is required";
  }

  // At least one meaningful field required
  if (!trimmedQuestion && !trimmedContext && !trimmedDidYouKnow) {
    newErrors.non_field_error = "At least one field required.";
  }

  // Question validations
  if (trimmedQuestion) {
    if (trimmedQuestion.length > 500) {
      newErrors.question = "Question cannot exceed 500 characters.";
    } else if (!hasUsefulText(trimmedQuestion)) {
      newErrors.question = "Question cannot contain only symbols or spaces.";
    } else if (trimmedQuestion.length < 5) {
      newErrors.question = "Question is too short.";
    }
  }

  // Context validations
  if (trimmedContext) {
    if (!hasUsefulText(trimmedContext)) {
      newErrors.context = "Context cannot contain only symbols or spaces.";
    } else if (trimmedContext.length < 5) {
      newErrors.context = "Context is too short.";
    }
  }

  // Did you know validations
  if (trimmedDidYouKnow) {
    if (!hasUsefulText(trimmedDidYouKnow)) {
      newErrors.did_you_know = "Did you know cannot contain only symbols.";
    }
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleSubmit = () => {
  if (!validate()) return;

  const payload = {};

  const question = (form.question || "").trim();
  const context = (form.context || "").trim();
  const didYouKnow = (form.did_you_know || "").trim();

  if (question) payload.question = question;
  if (context) payload.context = context;

  // backend allows blank, so always send cleaned value
  payload.did_you_know = didYouKnow;

  onSubmit(payload);

};
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-[#1e1e1e] border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-100 tracking-tight">
              Edit Poll
            </h2>
            <p className="text-slate-500 text-xs font-medium mt-1">
              Update the poll details and publish refined information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Question */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Question
            </label>

            <input
              type="text"
              value={form.question}
              maxLength={500}
              placeholder="Enter poll question..."
              className={inputClass}
              onChange={(e) => handleChange("question", e.target.value)}
            />

            <div className="flex justify-between text-xs">
              {errors.question && (
                <span className="text-red-400">{errors.question}</span>
              )}

              <span className="text-slate-500">{form.question.length}/500</span>
            </div>
          </div>

          {/* Context */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Context
            </label>

            <textarea
              rows="4"
              value={form.context}
              placeholder="Provide supporting context..."
              className={`${inputClass} resize-none`}
              onChange={(e) => handleChange("context", e.target.value)}
            />
          </div>

          <div className="flex justify-between text-xs">
            {errors.context && (
              <span className="text-red-400">{errors.context}</span>
            )}
          </div>

          {/* Did You Know */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
              Did You Know
            </label>

            <textarea
              rows="3"
              value={form.did_you_know}
              placeholder="Interesting fact or optional note..."
              className={`${inputClass} resize-none italic`}
              onChange={(e) => handleChange("did_you_know", e.target.value)}
            />
            {errors.did_you_know && (
              <span className="text-red-400">{errors.did_you_know}</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3.5 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-[2] bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white px-6 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <CheckCircle2 size={18} />
            {loading ? "Updating..." : "Update Poll"}
          </button>
        </div>
      </div>
    </div>
  );
}
