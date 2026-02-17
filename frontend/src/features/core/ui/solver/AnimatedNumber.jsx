import React from "react";
export default function AnimatedNumber({ value }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 400;
    const step = Math.max(1, Math.floor(duration / value));

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return display;
}