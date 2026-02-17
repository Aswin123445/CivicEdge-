import { extractErrorMessage } from "../../../../utils/extractErrorMessage";
import { errorToast } from "../../../../utils/Toaster";
import { useSolverWorkToggleMutation } from "../../services/coreApi";


export default function useSolverService() {
    const [solverWorkToggle,{data:solverWorkToggleData,isLoading:toggleWorkLoading}] = useSolverWorkToggleMutation();
    const toggleWork = async () => {
            try {
        await solverWorkToggle({}).unwrap();
    } catch (error) {
        const message = extractErrorMessage(error);
        errorToast({title:"something wrong",description:`${message || 'An error occurred pleas try again.'}`});
    }
    }

    return {solverWorkToggleData,toggleWork,toggleWorkLoading};
}