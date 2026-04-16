import { useState } from "react";
import { useCreateCommentMutation } from "../../services/citizen/forumServices";
import { errorToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";

export default function useCreateCommentHook(id) {
  const [newComment, setNewComment] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [
    createComment,
    { isLoading: commentLoading, isFetching: commentFetching },
  ] = useCreateCommentMutation();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await createComment({data:{content:newComment},id}).unwrap();
    } catch (err) {
      const message = extractErrorMessage(err);
      errorToast({ title: "Error", description: message || "An error occurred" });
    }finally{
      setNewComment("")
    }
  };
  return {
    newComment,
    setNewComment,
    handleCommentSubmit,
    commentLoading,
    commentFetching,
    activeCommentId,
    setActiveCommentId
  }
}
