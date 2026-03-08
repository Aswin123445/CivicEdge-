import { extractErrorMessage } from "../../../../../utils/extractErrorMessage";
import { errorToast } from "../../../../../utils/Toaster";
import { useUrlSearchPagination } from "../../../../../utils/useUrlSearchPagination";
import { useFetchZonesQuery, useListSolversQuery } from "../../../../auth/services/adminAuthApi";
import { useAssignSolverVerificationMutation } from "../../../services/admin/issue_execution_service";
import useAdminIssueDetailsService from "../pending_issue_details/serviceHooks";
import { useNavigate } from "react-router-dom";
export default function useAdminIssueAssignService() {
  const naviate = useNavigate()
  const {
    search,
    page,
    searchValue,
    setSearchValue,
    goToPage,
    getPaginationState,
    setSearchParams,
    searchParams,
  } = useUrlSearchPagination({ pageSize: 6 });

  const location = searchParams.get("location") || "";
  const { issueDetails, issueDetailsLoading } = useAdminIssueDetailsService(); 

  const [assignSolver,{isLoading:assignSolverLoading}] = useAssignSolverVerificationMutation();
  const {
    data,
    isLoading: solverListLoading,
    isFetching: solverListFetching,
  } = useListSolversQuery({ page, search, location });
  const solverList = data?.results || [];

  const pageData = getPaginationState({
    count: data?.count ?? 0,
    next: data?.next,
    previous: data?.previous,
  });

  const {data:zones,isLoading:zonesLoading,isFetching:zonesFetching} = useFetchZonesQuery()
  const pagination = {
    ...pageData,
    page,
    search,
    searchValue,
    setSearchValue,
    setSearchParams,
    searchParams,
    goToPage,
  };

  const handleAssignSolver = async(issue_id, solver_id) => {
    try {
      await assignSolver({data:{solver_id:solver_id}, id:issue_id}).unwrap();
      naviate("/admin/execution/solver-assignment");
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({title:"something wrong",description:`${message || 'An error occurred pleas try again.'}`});
    }
  }

  return {
    issueDetails,
    issueDetailsLoading,
    pagination,
    solverListFetching,
    solverListLoading,
    solverList,
    zones,
    zonesLoading,
    zonesFetching,
    handleAssignSolver,
  };
}
