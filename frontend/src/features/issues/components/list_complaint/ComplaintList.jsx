import { motion } from "framer-motion";
import ComplaintCard from "./ComplaintCard";
import EmptyState from "./EmptyState";
import { containerVariants } from "../../ui/motion";
import ComplaintListSkeleton from "../../ui/skeltons/ComplaintListSkeleton";




const ComplaintList = ({ complaints, isLoading }) => {
  if (isLoading) {
    return <ComplaintListSkeleton count={4} />;
  }

  if (!complaints?.length) {
    return <EmptyState />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial={false}      animate="visible"
      className="
        grid grid-cols-1
        lg:grid-cols-2
        gap-6
      "
    >
      {complaints.map((item) => (
        <ComplaintCard key={item.id} item={item} />
      ))}
    </motion.div>
  );
};

export default ComplaintList;