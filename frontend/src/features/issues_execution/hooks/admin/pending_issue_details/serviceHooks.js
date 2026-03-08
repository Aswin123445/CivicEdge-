import { useNavigate, useParams } from "react-router-dom";

import {
  useFetchIssueDetailsQuery,
  useAdminInReviewDecitionMutation,
} from "../../../services/admin/issue_execution_service";
import { errorToast, successToast } from "../../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../../utils/extractErrorMessage";

export default function useAdminIssueDetailsService() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: issueDetails, isLoading: issueDetailsLoading } =
    useFetchIssueDetailsQuery(id);

  const [
    adminInReviewDecition,
    { isLoading: decitionLoading, isSuccess: decitionSuccess },
  ] = useAdminInReviewDecitionMutation();

  const handleadminInReviewDecition = async(data) => {
    try {
        await adminInReviewDecition({ data, id }).unwrap(); 
        successToast({title:"Action Successfull"})
        navigate("/admin/execution/in-review/issues");
      } catch (error) {
          const message = extractErrorMessage(error);
          errorToast({title:"something wrong",description:`${message || 'An error occurred pleas try again.'}`});
      }
    }
  return {
    issueDetails,
    issueDetailsLoading,
    decitionLoading,
    decitionSuccess,
    handleadminInReviewDecition
  };
}
