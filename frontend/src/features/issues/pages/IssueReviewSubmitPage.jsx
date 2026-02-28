// IssueReviewSubmitPage.jsx
import { motion } from "framer-motion";
import ReviewHeader from "../components/review/ReviewHeader";
import ReviewProgress from "../components/review/ReviewProgress";
import ReviewIssueDetails from "../components/review/ReviewIssueDetails";
import ReviewLocation from "../components/review/ReviewLocation";
import ReviewEvidence from "../components/review/ReviewEvidence";
import ReviewBehaviorSummary from "../components/review/ReviewBehaviorSummary";
import ReviewFooter from "../components/review/ReviewFooter";
import useBehavioralService from "../hooks/behaviouralService";
import ReviewIssueCombinedSkeleton from "../ui/skeltons/ReviewIssueCombinedSkeleton";


const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function IssueReviewSubmitPage() {
  const {reviewData:issueDraft,isLoadingReview,issueSubmit,submitLoading,handleSubmit ,isSubmitting} = useBehavioralService();
  if (isLoadingReview) return (<div className="mx-80"><ReviewIssueCombinedSkeleton/></div>)
  return (
    <motion.main
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-6 pt-12"
    >
      <ReviewHeader />
      <ReviewProgress />

      <div className="space-y-6">
        <ReviewIssueDetails issue={issueDraft?.issue } isLoadingReview={isLoadingReview} />
        <ReviewLocation location={issueDraft?.location} isLoadingReview={isLoadingReview}/>
        <ReviewEvidence images={issueDraft?.evidences} isLoadingReview={isLoadingReview}/> 
        <ReviewBehaviorSummary responses={issueDraft?.behavioral_responses } isLoading={isLoadingReview} />
      </div>
      


      <ReviewFooter
        onSubmit={() => handleSubmit()}
        isSubmitting={isSubmitting}
      />
    </motion.main>
  );
}