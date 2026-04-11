import { useGetNotificationCountQuery } from "../services/notificationService";

export default function useNotificationCount({ enabled = true } = {}) {
  const {
    data: notificationCount,
    isLoading: notificationCountLoading,
    isFetching: notificationCountFetching,
    refetch:countRefetch,
  } = useGetNotificationCountQuery(undefined, {
    pollingInterval: enabled ? 30000 : 0, 
    refetchOnFocus: true,  
    refetchOnReconnect: true, 
  });

  return {
    notificationCount,
    notificationCountLoading,
    notificationCountFetching,
    countRefetch,
  };
}