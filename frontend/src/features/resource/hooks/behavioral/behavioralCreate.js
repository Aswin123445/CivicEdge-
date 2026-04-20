import { useCreateBheavioralMutation } from "../../services/behavioral_service/behavioralService";

export default function useBehavioralCreate() {
    const [createBehavioral, { isLoading: createBehavioralLoading }] =
        useCreateBheavioralMutation();
    return {
        createBehavioral,
        createBehavioralLoading,
    };
}