import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useListReportsQuery } from "../../services/admin/forumServices";
import { useNavigate } from "react-router-dom";
export default function useListReport() {
  const navigate = useNavigate();
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const ordering = urlSearchParams?.searchParams.get("ordering") || "-created_at"; 
  const status = urlSearchParams?.searchParams.get("status") || ""; 
  const target_type = urlSearchParams?.searchParams.get("target_type") || "";
  const {
    data,
    isLoading: isLoadingReport,
    isFetching: isFetchingReport,
  } = useListReportsQuery({
    page: urlSearchParams?.page,
    ordering: ordering,
    status: status,
    target_type: target_type,
    search: urlSearchParams?.search,
});
  const reports = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  const totalReport = data?.count || 0;

  const handleViewDetails = (id) => {
    navigate(`/admin/forum/reports/${id}`);
  };
  return {
    reports,
    isLoadingReport,
    isFetchingReport,
    pagination,
    totalReport,
    handleViewDetails
  };
}
