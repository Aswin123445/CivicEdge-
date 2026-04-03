import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useFetchGroupListQuery } from "../../services/citizen/group_service";

export default function useVolunteerGroupListHook() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const membership_type = urlSearchParams?.searchParams.get("membership_type") || "";

  const {
    data,
    isLoading: groupisLoading,
    isFetching: groupisFetching,
  } = useFetchGroupListQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    membership_type: membership_type,
  });
  const groupData = data?.results || [];
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
    groupData,
    groupisLoading,
    groupisFetching,
    pagination,
  };
}
