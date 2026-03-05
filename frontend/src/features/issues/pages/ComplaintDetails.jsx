import React from "react";

import ComplaintHeader from "../components/complait_details/ComplaintHeader";
import CurrentStatusCard from "../components/complait_details/CurrentStatusCard";
import AdministrativeDecisionCard from "../components/complait_details/AdministrativeDecisionCard";
import ResolutionEvidenceCard from "../components/complait_details/ResolutionEvidenceCard";
import ComplaintTimeline from "../components/complait_details/ComplaintTimeline";
import OriginalComplaintCard from "../components/complait_details/OriginalComplaintCard";
import ComplaintDetailsProgressSkeleton from "../ui/skeltons/ComplaintDetailsProgressSkeleton";
import useComplaintDetailsService from "../hooks/complaintDetailsService";

export default function ComplaintDetails() {
  const {
    complaint,
    complaintsLoading,
    complaintFetching,
  } = useComplaintDetailsService();
  console.log("Complaint Details Data:", complaint);
  return (
    <>
      {complaintsLoading || complaintFetching ? (
        <ComplaintDetailsProgressSkeleton/>
      ) : (
        <div className="min-h-screen bg-[#F8FAFF] pb-20 font-sans">
          <ComplaintHeader  issue={complaint} />

          <main className="max-w-3xl mx-auto px-6 mt-8 space-y-6">
            <CurrentStatusCard complaint={complaint} />

            {complaint?.administrative_decision && (
              <AdministrativeDecisionCard decision={complaint.administrative_decision} issue_status={complaint?.issue?.status} />
            )}
            <ComplaintTimeline timeline={complaint?.timeline} />


            {complaint?.resolution?.after_media && <ResolutionEvidenceCard complaint={complaint} />}

            <OriginalComplaintCard complaint={complaint} />
          </main>
        </div>
      )}
    </>
  );
}
