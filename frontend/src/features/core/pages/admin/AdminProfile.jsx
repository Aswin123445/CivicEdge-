// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { Clock, ShieldCheck, CheckCircle } from "lucide-react";

import EditableAvatar from "../../components/EditableAvatar";
import InlineEditableText from "../../components/InlineEditableText";
import useProfileHook from "../../hooks/useProfileHook";
import { capitalizeWords } from "../../utils";
import ProfileHeaderSkeleton from "../../ui/skeltons/ProfileHeaderSkeleton";
import useCitizenService from "../../hooks/citizen/useCitizenService";
import RoleBadge from "../../ui/RoleBadge";
import EditableAvatarSkeletonDark from "../../ui/skeltons/EditableAvatarSkelton";

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
};

const AdminProfile = () => {
  const {
    handleUpload,
    profle_loading,
    avatarIsLoading,
    updateProfileData
  } = useProfileHook();
  console.log(profle_loading,avatarIsLoading);
  const { userData, userDataLoading, userDataFetching } = useCitizenService();
  const name = capitalizeWords(userData?.profile?.name || "Admin");
  const [activeTab, setActiveTab] = useState("activity");
  const isPageLoading = userDataLoading || userDataFetching || profle_loading ;

  const activityStats = [
    {
      label: "Actions Approved",
      value: 128,
      icon: <CheckCircle size={18} />,
      helper: "Issues, polls & reports",
    },
    {
      label: "Avg Review Time",
      value: "3.2 hrs",
      icon: <Clock size={18} />,
      helper: "Across all decisions",
    },
    {
      label: "Policy Compliance",
      value: "96%",
      icon: <ShieldCheck size={18} />,
      helper: "Audit-safe actions",
    },
  ];

  return (
    <div className="bg-[#1e1e1e] text-slate-100 min-h-screen">
      <main className="max-w-5xl mx-auto py-10 px-6">

        {/* ===================== */}
        {/* PROFILE HEADER */}
        {/* ===================== */}
        {isPageLoading ? (
          <ProfileHeaderSkeleton />
        ) : (
          <motion.header {...fadeUp} className="flex flex-col md:flex-row items-center gap-8 mb-12">
            {avatarIsLoading ? (<EditableAvatarSkeletonDark/>):(
            <EditableAvatar
              avatarUrl={userData.profile?.avatar}
              onUpload={handleUpload}
            />)}

            <div className="flex-1 text-center md:text-left space-y-3">
              <InlineEditableText
                value={name}
                onSave={(v) => updateProfileData({ name: v })}
                className="text-3xl font-extrabold text-slate-100"
              />

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400 text-sm font-medium">
                <span className="select-all">{userData.profile?.email}</span>
                <RoleBadge  role = 'Admin'/>
              </div>
              <InlineEditableText
                value={userData.profile?.bio || "Responsible for maintaining platform integrity."}
                onSave={(v) => updateProfileData({ bio: v })}
                className="text-slate-400 italic max-w-lg"
              />
            </div>
              <RoleBadge  role = 'Active' className="px-6 bg-green-600 text-white py-4"/>

          </motion.header>
        )}

        {/* ===================== */}
        {/* ACTIVITY SUMMARY */}
        {/* ===================== */}
        <motion.section {...fadeUp} className="mb-12">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Activity Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <span className="text-[10px] text-slate-500 uppercase">Lifetime</span>
                </div>

                <p className="text-3xl font-extrabold text-slate-100">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-400">{stat.helper}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ===================== */}
        {/* TABS */}
        {/* ===================== */}
        <div className="border-b border-neutral-700 mb-8 flex gap-8">
          {["Activity", "Audit"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-4 text-sm font-bold ${
                activeTab === tab.toLowerCase()
                  ? "border-b-2 border-blue-500 text-blue-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ===================== */}
        {/* AUDIT SNAPSHOT */}
        {/* ===================== */}
        {activeTab === "audit" && (
          <motion.section {...fadeUp} className="space-y-3">
            {[
              "Approved forum moderation request",
              "Resolved flagged civic issue",
              "Published community poll",
            ].map((item, i) => (
              <div
                key={i}
                className="
                  bg-neutral-800 border border-neutral-700
                  rounded-lg p-4 text-sm text-slate-300
                "
              >
                {item}
              </div>
            ))}
          </motion.section>
        )}

      </main>
    </div>
  );
};

export default AdminProfile;
