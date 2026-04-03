import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useAdminParcipantListQuery } from "../../services/admin/eventService";

export default function useAdminEventParcipantList(id) {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const status = urlSearchParams?.searchParams.get("status") || "";
  const {
    data,
    isLoading: adminParcipantListLoading,
    isFetching: adminParcipantListFetching,
  } = useAdminParcipantListQuery({
    id,
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    status: status,
  });
  const events = {
    event_title: data?.event_title,
    reference_id: data?.event_reference_id,
  };
  const adminParcipantList = data?.results || [];

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
    adminParcipantList,
    adminParcipantListLoading,
    adminParcipantListFetching,
    events,
    pagination,
  };
}
