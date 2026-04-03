// pages/volunteer/VolunteerGroupDetailPage.jsx
import { useParams } from "react-router-dom";
import GroupDetailHeader from "../../components/volunteer_group_detail_page/GroupDetailHeader";
import GroupAbout from "../../components/volunteer_group_detail_page/GroupAbout";
import MembershipSidebar from "../../components/volunteer_group_detail_page/MembershipSidebar";
import useVolunteerGroupDetail from "../../hooks/citizen/volunteerGroupDetail";
import GroupDetailSkeleton from "../../components/volunteer_group_detail_page/GroupDetailSkeleton";

const VolunteerGroupDetailPage = () => {
  const { id } = useParams();

  const {
    groupDetail,
    groupDetailLoading,
    groupDetailFetching,
    handleMembershipAction,
    joinGroupLoading,
  } = useVolunteerGroupDetail(id);

  // --- LOADING STATE (first fetch) ---
  if (groupDetailLoading || groupDetailFetching) return <GroupDetailSkeleton />;

  return (
    <div className=" bg-white">
      {/* Subtle refetch indicator — doesn't replace content */}
      {groupDetailFetching && !groupDetailLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      {/* HEADER */}
      <GroupDetailHeader group={groupDetail} />

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto  sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-12 gap-8">
          {/* LEFT — About + Requirements */}
          <div className="col-span-12 lg:col-span-8">
            <GroupAbout
              description={groupDetail.description}
              requirements={groupDetail.requirements}
            />
          </div>

          {/* RIGHT — Membership Sidebar */}
          <div className="col-span-12 lg:col-span-4 lg:pb-28">
            <MembershipSidebar
              group={groupDetail}
              onAction={handleMembershipAction}
              joinGroupLoading={joinGroupLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VolunteerGroupDetailPage;
