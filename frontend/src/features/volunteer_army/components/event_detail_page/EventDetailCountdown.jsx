// components/volunteer/EventDetailCountdown.jsx
import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

/**
 * @param {string} targetTime - ISO date string
 * @param {string} label      - e.g. "Event starts in" | "Live Now • Ends in"
 */
const EventDetailCountdown = ({ targetTime, label }) => {
  const [timeLeft, setTimeLeft] = useState("--:--:--");

  useEffect(() => {
  if (!targetTime) return;

  let timer;

  const calculate = () => {
    const eventTime = new Date(targetTime).getTime();
    const now = Date.now();
    const diff = eventTime - now;

    if (diff <= 0) {
      clearInterval(timer); 
      return "Starting now";
    }

    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalHours   = Math.floor(diff / (1000 * 60 * 60));
    const days         = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days >= 3) {
      return `${days} days remaining`;
    }

    if (days >= 1) {
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      return `${days}d ${hours}h ${minutes}m`;
    }

    const hours   = totalHours;
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
}, [targetTime]);

  if (!targetTime) return null;

  return (
    <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg shadow-blue-100 flex items-center justify-between overflow-hidden relative">
      <div className="relative z-10">
        <p className="text-blue-100 text-sm font-medium mb-1 uppercase tracking-wider">
          {label}
        </p>
        <div className="text-4xl font-mono font-black">{timeLeft}</div>
      </div>
      <Timer
        size={80}
        className="absolute -right-4 -bottom-4 text-blue-500 opacity-20 rotate-12"
      />
    </div>
  );
};

export default EventDetailCountdown;
