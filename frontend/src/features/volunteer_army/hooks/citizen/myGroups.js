import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useMyGroupsQuery } from "../../services/citizen/group_service";

export default function useMyGroups() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });

  const {
    data,
    isLoading: myGroupsLoading,
    isFetching: myGroupsFetching,
  } = useMyGroupsQuery({ page: urlSearchParams?.page });
  const myGroups = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  return { myGroups, myGroupsLoading, myGroupsFetching ,pagination};
}
