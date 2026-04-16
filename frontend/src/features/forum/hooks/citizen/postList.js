import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useListPostsQuery } from "../../services/citizen/forumServices";

export default function usePostList() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const category = urlSearchParams?.searchParams.get("category") || "";
  const ordering = urlSearchParams?.searchParams.get("ordering") || "-created_at";

  const {
    data,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
  } = useListPostsQuery({
    page: urlSearchParams?.page,
    category: category,ordering: ordering,});

  const posts = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  return { posts, isLoadingPosts, isFetchingPosts, pagination };
}
