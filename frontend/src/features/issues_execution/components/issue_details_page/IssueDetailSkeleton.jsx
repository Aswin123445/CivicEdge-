import Skeleton from "../../../../components/common/Skelton";

/**
 * IssueDetailSkeleton
 * Mimics the CivicEdge Issue Detail page layout using the established 
 * design language: bg-[#1f1f1f] and border-[#1f2937].
 */
export default function IssueDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#1f1f1f] p-4 md:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Skeleton */}
        <header className="mb-8 space-y-3">
          <Skeleton className="h-3 w-24" /> {/* Back button placeholder */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-7 w-64" /> {/* Issue ID Title */}
            <Skeleton className="h-5 w-20 rounded-full" /> {/* Status Badge */}
          </div>
          <Skeleton className="h-3 w-48" /> {/* Category & Date subline */}
        </header>

        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Main Content */}
          <main className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Issue Details Card Skeleton */}
            <div className="bg-[#1f1f1f] border border-[#1f2937] rounded-xl p-6 shadow-sm space-y-6">
              <Skeleton className="h-4 w-32 mb-2" /> {/* Section Title */}
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-2 w-12" /> {/* Label: TITLE */}
                  <Skeleton className="h-4 w-3/4" /> {/* Value */}
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-2 w-20" /> {/* Label: DESCRIPTION */}
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-2 w-16" /> {/* Label: REPORTER */}
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </div>

            {/* Evidence Gallery Skeleton */}
            <section className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <Skeleton className="h-4 w-36" /> {/* Evidence Title */}
                <Skeleton className="h-3 w-12" /> {/* Count placeholder */}
              </div>
              
              {/* Horizontal Scroll Mimic */}
              <div className="flex gap-4 overflow-hidden pb-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="min-w-[280px] md:min-w-[340px] h-48 bg-[#1f1f1f] border border-[#1f2937] rounded-xl relative overflow-hidden flex-shrink-0">
                    <div className="absolute top-3 left-3">
                      <Skeleton className="h-4 w-12 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Map Placeholder Skeleton */}
            <div className="bg-[#1f1f1f] border border-[#1f2937] rounded-xl p-6">
              <div className="flex justify-between mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-32 rounded-lg" />
              </div>
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </main>

          {/* RIGHT COLUMN: Sidebar */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="bg-[#1f1f1f] border border-[#1f2937] rounded-xl p-6 shadow-xl space-y-6">
              <Skeleton className="h-4 w-40" /> {/* Title: Moderation Action */}
              
              {/* Current Status Box */}
              <div className="p-4 bg-slate-800/20 border border-[#1f2937] rounded-lg space-y-2">
                <Skeleton className="h-2 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Skeleton className="h-11 w-full rounded-lg" /> {/* Approve Button */}
                <Skeleton className="h-11 w-full rounded-lg" /> {/* Reject Button */}
              </div>

              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-2/3" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}