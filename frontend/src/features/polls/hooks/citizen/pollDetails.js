import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useNavigate } from "react-router-dom";
import {
  usePollDetailsQuery,
  useVotePollMutation,
} from "../../services/citizen/pollService";
import { useState } from "react";

export default function usePollDetails(id) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    data: poll,
    isLoading: pollDetailsLoading,
    isFetching: pollDetailsFetching,
  } = usePollDetailsQuery(id);
  const [markPoll, { isLoading: votePollLoading }] = useVotePollMutation();
  const handleVoteSubmit = async() => {
    try{
        await markPoll({ id, data:{option_id: selectedOption} }).unwrap();
        successToast({
            title: "Success",
            message: "Your vote has been submitted successfully",
        })
    }catch(e){
        const message = extractErrorMessage(e); 
        errorToast({ title: "Something went wrong", description: message });
    }
  };
  const navigateToList = () => {
    navigate("/polls/list");
  };
  return {
    poll,
    pollDetailsLoading,
    pollDetailsFetching,
    votePollLoading,
    handleVoteSubmit,
    selectedOption,
    setSelectedOption,
    navigateToList
  };
}
