import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useAdminIssueListCategoryQuery } from "../../services/category_service/categoryService";

export default function useListCategory() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });

  const {
    data,
    isLoading: categoryLoading,
    isFetching: categoryFetching,
  } = useAdminIssueListCategoryQuery({
    page: urlSearchParams.page,
    search: urlSearchParams.search,
  });
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count ?? 0,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  const categories = data?.results || [];
  return { categories, categoryLoading, categoryFetching, pagination };
}
