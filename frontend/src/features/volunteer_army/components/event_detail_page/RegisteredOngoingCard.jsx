import React, { useState } from 'react';
import { Camera, Trash2, Info, ShieldCheck, Loader2, Sparkles, MessageSquare } from 'lucide-react';

const RegisteredOngoingCard = ({ onSubmit, submitAttendanceLoading, isCloudinaryUploading }) => {
  const [tempImage, setTempImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    const img_file = e.target.files?.[0];
    if (!img_file) return;
    setFile(img_file);
    setTempImage(URL.createObjectURL(img_file));
  };

  const isProcessing = submitAttendanceLoading || isCloudinaryUploading;

  return (
    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 space-y-8 shadow-xl shadow-blue-900/5 relative overflow-hidden">
      
      {/* 1. Header & Protocol Badge */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
          <Sparkles className="text-blue-600" size={14} />
          <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Verification Protocol Active</span>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Verify Your Attendance
          </h3>
          <p className="text-slate-500 text-sm font-medium">
            Complete the steps below to finalize your contribution.
          </p>
        </div>
      </div>

      {/* 2. Admin Instructions Section (Elite Standard) */}
      <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-200 pb-3 mb-3">
          <MessageSquare size={16} className="text-blue-600" />
          On-Site Instructions
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-lg shadow-blue-200">1</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Listen carefully to the <span className="text-slate-900 font-bold">Event Coordinator's</span> briefing for any specific proof requirements.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 shadow-lg shadow-blue-200">2</div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Capture a clear <span className="text-slate-900 font-bold">Selfie Evidence</span> at the venue as requested by the admin to mark your presence.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The Vertical-Sync Evidence Uploader */}
      <div className="max-w-xs mx-auto w-full">
        {!tempImage ? (
          <label className="group relative border-2 border-dashed border-slate-200 rounded-[2rem] aspect-[4/5] flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/50 hover:border-blue-400 transition-all overflow-hidden bg-slate-50/30">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white p-5 rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform text-slate-300 group-hover:text-blue-600">
                <Camera size={36} />
              </div>
              <span className="text-sm font-black text-slate-400 group-hover:text-slate-700 uppercase tracking-widest">
                Capture Proof
              </span>
              <p className="text-[10px] text-slate-400 mt-2 font-bold italic tracking-tight">High-resolution selfie required</p>
            </div>
            
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
              disabled={isProcessing}
            />
          </label>
        ) : (
          <div className="relative group rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-slate-900">
             {/* Glassmorphic Blur for Vertical Photos */}
            <img src={tempImage} className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-125" alt="" />
            
            <img
              src={tempImage}
              alt="Evidence preview"
              className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
            
            {!isProcessing && (
              <button
                onClick={() => {
                  setTempImage(null);
                  setFile(null);
                }}
                className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md text-red-500 p-2.5 rounded-xl shadow-xl hover:bg-red-50 transition-all active:scale-90"
              >
                <Trash2 size={20} />
              </button>
            )}

            <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
               <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                 <ShieldCheck size={12} className="text-green-400" /> Pending Review
               </span>
            </div>
          </div>
        )}
      </div>

      {/* 4. Submission & Disclaimer */}
      <div className="space-y-4">
        <button
          disabled={!tempImage || !file || isProcessing}
          onClick={() => onSubmit?.(file)}
          className={`group w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl relative overflow-hidden flex items-center justify-center gap-3
            ${tempImage && !isProcessing
              ? "bg-green-600 text-white shadow-slate-200 hover:bg-green-500 active:scale-[0.98]"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span className="tracking-tight uppercase">Processing Proof...</span>
            </>
          ) : (
            <>
              <span className="tracking-tight">Submit Evidence</span>
              <ShieldCheck className={`transition-transform group-hover:scale-110 ${tempImage ? 'text-green-400' : 'text-slate-300'}`} />
            </>
          )}
        </button>

        <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl">
          <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
            By submitting, you confirm you are at the physical location. The <span className="text-slate-900 font-bold">CivicEdge Verification Engine</span> will cross-reference this proof with on-site admin reports for approval.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisteredOngoingCard;