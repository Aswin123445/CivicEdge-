import { motion } from "framer-motion";
import { FileText, Clock, MapPin } from "lucide-react";
import ActionCard from "./ActionCard";
import { containerVariants } from "../../ui/motion";
import useIssueHomePageService from "../../hooks/home_page_service";

export default function ActionStrip() {
  const {
    issueSummary,
    issueLoading,
    issueFetching,
    issueSuccess,
    issueError,
  } = useIssueHomePageService();
  return (
    <section className="-mt-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <ActionCard
            icon={<FileText />}
            title="Draft Issues"
            desc="Continue incomplete reports"
            badge={
              issueSummary?.draft_issues > 0
                ? issueSummary?.draft_issues
                : undefined
            }
            path="/drafts"
          />
          <ActionCard
            icon={<MapPin />}
            title="Nearby Complaints"
            desc="View nearby issues"
            badge={
              issueSummary?.submitted_issues > 0
                ? issueSummary.submitted_issues
                : undefined
            }
            path="/nearby"
          />
          <ActionCard
            icon={<MapPin />}
            title="Nearby Complaints"
            desc="View nearby issues"
            path="/nearby"
          />
        </motion.div>
      </div>
    </section>
  );
}
