import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../../utils/Toaster";
import { useSolverGroundStep1Mutation } from "../../services/solver/issue_execution_service_solver"
import { useNavigate, useParams } from "react-router-dom";
export default function useGroundHook(id,task_id) {
    const navigate = useNavigate()
    const [solverGroundStep1,{isLoading,isFetching,isSuccess,isError}] = useSolverGroundStep1Mutation();

    const onSubmit = async (data) => {
        try {
            await solverGroundStep1({data,id}).unwrap();
            successToast({title:"Action Successfull",description:"Issue ground successfully."});
            navigate(`/solver/tasks/${id}/verification/impact`,{state:{task_id:task_id}});
        } catch (error) {
            const message = extractErrorMessage(error);
            errorToast({title:"something wrong",description:`${message || 'An error occurred pleas try again.'}`});
        }
    }
    return {
        solverGroundStep1,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        onSubmit
    }
}