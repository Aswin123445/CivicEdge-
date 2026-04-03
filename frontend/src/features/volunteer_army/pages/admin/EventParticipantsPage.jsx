// pages/admin/EventParticipantsPage.jsx
import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useAdminEventParcipantList from "../../hooks/admin/adminEventParcipantList";
import ParticipantsPageHeader, { ParticipantsPageHeaderSkeleton } from "../../components/admin_evnet_parcipation_page/ParticipantsPageHeader";
import ParticipantsFiltersBar from "../../components/admin_evnet_parcipation_page/ParticipantsFiltersBar";
import ParticipantsTable from "../../components/admin_evnet_parcipation_page/ParticipantsTable";
import { useSearchParams } from "react-router-dom";


const EventParticipantsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
  const { id }   = useParams();
  const navigate = useNavigate();

  // RTK Query hook
  const {
    adminParcipantList,
    adminParcipantListLoading,
    adminParcipantListFetching,
    events,
    pagination
  } = useAdminEventParcipantList(id);


  const isLoading = adminParcipantListLoading || adminParcipantListFetching;

  // ─── Filter / sort state ─────────────────────────
  const [debouncedSearch, setDebounced] = useState("");
  const [statusFilter, setStatus]     = useState("ALL");
  const [sort, setSort]               = useState("newest");

  // ─── Handlers ────────────────────────────────────
  const handleView = (participant) => {
    navigate(`/admin/participants/${participant?.id}`);
  };
  const handleFilterChange = (tab) => {
    if (tab === "ALL") {
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

  // Determine empty message based on filter state
  const emptyMessage =
    debouncedSearch || statusFilter !== "ALL"
      ? "No participants match your search"
      : "No participants yet";

  return (
    <div className="min-h-screen bg-[#1e1e1e] p-6">

      {/* Background refetch indicator */}
      {adminParcipantListFetching && !adminParcipantListLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse z-50" />
      )}

      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        {isLoading ? (
          <ParticipantsPageHeaderSkeleton />
        ) : (
          <ParticipantsPageHeader event={events} />
        )}

        {/* FILTERS */}
        <ParticipantsFiltersBar
          search={pagination.searchValue}
          statusFilter={pagination.searchParams.get("status") || "ALL"}
          sort={sort}
          onSearch={pagination.setSearchValue}
          onStatusChange={handleFilterChange}
          onSortChange={setSort}
        />

        {/* TABLE */}
        <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl p-6">
          <ParticipantsTable
            data={adminParcipantList}
            isLoading={isLoading}
            isFetching={adminParcipantListFetching}
            emptyMessage={emptyMessage}
            onView={handleView}
          />
        </div>
      </div>
    </div>
  );
};

export default EventParticipantsPage;