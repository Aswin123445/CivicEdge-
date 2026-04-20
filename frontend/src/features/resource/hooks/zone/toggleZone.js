import { useZoneToggleMutation } from "../../services/zone_service/zoneService";

export default function useToggleZone() {
    const [toggleZone,{isLoading:toggleZoneLoading}] = useZoneToggleMutation();
    return {
        toggleZone,
        toggleZoneLoading
    }
}