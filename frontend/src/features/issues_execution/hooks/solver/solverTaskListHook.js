import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useFetchSolverTasksQuery } from "../../services/solver/issue_execution_service_solver";

export default function useSolverTaskListHook() {
  const {
    search,
    page,
    searchValue,
    setSearchValue,
    goToPage,
    getPaginationState,
    setSearchParams,
    searchParams,
  } = useUrlSearchPagination({ pageSize: 6 });
  // const category = searchParams.get("category") || "";
  // const ordering = searchParams.get("ordering") || "created_at";
  const status = searchParams.get("status") || "";

  const {
    data,
    isLoading: solverTasksLoading,
    isFetching: solverTasksFetching,
    refetch,
  } = useFetchSolverTasksQuery({ page, search, status });
  const solverTasks = data?.results || [];
  const completed_count = data?.completed_count || 0;
  const in_progress_count = data?.in_progress_count || 0;
  const pending_submission_count = data?.pending_submission_count || 0;
  const pending_verification_count = data?.pending_verification_count || 0;
  const new_assignments_count = data?.new_assignments_count || 0;
  const postponed_count = data?.postponed_count || 0
  const aggregatedCount = {
    completed_count,
    in_progress_count,
    pending_submission_count,
    pending_verification_count,
    new_assignments_count,
    postponed_count
  };

  const pageData = getPaginationState({
    count: data?.count ?? 0,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    page,
    search,
    searchValue,
    setSearchValue,
    setSearchParams,
    searchParams,
    goToPage,
  };
  return {
    solverTasks,
    solverTasksLoading,
    solverTasksFetching,
    aggregatedCount,
    pagination,
    refetch
  };
}
