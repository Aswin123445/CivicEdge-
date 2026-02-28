import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import BehaviorHeader from "../components/Behaviour/BehaviorHeader";
import BehaviorProgress from "../components/Behaviour/BehaviorProgress";
import BehaviorGuidance from "../components/Behaviour/BehaviorGuidance";
import BehaviorFooter from "../components/Behaviour/BehaviorFooter";
import BehaviorQuestion from "../components/Behaviour/BehaviorQuestion";

import useBehavioralService from "../hooks/behaviouralService";
import { errorToast } from "../../../utils/Toaster";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import ReviewIssueCombinedSkeleton from "../ui/skeltons/ReviewIssueCombinedSkeleton";

/* ---------------- Animation ---------------- */

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

/* ---------------- Helpers ---------------- */

// Stable: always pick first 2 questions
// (easy to change later if product wants randomness)
const pickTwoQuestions = (questions) =>
  Array.isArray(questions) ? questions.slice(0, 2) : [];

/* ---------------- Page ---------------- */

const IssueCreateBehaviorStep = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {
    questions,
    isLoading,
    isFetching,
    getBehavioralResponse,
    isLoadingResponse
  } = useBehavioralService();

  // answers stored as: { [questionId]: selectedOption }
  const [answers, setAnswers] = useState({});

  // pick only 2 questions (memoized)
  const selectedQuestions = useMemo(
    () => pickTwoQuestions(questions),
    [questions]
  );

  // validation: all selected questions must be answered
  const canContinue =
    selectedQuestions.length === 2 &&
    selectedQuestions.every((q) => answers[q.id]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };
const handleSubmit = async() => {
  const normalizedPayload = {
    responses: Object.entries(answers).map(
      ([prompt_id, response_value]) => ({
        prompt_id,
        response_value,
      })
    ),
  };
  try {
    await getBehavioralResponse({req:normalizedPayload,id:id}).unwrap();
    await new Promise((r) => setTimeout(r, 300));
    navigate(`/issue/${id}/submit`)
  } catch (error) {
    const message = extractErrorMessage(error); 
    errorToast({title:"Error",description:`${message || 'An error occurred during evidence upload.'}`});
  }
  // later:
  // submitBehaviorResponses(normalizedPayload)
}; 

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <motion.main
        className="max-w-2xl mx-auto px-6 pt-12"
        initial="hidden"
        animate="visible"
        variants={CONTAINER_VARIANTS}
      >
        {/* Header */}
        <BehaviorHeader />

        {/* Progress */}
        <BehaviorProgress />

        {/* Questions */}
        {isLoading ||isLoadingResponse && <ReviewIssueCombinedSkeleton />}
        <div className="space-y-14">

          {!isLoading &&
            selectedQuestions.map((question) => (
              <BehaviorQuestion
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={(value) =>
                  handleAnswerChange(question.id, value)
                }
              />
            ))}
        </div>

        {/* Guidance */}
        <BehaviorGuidance />

        {/* Validation hint */}
        {!canContinue && !isLoading && (
          <p className="text-xs text-slate-400 text-center mt-4">
            Please answer both questions to continue.
          </p>
        )}

        {/* Footer */}
        <BehaviorFooter
          canContinue={canContinue}
          onBack={() => navigate(-1)}
          onNext={() => handleSubmit()}
        />
      </motion.main>
    </div>
  );
};

export default IssueCreateBehaviorStep;