import { useUrlSearchPagination } from "../../../../../utils/useUrlSearchPagination";
import useIssueHomePageService from "../../../../issues/hooks/home_page_service";
import { useFetchIssuesQuery } from "../../../services/admin/issue_execution_service";

export default function usePendingReviewService() {
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
    data: PendingIssues,
    isLoading: PendingIssuesLoading,
    isFetching: PendingIssuesFetching,
  } = useFetchIssuesQuery({ page, search, category, ordering });
  const pageData = getPaginationState({
    count: PendingIssues?.count ?? 0,
    next: PendingIssues?.next,
    previous: PendingIssues?.previous,
  });
  const issues = PendingIssues?.results || [];
  const totalPending = PendingIssues?.count;
  const todayPending = PendingIssues?.today_count;
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
    issues,
    PendingIssuesLoading,
    PendingIssuesFetching,
    totalPending,
    todayPending,
    pagination,
    goToPage,
    page,
    categoryData,
    categoryLoading,
    categoryFetching,
  };
}
