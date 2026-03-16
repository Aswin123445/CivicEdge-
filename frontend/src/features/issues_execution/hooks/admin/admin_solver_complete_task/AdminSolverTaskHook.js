import { useUrlSearchPagination } from "../../../../../utils/useUrlSearchPagination";
import { useAdminTaskFetchQuery } from "../../../services/admin/issue_execution_service";

export default function useAdminSolverCompleteTask() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const status = urlSearchParams?.searchParams.get("status") || "";
  const ordering =
    urlSearchParams?.searchParams.get("ordering") || "created_at";

  const {
    data,
    isLoading: adminTaskLoading,
    isFetching: adminTaskFetching,
  } = useAdminTaskFetchQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    status,
    ordering,
  });

  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const total = data?.count || 0;
  const today_count = data?.today_count || 0;
  const adminTask = data?.results || [];
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  return {
    adminTask,
    adminTaskLoading,
    adminTaskFetching,
    pagination,
    total,
    today_count
  };
}
