import { 
    useIssueCategoryQuery, 
    useIssueSummaryQuery,
    useIssueStep1Mutation
} from "../services/issue_services";


export default function useIssueHomePageService() {
    const {
        data:issueSummary,isLoading:issueLoading,
        isFetching:issueFetching,isSuccess:issueSuccess,
        isError:issueError
    }=useIssueSummaryQuery();
    const {data:categoryData,isLoading:categoryLoading,
        isFetching:categoryFetching,isSuccess:categorySuccess,
        isError:categoryError
    }=useIssueCategoryQuery();
    const [issueStep1,{isLoading:issueStep1Loading,
        isFetching:issueStep1Fetching,isSuccess:issueStep1Success,
        isError:issueStep1Error}
    ]=useIssueStep1Mutation();

    return {
        issueSummary,
        issueLoading,
        issueFetching,
        issueSuccess,
        issueError,
        categoryData,
        categoryLoading,
        categoryFetching,
        categorySuccess,
        categoryError,
        issueStep1,
        issueStep1Loading,
        issueStep1Fetching,
        issueStep1Success,
        issueStep1Error
    };
}