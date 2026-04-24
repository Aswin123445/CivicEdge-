import { useSelector } from "react-redux";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast } from "../../../../utils/Toaster";
import { useIssueExportMutation } from "../../services/analyticsService";
import { handleIssueExportDownload } from "../../../issues_execution/services/pdf_service";

export default function useIssueExport() {
  const { access_token } = useSelector((state) => state.auth);
  const [issueExport, { isLoading: issueExportLoading }] =
    useIssueExportMutation();

  const handleExport = async (range, date_from, date_to) => {
    const now = new Date();
    try {
      const blob = await handleIssueExportDownload(range, date_from, date_to, access_token);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `issues_analytics${now.toISOString()}.xlsx`;
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
    issueExportLoading,
    handleExport,
  };
}
