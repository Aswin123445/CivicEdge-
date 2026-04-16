import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { usePostsListQuery } from "../../services/admin/forumServices";

export default function useAdminPostsList() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const ordering =
    urlSearchParams?.searchParams.get("ordering") || "-created_at";
  const status = urlSearchParams?.searchParams.get("status") || "";
  const {
    data,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
  } = usePostsListQuery({
    page: urlSearchParams?.page,
    ordering: ordering,
    status: status,
    search: urlSearchParams?.search,
  });
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
  return { posts, isLoadingPosts, isFetchingPosts,pagination };
}
