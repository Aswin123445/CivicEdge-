import { useFetchSolverTaskDetailQuery } from "../../../services/solver/issue_execution_service_solver";

export default function useAdminTaskDetailsHook(id) {
  const {
    data: task,
    isLoading,
    isFetching,
  } = useFetchSolverTaskDetailQuery(id);
  return {
    task,
    isLoading,
    isFetching,
  };
}
