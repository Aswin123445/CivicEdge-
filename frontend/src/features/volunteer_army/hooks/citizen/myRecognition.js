import { useUrlSearchPagination } from "../../../../utils/useUrlSearchPagination";
import { useFetchMyRecognitionQuery } from "../../services/citizen/common_service";

export default function useMyRecognition() {
  const urlSearchParams = useUrlSearchPagination({ pageSize: 6 });
  
  const {
    data,
    isLoading: myRecognitionLoading,
    isFetching: myRecognitionFetching,
  } = useFetchMyRecognitionQuery({page: urlSearchParams.page});
  const myRecognitionData = data?.results || []; 
  const total = data?.total || 0;
  const pageData = urlSearchParams?.getPaginationState({
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  });
  const pagination = {
    ...pageData,
    ...urlSearchParams,
  };
  return{
    myRecognitionData,
    myRecognitionLoading,
    myRecognitionFetching,
    pagination,
    total
  }
}
