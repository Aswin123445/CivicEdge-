import { useSelector } from "react-redux";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast } from "../../../../utils/Toaster";
import { handleIssueExportDownload } from "../../../issues_execution/services/pdf_service";
import { useState } from "react";

export default function useIssueExport() {
  const { access_token } = useSelector((state) => state.auth);
  const [issueExportLoading, setIssueExportLoading] = useState(false);


  const handleExport = async (range, date_from, date_to) => {
    const now = new Date();
    setIssueExportLoading(true);
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
    }finally{
      setIssueExportLoading(false);
    }
  };
  return {
    issueExportLoading,
    handleExport,
  };
}
