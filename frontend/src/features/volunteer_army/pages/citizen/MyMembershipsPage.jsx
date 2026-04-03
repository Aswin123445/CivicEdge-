// pages/citizen/MyMembershipsPage.jsx
import { useState } from "react";
import useMyGroups from "../../hooks/citizen/myGroups";
import MembershipsHeader from "../../components/my_membership_page/MembershipsHeader";
import { MembershipGridSkeleton } from "../../components/my_membership_page/MembershipCardSkeleton";
import MembershipCard from "../../components/my_membership_page/MembershipCard";
import Pagination from "../../../../components/common/PaginationBar";


const MyMembershipsPage = () => {
  const { myGroups, myGroupsLoading, myGroupsFetching ,pagination} = useMyGroups();

  // Prefer real API data; fall back to mock while hook is unconnected.
  const groups      = myGroups ?? [];

  const isLoading  = myGroupsLoading  ?? false;
  const isFetching = myGroupsFetching ?? false;
  const showSkeleton = isLoading || isFetching;

  const hasData = !showSkeleton && (groups?.length ?? 0) > 0;

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        <MembershipsHeader />

        {showSkeleton ? (
          <MembershipGridSkeleton count={6} />
        ) : hasData ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {groups.map((group) => (
                <MembershipCard key={group?.id ?? group?.group_id} group={group} />
              ))}
            </div>
                  {!pagination.isSinglePage && (
                    <div className=" bottom-0 py-4 ">
                      <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        isFirstPage={pagination.isFirstPage}
                        isLastPage={pagination.isLastPage}
                        onPageChange={pagination.goToPage}
                        className="bg-white border border-gray-400"
                      />
                    </div>
                  )}
          </>
        ) : (
          <MembershipsEmptyState />
        )}

      </div>
    </div>
  );
};

export default MyMembershipsPage;