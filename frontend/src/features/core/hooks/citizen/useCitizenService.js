import { useHomeQuery } from "../../services/coreApi";

export default function useCitizenService() {
    const {data:userData,isLoading:userDataLoading,isFetching:userDataFetching} = useHomeQuery();    
    return {
        userData,
        userDataLoading,
        userDataFetching
    }

}