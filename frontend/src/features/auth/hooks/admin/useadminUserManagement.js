import {
  useFlagCitizenMutation,
  useGetCitizensQuery,
  useRoleChangeMutation,
} from "../../services/adminAuthApi";
import { useSearchParams } from "react-router-dom";
import { useState ,useEffect} from "react";
import { useDebounce } from "../../../../utils/debounce";

export default function useAdminUserManagement() {
  /* =========================
     URL & Pagination source
     ========================= */
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || 1);
  const PAGE_SIZE = 6;

  /* =========================
     Queries
     ========================= */
  const { data, isLoading, isSuccess,isFetching } = useGetCitizensQuery({page,search});

  /* =========================
     Mutations
     ========================= */
  const [roleChange, roleStatus] = useRoleChangeMutation();
  const [flagCitizen, flagStatus] = useFlagCitizenMutation();

  /* =========================
     UI State
     ========================= */
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlagModalUser, setisFlagModalUser] = useState(null);
  const [searchValue, setSearchValue] = useState(search);
  const debouncedSearch = useDebounce(searchValue, 500);

  /* =========================
     Derived Data (Query result)
     ========================= */
  const citizens = data?.results ?? [];
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

  /* =========================
     Handlers (Business actions)
     ========================= */
  const handleSave = async (updatedCard) => {
    try {
      await roleChange({
        id: updatedCard.id,
        role: updatedCard.role,
      }).unwrap();

      setSelectedCard(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFlag = async (updatedUser) => {
    try {
      await flagCitizen({
        id: updatedUser.id,
        is_active: updatedUser.is_active,
      }).unwrap();

      setSelectedCard(null);
    } catch (error) {
      console.log(error);
    }
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
     Public API (what component uses)
     ========================= */
  return {
    /* query state */
    isLoading,
    isSuccess,
    isFetching,

    /* data */
    citizens,

    /* ui state */
    selectedCard,
    setSelectedCard,
    isFlagModalUser,
    setisFlagModalUser,

    /* mutations */
    roleChange,
    roleStatus,
    flagCitizen,
    flagStatus,

    /* handlers */
    handleSave,
    handleFlag,

    /* pagination */
    search,
    page,
    totalPages,
    isEmpty,
    isSinglePage,
    isFirstPage,
    isLastPage,
    goToPage,
    setSearchValue,
    searchValue
  };
}
