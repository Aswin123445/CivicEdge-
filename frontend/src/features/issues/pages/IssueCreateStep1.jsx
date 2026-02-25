import { motion } from 'framer-motion';

// Components
import IssueProgress from '../components/issue_step1/IssueProgress';
import IssueTitleInput from '../components/issue_step1/IssueTitleInput';
import IssueCategorySelect from '../components/issue_step1/IssueCategorySelect';
import IssueDescriptionInput from '../components/issue_step1/IssueDescriptionInput';
import IssueReassurance from '../components/issue_step1/IssueReassurance';
import IssueFooterActions from '../components/issue_step1/IssueFooterActions';
import useIssueStep1 from '../hooks/issueStep1';

// Animation
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const IssueCreateStep1 = () => {
  const {
    handleContinue,
    formData,
    setFormData,
    errors
  } = useIssueStep1();





  // 🔹 Validation + Navigation


  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans antialiased text-slate-900">
      <motion.main
        className="max-w-2xl mx-auto px-6 pt-12"
        initial="hidden"
        animate="visible"
        variants={CONTAINER_VARIANTS}
      >

        {/* 🟦 Progress */}
        <IssueProgress activeStep={0} />

        {/* 🟦 Form Sections */}
        <div className="space-y-10">
          <IssueTitleInput
            value={formData.title}
            error={errors.title}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, title: value }))
            }
          />

          <IssueCategorySelect
            value={formData.category}
            error={errors.category}
            onSelect={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          />

          <IssueDescriptionInput
            value={formData.description}
            error={errors.description}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
          />
        </div>

        {/* 🟦 Reassurance */}
        <IssueReassurance />

        {/* 🟦 Footer Actions */}
        <IssueFooterActions onContinue={handleContinue} />
      </motion.main>
    </div>
  );
};

export default IssueCreateStep1;