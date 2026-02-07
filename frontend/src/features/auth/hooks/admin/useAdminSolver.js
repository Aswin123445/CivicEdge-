import {
  useCreateSolverMutation,
  useListSolversQuery,
  useUpdateSolverMutation,
  useFetchZonesQuery,
} from "../../services/adminAuthApi";
import { useSearchParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDebounce } from "../../../../utils/debounce";


export const useAdminSolver = () => {
  /* =========================
     URL & Pagination source
     ========================= */
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const PAGE_SIZE = 6;

  /* =========================
     Queries
     ========================= */
  const { data,isLoading,isFetching } = useListSolversQuery({ page, search });
  const { data: zoneData, isSuccess: zoneSuccess } = useFetchZonesQuery();

  /* =========================
     Mutations
     ========================= */
  const [addSolver, addStatus] = useCreateSolverMutation();
  const [updateSolver, updateStatus] = useUpdateSolverMutation();

  /* =========================
     UI State
     ========================= */
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [roleData, setRoleData] = useState(null);
  const [flagData, setFlagData] = useState(null);
  const [searchValue, setSearchValue] = useState(search);
  const debouncedSearch = useDebounce(searchValue, 500);

  /* =========================
     Derived Data
     ========================= */
  const solvers = data?.results ?? [];
  const zones = zoneData ?? [];

  const count = data?.count ?? 0;
  const next = data?.next;
  const previous = data?.previous;

  /* =========================
     Pagination Derived State
     ========================= */
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const isEmpty = count === 0;
  const isSinglePage = totalPages <= 1;
  const isFirstPage = !previous;
  const isLastPage = !next;

  /* =========================
     Pagination Actions
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
     Business Actions
     ========================= */
  const handleSave = async (updatedCard) => {
    try {
      await updateSolver({
        id: updatedCard.id,
        role: updatedCard.role,
      }).unwrap();

      setRoleData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFlag = async (updatedUser) => {
    try {
      await updateSolver({
        id: updatedUser.id,
        is_active: updatedUser.is_active,
      }).unwrap();

      setFlagData(null);
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================
     Public API
     ========================= */
  return {
    /* data */
    solvers,
    zones,
    zoneSuccess,

    /* ui state */
    search,
    isCreateModal,
    setIsCreateModal,
    roleData,
    setRoleData,
    flagData,
    setFlagData,

    /* mutations */
    addSolver,
    addStatus,
    updateSolver,
    updateStatus,

    /* actions */
    handleSave,
    handleFlag,

    /* pagination */
    page,
    totalPages,
    isEmpty,
    isSinglePage,
    isFirstPage,
    isLastPage,
    goToPage,
    setSearchValue,
    searchValue,
    isLoading,
    isFetching
  };
};
