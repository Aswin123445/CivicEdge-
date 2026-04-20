import { useCreateZoneMutation } from "../../services/zone_service/zoneService";

export default function useCreateZone(){
    const [createZone,{isLoading:createZoneLoading}] = useCreateZoneMutation();
    return {
        createZone,
        createZoneLoading
    }
}