import GroupListHeader from "../../components/volunteer_group_list_page.jsx/GroupListHeader";
import FilterTabs from "../../components/volunteer_group_list_page.jsx/FilterTabs";
import { GroupGridSkeleton } from "../../components/volunteer_group_list_page.jsx/GroupCardSkeleton";
import GroupCard from "../../components/volunteer_group_list_page.jsx/GroupCard";
import EmptyState from "../../components/volunteer_group_list_page.jsx/EmptyState";
import useVolunteerGroupListHook from "../../hooks/citizen/volunteerGroupListHook";
import Pagination from "../../../../components/common/PaginationBar";
import { useSearchParams } from "react-router-dom";

const VolunteerGroupListPage = () => {
  const [ searchParams,setSearchParams] = useSearchParams();
  const {
    groupData: groups,
    groupisLoading,
    groupisFetching,
    pagination,
  } = useVolunteerGroupListHook();
  const handleFilterChange = (tab) => {
    if (tab === "All") {
      setSearchParams((pre) => {
        pre.delete("membership_type");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("membership_type", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER + SEARCH */}
      <GroupListHeader
        totalCount={groups.length}
        searchQuery={pagination.searchValue}
        onSearch={pagination.setSearchValue}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* FILTER TABS */}
        <FilterTabs
          active={pagination.searchParams.get("membership_type") ?? "All"}
          onChange={(tab) => handleFilterChange(tab)}
        />

        {/* CONTENT */}
        {groupisLoading || groupisFetching ? (
          <GroupGridSkeleton count={6} />
        ) : groups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <EmptyState onReset={pagination.reset} />
        )}
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
      </main>
    </div>
  );
};

export default VolunteerGroupListPage;
