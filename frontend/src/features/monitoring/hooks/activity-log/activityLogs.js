import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useGetActivityLogsQuery } from "../../services/activity-log/activityLogService";

export default function useActivityLogs() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const entity = urlSearchParams?.searchParams.get("entity") || "";
  const action = urlSearchParams?.searchParams.get("action") || "";

  const {
    data,
    isLoading: activityLoading,
    isFetching: activityFetching,
  } = useGetActivityLogsQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    entity: entity,
    action: action,
  });
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  const activityLogs = data?.results || [];

  const totalCount = data?.count || 0;
  const mostActiveEntity = data?.analytics?.most_active_entity?.entity || "-";
  const mostActiveAction = data?.analytics?.most_active_action?.action || "-";

  const entityCountsMap = Object.fromEntries(
    (data?.analytics?.entity_counts || []).map((item) => [
      item.entity,
      item.count,
    ]),
  );
  const issueCount = entityCountsMap["ISSUE"] || 0;
  const taskCount = entityCountsMap["TASK"] || 0;
  const forumCount = entityCountsMap["FORUM"] || 0;
  const pollCount = entityCountsMap["POLL"] || 0;
  const eventCount = entityCountsMap["EVENT"] || 0;

  return {
    activityLoading,
    activityFetching,
    activityLogs,
    pagination,
    totalCount,
    mostActiveEntity,
    mostActiveAction,
    issueCount,
    taskCount,
    forumCount,
    pollCount,
    eventCount,
  };
}
