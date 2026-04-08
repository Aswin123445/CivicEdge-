import { useNavigate } from "react-router-dom";
import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { usePollListQuery } from "../../services/citizen/pollService";

export default function usePollList() {
  const navigate = useNavigate();
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const ordering =
    urlSearchParams?.searchParams.get("ordering") || "-created_at";

  const {
    data,
    isLoading: pollListLoading,
    isFetching: pollListFetching,
  } = usePollListQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    ordering: ordering,
  });
  const pollList = data?.results || [];
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
    pollList,
    pollListLoading,
    pollListFetching,
    pagination,
    navigate
  };
}
