// pages/volunteer/VolunteerHomePage.jsx
import { ArrowRight } from "lucide-react";

// API
import QuickActions from "../../components/volunteer_home_page/QuickActions";
import VolunteerJourney from "../../components/volunteer_home_page/VolunteerJourney";
import UserSummary from "../../components/volunteer_home_page/UserSummary";
import UpcomingEvents from "../../components/volunteer_home_page/UpcomingEvents";
import HeroSection from "../../components/volunteer_home_page/HeroSection";
import GroupCard from "../../components/volunteer_home_page/GroupCard";
import useVolunteerSummary from "../../hooks/citizen/volunteerSummaryHook";
import QuickActionSkeltonSession from "../../components/volunteer_home_page/QuickActionSkeltonSession";
import FeaturedGroupSkelton from "../../components/volunteer_home_page/FeaturedGroupSkelton";
import UpcomingEventSkelton from "../../components/volunteer_home_page/UpcomingEventSkelton";
import UserSummarySkeleton from "../../components/volunteer_home_page/UserSummarySkeleton";
import { useSelector } from "react-redux";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
const VolunteerHomePage = () => {
  const {
    volunteerSummary,
    volunteerSummaryLoading,
    volunteerSummaryFetching,
    userData,
    userDataLoading,
    userDataFetching,
    onActionClick,
    navigate
  } = useVolunteerSummary();
  const { role } = useSelector((s) => s.auth);
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* HERO */}
      <HeroSection
        onExplore={() => navigate("/volunteer-army/groups")}
        onViewEvents ={() => navigate("/volunteer-army/my-events")}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-12 gap-8 mb-9">
          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-8 space-y-12">
            {/* QUICK ACTIONS */}
            {volunteerSummaryLoading || volunteerSummaryFetching ? (
              <QuickActionSkeltonSession />
            ) : role === "citizen" && (
              <QuickActions
                quickActions={volunteerSummary?.quick_actions}
                onActionClick={onActionClick}
              />
            )}
            {/* FEATURED GROUPS */}
            {volunteerSummaryLoading || volunteerSummaryFetching ? (
              <FeaturedGroupSkelton />
            ) : role === "citizen" && (
              <section>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Featured Groups
                    </h3>
                    <p className="text-slate-500">
                      Communities actively looking for members
                    </p>
                  </div>
                  <button onClick={() => navigate("/volunteer-army/groups")} className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
                    See All <ArrowRight size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {volunteerSummary?.featured_groups.map((group) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      onViewGroup={(id) => navigate(`/volunteer-army/group/${id}`)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {userDataLoading || userDataFetching || volunteerSummaryFetching || volunteerSummaryLoading ? (
              <UserSummarySkeleton />
            ) : role === "citizen" && (
              <UserSummary
                user={userData}
                initials={getInitials(userData?.profile?.name || "Citizen")}
                quickAction = {volunteerSummary?.quick_actions}
              />
            )}
            {volunteerSummaryLoading || volunteerSummaryFetching ? (
              <UpcomingEventSkelton />
            ) : role === "citizen" && (
              <UpcomingEvents
                events={volunteerSummary?.upcoming_events}
                onViewSchedule={() => navigate("/volunteer-army/my-events")}
                onEventClick={({group_id,event_id}) => navigate(`/volunteer-army/${group_id}/events/${event_id}`)}
              />
            )}
          </aside>
        </div>
        {/* HOW IT WORKS */}
        <VolunteerJourney />
        {/* CTA */}
        <section className="mt-20 py-12 px-6 bg-blue-50 rounded-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Your skills are needed. Join thousands of citizens who are already
            contributing to the future of our city.
          </p>
          <button onClick={() => navigate("/volunteer-army/groups")} className="px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            Explore All Volunteer Groups
          </button>
        </section>
      </main>
    </div>
  );
};

export default VolunteerHomePage;
