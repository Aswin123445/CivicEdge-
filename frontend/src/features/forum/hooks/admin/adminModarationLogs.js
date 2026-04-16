import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useForumLogsQuery } from "../../services/admin/forumServices";

export default function useModerationLogs() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
    const target_type = urlSearchParams?.searchParams.get("target_type") || "";
    const {data, isLoading: getModerationLogsLoading, isFetching: getModerationLogs} =
        useForumLogsQuery({page: urlSearchParams?.page, search: urlSearchParams?.search, target_type: target_type});
    const logs = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const length = data?.count || 0;
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
    return {
        getModerationLogsLoading,
        getModerationLogs,
        pagination,
        logs,
        length
    };
}