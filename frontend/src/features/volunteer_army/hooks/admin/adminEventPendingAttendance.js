import { useState } from "react";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useApprovePendingAttendanceMutation, useFetchAdminEventAttendanceQuery, useRejectPendingAttendanceMutation } from "../../services/admin/attendanceService";

export default function useAdminEventPendingAttendance() {
  const [processingId, setProcessingId]   = useState(null);
  const [rejectTarget, setRejectTarget]   = useState(null);

  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const [approveAttendance,{isLoading:approveAttendanceLoading}] = useApprovePendingAttendanceMutation();
  const [rejectAttendance,{isLoading:rejectAttendanceLoading}] = useRejectPendingAttendanceMutation();
  const {
    data,
    isLoading: eventAttendanceLoading,
    isFetching: eventAttendanceFetching,
  } = useFetchAdminEventAttendanceQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
  });
  const eventAttendance = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  const handleVerify = async (id) => {
    if (!id) return;
    setProcessingId(id);
    try {
      await approveAttendance(id).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Attendance verified successfully",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "Action Failed",
        description: message,
      })
    }
    setProcessingId(null);
  };
    const handleConfirmReject = async(id) => {
    if (!id) return;
    try {
      setProcessingId(id);
      await rejectAttendance(id).unwrap();
      successToast({
        title: "Action Successfull",
        description: "Attendance rejected successfully",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "Action Failed",
        description: message,
      })
    }
    finally {
      setRejectTarget(null);
      setProcessingId(null);
    }
  };

  return {
    eventAttendance,
    eventAttendanceLoading,
    eventAttendanceFetching,
    pagination,
    handleVerify,
    processingId,
    setProcessingId,
    approveAttendanceLoading,
    handleConfirmReject,
    rejectTarget,
    setRejectTarget,
    rejectAttendanceLoading
  };
}
