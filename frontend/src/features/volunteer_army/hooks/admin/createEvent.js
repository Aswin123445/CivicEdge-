import { useState } from "react";
import {
  useCreateEventMutation,
  useFetchGroupEventListQuery,
} from "../../services/admin/eventService";
import validate from "../../utils/eventDateValidate";
import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useNavigate } from "react-router-dom";

const today = new Date().toISOString().split("T")[0];

const INITIAL_FORM = {
  group: null,
  title: "",
  description: "",
  location_name: "",
  location_address: "",
  start_date: today,
  start_time: "09:00 AM",
  end_date: today,
  end_time: "11:00 AM",
  capacity: 10,
  sponsor_name: "",
  sponsor_website: "",
  sponsor_logo_url: "",
  sponsor_message: "",
};

export default function useCreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [showSponsor, setShowSponsor] = useState(false);
  const { data, isLoading: groupisLoading } = useFetchGroupEventListQuery();
  const groupData = data || [];

  const [createEvent, { isLoading: createEventLoading }] =
    useCreateEventMutation();
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };
  const combineDateTime = (date, time) => {
    const parsed = new Date(`${date} ${time}`);
    return parsed.toISOString();
  };
  // ─── Submit ───────────────────────────────────────
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const startTime = combineDateTime(
        formData.start_date,
        formData.start_time,
      );
      const endTime = combineDateTime(formData.end_date, formData.end_time);
      const updatedFormData = {
        ...formData,
        start_time: startTime,
        end_time: endTime,
        group: formData?.group?.id,
      };

      const newErrors = validate(updatedFormData);

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      await createEvent(updatedFormData).unwrap();
      successToast({
        title: "Event created successfully",
        description: "Event has been created mark to active to take it live",
      });
      setFormData(INITIAL_FORM);
      navigate("/admin/volunteer/events");
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Event creation failed", description: message });
    } finally {
      setSubmitting(false);
    }
  };
  return {
    groupData,
    groupisLoading,
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setSubmitting,
    showSponsor,
    setShowSponsor,
    createEventLoading,
    handleChange,
    handleSubmit,
    combineDateTime,
    navigate
  };
}
