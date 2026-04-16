import { useListCategoryQuery } from "../../services/citizen/forumServices";

export default function uselistCategory() {
  const {
    data,
    isLoading: isLoadingCategory,
    isFetching: isFetchingCategory,
  } = useListCategoryQuery();
  return {
    categories: data?.results || [],
    isLoadingCategory,
    isFetchingCategory,
  };
}
