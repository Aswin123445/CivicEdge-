// ReviewLocation.jsx
import { MapPin } from "lucide-react";
import ReviewCard from "./ReviewCard";
import LocationSkeleton from "../../ui/skeltons/LocationSkelton";

export default function ReviewLocation({ location ,isLoadingReview}) {
  return (
    <ReviewCard title="Location" icon={<MapPin size={18} />}>
      <p className="font-semibold">{location?.zone}</p>
      <p className="text-xs text-slate-500">
        Lat: {location?.lat}, Lng: {location?.lng}
      </p>
    </ReviewCard>
  );
}