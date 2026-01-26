import {useListAdminsQuery} from '../../services/adminAuthApi'
import { useState } from 'react';
export const useAdmin = () => {
    const { data, isLoading,isSuccess,error } = useListAdminsQuery();
    const [search,setSearch] = useState('')
    const [selectedCard, setSelectedCard] = useState(null); //added for testing
    const [isFlagModalUser, setisFlagModalUser] = useState(null);
    return {
        data,isLoading,
        isSuccess,error,
        search,setSearch,
        selectedCard,setSelectedCard,
        isFlagModalUser,setisFlagModalUser
    }
}