import {
  useCancelEventMutation,
  useFetchAdminEventListQuery,
  usePublishEventMutation,
} from "../../services/admin/eventService";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useNavigate } from "react-router-dom";
export default function useVolunteerEventList() {
  const navigate = useNavigate();
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const status = urlSearchParams?.searchParams.get("status") || "";
  const {
    data,
    isLoading: eventListLoading,
    isFetching: eventListFetching,
  } = useFetchAdminEventListQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    status: status,
  });
  const matrix = {
    cancelled_events_count: data?.cancelled_events_count || 0,
    completed_events_count: data?.completed_events_count || 0,
    draft_events_count: data?.draft_events_count || 0,
    ongoing_events_count: data?.ongoing_events_count || 0,
    upcoming_events_count: data?.upcoming_events_count || 0,
    total_length: data?.count,
  };
  const eventData = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  const handleCreateEvent = () => {
    navigate("/dashboard/volunteer/events/create");
  };

  const [publishEvent, { isLoading: publishEventLoading }] =
    usePublishEventMutation();

  const handlePublish = async(event) => {
    try{
      await publishEvent(event?.id).unwrap();
      successToast({ title: "Action Successfull", description: "Event published successfully" });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Action Failed", description: message });
    }
  };
  const [cancelEvent,{isLoading:cancelEventLoading}] = useCancelEventMutation();
  const handleCancel = async(event) => {
    try{
      await cancelEvent(event?.id).unwrap();
      successToast({ title: "Action Successfull", description: "Event cancelled successfully" });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Action Failed", description: message });
    }
  };
  const handleEdit = (event) => {
    navigate(`/dashboard/volunteer/events/${event?.id}/update`);
  };
  return {
    eventData,
    eventListLoading,
    eventListFetching,
    pagination,
    matrix,
    handleCreateEvent,
    navigate,
    publishEventLoading,
    handlePublish,
    cancelEventLoading,
    handleCancel,
    handleEdit
  };
}
