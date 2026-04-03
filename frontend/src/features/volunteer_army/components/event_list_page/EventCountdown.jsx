// components/volunteer/EventCountdown.jsx
import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

/**
 * Shows:
 * - "X days remaining" if >= 3 days
 * - "Xd Xh Xm" if between 1–3 days
 * - "HH:MM:SS" if < 24 hours
 */
const EventCountdown = ({ startTime }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!startTime) return;

    let timer;

    const calculate = () => {
      const eventTime = new Date(startTime).getTime();
      const now = Date.now();
      const diff = eventTime - now;

      if (diff <= 0) {
        clearInterval(timer); 
        return "Starting now";
      }

      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(diff / (1000 * 60));
      const totalHours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (days >= 3) {
        return `${days} days remaining`;
      }

      if (days >= 1) {
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        return `${days}d ${hours}h ${minutes}m`;
      }

      const hours = totalHours;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      return [hours, minutes, seconds]
        .map((v) => String(v).padStart(2, "0"))
        .join(":");
    };

    setTimeLeft(calculate());

    timer = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);
  if (!startTime) return null;

  return (
    <div className="inline-flex items-center gap-1.5 text-green-600 font-mono text-xs font-bold bg-green-50 px-2 py-1 rounded-md border border-green-100">
      <Timer size={14} />
      <span>{timeLeft}</span>
    </div>
  );
};

export default EventCountdown;
