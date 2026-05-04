import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  adminNotificationApi,
  useGetNotificationCountQuery,
} from "../services/notificationService";

export default function useNotificationCountRealtime({ access_token: token }) {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  const { data, isLoading, isFetching, refetch } = useGetNotificationCountQuery(
    undefined,
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const connect = () => {
      const WS_BASE =
        window.location.hostname === "localhost"
          ? "ws://localhost:8000"
          : `${
              window.location.protocol === "https:" ? "wss" : "ws"
            }://${window.location.host}`;

      //  attach token as query param
      const url = `${WS_BASE}/ws/notifications/?token=${encodeURIComponent(
        token,
      )}`;
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = () => {
        if (!isLoading && !isFetching) {
          refetch();
        }
      };

      socket.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        console.log(msg);

        if (msg.event === "notification.unread_count") {
          dispatch(
            adminNotificationApi.util.updateQueryData(
              "getNotificationCount",
              undefined,
              (draft) => {
                draft.unread_count = msg.data.count;
              },
            ),
          );
        }

        if (msg.event === "notification.refresh_count") {
          refetch();
        }
      };

      socket.onclose = (event) => {
        console.log("socket closed", event);

        retryCountRef.current += 1;

        if (retryCountRef.current >= MAX_RETRIES) {
          console.warn("Max retries reached. Stopping reconnect.");
          return;
        }

        reconnectTimeoutRef.current = setTimeout(connect, 2000);
      };

      socket.onerror = (err) => {
        socket.close();
      };
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [dispatch, refetch, token]);

  return {
    notificationCount: data?.unread_count ?? 0,
    isLoading,
    isFetching,
    refetch,
  };
}
