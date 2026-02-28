import { useMapEvents } from "react-leaflet";


// issueRoutes.js
export const ISSUE_STEP_ROUTE_MAP = {
  BASIC: "/issues/:id/basic",
  LOCATION: "/issue/:id/location",
  EVIDENCE: "/issue/:id/evidence",
  BEHAVIOR: "/issue/:id/behavioral-prompts",
  REVIEW: "/issue/:id/submit",
};


export const formatCoords = (value) =>
  Number(value.toFixed(5));

export function ClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      const lat = formatCoords(e.latlng.lat);
      const lng = formatCoords(e.latlng.lng);
      onSelect({ lat, lng,landmark:"N/A" }); // { lat, lng }
    },
  });
  return null;
}

export const normalizeCloudinaryEvidence = (res) => {
  return {
    cloudinary_public_id: res.public_id,
    cloudinary_url: res.secure_url,

    evidence_type: "IMAGE",

    file_format: res.format,
    file_size: res.bytes,

    width: res.width,
    height: res.height,
  };
};

export const STATUS_STYLES = {
  OPEN: "bg-slate-50 text-slate-700 border-slate-200",

  IN_REVIEW: "bg-blue-50 text-blue-700 border-blue-200",

  IN_PROGRESS: "bg-indigo-50 text-indigo-700 border-indigo-200",

  RESOLVED: "bg-green-50 text-green-700 border-green-200",

  CLOSED: "bg-blue-50 text-blue-700 border-blue-200",

  REJECTED: "bg-red-50 text-red-700 border-red-200",

  CANCELLED: "bg-red-50 text-red-700 border-red-200",

  REOPENED: "bg-amber-50 text-amber-700 border-amber-200",
};