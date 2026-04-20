import { useState } from "react";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useReportContentMutation } from "../../services/citizen/forumServices";

export default function useReportContent() {
    const [reportContent,{isLoading:reportContentLoading}] = useReportContentMutation();
    const [payload, setPayload] = useState({target_type:"",target_id:"",reason:""});

    const handleReport = async(data) => {
        console.log(data)
        try {
          await reportContent(data).unwrap();
          successToast({ title: "Success", description: "Report submitted successfully" });
        }catch (error) {
            const message = extractErrorMessage(error);
            errorToast({ title: "Error", description: message || "An error occurred" });
        }
      }
    return {
        handleReport,
        reportContentLoading,
        setPayload,
        payload
    }
}