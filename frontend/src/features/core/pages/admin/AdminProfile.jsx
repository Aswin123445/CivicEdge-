// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Clock,
  ShieldCheck,
  CheckCircle,
  Vote,
  Users,
  CalendarPlus,
} from "lucide-react";

import EditableAvatar from "../../components/EditableAvatar";
import InlineEditableText from "../../components/InlineEditableText";
import useProfileHook from "../../hooks/useProfileHook";
import { capitalizeWords } from "../../utils";
import ProfileHeaderSkeleton from "../../ui/skeltons/ProfileHeaderSkeleton";
import useCitizenService from "../../hooks/citizen/useCitizenService";
import RoleBadge from "../../ui/RoleBadge";
import EditableAvatarSkeletonDark from "../../ui/skeltons/EditableAvatarSkelton";
import useAdminMetrics from "../../hooks/admin/adminMetrics";

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
};

function ActivityStatSkeleton() {
  return (
    <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        {/* Left: icon + label */}
        <div className="flex items-center gap-3">
          {/* Icon placeholder */}
          <div className="p-2 rounded-lg bg-neutral-700">
            <div className="h-4 w-4 bg-slate-600 rounded" />
          </div>

          {/* Label */}
          <div className="h-3 w-24 bg-slate-600 rounded" />
        </div>

        {/* Lifetime tag */}
        <div className="h-2 w-10 bg-slate-700 rounded" />
      </div>

      {/* Value */}
      <div className="h-8 w-20 bg-slate-500 rounded mb-2" />

      {/* Helper text */}
      <div className="h-3 w-32 bg-slate-700 rounded" />
    </div>
  );
}

const AdminProfile = () => {
  const { handleUpload, profle_loading, avatarIsLoading, updateProfileData } =
    useProfileHook();

  const { adminData, metricsLoading, metricsFetching } = useAdminMetrics();
  console.log(adminData);
  const { userData, userDataLoading, userDataFetching } = useCitizenService();
  const name = capitalizeWords(userData?.profile?.name || "Admin");
  const isPageLoading = userDataLoading || userDataFetching || profle_loading;

  const activityStats = [
    {
      label: "Polls Created",
      value: adminData?.polls_created || 0,
      icon: <Vote size={18} />,
      helper: "Total polls initiated",
    },
    {
      label: "Groups Created",
      value: adminData?.groups_created || 0,
      icon: <Users size={18} />,
      helper: "Community groups formed",
    },
    {
      label: "Events Created",
      value: adminData?.events_created || 0,
      icon: <CalendarPlus size={18} />,
      helper: "Events organized",
    },
    {
      label: "Tasks Approved",
      value: adminData?.tasks_approved || 0,
      icon: <CheckCircle size={18} />,
      helper: "Approved task actions",
    },
  ];

  return (
    <div className="bg-[#1e1e1e] text-slate-100 ">
      <main className="max-w-5xl mx-auto pt-10 px-6">
        {/* ===================== */}
        {/* PROFILE HEADER */}
        {/* ===================== */}
        {isPageLoading ? (
          <ProfileHeaderSkeleton />
        ) : (
          <motion.header
            {...fadeUp}
            className="flex flex-col md:flex-row items-center gap-8 mb-12"
          >
            {avatarIsLoading ? (
              <EditableAvatarSkeletonDark />
            ) : (
              <EditableAvatar
                avatarUrl={userData.profile?.avatar}
                onUpload={handleUpload}
              />
            )}

            <div className="flex-1 text-center md:text-left space-y-3">
              <InlineEditableText
                value={name}
                onSave={(v) => updateProfileData({ name: v })}
                className="text-3xl font-extrabold text-slate-100"
              />

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400 text-sm font-medium">
                <span className="select-all">{userData.profile?.email}</span>
                <RoleBadge role="Admin" />
              </div>
              <InlineEditableText
                value={
                  userData.profile?.bio ||
                  "Responsible for maintaining platform integrity."
                }
                onSave={(v) => updateProfileData({ bio: v })}
                className="text-slate-400 italic max-w-lg"
              />
            </div>
            <RoleBadge
              role="Active"
              className="px-6 bg-green-600 text-white py-4"
            />
          </motion.header>
        )}

        {/* ===================== */}
        {/* ACTIVITY SUMMARY */}
        {/* ===================== */}
        <motion.section {...fadeUp} className="mb-5">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Activity Summary
          </h3>

          {metricsFetching || metricsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <ActivityStatSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activityStats.map((stat, i) => (
                <div
                  key={i}
                  className="
                cursor-pointer
                  bg-neutral-800 p-6 rounded-xl
                  border border-neutral-700
                  shadow-sm hover:shadow-md
                  transition-shadow
                "
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-neutral-700 text-slate-300">
                        {stat.icon}
                      </div>
                      <span className="text-xs font-semibold text-slate-400 uppercase">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase">
                      Lifetime
                    </span>
                  </div>

                  <p className="text-3xl font-extrabold text-slate-100">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{stat.helper}</p>
                </div>
              ))}
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
};

export default AdminProfile;
