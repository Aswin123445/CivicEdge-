import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useNavigate } from "react-router-dom";
import {
  useAdminEventDetailsQuery,
  useAdminUpdateEventMutation,
} from "../../services/admin/eventService";

export default function useUpdateEvent(id) {
    const navigate= useNavigate();
  const [updateEvent, { isLoading: updateEventLoading }] =
    useAdminUpdateEventMutation();
  const { data: eventData, isLoading: eventDetailsLoading } =
    useAdminEventDetailsQuery(id);
    
  const updateEventAction = async(data)=>{
    try{
      await updateEvent(data).unwrap();
      navigate('/dashboard/volunteer/events')
      successToast({
        title: "Action Successfull",
        description: "Event updated successfully",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "Action Failed",
        description: message,
      });
    }

  }
  return { updateEvent, updateEventLoading, eventData, eventDetailsLoading,updateEventAction };
}
