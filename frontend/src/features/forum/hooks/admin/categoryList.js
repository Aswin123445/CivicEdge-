import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useAdminListCategoryQuery } from "../../services/admin/forumServices";

export default function useCategoryList() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  const search = urlSearchParams?.searchParams.get("search") || "";
  const {
    data,
    isLoading: isLoadingCategory,
    isFetching: isFetchingCategory,
  } = useAdminListCategoryQuery(search);
  const categories = data?.results || [];
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  return {
    categories,
    isLoadingCategory,
    isFetchingCategory,
    pagination,
  };
}
