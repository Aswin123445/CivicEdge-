import { useEffect, useState } from "react";

export default function CurrentDateTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let intervalId;

    // ms until next minute boundary
    const delay = 60000 - (Date.now() % 60000);

    const timeoutId = setTimeout(() => {
      setNow(new Date());

      intervalId = setInterval(() => {
        setNow(new Date());
      }, 60000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []); // ✅ empty dependency array is correct

  return (
    <p className="text-slate-500 font-medium">
      {now.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      })}
      <span className="mx-1">·</span>
      {now.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}
    </p>
  );
}
