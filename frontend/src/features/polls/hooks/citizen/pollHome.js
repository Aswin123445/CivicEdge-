import { useFetchPollHomeQuery } from "../../services/citizen/pollService";
import { useNavigate } from "react-router-dom";
export default function usePollHome() {
  const navigate = useNavigate();
  const {
    data: pollHome,
    isLoading: isPollHomeLoading,
    isFetching: isPollHomeFetching,
  } = useFetchPollHomeQuery();
  console.log(pollHome)
  const handleSeeAll = () => {
    navigate("/polls/list");
  };
  const handleMyVotes = () => {
    navigate("/polls/my-votes");
  };
  return {
    pollHome,
    isPollHomeLoading,
    isPollHomeFetching,
    navigate,
    handleSeeAll,
    handleMyVotes,
  };
}
