import { useSelector } from "react-redux";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast } from "../../../../utils/Toaster";
import { handleForumExportDownload } from "../../../issues_execution/services/pdf_service";
import { useState } from "react";

export default function useForumExport() {
  const { access_token } = useSelector((state) => state.auth);
  const [isExportLoading, setIsExportLoading] = useState(false);


  const handleExport = async (range, date_from, date_to) => {
    const now = new Date();
    setIsExportLoading(true);
    try {
      const blob = await handleForumExportDownload(range, date_from, date_to, access_token);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `forum_analytics${now.toISOString()}.xlsx`;
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
      setIsExportLoading(false);
    }
  };
  return {
    isExportLoading,
    handleExport,
  };
}
