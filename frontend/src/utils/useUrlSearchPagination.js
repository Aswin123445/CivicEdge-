import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDebounce } from "../utils/debounce";

export function useUrlSearchPagination({
  pageSize = 6,
  searchKey = "search",
  pageKey = "page",
  debounceMs = 500,
} = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get(searchKey) || "";
  const page = Number(searchParams.get(pageKey) || 1);

  const [searchValue, setSearchValue] = useState(search);
  const debouncedSearch = useDebounce(searchValue, debounceMs);

  /* =========================
     Sync search → URL
     Reset page ONLY when search changes
     ========================= */
  useEffect(() => {
    if (search === debouncedSearch) return;

    setSearchParams({
      ...(debouncedSearch.trim()
        ? { [searchKey]: debouncedSearch }
        : {}),
      [pageKey]: "1",
    });
  }, [debouncedSearch, search, searchKey, pageKey, setSearchParams]);

  /* =========================
     Pagination helpers
     ========================= */
  const getPaginationState = ({ count, next, previous }) => {
    const totalPages = Math.ceil(count / pageSize);

    return {
      totalPages,
      isEmpty: count === 0,
      isSinglePage: totalPages <= 1,
      isFirstPage: !previous,
      isLastPage: !next,
    };
  };

  /* =========================
     Pagination action
     Preserve search
     ========================= */
  const goToPage = (targetPage) => {
    if (targetPage < 1) return;

    setSearchParams({
      [pageKey]: String(targetPage),
      ...(search ? { [searchKey]: search } : {}),
    });
  };

  /* =========================
     Public API
     ========================= */
  return {
    search,
    page,
    searchValue,
    setSearchValue,
    getPaginationState,
    goToPage,
    setSearchParams,
    searchParams
  };
}