import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useGetBehavioralListQuery } from "../../services/behavioral_service/behavioralService";

export default function useBehavioralList() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const {
    data,
    isLoading: behavioralListLoading,
    isFetching: behavioralListFetching,
  } = useGetBehavioralListQuery({
    page: urlSearchParams.page,
    search: urlSearchParams.search,
  });
  const behavioralList = data?.results || [];
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
    behavioralList,
    behavioralListLoading,
    behavioralListFetching,
    pagination,
  };
}
