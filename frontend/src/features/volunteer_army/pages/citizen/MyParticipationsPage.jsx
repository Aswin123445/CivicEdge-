import { useNavigate } from "react-router-dom";
import useMyParticipationPage from "../../hooks/citizen/myParcipationPage";
import ParticipationPageHeader, {
  ParticipationPageHeaderSkeleton,
} from "../../components/my_participation_page/ParticipationPageHeader";
import ParticipationFilterTabs from "../../components/my_participation_page/ParticipationFilterTabs";
import ParticipationCard, {
  ParticipationCardSkeleton,
} from "../../components/my_participation_page/ParticipationCard";
import ParticipationEmptyState from "../../components/my_participation_page/ParticipationEmptyState";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../../components/common/PaginationBar";
const SKELETON_COUNT = 3;

const MyParticipationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // RTK Query hook
  const {
    myParticipationData,
    myParticipationLoading,
    myParticipationFetching,
    pagination,
  } = useMyParticipationPage();

  // Use real API data when available, fallback to mock
  const participations = Array.isArray(myParticipationData)
    ? myParticipationData
    : [];

  // ─── Handlers ────────────────────────────────────────
  const handleAction = (item) => {
    navigate(`/volunteer-army/${item?.group_id}/events/${item?.event_id}`);
  };

  const handleExploreEvents = () => {
    navigate("/volunteer/events");
  };
  const handleFilterChange = (tab) => {
    if (tab === "all") {
      setSearchParams((pre) => {
        pre.delete("status");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("status", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Background refetch indicator */}
      {myParticipationFetching && !myParticipationLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      {/* HEADER */}
      {myParticipationLoading ? (
        <ParticipationPageHeaderSkeleton />
      ) : (
        <ParticipationPageHeader totalCount={participations.length} />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* FILTER TABS */}
        {/* FILTER TABS + SEARCH */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Tabs (left) */}
          <ParticipationFilterTabs
            active={pagination.searchParams.get("status") ?? "all"}
            onChange={handleFilterChange}
          />

          {/* Search (right) */}
          <div className="w-full sm:w-72">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events, groups..."
                value={pagination.searchValue}
                onChange={(e) => pagination.setSearchValue(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-2.5
                  bg-white
                  border border-slate-200
                  rounded-xl
                  text-sm text-slate-700
                  placeholder:text-slate-400
                  shadow-sm
                  focus:outline-none
                  focus:border-blue-300
                  focus:ring-2 focus:ring-blue-100
                  transition-all duration-200
                "
              />

              {/* Icon */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* GRID */}
        {myParticipationLoading || myParticipationFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <ParticipationCardSkeleton key={i} />
            ))}
          </div>
        ) : myParticipationData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myParticipationData.map((item) =>
              item?.id ? (
                <ParticipationCard
                  key={item.id}
                  item={item}
                  handleAction={handleAction}
                />
              ) : null,
            )}
          </div>
        ) : (
          <ParticipationEmptyState onExplore={handleExploreEvents} />
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

export default MyParticipationsPage;
