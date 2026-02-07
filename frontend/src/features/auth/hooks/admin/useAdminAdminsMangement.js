import { useListAdminsQuery } from "../../services/adminAuthApi";
import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../../utils/debounce";

export const useAdmin = () => {
  /* =========================
     URL state (single source of truth)
     ========================= */
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";

  /* =========================
     Query
     ========================= */
  const { data, isLoading, isSuccess, error , isFetching} = useListAdminsQuery({ page, search });

  /* =========================
     UI state
     ========================= */
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlagModalUser, setIsFlagModalUser] = useState(null);
  const [searchValue, setSearchValue] = useState(search);
  const debouncedSearch = useDebounce(searchValue, 500);

  /* =========================
     Pagination config
     ========================= */
  const PAGE_SIZE = 6;

  /* =========================
     Derived data
     ========================= */
  const admins = data?.results ?? [];
  const count = data?.count ?? 0;
  const next = data?.next;
  const previous = data?.previous;

  /* =========================
     Pagination derived state
     ========================= */
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const isEmpty = count === 0;
  const isSinglePage = totalPages <= 1;
  const isFirstPage = !previous;
  const isLastPage = !next;

  /* =========================
     Pagination actions
     ========================= */
  const goToPage = (targetPage) => {
    if (targetPage < 1 || targetPage > totalPages) return;
    setSearchParams({ page: String(targetPage) });
  };
  useEffect(() => {
    setSearchParams((prev) => {
      if (debouncedSearch.trim()) {
        prev.set("search", debouncedSearch);
        prev.set("page", "1");
      } else {
        prev.delete("search");
        prev.set("page", "1");
      }
      return prev;
    });
  }, [debouncedSearch, setSearchParams]);

  /* =========================
     Public API
     ========================= */
  return {
    // query state
    isLoading,
    isSuccess,
    error,

    // data
    admins,

    // ui state
    search,
    selectedCard,
    setSelectedCard,
    isFlagModalUser,
    setIsFlagModalUser,

    // pagination
    page,
    totalPages,
    isEmpty,
    isSinglePage,
    isFirstPage,
    isLastPage,
    goToPage,

    // search
    searchValue,
    setSearchValue,
    isFetching,
  };
};
