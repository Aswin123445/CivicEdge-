
import {useFetchSolverTaskDetailQuery} from "../../services/solver/issue_execution_service_solver"
import {useParams} from "react-router-dom"
export default function useSolverTaskDetail(id) {
    const {data:task,isLoading:taskLoading,isFetching:taskFetching} = useFetchSolverTaskDetailQuery(id);
    return {
        task,
        taskLoading,
        taskFetching
    }
    
}