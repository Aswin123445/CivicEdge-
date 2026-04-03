import {
  useAdminEventDetailsQuery,
  useCancelEventMutation,
  usePublishEventMutation,
} from "../../services/admin/eventService";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
export default function useAdminEventDetails(id) {
  const [publishEvent, { isLoading: isPublishing }] = usePublishEventMutation();
  const [cancelEvent, { isLoading: isCancelling }] = useCancelEventMutation();
  const { data: eventData, isLoading: eventDetailsLoading } =
    useAdminEventDetailsQuery(id);
  const handleConfirm = async (type) => {
    try {
      if (type === "publish") {
        await publishEvent(id).unwrap();
        successToast({
          title: "Action Successfull",
          description: "Event published successfully",
        });
      } else {
        await cancelEvent(id).unwrap();
        successToast({
          title: "Action Successfull",
          description: "Event cancelled successfully",
        });
      }
    } catch (error) {
      const message = extractErrorMessage(error);

      errorToast({
        title: "Action Failed",
        description: message,
      });
    }
  };
  return {
    eventData,
    eventDetailsLoading,
    handleConfirm,
  };
}
