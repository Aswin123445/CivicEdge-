import { useUrlSearchPagination } from "../../../../../utils/useUrlSearchPagination";
import useIssueHomePageService from "../../../../issues/hooks/home_page_service";
import { useGetPendingIssueToSolversQuery } from "../../../services/admin/issue_execution_service";

export default function useAssignSolverService() {
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
  const category = searchParams.get("category") || "";
  const ordering = searchParams.get("ordering") || "created_at";
  const {
    data,
    isLoading: pendingIssueAssignLoading,
    isFetching: pendingIssueAssignFetching,
  } = useGetPendingIssueToSolversQuery({ page, search, category, ordering });
  const pendingIssueAssign = data?.results || [];
  const itemCount = data?.count || 0;
  const today_count = data?.today_count || 0;
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
  const { categoryData, categoryLoading, categoryFetching } =
    useIssueHomePageService();
  return {
    pendingIssueAssign,
    pendingIssueAssignLoading,
    pendingIssueAssignFetching,
    itemCount,
    today_count,
    pagination,
    categoryData,
    categoryLoading,
    categoryFetching,
  };
}
