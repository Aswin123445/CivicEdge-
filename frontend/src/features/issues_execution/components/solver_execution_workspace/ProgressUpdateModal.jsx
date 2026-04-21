import React from "react";
import FormGroup from "../../ui/solver_execution_workspace/FormGroup";
import Modal from "../../ui/solver_execution_workspace/Modal";

const ProgressUpdateModal = ({
  setIsProgressModalOpen,
  handleAddProgress,
  isLoadingUpdateRes,
  isFetchingUpdateRes,
  errors
}) => {
  return (
    <Modal
      title="Add Progress Update"
      onClose={() => setIsProgressModalOpen(false)}
    >
      <form onSubmit={handleAddProgress} className="space-y-4">
        <FormGroup label="Progress Summary">
          <textarea
            name="progress_summary"
            className="w-full rounded-lg border border-slate-200 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            rows="3"
            placeholder="What work was completed?"
            required
          ></textarea>
          {errors.progress_summary && (
            <p className="text-red-500 text-xs">{errors.progress_summary}</p>
          )}
        </FormGroup>

        <FormGroup label="Progress Percentage (0-100)">
          <input
            name="progress_percentage"
            type="number"
            min="0"
            max="100"
            className="w-full rounded-lg border border-slate-200 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            placeholder="60"
            required
          />
          {errors.progress_percentage && (
            <p className="text-red-500 text-xs">{errors.progress_percentage}</p>
          )}
        </FormGroup>

        <FormGroup label="Blockers (Optional)">
          <textarea
            name="blockers"
            className="w-full rounded-lg border border-slate-200 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            rows="2"
            placeholder="Any issues delaying work?"
          ></textarea>
          {errors.blockers && (
            <p className="text-red-500 text-xs">{errors.blockers}</p>
          )}
        </FormGroup>

        <FormGroup label="Next Steps">
          <textarea
            name="next_steps"
            className="w-full rounded-lg border border-slate-200 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            rows="2"
            placeholder="What happens next?"
            required
          ></textarea>
          {errors.next_steps && (
            <p className="text-red-500 text-xs">{errors.next_steps}</p>
          )}
        </FormGroup>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
        >
          {isLoadingUpdateRes ? "Submitting..." : "Submit Progress Update"}
        </button>
      </form>
    </Modal>
  );
};

export default ProgressUpdateModal;
