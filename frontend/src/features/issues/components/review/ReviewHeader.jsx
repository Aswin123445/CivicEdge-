// ReviewHeader.jsx
import { motion } from "framer-motion";

export default function ReviewHeader() {
  return (
    <motion.header className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight">
        Review & Submit
      </h1>
      <p className="text-slate-500 mt-3 text-lg">
        Please review all details carefully before submitting.
      </p>
    </motion.header>
  );
}