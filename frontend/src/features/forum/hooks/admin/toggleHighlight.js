import { useState } from "react";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast } from "../../../../utils/Toaster";
import { useToggleHighlightMutation } from "../../services/admin/forumServices";

export default function useToggleHighlight() {

    const [toggleHighlight,{isLoading:toggleHighlightLoading}] = useToggleHighlightMutation();
  const handleHighlightToggle = async (id) => {
    try {
      await toggleHighlight(id).unwrap();
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Error", description: message || "An error occurred" });
    }
  };
  return {
    toggleHighlightLoading,
    handleHighlightToggle,
  }
}