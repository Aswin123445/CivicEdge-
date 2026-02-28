import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import useIssueHomePageService from "../../hooks/home_page_service";
import DottedLoaderIndicator from "../../../../components/common/DottedLoaderIndicator";

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function IssueFooterActions({ onContinue }) {
  const { issueStep1Fetching, issueStep1Loading } = useIssueHomePageService();
  return (
    <motion.footer
      variants={ITEM_VARIANTS}
      className="mt-12 flex justify-center md:justify-end gap-6"
    >
      {/* <button className="text-slate-400 hover:text-slate-600 font-bold text-sm">
        Save & Exit
      </button> */}

      <button
        disabled={issueStep1Fetching || issueStep1Loading}
        onClick={onContinue}
        className="px-12 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-500 transition-all flex items-center gap-2"
      >
        {issueStep1Fetching || issueStep1Loading ? <DottedLoaderIndicator/> : "continue"}
        <ChevronRight size={18} />
      </button>
    </motion.footer>
  );
}
