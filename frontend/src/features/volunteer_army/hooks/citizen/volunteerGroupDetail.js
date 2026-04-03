import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, infoToast, successToast } from "../../../../utils/Toaster";
import {
  useApplyGroupJoinMutation,
  useFetchGroupDetailQuery,
} from "../../services/citizen/group_service";
import { useNavigate } from "react-router-dom";
export default function useVolunteerGroupDetail(id) {
  const navigate = useNavigate();
  const {
    data: groupDetail,
    isLoading: groupDetailLoading,
    isFetching: groupDetailFetching,
  } = useFetchGroupDetailQuery(id);

  const [joinGroup, { isLoading: joinGroupLoading }] =
    useApplyGroupJoinMutation();
  const handleJoinGroup = async () => {
    try {
      await joinGroup(id).unwrap();
      if (!groupDetailFetching && !groupDetailLoading) {
        if (groupDetail?.membership_type !== "OPEN") {
          infoToast({
            title: "Almost there",
            description: "Upload required documents to join this group",
          });
        }
      }
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({
        title: "Join Group Failed",
        description: `${message || "An error occurred pleas try again."}`,
      });
    }
  };
  const handleMembershipAction = (action) => {
    switch (action) {
      case "join":
        handleJoinGroup();
        break;
      case "continue":
        navigate(`/volunteer-army/membership/${groupDetail?.membership_id}/`);
        break;
      case "view":
        navigate(`/volunteer-army/membership/${groupDetail.membership_id}`);
        break;
      case "leave":
        navigate(`/volunteer/memberships/${groupDetail.membership_id}/leave`);
        break;
      case "reapply":
        navigate(`/volunteer/groups/${id}/apply`);
        break;
      default:
        break;
    }
  };
  return {
    groupDetail,
    groupDetailLoading,
    groupDetailFetching,
    handleMembershipAction,
    joinGroupLoading,
  };
}
