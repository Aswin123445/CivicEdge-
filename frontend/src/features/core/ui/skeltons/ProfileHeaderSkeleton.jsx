export default function ProfileHeaderSkeleton() {
  return (
    <header className="flex flex-col md:flex-row items-center gap-8 mb-12 animate-pulse">
      
      {/* Avatar skeleton */}
      <div className="relative">
        <div className="w-32 h-32 rounded-2xl bg-slate-200" />
      </div>

      {/* Info skeleton */}
      <div className="flex-1 w-full text-center md:text-left space-y-4">
        
        {/* Name */}
        <div className="h-9 w-64 bg-slate-300 rounded-lg mx-auto md:mx-0" />

        {/* Meta row */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <div className="h-5 w-32 bg-slate-200 rounded-md" />
          <div className="h-5 w-44 bg-slate-200 rounded-md" />
          <div className="h-5 w-24 bg-slate-200 rounded-md" />
        </div>

        {/* Bio */}
        <div className="space-y-2 max-w-lg mx-auto md:mx-0">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
        </div>
      </div>

      {/* CTA skeleton */}
      <div className="h-11 w-44 bg-slate-300 rounded-xl" />
    </header>
  );
}
