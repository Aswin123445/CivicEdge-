import { useFetchIssuesQuery } from "../../../issues_execution/services/admin/issue_execution_service";
import { useGetActivityLogsQuery } from "../../../monitoring/services/activity-log/activityLogService";
import { useGetAdminMetricsQuery } from "../../services/coreApi";

export default function useAdminMetrics() {
  const {
    data,
    isLoading: metricsLoading,
    isFetching: metricsFetching,
  } = useGetAdminMetricsQuery();
  const {
    data: logsdata,
    isLoading: activityLoading,
    isFetching: activityFetching,
  } = useGetActivityLogsQuery({});
  const {
    data: issues,
    isLoading: pendingIssueLoading,
    isFetching: pendingIssueFetching,
  } = useFetchIssuesQuery({});
  const pendingIssues = issues?.results?.slice(0, 3) || [];
  const logs = logsdata?.results?.slice(0, 5) || [];
  const openIssues = data?.issues?.open || 0;
  const totalEvents = data?.events?.total || 0;
  const pendingFlags = data?.flags?.pending || 0;
  const activeSolvers = data?.solvers?.active || 0;
  const tasks = data?.tasks?.total || 0;
  const issues_last_7_days = data?.issues_last_7_days || [];
  const users_joined_7_days = data?.users_joined_7_days || [];
  const posts_last_7_days = data?.posts_last_7_days || [];
  const adminData = data?.admin || {};
  const metrics = {
    openIssues,
    totalEvents,
    pendingFlags,
    activeSolvers,
    tasks,
  };
  
  return {
    metrics,
    metricsLoading,
    metricsFetching,
    logs,
    activityLoading,
    activityFetching,
    pendingIssues,
    pendingIssueLoading,
    pendingIssueFetching,
    issues_last_7_days,
    users_joined_7_days,
    posts_last_7_days,
    adminData
  };
}
