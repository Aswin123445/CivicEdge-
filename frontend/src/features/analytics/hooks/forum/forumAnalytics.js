import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useForumAnalyticsQuery } from "../../services/analyticsService";

export default function useForumAnalytics() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const range = urlSearchParams.searchParams.get("range") || "30d";
  const date_from = urlSearchParams.searchParams.get("date_from") || null;
  const date_to = urlSearchParams.searchParams.get("date_to") || null;
  const {
    data: forumAnalytics,
    isLoading: forumAnalyticsLoading,
    isFetching: forumAnalyticsFetching,
  } = useForumAnalyticsQuery({ range, date_from, date_to });
  const kpis = forumAnalytics?.kpis || []; 
  const forum_activity_trend = forumAnalytics?.forum_activity_trend || [];
  const top_discussion_categories = forumAnalytics?.top_discussion_categories || [];
  return {
    urlSearchParams,
    forumAnalyticsLoading,
    forumAnalyticsFetching,
    kpis,
    forum_activity_trend,
    top_discussion_categories
  };
}
