import { useParams } from "react-router-dom";
import { useUrlSearchPagination } from "../../../utils/useUrlSearchPagination";
import { useComplaintDetailQuery, useListComplaintsQuery } from "../services/issue_services";
import { useState } from "react";

export default function useComplaintService() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const {
    search,
    page,
    searchValue,
    setSearchValue,
    goToPage,
    getPaginationState,
    setSearchParams,
    searchParams,
  } = useUrlSearchPagination({ pageSize: 6 });
  
  const status = searchParams.get("status") || "";

  const {
    data: complaints,
    isLoading: complaintsLoading,
    isFetching: complaintsFetching,
    isSuccess: complaintsSuccess,
  } = useListComplaintsQuery({ page, search, status });

  const {data:complaint,isLoading:complaintLoading,isFetching:complaintFetching} = useComplaintDetailQuery(id)
  const pagination = getPaginationState({
    count: complaints?.count ?? 0,
    next: complaints?.next,
    previous: complaints?.previous,
  });
  return {
    complaints,
    complaintsLoading,
    complaintsFetching,
    complaintsSuccess,
    page,
    goToPage,
    searchValue,
    setSearchValue,
    ...pagination,
    setActiveTab,
    activeTab,
    setSearchParams,
    searchParams,
  };
}
