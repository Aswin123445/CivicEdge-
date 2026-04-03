import { useState } from "react";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useAdminApproveMembershipMutation, useAdminMembershipPendingDetailsQuery, useAdminRejectMembershipMutation } from "../../services/admin/membershipService";

export default function useAdminPendingMembershipDetails(id) {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const {
    data: membershipDetails,
    isLoading: membershipDetailsLoading,
    isFetching: membershipDetailsFetching,
  } = useAdminMembershipPendingDetailsQuery(id);
  const [approveMembership, { isLoading: approveMembershipLoading }] =
    useAdminApproveMembershipMutation();

  const [rejectMembership, { isLoading: rejectMembershipLoading }] =
    useAdminRejectMembershipMutation();
  const handleApprove = async () => {
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
      setShowRejectModal(false);
    }
  };

  return {
    membershipDetails,
    membershipDetailsLoading,
    membershipDetailsFetching,
    handleApprove,
    approveMembershipLoading,
    rejectMembershipLoading,
    handleConfirmReject,
    showRejectModal,
    setShowRejectModal
  };
}
