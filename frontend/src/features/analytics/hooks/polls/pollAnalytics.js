import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { usePollAnalyticsQuery } from "../../services/analyticsService";

export default function usePollAnalytics() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const range = urlSearchParams.searchParams.get("range") || "30d";
  const date_from = urlSearchParams.searchParams.get("date_from") || null;
  const date_to = urlSearchParams.searchParams.get("date_to") || null;
  const {
    data: pollAnalytics,
    isLoading: pollAnalyticsLoading,
    isFetching: pollAnalyticsFetching,
  } = usePollAnalyticsQuery({ range, date_from, date_to });
  const kpis = pollAnalytics?.kpis || [];
  const top_polls = pollAnalytics?.top_polls || [];
  const participation_trend = pollAnalytics?.participation_trend || [];
  return {
    urlSearchParams,
    pollAnalyticsLoading,
    pollAnalyticsFetching,
    kpis,
    top_polls,
    participation_trend,
  };
}
