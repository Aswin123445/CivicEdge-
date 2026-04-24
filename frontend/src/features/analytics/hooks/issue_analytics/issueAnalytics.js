import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useIssueanalyticsQuery } from "../../services/analyticsService";
import { stringToColor } from "../../utils";

export default function issueAnalytics() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const range = urlSearchParams.searchParams.get("range") || "30d";
  const date_from= urlSearchParams.searchParams.get("date_from") || null; 
  const date_to= urlSearchParams.searchParams.get("date_to") || null;
  
  const {
    data: issueanalytics,
    isLoading: issueanalyticsLoading,
    isFetching: issueanalyticsFetching,
  } = useIssueanalyticsQuery({ range, date_from, date_to });
  const stats = issueanalytics?.stats || {};
  const trend_chart = issueanalytics?.trend_chart || [];
  const category_chart = issueanalytics?.category_chart || [];
const categoryDataWithColors = category_chart?.map((item) => ({
  ...item,
  color: stringToColor(item.name),
}));
const funnel_chart = issueanalytics?.funnel_chart || []
const zone_chart = issueanalytics?.zone_chart || []
  return {
    issueanalytics,
    issueanalyticsLoading,
    issueanalyticsFetching,
    stats,
    trend_chart,
    categoryDataWithColors,
    funnel_chart,
    zone_chart,
    urlSearchParams
  };
}
