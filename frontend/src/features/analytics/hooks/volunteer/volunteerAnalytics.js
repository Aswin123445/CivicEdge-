import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useVolunteerAnalyticsQuery } from "../../services/analyticsService";

export default function useVolunteerAnalytics() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const range = urlSearchParams.searchParams.get("range") || "30d";
  const date_from= urlSearchParams.searchParams.get("date_from") || null;
  const date_to= urlSearchParams.searchParams.get("date_to") || null;
  const {
    data: volunteerAnalytics,
    isLoading: volunteerAnalyticsLoading,
    isFetching: volunteerAnalyticsFetching,
  } = useVolunteerAnalyticsQuery({range, date_from, date_to});
  const conversion_funnel = volunteerAnalytics?.conversion_funnel || []; 
  const group_access_distribution = volunteerAnalytics?.group_access_distribution || [];
  const growth = volunteerAnalytics?.growth || [];
  const kpis = volunteerAnalytics?.kpis || [];
  const top_participation_groups = volunteerAnalytics?.top_participation_groups || [];
  return {
    urlSearchParams,
    volunteerAnalyticsLoading,
    volunteerAnalyticsFetching,
    conversion_funnel,
    group_access_distribution,
    growth,
    kpis,
    top_participation_groups
  };
}
