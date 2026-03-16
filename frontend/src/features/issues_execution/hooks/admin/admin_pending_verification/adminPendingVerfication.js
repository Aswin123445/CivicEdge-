import { useUrlSearchPagination } from "../../../../../utils/useUrlSearchPagination";
import useIssueHomePageService from "../../../../issues/hooks/home_page_service";
import { useGetPendingVerificationQuery } from "../../../services/admin/issue_execution_service";

export default function useAdminPendingVerification() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  //   const category = searchParams.get("category") || "";
  //   const ordering = searchParams.get("ordering") || "created_at";

  const {
    data,
    isLoading: pendingVerificationIssueLoading,
    isFetching: pendingVerificationIssueFetching,
  } = useGetPendingVerificationQuery({page:urlSearchParams?.page,search:urlSearchParams?.search});
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count ?? 0,
    next: data?.next,
    previous: data?.previous,
  });
  const pendingVerificationIssue = data?.results || [];
  const today_count = data?.today_count || 0;
  const totalPending = data?.count;

  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  return {
    pendingVerificationIssue,
    pendingVerificationIssueLoading,
    pendingVerificationIssueFetching,
    today_count,
    pagination,
    totalPending
  };
}
