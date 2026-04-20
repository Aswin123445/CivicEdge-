import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useGetZoneListQuery } from "../../services/zone_service/zoneService";

export default function useZoneList() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });

  const {
    data,
    isLoading: zoneListLoading,
    isFetching: zoneListFetching,
  } = useGetZoneListQuery({ page: urlSearchParams.page , search: urlSearchParams.search});
  const zones = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count ?? 0,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  return {
    zones,
    zoneListLoading,
    zoneListFetching,
    pagination
  };
}
