import { useNavigate } from "react-router-dom";
import { useReportDetailsQuery } from "../../services/admin/forumServices";
export default function useReportDetails(id) {

    const navigate = useNavigate();
  const {
    data: report,
    isLoading: reportLoading,
    isFetching: reportFetching,
  } = useReportDetailsQuery(id);


  return {
    report,
    reportLoading,
    reportFetching,
    navigate,
  };
}
