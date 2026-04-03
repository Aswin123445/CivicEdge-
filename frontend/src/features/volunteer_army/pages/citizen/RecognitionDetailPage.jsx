import React from 'react';
import { 
  Download, 
  ExternalLink, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Share2,
  Search
} from 'lucide-react';

// ==========================================
// MOCK DATA (Matches Backend Data Contract)
// ==========================================
const MOCK_RECOGNITION_DETAIL = {
  "id": "rec-550e8400-e29b-41d4-a716-446655440000",
  "title": "Outstanding Civic Contribution",
  "message": "Awarded for your exceptional dedication and active participation in community improvement. Your efforts have set a benchmark for civic responsibility within the group.",
  "certificate_url": "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=2000&auto=format&fit=crop", // Placeholder Certificate
  "issued_at": "2026-03-19T10:00:00Z",
  "event_id": "evt-8899",
  "event_title": "Blood Donation & Health Camp",
  "event_start_time": "2026-03-15T09:00:00Z",
  "group_name": "Health Volunteers Network"
};

// ==========================================
// COMPONENT: SuccessBanner (Dopamine Trigger)
// Move to: components/citizen/volunteer/SuccessBanner.jsx
// ==========================================
const SuccessBanner = () => (
  <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
    <div className="bg-green-600 text-white p-2 rounded-lg shadow-lg shadow-green-200">
      <CheckCircle2 size={24} />
    </div>
    <div>
      <h3 className="text-lg font-black text-green-900 leading-tight">
        You made a real impact in your community
      </h3>
      <p className="text-green-700 text-sm font-medium mt-1">
        Your effort contributed to building a better civic environment through the CivicEdge framework.
      </p>
    </div>
  </div>
);

// ==========================================
// COMPONENT: CertificateShowcase (Core Artifact)
// Move to: components/citizen/volunteer/CertificateShowcase.jsx
// ==========================================
const CertificateShowcase = ({ url }) => (
  <div className="relative group max-w-4xl mx-auto py-8">
    {/* Soft Glow Background */}
    <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full scale-75 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
    
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white transform transition duration-700 hover:scale-[1.01] hover:shadow-blue-900/10">
      <img
        src={url}
        alt="Volunteer Recognition Certificate"
        className="w-full h-auto object-contain select-none"
        draggable={false}
      />
      
      {/* Premium Overlay Label */}
      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-100 shadow-xl flex items-center gap-2">
        <Sparkles size={16} className="text-amber-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Verified Artifact</span>
      </div>
    </div>
  </div>
);

// ==========================================
// COMPONENT: InfoSection (Clean Metadata)
// ==========================================
const InfoSection = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-slate-100">
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Event Title</p>
      <div className="flex items-center gap-2 text-slate-900 font-bold">
        <CheckCircle2 size={16} className="text-blue-600" />
        {data.event_title}
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Issued By</p>
      <div className="flex items-center gap-2 text-slate-900 font-bold">
        <Building2 size={16} className="text-blue-600" />
        {data.group_name}
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Recognition Date</p>
      <div className="flex items-center gap-2 text-slate-900 font-bold">
        <Calendar size={16} className="text-blue-600" />
        {new Date(data.issued_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </div>
    </div>
  </div>
);

// ==========================================
// PAGE: RecognitionDetailPage
// ==========================================
const RecognitionDetailPage = () => {
  const data = MOCK_RECOGNITION_DETAIL;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Nav Header */}
        <button className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Recognitions
        </button>

        {/* 1. Page Header */}
        <div className="mb-10 space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Recognition</h1>
          <p className="text-slate-500 font-medium">Your contribution has been officially recognized and verified.</p>
        </div>

        {/* 2. Success Banner */}
        <SuccessBanner />

        {/* 3. Certificate Showcase */}
        <CertificateShowcase url={data.certificate_url} />

        {/* 4. Action Section (Primary Actions) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pb-12">
          <a 
            href={data.certificate_url} 
            download 
            target="_blank" 
            rel="noreferrer"
            className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
          >
            <Download size={20} />
            Download Certificate
          </a>
          <button className="w-full sm:w-auto bg-slate-100 text-slate-800 px-10 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-slate-200 transition-all active:scale-95">
            <Share2 size={20} />
            Share Impact
          </button>
        </div>

        {/* 5. Info Section */}
        <InfoSection data={data} />

        {/* Message / Citation Section */}
        {data.message && (
          <div className="py-12 max-w-2xl mx-auto text-center space-y-4">
            <p className="text-slate-400 italic font-medium leading-relaxed">
              "{data.message}"
            </p>
            <div className="h-1 w-12 bg-blue-100 mx-auto rounded-full" />
          </div>
        )}

        {/* 6. Motivation Footer (Retention) */}
        <footer className="mt-12 pt-12 border-t border-slate-100 text-center space-y-8 animate-in fade-in duration-1000">
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-slate-900 tracking-tight">Continue making an impact</h4>
            <p className="text-slate-500 font-medium">Every small effort contributes to a stronger community.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto border border-slate-200 px-8 py-3.5 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <ExternalLink size={18} />
              View Event Details
            </button>
            <button className="w-full sm:w-auto bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95">
              <Search size={18} />
              Explore More Events
            </button>
          </div>

          <div className="pt-10 opacity-30">
             <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
               CivicEdge Verification Protocol • ID: {data.id.split('-')[0]}
             </p>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default RecognitionDetailPage;