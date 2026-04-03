import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Share2, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck,
  Camera,
  ExternalLink,
  Calendar
} from 'lucide-react';

// ==========================================
// COMPONENT: EliteVerticalSelfie
// Handles 9:16 vertical images in a web-friendly container
// ==========================================
const EliteVerticalSelfie = ({ selfieUrl }) => {
  return (
    <div className="relative group w-full overflow-hidden rounded-2xl bg-slate-900 aspect-[4/5] sm:aspect-video md:aspect-square shadow-2xl border border-slate-200">
      
      {/* 1. Glassmorphic Blurred Background (Fills horizontal gaps) */}
      <img 
        src={selfieUrl} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-50 scale-125 transition-transform duration-1000 group-hover:scale-110"
      />

      {/* 2. The Vertical Selfie (Preserves 9:16 ratio) */}
      <div className="relative h-full w-full flex items-center justify-center p-4 z-10">
        <img
          src={selfieUrl}
          alt="Verified Attendance"
          className="h-full w-auto object-contain rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/30 transition-all duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* 3. Elite Status Overlays */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-black/40 backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">
            Verified Capture
          </span>
        </div>
      </div>

      {/* 4. Bottom Context Gradient */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 z-20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-white/50 mb-1 uppercase tracking-widest">Digital Evidence</p>
            <p className="text-xs font-bold text-white flex items-center gap-1">
              <Camera size={12} /> Live Verification 
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg text-white">
            <ExternalLink size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT: VerifiedImpactCard (ELITE VERSION)
// ==========================================
const VerifiedImpactCard = ({
  selfieUrl,
  recognitionId,
  onViewRecognition,
  onAllRecognitions,
  handleMyEvents
}) => {
  return (
    <div className="relative overflow-hidden bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl shadow-green-900/5 max-w-2xl mx-auto">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>

      {/* 1. The Dopamine Header */}
      <div className="relative p-10 text-center space-y-4">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-[2rem] flex items-center justify-center shadow-2xl transform -rotate-6 hover:rotate-0 transition-all duration-700 ease-out">
            <CheckCircle2 size={48} strokeWidth={2.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-xl border border-slate-50">
            <Sparkles className="text-amber-500" size={20} />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">
            Impact Confirmed.
          </h3>
          <p className="text-green-600 font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <TrendingUp size={16} /> Community Leader Status
          </p>
        </div>
      </div>

      {/* 2. The Vertical-Sync Evidence Section */}
      <div className="px-10">
        <EliteVerticalSelfie selfieUrl={selfieUrl} />
      </div>

      {/* 4. The Action Hub */}
      <div className="p-10 space-y-6">
        <div className="flex flex-col gap-4">
          <button
            onClick={onViewRecognition}
            className="w-full bg-slate-900 text-white py-5 rounded-[1.25rem] font-bold text-lg flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl shadow-slate-300 group active:scale-95"
          >
            <Award size={24} className="text-amber-400 group-hover:scale-110 transition-transform" />
            View Recognition
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onAllRecognitions}
              className="bg-white text-slate-600 border border-slate-200 py-4 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              My Recognitions
            </button>
            <button
              onClick = {handleMyEvents}
              className="bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              <Calendar size={20} /> My Events
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 py-4 opacity-40">
           <ShieldCheck size={14} />
           <span className="text-[10px] font-bold uppercase tracking-[0.3em]">CivicEdge Protocol Verified</span>
        </div>
      </div>
    </div>
  );
};

export default VerifiedImpactCard;