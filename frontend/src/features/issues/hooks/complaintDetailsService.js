import { useParams } from "react-router-dom";
import { useComplaintDetailQuery } from "../services/issue_services";
export default function useComplaintDetailsService() {
  const { id } = useParams();
  const {
    data: complaint,
    isLoading: complaintLoading,
    isFetching: complaintFetching,
  } = useComplaintDetailQuery(id);
  return { complaint, complaintLoading, complaintFetching };
}
