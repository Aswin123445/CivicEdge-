import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import {
  useAdminApproveMembershipMutation,
  useAdminRejectMembershipMutation,
  useFetchAdminPendingMembershipQuery,
} from "../../services/admin/membershipService";
import { useState } from "react";
export default function useAdminPendingMemberships() {
  const [activeRequest, setActiveRequest] = useState(null);

  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const ordering =
    urlSearchParams?.searchParams.get("ordering") || "-created_at";
  const {
    data,
    isLoading: pendingMembershipsLoading,
    isFetching: pendingMembershipsFetching,
  } = useFetchAdminPendingMembershipQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    ordering: ordering,
  });
  const pendingMemberships = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  const [approveMembership, { isLoading: approveMembershipLoading }] =
    useAdminApproveMembershipMutation();
  const [rejectMembership, { isLoading: rejectMembershipLoading }] =
    useAdminRejectMembershipMutation();
  const handleApprove = async (id) => {
    if (!id) return;
    try {
      await approveMembership(id).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Membership approved successfully",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Action Failed", description: message });
    }
  };
  const handleConfirmReject = async (reason) => {
    const id = activeRequest?.id;
    if (!id) return;
    try {
      await rejectMembership({ data: {reason}, id }).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Membership rejected successfully",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Action Failed", description: message });
    } finally {
      setActiveRequest(null);
    }
  };
  return {
    pendingMemberships,
    pendingMembershipsLoading,
    pendingMembershipsFetching,
    pagination,
    approveMembershipLoading,
    handleApprove,
    handleConfirmReject,
    rejectMembershipLoading,
    activeRequest,
    setActiveRequest,
  };
}
