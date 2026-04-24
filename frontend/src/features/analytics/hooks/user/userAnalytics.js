import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useUserAnalyticsQuery } from "../../services/analyticsService";

export default function useUserAnalytics() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const range = urlSearchParams.searchParams.get("range") || "30d";
  const date_from= urlSearchParams.searchParams.get("date_from") || null; 
  const date_to= urlSearchParams.searchParams.get("date_to") || null;
  const {
    data: userAnalytics,
    isLoading: userAnalyticsLoading,
    isFetching: userAnalyticsFetching,
  } = useUserAnalyticsQuery({ range, date_from, date_to });
  return {
    urlSearchParams,
    userAnalytics,
    userAnalyticsLoading,
    userAnalyticsFetching,
  };
}
