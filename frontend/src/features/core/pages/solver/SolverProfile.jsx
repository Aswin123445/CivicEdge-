import { useState } from "react";

import { Award, Calendar, Clock, ShieldCheck, CheckCircle } from "lucide-react";
import EditableAvatar from "../../components/EditableAvatar";
import InlineEditableText from "../../components/InlineEditableText";
import useProfileHook from "../../hooks/useProfileHook";
import { capitalizeWords } from "../../utils";
import ProfileHeaderSkeleton from "../../ui/skeltons/ProfileHeaderSkeleton";
import useCitizenService from "../../hooks/citizen/useCitizenService";
import DutyStatus from "../../ui/solver/DutyStatus";
import RoleBadge from "../../ui/RoleBadge";
import EditableAvatarSkeletonDark from "../../ui/skeltons/EditableAvatarSkelton";

const SolverProfile = () => {
  const {
    handleUpload,
    updateProfile: changeProfile,
    profle_loading,
    avatarIsLoading,
  } = useProfileHook();
  const { userData, userDataLoading, userDataFetching } = useCitizenService();
  const pageLoad = userDataLoading || profle_loading || userDataFetching
  const name = capitalizeWords(userData?.profile?.name || "User");
  const updateProfile = (data) => {
    // send to server
    try {
      changeProfile(data).unwrap();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  const [activeTab, setActiveTab] = useState("impact");

  const stats = [
    {
      label: "Issues Resolved",
      value: 128,
      icon: <CheckCircle size={18} />,
      helper: "Successfully closed cases",
    },
    {
      label: "Avg Resolution Time",
      value: "3.2 hrs",
      icon: <Clock size={18} />,
      helper: "Across all assignments",
    },
    {
      label: "SLA Compliance",
      value: "96%",
      icon: <ShieldCheck size={18} />,
      helper: "On-time completion rate",
    },
  ];

  return (
    <div className=" bg-slate-50 text-slate-900 font-sans">
      <main className="max-w-5xl mx-auto py-10 px-6">
        {/* --- Header / Hero Section --- */}
        {pageLoad ? (
          <ProfileHeaderSkeleton />
        ) : (
          <header className="flex flex-col md:flex-row items-center gap-8 mb-12">
            {/* Avatar */}
            <div className="relative">
              {avatarIsLoading ?<EditableAvatarSkeletonDark className="light"/>:<EditableAvatar
                avatarUrl={userData.profile?.avatar}
                onUpload={(file) => handleUpload(file)} // send to server
              />
              }
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1 space-y-3">
              <InlineEditableText
                value={name}
                onSave={(data) => updateProfile({ name: data })}
                className="text-3xl font-extrabold text-slate-800"
                placeholder="Your name"
              />

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium">
                <div className="flex items-center gap-1 text-slate-500 font-medium">
                  <div size={16} />
                  <span className="select-all">{userData?.profile?.email}</span>
                </div>

                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-sm font-bold">
                  Verified
                </span>
                <RoleBadge />
              </div>

              <InlineEditableText
                value={
                  userData.profile?.bio ||
                  "I will change myself to make my community better!"
                }
                onSave={(v) => updateProfile({ bio: v })}
                className="mt-4 text-slate-600 max-w-lg italic"
                placeholder="Add a short bio"
              />
            </div>
            <DutyStatus status={userData?.profile?.availability} />
          </header>
        )}
        {/* --- Solver Credibility --- */}
        <section className="mb-12">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
            Solver Credibility
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="
          bg-white p-6 rounded-xl
          border border-slate-200
          shadow-sm hover:shadow-md
          transition-shadow
        "
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                      {stat.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {stat.label}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Lifetime
                  </span>
                </div>

                {/* Value */}
                <p className="text-3xl font-extrabold text-slate-800">
                  {stat.value}
                </p>

                {/* Context */}
                {stat.helper && (
                  <p className="mt-1 text-xs text-slate-500">{stat.helper}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        {/* --- Content Tabs --- */}
        <div className="border-b border-slate-200 mb-8 flex gap-8">
          {["Activity", "Rewards", "Badges"].map((tab) => (
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
        need to work on content
      </main>
    </div>
  );
};

export default SolverProfile;
