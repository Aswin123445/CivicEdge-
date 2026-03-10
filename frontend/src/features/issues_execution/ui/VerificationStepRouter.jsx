import { useParams } from "react-router-dom";
import GroundVerificationPage from "../pages/GroundVerificationPage";
import ImpactAssessmentPage from "../pages/ImpactAssessmentPage";
import WorkEstimationPage from "../pages/WorkEstimationPage";
import EvidenceUploadPage from "../pages/EvidenceUploadPage";
import ReviewSubmitPage from "../pages/ReviewSubmitPage";

const VerificationStepRouter = () => {
  const { step } = useParams();

  switch (step) {
    case "ground":
      return <GroundVerificationPage />;

    case "impact":
      return <ImpactAssessmentPage />;

    case "estimation":
      return <WorkEstimationPage />;

    case "evidence":
      return <EvidenceUploadPage />;

    case "review":
      return <ReviewSubmitPage />;

    default:
      return <div>Invalid verification step</div>;
  }
};

export default VerificationStepRouter;