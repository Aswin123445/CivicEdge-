import { useAddEvidenceMutation } from "../services/issue_services";


export default function useEvidenceService() {
    const [addEvidence,{isLoading:evidenceIsLoading,isFetching:evidenceFetching,isSuccess:evidenceSuccess,isError:evidenceError}] = useAddEvidenceMutation();
    return {
        addEvidence,
        evidenceIsLoading,
        evidenceFetching,
        evidenceSuccess,
        evidenceError
    };
}