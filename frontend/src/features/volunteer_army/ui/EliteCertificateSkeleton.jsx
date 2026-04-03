import React from "react";

/**
 * ELITE PROGRESS SKELETON
 * Optimized for: #0a0a0c (Deep Charcoal/Black)
 * Features: Shimmering glass effect, matching 12-column grid.
 */
const EliteCertificateSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 py-16 px-4 relative overflow-hidden">
      {/* Background Ambient Glows (Static during load to set the mood) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* TOP STATUS BAR SKELETON */}
        <div className="flex justify-center mb-12">
          <div className="h-8 w-64 bg-white/5 border border-white/10 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: CERTIFICATE VIEWER SKELETON (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-1 rounded-[2rem] bg-white/5 border border-white/10 shadow-2xl">
              {/* This represents the massive certificate area */}
              <div className="bg-slate-900/40 rounded-[1.8rem] h-[650px] md:h-[750px] relative overflow-hidden">
                {/* Shimmer Effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT SKELETON (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Header Skeletons */}
            <div className="space-y-4">
              <div className="h-4 w-32 bg-blue-500/10 rounded-md animate-pulse" />
              <div className="h-14 w-full bg-white/5 rounded-2xl animate-pulse" />
              <div className="h-14 w-3/4 bg-white/5 rounded-2xl animate-pulse" />
              <div className="h-6 w-1/2 bg-white/5 rounded-lg animate-pulse mt-4" />
            </div>

            {/* Stats Card Skeleton */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                  <div className="h-2 w-32 bg-white/5 rounded animate-pulse" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="h-2 w-12 bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-12 bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Actions Panel Skeleton */}
            <div className="flex flex-col gap-4">
              <div className="h-16 w-full bg-white/10 rounded-2xl animate-pulse" />
              <div className="h-16 w-full bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
            </div>

            {/* Footer Policy Skeleton */}
            <div className="space-y-2 mt-12 flex flex-col items-center">
              <div className="h-2 w-48 bg-white/5 rounded animate-pulse" />
              <div className="h-2 w-32 bg-white/5 rounded animate-pulse" />
            </div>

          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default EliteCertificateSkeleton;