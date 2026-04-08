import { useAdminPollDistributionQuery, useAdminPollsTimeLineQuery } from "../../services/admin/pollService";

export default function useAdminPollAnalysis(id) {
    const {data: adminPollDistribution, isLoading: adminPollDistributionLoading, isFetching: adminPollDistributionFetching} = useAdminPollDistributionQuery(id);
    const {data: adminPollsTimeLine, isLoading: adminPollsTimeLineLoading, isFetching: adminPollsTimeLineFetching} = useAdminPollsTimeLineQuery(id); 
    const isDistributionLoading = adminPollDistributionLoading || adminPollDistributionFetching; 
    const istimeLineLoading = adminPollsTimeLineFetching || adminPollsTimeLineLoading;
    return {
        adminPollDistribution,
        adminPollsTimeLine,
        isDistributionLoading,
        istimeLineLoading
    }
}