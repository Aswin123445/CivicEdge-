import { useFetchDraftProgressQuery } from "../../services/solver/issue_execution_service_solver";
import {useParams} from "react-router-dom";

export default function useSolverVerificationTask(id) {
  const {
    data: draftProgress,
    isLoading: draftProgressLoading,
    isFetching: draftProgressFetching,
  } = useFetchDraftProgressQuery(id);
  return {
    draftProgress,
    draftProgressLoading,
    draftProgressFetching,
  };
}
