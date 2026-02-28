import { motion } from "framer-motion";
import { MapPin, ArrowRight, Info, Calendar } from "lucide-react";
import { fadeInUp } from "../../ui/motion";
import { STATUS_STYLES } from "../../utils";
import { formatDate } from "../../../../utils/datenormalize";
import { useNavigate } from "react-router-dom";

const ComplaintCard = ({ item }) => {
  const isReviewing = item?.status?.code === "IN_REVIEW";
  const updatedDate = formatDate(item?.updated_at);
  const navigate = useNavigate();
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col md:flex-row gap-0 overflow-hidden bg-white rounded-[24px] border border-slate-200 shadow-sm transition-all duration-300"
    >
      {/* 🟦 Left Accent: Use your Primary Blue as the default rail */}
      <div className="w-1.5 shrink-0 bg-blue-600 opacity-80" />

      <div className="flex-1 p-6 flex flex-col md:flex-row justify-between items-stretch gap-6">
        
        {/* 1. Content Section */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            {/* Status Pill - Primary Blue Theme */}
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-700 border border-blue-100 ${STATUS_STYLES[item?.status?.code]}`}>
              {item?.status?.label}
            </span>
            
            <span className="text-[11px] font-mono text-slate-400 tracking-tight">
              #{item?.reference_id}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
              {item?.category?.label}
            </h3>
            <div className="flex items-center text-slate-500 text-sm font-medium">
              <MapPin className="w-4 h-4 mr-1.5 text-blue-500/60" />
              {item?.location || "Civic Boundary"}
            </div>
          </div>

          {/* 💡 Reassurance Message: Separate Background Shade */}
          {isReviewing && item?.public_message && (
            <div className="bg-slate-50 border-l-2 border-blue-400 p-4 rounded-r-xl rounded-bl-xl">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-tighter">Official Update</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                {item.public_message}
              </p>
            </div>
          )}
        </div>

        {/* 2. Action & Time Section (Separated by subtle border) */}
        <div className="flex md:flex-col items-center md:items-end justify-between md:pl-8 md:border-l border-slate-100">
          <div  className="hidden md:block">
             <div onClick={() => {navigate(`/complaints/${item?.id}`)}} className="w-12 h-12 cursor-pointer rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:text-white" />
             </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 bg-slate-50 md:bg-transparent px-3 py-1 md:p-0 rounded-full">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">
              {updatedDate}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ComplaintCard;