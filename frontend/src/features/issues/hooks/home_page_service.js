import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useIssueCategoryQuery,
  useIssueSummaryQuery,
  useIssueStep1Mutation,
} from "../services/issue_services";
import { infoToast } from "../../../utils/Toaster";

export default function useIssueHomePageService() {
  const navigate = useNavigate();
  const { access_token } = useSelector((s) => s.auth);
  const {
    data: issueSummary,
    isLoading: issueLoading,
    isFetching: issueFetching,
    isSuccess: issueSuccess,
    isError: issueError,
  } = useIssueSummaryQuery(undefined, { skip: !access_token });
  const {
    data: categoryData,
    isLoading: categoryLoading,
    isFetching: categoryFetching,
    isSuccess: categorySuccess,
    isError: categoryError,
  } = useIssueCategoryQuery();
  const [
    issueStep1,
    {
      isLoading: issueStep1Loading,
      isFetching: issueStep1Fetching,
      isSuccess: issueStep1Success,
      isError: issueStep1Error,
    },
  ] = useIssueStep1Mutation();
  const handleNavigate = (path) => {
    if (!access_token) {
      infoToast({
        title: "Please login",
        description: "Login required to continue.",
      });
      navigate("/landing");
      return;
    }

    navigate(path);
  };
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
    issueStep1Error,
    handleNavigate,
  };
}
