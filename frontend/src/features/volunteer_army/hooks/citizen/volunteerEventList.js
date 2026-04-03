import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useFetchEventListQuery } from "../../services/citizen/event_service";

export default function useVolunteerEventList(group_id) {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const status =
    urlSearchParams?.searchParams.get("status") || "";

  const {
    data,
    isLoading: eventListLoading,
    isFetching: eventListFetching,
  } = useFetchEventListQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    on_status: status,
    id: group_id,
  });
  const eventData = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  return {
    eventData,
    eventListLoading,
    eventListFetching,
    pagination,
  };
}
