import { useUrlSearchPagination } from "../../../utils/useUrlSearchPagination";
import { useDeleteDraftMutation, useGetDraftsQuery } from "../services/issue_services";
export default function useDraftPageService() {
  /* =========================
     Search & pagination (URL-driven)
     ========================= */
  const {
    search,
    page,
    searchValue,
    setSearchValue,
    goToPage,
    getPaginationState,

  } = useUrlSearchPagination({ pageSize: 6 });

  /* =========================
     API query
     ========================= */
  const {
    data,
    isLoading: draftsLoading,
    isFetching: draftsFetching,
    isSuccess: draftsSuccess,
  } = useGetDraftsQuery({ page, search });

  /* =========================
     Normalize DRF response
     ========================= */
  const drafts = data?.results ?? [];
  
  const pagination = getPaginationState({
    count: data?.count ?? 0,
    next: data?.next,
    previous: data?.previous,
  });

  const [draftDelete,{isLoading:draftDeleteLoading}] = useDeleteDraftMutation();

  /* =========================
     Public API
     ========================= */
  return {
    /* data */
    drafts,
    /* query state */
    draftsLoading,
    draftsFetching,
    draftsSuccess,
    /* search */
    searchValue,
    setSearchValue,
    /* pagination */
    page,
    goToPage,
    ...pagination,
    draftDelete,
    draftDeleteLoading
  };
}