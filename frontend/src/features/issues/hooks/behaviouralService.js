import { useNavigate, useParams } from "react-router-dom";
import { useGetBehavioralsQuery,useGetBehavioralsResponseMutation,useFinalReviewQuery,useIssueSubmitMutation} from "../services/issue_services";
import { errorToast } from "../../../utils/Toaster";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useState } from "react";

export default function useBehavioralService() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();

  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useGetBehavioralsQuery(id, {
    skip: !id,
  });

  const [getBehavioralResponse,{isLoading:isLoadingResponse}] = useGetBehavioralsResponseMutation();
  const {data:reviewData,isLoading:isLoadingReview} = useFinalReviewQuery(id);

  const [issueSubmit,{isLoading:submitLoading}] = useIssueSubmitMutation();
  const questions = Array.isArray(data)
    ? data
    : data?.results ?? [];

   const handleSubmit = async() => {
     setIsSubmitting(true);
     try {
       await issueSubmit({id,req:{confirm: true}}).unwrap();
       navigate(`/successfull/${id}`);
     } catch (error) {
       const message = extractErrorMessage(error); 
       errorToast({title:"Error",description:`${message || 'An error occurred during evidence upload.'}`});
     } finally {
       setIsSubmitting(false);
     }
   }

  return {
    questions,     
    isLoading,
    isFetching,
    error,
    isLoadingResponse,
    getBehavioralResponse,
    isLoadingReview,
    reviewData,
    issueSubmit,
    submitLoading,
    handleSubmit,
    isSubmitting,
    setIsSubmitting
  };
}