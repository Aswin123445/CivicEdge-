import {
  useFetchSolverTaskDetailQuery,
  useSolverStartExecutionMutation,
} from "../../services/solver/issue_execution_service_solver";
import { errorToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import handleDownload from "../../services/pdf_service";
export default function useSolverTaskDetail(id) {
  const {
    data: task,
    isLoading: taskLoading,
    isFetching: taskFetching,
  } = useFetchSolverTaskDetailQuery(id);

  const [startExecution, { startIsLoading }] =
    useSolverStartExecutionMutation();

  const handleStartExecution = async () => {
    try {
      await startExecution(id).unwrap();
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "Start Execution Failed",
        description: `${message || "An error occurred pleas try again."}`,
      });
    }
  };
  const handlePdfDownload = async (access_token) => {
    try {
      const blob = await handleDownload(task?.latest_report.id, access_token);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "verification_report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "download failed",
        description: `${message || "An error occurred pleas try again."}`,
      });
    }
  };
  return {
    task,
    taskLoading,
    taskFetching,
    handlePdfDownload,
    handleStartExecution,
    startIsLoading,
  };
}
