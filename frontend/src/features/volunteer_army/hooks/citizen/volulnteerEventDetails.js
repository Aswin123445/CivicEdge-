import { uploadToCloudinary } from "../../../../utils/cloudinary";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, infoToast, successToast } from "../../../../utils/Toaster";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useFetchEventDetailsQuery,
  useJoinEventMutation,
  useLeaveEventMutation,
  useUploadEventEvidenceMutation,
} from "../../services/citizen/event_service";
export default function useVolunteerEventDetails(id) {
  const navigate = useNavigate();
  const [isCloudinaryUplaoding, setIsCloudinaryUplaoding] = useState(false);
  const {
    data: volunteerEvent,
    isLoading: volunteerEventLoading,
    isFetching: volunteerEventFetching,
  } = useFetchEventDetailsQuery(id);

  const [joinEvent, { isLoading: joinEventLoading }] = useJoinEventMutation();
  const[leaveEvent,{isLoading:leaveEventLoading}]=useLeaveEventMutation();
  const [submitAttendance, { isLoading: submitAttendanceLoading }] = useUploadEventEvidenceMutation();

  const handleJoin = async() => {
    try {
      await joinEvent(id).unwrap();
      successToast({title:"Join Event Success",description:"You have joined the event."})
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({title:"something wrong",description:`${message || 'An error occurred pleas try again.'}`})
    }
  };

  const handleLeave = async() => {
    try {
      await leaveEvent(volunteerEvent?.participation_id).unwrap();
      successToast({title:"Leave Event Success",description:"You have left the event."})
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({title:"something wrong",description:`${message || 'An error occurred pleas try again.'}`})
    }
  };

  const handleSubmitAttendance = async(file) => {
    try {
      setIsCloudinaryUplaoding(true);
      const uploaded = await uploadToCloudinary(file);
      await submitAttendance({data:{attendance_evidence_url:uploaded?.secure_url},id:volunteerEvent?.participation_id}).unwrap();
      successToast({title:"Submit Attendance Success",description:"You have submitted your attendance."})
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({title:"something wrong",description:`${message || 'An error occurred pleas try again.'}`})
    }
    finally {
      setIsCloudinaryUplaoding(false);
    }
  }
  const handleAllRecognitions = () => {
    navigate("/volunteer-army/recognitions");
  };
  const handleViewRecognition = () => {
    if (volunteerEvent?.recognition_id) {
      navigate(`/volunteer-army/certificate/${volunteerEvent.recognition_id}/verify`);
    }else {
      infoToast({title:"No Recognitions",description:"This event has no recognition."})
    }
  };
  const handleMyEvents = () => {
    navigate("/volunteer-army/my-events");
  }
  return {
    volunteerEvent,
    volunteerEventLoading,
    volunteerEventFetching,
    handleJoin,
    joinEventLoading,
    handleLeave,
    leaveEventLoading,
    handleSubmitAttendance,
    submitAttendanceLoading,
    isCloudinaryUplaoding,
    handleAllRecognitions,
    navigate,
    handleViewRecognition,
    handleMyEvents
  };
}
