import { useAddLocationMutation } from "../services/issue_services";


export default function useLocationService() {
    const [addLocation,{isLoading:evidence,isFetching:locationFetching,isSuccess:locationSuccess,isError:locationError}] = useAddLocationMutation();
    return {
        addLocation,
        evidence,
        locationFetching,
        locationSuccess,
        locationError
    };
}