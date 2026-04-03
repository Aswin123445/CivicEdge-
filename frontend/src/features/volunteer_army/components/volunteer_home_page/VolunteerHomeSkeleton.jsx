// components/volunteer/skeletons/VolunteerHomeSkeleton.jsx

import EventRowSkeleton from "../../ui/Volunteer_home_page/EventRowSkeleton";
import GroupCardSkeleton from "../../ui/Volunteer_home_page/GroupCardSkeleton";
import Pulse from "../../ui/Volunteer_home_page/Pulse";
import QuickActionSkeleton from "../../ui/Volunteer_home_page/QuickActionSkeleton";
import UserSummarySkeleton from "./UserSummarySkeleton";



// Full page skeleton
const VolunteerHomeSkeleton = () => (
  <div className="min-h-screen bg-white font-sans">
    {/* Hero skeleton */}
    <div className="max-w-7xl mx-auto pl-16 mt-20">
      <div className="max-w-xl space-y-4">
        <Pulse className="h-10 w-3/4" />
        <Pulse className="h-10 w-1/2" />
        <Pulse className="h-4 w-full mt-4" />
        <Pulse className="h-4 w-5/6" />

        <div className="flex gap-4 pt-4">
          <Pulse className="h-12 w-44 rounded-xl" />
          <Pulse className="h-12 w-44 rounded-xl" />
        </div>
      </div>
    </div>

    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-12 gap-8">
        {/* Left column */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          {/* Quick actions */}
          <section>
            <Pulse className="h-6 w-48 mb-6" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <QuickActionSkeleton key={i} />
              ))}
            </div>
          </section>

          {/* Featured groups */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-2">
                <Pulse className="h-7 w-48" />
                <Pulse className="h-4 w-64" />
              </div>
              <Pulse className="h-4 w-16" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <GroupCardSkeleton key={i} />
              ))}
            </div>
          </section>

          {/* How it works skeleton */}
          <section className="bg-slate-900 rounded-2xl p-8">
            <div className="text-center mb-10 space-y-2">
              <Pulse className="h-7 w-48 mx-auto bg-slate-700" />
              <Pulse className="h-4 w-64 mx-auto bg-slate-700" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-3">
                  <Pulse className="w-10 h-10 rounded-full bg-slate-700" />
                  <Pulse className="h-4 w-20 bg-slate-700" />
                  <Pulse className="h-3 w-24 bg-slate-700" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right sidebar */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <UserSummarySkeleton />

          {/* Upcoming events */}
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Pulse className="w-5 h-5 rounded" />
              <Pulse className="h-5 w-36" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <EventRowSkeleton key={i} />
              ))}
            </div>
            <Pulse className="h-9 w-full rounded-lg mt-4" />
          </div>

          {/* Badge card */}
          <div className="bg-slate-200 rounded-xl p-6 space-y-3 animate-pulse">
            <div className="flex justify-between items-start">
              <Pulse className="w-8 h-8 rounded bg-slate-300" />
              <Pulse className="w-16 h-5 rounded bg-slate-300" />
            </div>
            <Pulse className="h-5 w-36 bg-slate-300" />
            <Pulse className="h-3 w-full bg-slate-300" />
            <Pulse className="h-3 w-4/5 bg-slate-300" />
            <Pulse className="h-2 w-full rounded-full bg-slate-300 mt-2" />
          </div>
        </aside>
      </div>
    </main>
  </div>
);

export default VolunteerHomeSkeleton;
