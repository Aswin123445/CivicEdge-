import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useMyVotesListQuery } from "../../services/citizen/pollService";
import { useNavigate } from "react-router-dom";

export default function useMyPollList() {
  const navigate = useNavigate();
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const voted_at =
    urlSearchParams?.searchParams.get("voted_at") || "-voted_at";

  const {
    data,
    isLoading: myVotesLoading,
    isFetching: myVotesFetching,
  } = useMyVotesListQuery({
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
    voted_at: voted_at,
  });
  const myVotes = data?.results || [];
  const activeCount = data?.active_polls || 0 
  const closedCount = data?.closed_polls || 0
  const totalCount = data?.count || 0;
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  const handleViewPoll = (vote) => {
    navigate(`/polls/list/${vote.poll_id}`);
  };
  return {
    myVotes,
    myVotesLoading,
    myVotesFetching,
    pagination,
    activeCount,
    closedCount,
    totalCount,
    handleViewPoll,
    navigate
  };
}
