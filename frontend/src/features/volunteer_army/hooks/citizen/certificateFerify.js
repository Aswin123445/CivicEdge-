import { useGetEventCertifiateVerifyQuery } from "../../services/citizen/event_service";

export default function useCertificateVerify(id) {
  const { data, isLoading, isFetching } = useGetEventCertifiateVerifyQuery(id);
  return {
    data,
    isLoading,
    isFetching,
  };
}
