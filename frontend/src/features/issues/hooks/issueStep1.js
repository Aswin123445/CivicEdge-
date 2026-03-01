import {  useState } from "react";
import useIssueHomePageService from "./home_page_service";
import { errorToast, successToast } from "../../../utils/Toaster";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
export default function useIssueStep1() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || "";

  const {
    issueStep1,
    issueStep1Loading,
    issueStep1Fetching,
    issueStep1Success,
    issueStep1Error,
  } = useIssueHomePageService();
  // 🔹 Form State
  const [formData, setFormData] = useState({
    title: "",
    category: category,
    description: "",
  });


  const [errors, setErrors] = useState({});

  const handleContinue = async () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Please add a short title.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (formData.description.trim().length < 20) {
      newErrors.description = "Please describe the issue in a bit more detail.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await issueStep1(formData).unwrap();
        successToast({
          title: "Success",
          description: "Issue created successfully.",
        });
        navigate(`/issue/${data.id}/location`);
      } catch (error) {
        const message = extractErrorMessage(error);
        errorToast({ title: "Error", description: message });
      }
    }
  };
  return {
    handleContinue,
    formData,
    setFormData,
    errors,
  };
}
