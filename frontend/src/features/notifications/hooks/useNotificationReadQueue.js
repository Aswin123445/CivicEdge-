import { useRef, useEffect } from "react";
import { useBatchMarkNotificationAsReadMutation } from "../services/notificationService";

export default function useNotificationReadQueue() {
  const queueRef = useRef(new Set());
  const timerRef = useRef(null);
  const isFlushing = useRef(false);

  const [markReadBulk] = useBatchMarkNotificationAsReadMutation();

  const flushQueue = async () => {
    if (isFlushing.current) return;

    const ids = Array.from(queueRef.current);
    if (ids.length === 0) return;

    isFlushing.current = true;

    try {
      await markReadBulk({ ids });

      // remove only sent IDs
      ids.forEach((id) => queueRef.current.delete(id));

    } catch (err) {
      console.error("❌ Failed batch", err);
    }

    isFlushing.current = false;
  };

  const addToQueue = (id) => {
    queueRef.current.add(id);

    // max batch protection
    if (queueRef.current.size >= 100) {
      flushQueue();
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      flushQueue();
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    addToQueue,
    flushQueue,
  };
}