import { usePostDetailsQuery } from "../../services/citizen/forumServices";

export default function usePostDetails(id) {
  const {
    data: post,
    isLoading: postLoading,
    isFetching: postFetching,
  } = usePostDetailsQuery(id);
  return {
    post,
    postLoading,
    postFetching,
  };
}
