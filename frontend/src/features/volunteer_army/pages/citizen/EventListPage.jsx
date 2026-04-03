import EventListHeader, {
  EventListHeaderSkeleton,
} from "../../components/event_list_page/EventListHeader";
import EventFilterTabs from "../../components/event_list_page/EventFilterTabs";
import EventCard, {
  EventCardSkeleton,
} from "../../components/event_list_page/EventCard";
import EventEmptyState from "../../components/event_list_page/EventEmptyState";
import useVolunteerEventList from "../../hooks/citizen/volunteerEventList";
const SKELETON_COUNT = 6;
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../../components/common/PaginationBar";
import {useParams} from "react-router-dom"; 
const EventListPage = () => {
  const {group_id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { eventData, eventListLoading, eventListFetching, pagination } =
    useVolunteerEventList(group_id);
  const events = eventData;
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

  // ─── Error state ────────────────────────
  if (!eventListLoading && !Array.isArray(events)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        <p>Failed to load events.</p>
      </div>
    );
  }

  return (
    <div className=" bg-white">
      {/* Background refetch indicator */}
      {eventListFetching && !eventListLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      {/* HEADER */}
      {eventListLoading ? (
        <EventListHeaderSkeleton />
      ) : (
        <EventListHeader
          searchQuery={pagination?.searchValue}
          onSearch={pagination?.setSearchValue}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* FILTER TABS */}
        <EventFilterTabs
          active={pagination.searchParams.get("status") ?? "all"}
          onChange={handleFilterChange}
        />

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 mb-8">
          {eventListLoading || eventListFetching ? (
            // Skeleton cards
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))
          ) : eventData?.length > 0 ? (
            // Real cards
            <>
              {eventData?.map((event) =>
                event?.id ? <EventCard key={event.id} event={event} group_id={group_id} /> : null,
              )}
            </>
          ) : (
            // Empty state
            <EventEmptyState  />
          )}
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
      </main>
    </div>
  );
};

export default EventListPage;
