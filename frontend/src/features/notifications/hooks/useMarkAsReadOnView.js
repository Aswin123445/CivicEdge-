import { useEffect, useRef } from "react";

export function useMarkAsReadOnView({
  id,
  isUnread,
  addToQueue,
  markAsReadLocal,
  containerRef,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isUnread) return;
    if (!containerRef?.current) return;

    let hasTriggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTriggered) {
          hasTriggered = true;

          markAsReadLocal(id);
          addToQueue(id);

          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        root: containerRef.current,
        threshold: 0.6,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [id, isUnread, addToQueue, markAsReadLocal, containerRef]);

  return ref;
}