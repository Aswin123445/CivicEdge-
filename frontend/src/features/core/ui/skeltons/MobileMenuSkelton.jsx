// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function MobileMenuSkeleton() {
  return (
    <div className="h-full flex flex-col text-white">
      {/* Header Skeleton */}
      <div className="px-6 py-8 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="h-14 w-14 rounded-full bg-white/10 animate-pulse" />

          {/* Name + Email */}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-44 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-4 py-6 space-y-8 flex-1 overflow-hidden">
        {/* CTA Skeleton */}
        <div className="h-14 rounded-xl bg-gradient-to-r from-white/10 to-white/5 animate-pulse" />

        {/* Menu Section */}
        <div className="space-y-3">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>

        <div className="h-px bg-white/10" />

        {/* Account Section */}
        <div className="space-y-3">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem danger />
        </div>
      </div>
    </div>
  );
}

function SkeletonItem({ danger }) {
  return (
    <motion.div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl
        ${danger ? "bg-red-400/5" : "bg-white/5"}
        animate-pulse
      `}
    >
      <div className="h-5 w-5 rounded bg-white/10" />
      <div className="h-4 w-28 rounded bg-white/10" />
    </motion.div>
  );
}
