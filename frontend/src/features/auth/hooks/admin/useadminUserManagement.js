import {
  useFlagCitizenMutation,
  useGetCitizensQuery,
  useRoleChangeMutation,
} from "../../services/adminAuthApi";
import { useSearchParams } from "react-router-dom";
import { useState ,useEffect} from "react";
import { useDebounce } from "../../../../utils/debounce";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";


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

  setSearchParams((prev) => {
    prev.set("page", String(targetPage));
    if (search) prev.set("search", search);
    return prev;
  });
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
      successToast({
        title: "Success",
        description: "User role has been updated successfully.",
      })
      setSelectedCard(null);
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Error", description: message });
    }
  };

  const handleFlag = async (updatedUser) => {
    try {
      await flagCitizen({
        id: updatedUser.id,
        is_active: updatedUser.is_active,
      }).unwrap();
      successToast({
        title: "Success",
        description: updatedUser.is_active
          ? "User has been activated successfully."
          : "User has been deactivated successfully.",
      })
      setSelectedCard(null);
    } catch (error) {
      const message = extractErrorMessage(error);  
      errorToast({ title: "Error", description: message });
    }
  };



useEffect(() => {
  setSearchParams((prev) => {
    const currentSearch = prev.get("search") || "";

    if (currentSearch === debouncedSearch) return prev;

    if (debouncedSearch.trim()) {
      prev.set("search", debouncedSearch);
    } else {
      prev.delete("search");
    }

    prev.set("page", "1");
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
