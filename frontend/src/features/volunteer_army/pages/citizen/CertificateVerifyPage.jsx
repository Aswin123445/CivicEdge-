import React from "react";
import { useParams } from "react-router-dom";
import { 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  Calendar, 
  Fingerprint, 
  Award,
  AlertOctagon,
  Loader2,
  Lock
} from "lucide-react";
import useCertificateVerify from "../../hooks/citizen/certificateFerify";
import EliteCertificateSkeleton from "../../ui/EliteCertificateSkeleton";

export default function EliteCertificatePortal() {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useCertificateVerify(id);

  const loading = isLoading || isFetching;

  // -------------------------
  // ELITE SKELETON STATE
  // -------------------------
  if (loading) return <EliteCertificateSkeleton />;

  // -------------------------
  // INVALID / REVOKED STATE
  // -------------------------
  if (!data?.valid) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full" />
        
        <div className="relative z-10 w-full max-w-md bg-white/[0.02] border border-red-500/20 backdrop-blur-xl rounded-[2.5rem] p-12 text-center shadow-2xl">
          <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
            <AlertOctagon className="text-red-500" size={40} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">Verification Failed</h2>
          <p className="text-slate-500 text-sm mt-4 leading-relaxed">
            The security signature for this certificate is either invalid, expired, or has been revoked by the CivicEdge authority.
          </p>
          <button className="mt-8 text-xs font-bold text-red-400 uppercase tracking-widest border-b border-red-400/30 pb-1 hover:border-red-400 transition-all">
            Report Tampering
          </button>
        </div>
      </div>
    );
  }

  // -------------------------
  // ELITE VERIFIED STATE
  // -------------------------
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 py-16 px-4 relative overflow-hidden">
      {/* Premium Background Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* TOP STATUS BAR */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">
              CivicEdge Authenticated System
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: CERTIFICATE VIEWER (7 cols) */}
          <div className="lg:col-span-7 group">
            <div className="relative p-1 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent shadow-2xl">
               <div className="bg-[#0f0f12] rounded-[1.8rem] overflow-hidden border border-white/5 relative">
                  {/* Watermark/Security Overlay */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <Lock size={12} className="text-slate-400" />
                    <span className="text-[10px] font-mono text-slate-400">SECURE_ID: {data.id?.substring(0,8)}</span>
                  </div>

                  <iframe
                    src={data.certificate_url}
                    title="Official Certificate"
                    className="w-full h-[650px] md:h-[550px] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                  />
               </div>
            </div>
          </div>

          {/* RIGHT: RECOGNITION & METADATA (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Recognition Header */}
            <div>
              <div className="flex items-center gap-2 text-blue-400 mb-4">
                <Award size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Citizen Recognition</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-white mb-2 leading-tight">
                {data.participant_name}
              </h1>
              <p className="text-xl text-slate-400 font-medium">
                {data.event_title}
              </p>
            </div>

            {/* Verification Stats Card */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/20">
                  <ShieldCheck className="text-green-400" size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Status: Verified</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Legally Binding Certificate</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Fingerprint size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Reference</span>
                  </div>
                  <p className="text-sm font-mono text-slate-300 truncate">{data.reference_id}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Issued On</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-300">{data.issued_date}</p>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex flex-col gap-4">
              <a
                href={data.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                   Open Official Portal <ExternalLink size={14} />
                </span>
              </a>

              <a
                href={data.certificate_url}
                download
                className="flex items-center justify-center gap-3 py-5 border border-white/10 bg-white/[0.02] text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-white/5 transition-all"
              >
                <Download size={14} /> Archive Offline Copy
              </a>
            </div>

            {/* Footer Policy */}
            <p className="text-[10px] text-slate-600 text-center uppercase tracking-widest leading-loose mt-12">
              This document is a part of the CivicEdge Digital Infrastructure. <br />
              Tampering with this record is a punishable offense.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}