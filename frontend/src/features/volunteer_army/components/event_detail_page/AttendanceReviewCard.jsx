import { Clock ,ShieldCheck,Info,Camera} from "lucide-react";
const AttendanceReviewCard = ({ selfie_url, timestamp = "Just now" }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
      {/* 1. Header: The Status Banner */}
      <div className="bg-amber-50/50 border-b border-amber-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <Clock className="text-amber-500" size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900 leading-none">Verification Pending</h4>
            <p className="text-[11px] text-amber-700 font-medium mt-1">Submitted {timestamp}</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest rounded-full">
          In Review
        </span>
      </div>

      {/* 2. Body: Content & Evidence Split */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Content Section */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Please sait while we verify your attendance
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Thank you for taking the initiative. Our civic transparency protocol ensures every 
                volunteer's impact is accurately recorded and verified.
              </p>
            </div>

            {/* Feature Points - Adds "Elite" Feel */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Info size={16} className="text-blue-500" />
                Estimated review time: 24 hours
              </div>
            </div>
          </div>

          {/* Right: The Evidence Preview (Elite Image Card) */}
          <div className="md:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-100 to-blue-50 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
                <div className="relative rounded-xl overflow-hidden aspect-square sm:aspect-video md:aspect-square">
                  {selfie_url ? (
                    <img 
                      src={selfie_url} 
                      alt="Verification Evidence" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-400">
                      <ImageIcon size={32} />
                      <p className="text-[10px] font-bold mt-2 uppercase">No image provided</p>
                    </div>
                  )}
                  
                  {/* Overlay Labels */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <div className="flex items-center gap-2 text-white">
                      <Camera size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Evidence #01</span>
                    </div>
                  </div>
                </div>
                
                {/* Selfie Caption */}
                <div className="mt-3 px-2 pb-1 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">SUBMISSION PROOF</span>
                  <div className="flex items-center gap-1 text-green-600 font-bold text-[10px]">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    UPLOADED
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Footer: Brand Note */}
      <div className="bg-slate-50/50 border-t border-slate-100 px-6 py-3">
        <p className="text-[10px] text-slate-400 font-medium text-center italic">
          🌱 CivicEdge Protocol: Building trust through verified community action.
        </p>
      </div>
    </div>
  );
};

export default AttendanceReviewCard;