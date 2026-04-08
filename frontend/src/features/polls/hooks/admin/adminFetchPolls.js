import { useState } from "react";
import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useAdminClosePollMutation, useAdminFetchPollsQuery } from "../../services/admin/pollService";
import { useNavigate } from "react-router-dom";
import { successToast } from "../../../../utils/Toaster";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";

export default function useAdminFetchPolls() {
  const [pollToClose, setPollToClose] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const status = urlSearchParams?.searchParams.get("status") || "";
  const navigate = useNavigate();

  const {
    data,
    isLoading: adminFetchPollsLoading,
    isFetching: adminFetchPollsFetching,
  } = useAdminFetchPollsQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    status,
  });
  const adminPolls = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const totalCount = data?.count || 0; 
  const activeCount = data?.active_count || 0 
  const closedCount = data?.closed_count || 0
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  const [closePoll,{isLoading:closePollLoading}] = useAdminClosePollMutation();
  const handleConfirmClose = async() => {
    if (!pollToClose?.id) return;
    try{
      await closePoll(pollToClose.id); 
      successToast({ title: "Action Successfull", description: "Poll closed successfully" });
    }catch(e){
      const message = extractErrorMessage(e); 
      errorToast({ title: "Something went wrong", description: message });
    }
    setIsModalOpen(false);
    setPollToClose(null);
  };
  const handleCreatePoll = () => {
    navigate("/admin/polls/create");
  };
  return {
    adminPolls,
    adminFetchPollsLoading,
    adminFetchPollsFetching,
    pagination,
    totalCount,
    activeCount,
    closedCount,
    navigate,
    handleCreatePoll,
    pollToClose,
    setPollToClose,
    setIsModalOpen,
    handleConfirmClose,
    setIsModalOpen,
    isModalOpen,
    closePollLoading
  };
}
