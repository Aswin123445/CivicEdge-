import { useState } from "react";

import { Award, Calendar, CheckCircle } from "lucide-react";
import EditableAvatar from "../../components/EditableAvatar";
import InlineEditableText from "../../components/InlineEditableText";
import useProfileHook from "../../hooks/useProfileHook";
import useCitizenService from "../../hooks/citizen/useCitizenService";
import { capitalizeWords } from "../../utils";
import InlineEditableSelect from "../../components/InlineEditableSelect";
import ProfileHeaderSkeleton from "../../ui/skeltons/ProfileHeaderSkeleton";
import VerifyBadge from "../../ui/solver/VerifyBadge";
import EditableAvatarSkeletonDark from "../../ui/skeltons/EditableAvatarSkelton";
import { useFetchZonesQuery } from "../../../auth/services/adminAuthApi";
import { useNavigate } from "react-router-dom";

const CitizenProfile = () => {
  const { data: zonesData,isLoading,isFetching,isSuccess } = useFetchZonesQuery();
  const  zones = zonesData ?? [];
  const {
    handleUpload,
    profle_loading,
    avatarIsLoading,
    updateProfileData
  } = useProfileHook();

  const { userData, userDataLoading, userDataFetching } = useCitizenService();
  const name = capitalizeWords(userData?.profile?.name || "User");
  const pageLoading = userDataLoading || profle_loading || userDataFetching;

  const [activeTab, setActiveTab] = useState("impact");

  const stats = [
    {
      label: "Issues Resolved",
      value: userData?.dashboard?.total_complaints ?? "0",
      icon: <CheckCircle className="text-emerald-500" />,
    },
    {
      label: "Volunteer Hours",
      value: userData?.dashboard?.total_volunteer_hours ?? "0",
      icon: <Calendar className="text-blue-500" />,
    },
    {
      label: "Community Rank",
        value: `top ${userData?.dashboard?.performance_percentail}%`?? "0",
      icon: <Award className="text-amber-500" />,
    },
  ];
  const navigate = useNavigate();
  return (
    <div className=" bg-slate-50 text-slate-900 font-sans">
      <main className="max-w-5xl mx-auto py-10 px-6">
        {/* --- Header / Hero Section --- */}
        {pageLoading ? (
          <ProfileHeaderSkeleton />
        ) : (
          <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
            {/* Avatar */}
            <div className="relative">
              {avatarIsLoading ? (
                <EditableAvatarSkeletonDark className="light" />
              ) : (
                <EditableAvatar
                  avatarUrl={userData?.profile?.avatar}
                  onUpload={(file) => handleUpload(file)} // send to server
                />
              )}
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1 space-y-3">
              <InlineEditableText
                value={name}
                onSave={(data) => updateProfileData({ name: data })}
                className="text-3xl font-extrabold text-slate-800"
                placeholder="Your name"
              />

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium">
                <InlineEditableSelect
                  value={userData?.profile?.zone || ""}
                  options={zones}
                  onSave={(data) => updateProfileData(data)}
                  className="flex items-center gap-1"
                  placeholder="Select location"
                />
                <div className="flex items-center gap-1 text-slate-500 font-medium">
                  <div size={16} />
                  <span className="select-all">{userData?.profile.email}</span>
                </div>

                <VerifyBadge />
              </div>

              <InlineEditableText
                value={
                  userData?.profile?.bio ||
                  "I will change myself to make my community better!"
                }
                onSave={(v) => updateProfileData({ bio: v })}
                className="mt-4 text-slate-600 max-w-lg italic"
                placeholder="Add a short bio"
              />
            </div>

            {/* CTA */}
            <button 
              onClick={() => navigate("/issue/new")}
              className="
              bg-blue-700 text-white
              px-6 py-2.5 rounded-xl
              font-semibold
              hover:bg-blue-600
              transition-all
              shadow-md shadow-blue-900/20
            "
            >
              Report New Issue
            </button>
          </header>
        )}
        {/* --- Impact Metrics --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 bg-slate-50 rounded-lg">{stat.icon}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Lifetime
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* --- Content Tabs --- */}
        <div className="border-b border-slate-200 mb-8 flex gap-8">
          {["Impact", "Reports", "Badges"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-4 text-sm font-bold transition-all ${
                activeTab === tab.toLowerCase()
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* --- Dynamic Content Area --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-slate-800">
              Recent Activity
            </h3>
            {/* Mock Activity Item */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 flex gap-4">
              <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center">
                🏗️
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  Pothole Repair Request #4402
                </p>
                <p className="text-sm text-slate-500">
                  Status:{" "}
                  <span className="text-emerald-600 font-bold">Resolved</span> •
                  2 days ago
                </p>
                <p className="mt-2 text-sm text-slate-600 bg-slate-50 p-2 rounded">
                  "The city maintenance team has completed the overlay on 5th
                  Ave."
                </p>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">Next Milestone</h4>
                <p className="text-indigo-200 text-sm mb-4">
                  5 more reports to unlock the "Neighborhood Watch" badge.
                </p>
                <div className="w-full bg-indigo-800 h-2 rounded-full">
                  <div className="bg-emerald-400 h-full w-[70%] rounded-full" />
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Award size={120} />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CitizenProfile;
