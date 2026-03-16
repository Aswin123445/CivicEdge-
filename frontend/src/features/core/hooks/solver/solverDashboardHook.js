import { useGetSolverDashboardQuery } from "../../services/coreApi";

export default function useSolverDashboardService() {
  const {
    data: solverDashboard,
    isLoading: solverDashboardLoading,
    isFetching: solverDashboardFetching,
  } = useGetSolverDashboardQuery();
  return {
    solverDashboard,
    solverDashboardLoading,
    solverDashboardFetching,
  };
}
