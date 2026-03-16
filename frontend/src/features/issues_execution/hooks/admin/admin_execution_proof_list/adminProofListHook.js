import { useGetAdminFinalReportQuery } from "../../../services/admin/issue_execution_service";
import { useUrlSearchPagination } from "../../../../../utils/useUrlSearchPagination";
export default function useAdminExecutionProofList() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const {
    data,
    isLoading: adminFinalReportLoading,
    isFetching: adminFinalReportFetching,
  } = useGetAdminFinalReportQuery();
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count ?? 0,
    next: data?.next,
    previous: data?.previous,
  });
  const adminFinalReport = data?.results || [];
  const total_count = data?.count || 0;

  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  return {
    adminFinalReport,
    adminFinalReportLoading,
    adminFinalReportFetching,
    total_count,
    pagination
  };
}
