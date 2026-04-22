import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  useGetNotificationListQuery,
  useMarkAllNotificationAsReadMutation,
} from "../services/notificationService";

export default function useNotificationList(containerRef) {
  const [page, setPage] = useState(1);
  // A bump counter forces new query params even when page stays at 1
  const [resetKey, setResetKey] = useState(0);
  const [allNotifications, setAllNotifications] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  // Flag: next page=1 response should REPLACE, not append
  const isResetting = useRef(false);

  const queryParams = useMemo(() => ({ page, resetKey }), [page, resetKey]);

  const { data, isLoading, isFetching } =
    useGetNotificationListQuery(queryParams);

  const [markAllRead] = useMarkAllNotificationAsReadMutation();

  useEffect(() => {
    if (!data?.results) return;

    setAllNotifications((prev) => {
      if (page === 1) {
        if (isResetting.current) {
          // We have fresh data from the reset — replace the list
          isResetting.current = false;
          return data.results;
        }
        // Normal first-load: only set if we actually got something
        return data.results.length > 0 ? data.results : prev;
      }
      // Pagination: append de-duplicated items
      const existingIds = new Set(prev.map((n) => n.id));
      const newItems = data.results.filter((item) => !existingIds.has(item.id));
      return [...prev, ...newItems];
    });

    setHasMore(!!data.next);
  }, [data?.results, page]);

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      if (!node || !hasMore || isFetching) return;

      const root = containerRef?.current ?? null; // fallback to viewport if null

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isFetching && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        { root, threshold: 0.1 },
      );

      observer.current.observe(node);
    },
    [isFetching, hasMore, containerRef],
  );

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  const markAsReadLocal = (id) => {
    setAllNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_unread: false } : n)),
    );
  };

  const resetNotifications = useCallback(() => {
    // Don't wipe the list eagerly — just signal that the next
    // page=1 response should replace whatever is there.
    isResetting.current = true;
    setPage(1);
    setHasMore(true);
    // Bump resetKey so RTK Query treats this as new params
    // and actually fires a network request even if page was already 1.
    setResetKey((k) => k + 1);
  }, []);
  const markAllAsRead = async () => {
    if (!allNotifications.some((n) => n.is_unread)) return;

    const prevState = allNotifications;

    setAllNotifications((prev) =>
      prev.map((n) => ({ ...n, is_unread: false })),
    );

    try {
      await markAllRead().unwrap();
    } catch (error) {
      setAllNotifications(prevState);
    }
  };
  return {
    notificationList: allNotifications,
    notificationListLoading: isLoading,
    notificationListFetching: isFetching,
    lastItemRef,
    hasMore,
    markAsReadLocal,
    resetNotifications,
    markAllAsRead,
  };
}
