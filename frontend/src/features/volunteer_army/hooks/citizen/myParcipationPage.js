import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useMyPartcipationQuery } from "../../services/citizen/event_service";

export default function useMyParticipationPage() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const status = urlSearchParams?.searchParams.get("status") || "";
  const {
    data,
    isLoading: myParticipationLoading,
    isFetching: myParticipationFetching,
  } = useMyPartcipationQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    on_status: status,
  });
  const myParticipationData = data?.results || [];

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
    myParticipationData,
    myParticipationLoading,
    myParticipationFetching,
    pagination,
  };
}
