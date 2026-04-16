import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useMyActivityQuery } from "../../services/citizen/forumServices";

export default function useMyActivity() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const {
    data,
    isLoading: myActivityLoading,
    isFetching: myActivityFetching,
  } = useMyActivityQuery();
  const myActivity = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  return { myActivity, myActivityLoading, myActivityFetching, pagination };
}
