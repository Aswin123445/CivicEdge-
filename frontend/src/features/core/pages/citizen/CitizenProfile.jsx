import { useState } from "react";

import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Activity,
  ArrowRight,
} from "lucide-react";
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
import useActivityLogs from "../../../monitoring/hooks/activity-log/activityLogs";
import SectionHeader from "../../components/SectionHeader";
import MyActivity from "../../components/MyActivity";
import MyActivitySkeleton from "../../components/MyActivitySkeleton";

const CitizenProfile = () => {
  const {
    data: zonesData,
    isLoading,
    isFetching,
    isSuccess,
  } = useFetchZonesQuery();
  const zones = zonesData ?? [];
  const { handleUpload, profle_loading, avatarIsLoading, updateProfileData } =
    useProfileHook();

  const { activityLogs, activityLoading, activityFetching } = useActivityLogs();
  const topTwoActivities = activityLogs.slice(0, 2);

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
      value: `top ${userData?.dashboard?.performance_percentail}%` ?? "0",
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
        <SectionHeader />

        <div className="w-full">
          {/* Grid Layout: 
          - 1 column on mobile 
          - 3 columns on medium screens and up
      */}
          {activityFetching || activityLoading ? (
            <MyActivitySkeleton />
          ) : (
            <MyActivity
              topTwoActivities={topTwoActivities}
              url="/forum/my-activity"
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default CitizenProfile;
