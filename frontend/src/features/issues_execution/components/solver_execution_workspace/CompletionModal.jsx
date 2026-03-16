import React from "react";
import Modal from "../../ui/solver_execution_workspace/Modal";
import FormGroup from "../../ui/solver_execution_workspace/FormGroup";

const CompletionModal = ({
  handleSubmitCompletion,
  handleFileChange,
  selectedFiles,
  removeFile,
  setIsCompletionModalOpen,
  isSubmitting
}) => {
  return (
    <Modal
      title="Submit Final Completion"
      onClose={() => setIsCompletionModalOpen(false)}
    >
      <form onSubmit={handleSubmitCompletion} className="space-y-4">
        <FormGroup label="Completion Summary">
          <textarea
            name="completion_summary"
            className="w-full rounded-lg border border-slate-200 p-3"
            rows="3"
            required
          ></textarea>
        </FormGroup>

        {/* Evidence Upload Section */}
        <FormGroup label="Evidence Upload (Required)">
          <div className="mt-1">
            {/* Hidden Input */}
            <input
              type="file"
              id="file-upload"
              multiple
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />

            {/* Custom Trigger Area */}
            <label
              htmlFor="file-upload"
              className="flex cursor-pointer justify-center rounded-xl border-2 border-dashed border-slate-200 px-6 py-8 hover:border-blue-400 hover:bg-blue-50/30 transition-all"
            >
              <div className="text-center">
                <span className="text-sm font-bold text-blue-600">
                  + Upload Evidence
                </span>
                <p className="text-xs text-slate-400 mt-1">Images or Video</p>
              </div>
            </label>

            {/* Preview Grid */}
            {selectedFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {selectedFiles.map((fileObj, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square rounded-lg border border-slate-200 bg-slate-100 overflow-hidden"
                  >
                    <img
                      src={fileObj.preview}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FormGroup>

        <button
          type="submit"
          disabled={selectedFiles.length === 0}
          className={`w-full rounded-lg py-3 font-bold text-white transition-all ${
            selectedFiles.length > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          {isSubmitting? 'Please Wait' : 'Submit Completion'}
        </button>
      </form>
    </Modal>
  );
};

export default CompletionModal;
