import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast } from "../../../../utils/Toaster";
import { usePostReactMutation } from "../../services/citizen/forumServices";

export default function usePostReact(id) {
    const [postReact,{isLoading:postReactLoading}] = usePostReactMutation();
  const handleReact = async(type) => {
    try {
      await postReact({data:{reaction_type:type},id}).unwrap();
    }catch (error) {
        const message = extractErrorMessage(error);
        errorToast({ title: "Error", description: message || "An error occurred" });
    }
  };
  return {
    handleReact
  }
}