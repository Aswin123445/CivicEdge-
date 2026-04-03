import { useNavigate } from "react-router-dom";
import useCitizenService from "../../../core/hooks/citizen/useCitizenService";
import { useFetchVolunteerSummaryQuery } from "../../services/citizen/common_service";
export default function useVolunteerSummary() {
  const navigate = useNavigate();
  const { userData, userDataLoading, userDataFetching } = useCitizenService();
  const {
    data: volunteerSummary,
    isLoading: volunteerSummaryLoading,
    isFetching: volunteerSummaryFetching,
    isError: volunteerSummaryError,
  } = useFetchVolunteerSummaryQuery();
  const onActionClick = (key) => {
    if (key === "memberships") {
      navigate("/volunteer-army/my-memberships");
    } else if (key === "find") {
      navigate("/volunteer-army/groups");
    } else if (key === "recognitions") {
      navigate("/volunteer-army/recognitions");
    } else if (key === "recognitions") {
      navigate("/volunteer-army/my-recognitions");
    }
  };
  return {
    volunteerSummary,
    volunteerSummaryLoading,
    volunteerSummaryFetching,
    volunteerSummaryError,
    userData,
    userDataLoading,
    userDataFetching,
    onActionClick,
    navigate
  };
}
