import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useListCommentQuery } from "../../services/citizen/forumServices";

export default function useCommentListHook(id) {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 15 });
  const {
    data,
    isLoading: commentsLoading,
    isFetching: commentsFetching,
  } = useListCommentQuery({id, page: urlSearchParams?.page});
  const comments = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  const total_comments = data?.count || 0;
  return {
    comments,
    commentsLoading,
    commentsFetching,
    pagination,
    total_comments
  };
}
