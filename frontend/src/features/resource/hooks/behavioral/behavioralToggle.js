import { useToggleBehavioralStatusMutation } from "../../services/behavioral_service/behavioralService";

export default function useToggleBehavioral() {
    const [toggleBehavioral,{isLoading:toggleBehavioralLoading}] = useToggleBehavioralStatusMutation();
    return {
        toggleBehavioral,
        toggleBehavioralLoading
    }
}