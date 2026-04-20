import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit2,
  Power,
  X,
  Check,
  AlertCircle,
  Loader2,
  MapPin,
  Calendar,
  MoreVertical,
  Hash,
} from "lucide-react";
import useZoneList from "../hooks/zone/zoneList";
import Pagination from "../../../components/common/PaginationBar";
import useCreateZone from "../hooks/zone/createZone";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { errorToast, successToast } from "../../../utils/Toaster";
import useToggleZone from "../hooks/zone/toggleZone";

/**
 * CIVICEDGE ADMIN: ZONE MANAGEMENT
 * ---------------------------------------
 * Component Split Guide:
 * - ./components/admin/zones/PageHeader.jsx
 * - ./components/admin/zones/ZoneTable.jsx
 * - ./components/admin/zones/ZoneModal.jsx
 * - ./components/admin/zones/EmptyState.jsx
 */

// --- MAIN PAGE COMPONENT ---
function ZoneTableSkelton() {
  const rows = Array.from({ length: 6 });

  return (
    <div className="w-full border border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#1e1e1e]/50 border-b border-slate-700">
            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
              Zone Details
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
              Created On
            </th>
            <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
              Status
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800/50">
          {rows.map((_, index) => (
            <tr key={index} className="animate-pulse">
              {/* Zone Details */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* Icon Skeleton */}
                  <div className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700" />

                  {/* Name Skeleton */}
                  <div className="h-4 w-32 bg-slate-700 rounded" />
                </div>
              </td>

              {/* Created On */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {/* Icon */}
                  <div className="h-3 w-3 bg-slate-700 rounded" />

                  {/* Date */}
                  <div className="h-3 w-24 bg-slate-700 rounded" />
                </div>
              </td>

              {/* Status Toggle */}
              <td className="px-6 py-4">
                <div className="h-6 w-11 rounded-full bg-slate-700" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const ZoneManagementPage = () => {
  const { zones, zoneListLoading, zoneListFetching, pagination } =
    useZoneList();

  const { createZone, createZoneLoading } = useCreateZone();

  const { toggleZone, toggleZoneLoading } = useToggleZone();
  // --- STATE MANAGEMENT ---
  const isLoading = zoneListLoading || zoneListFetching;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedZone, setSelectedZone] = useState(null);

  // Form State
  const [zoneName, setZoneName] = useState("");
  const isSubmitting = createZoneLoading;

  // --- HANDLERS ---
  const handleOpenModal = (mode, zone = null) => {
    setModalMode(mode);
    if (mode === "edit" && zone) {
      setSelectedZone(zone);
      setZoneName(zone.name);
    } else {
      setSelectedZone(null);
      setZoneName("");
    }
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleZone(id).unwrap();
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Error", description: message });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!zoneName.trim()) return;

    try {
      if (modalMode === "create") {
        await createZone({ name: zoneName }).unwrap();
        successToast({
          title: "Success",
          description: "Zone has been created successfully.",
        });
      } else {
      }
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Error", description: message });
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="bg-[#1e1e1e] text-slate-100 font-sans p-4 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* COMPONENT: PageHeader */}
        {/* Move to: components/admin/zones/PageHeader.jsx */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Zone Management
            </h1>
            <p className="text-slate-400">
              Manage and configure zones used across the civic system
            </p>
          </div>
          <button
            onClick={() => handleOpenModal("create")}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Create Zone
          </button>
        </header>
        <div className="relative flex-1 max-w-[400px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search activity message..."
            value={pagination.searchValue}
            onChange={(e) => pagination.setSearchValue(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-blue-500 outline-none transition-all"
          />
        </div>
        {/* COMPONENT: ZoneTableSection */}
        {/* Move to: components/admin/zones/ZoneTableSection.jsx */}
        <div className="grid grid-cols-12 gap-6">
          <main className="col-span-12">
            <div className="bg-[#1e1e1e] border border-slate-700 rounded-xl overflow-hidden shadow-sm">
              {isLoading ? (
                <ZoneTableSkelton />
              ) : zones.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#1e1e1e]/50 border-b border-slate-700">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                          Zone Details
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                          Created On
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {zones.map((zone) => (
                        <tr
                          key={zone.id}
                          className="group hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-800 rounded-lg text-blue-400 border border-slate-700">
                                <MapPin size={18} />
                              </div>
                              <span className="font-bold text-slate-100">
                                {zone?.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                              <Hash size={14} />
                              {zone?.id}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {/* COMPONENT: StatusToggle */}
                            <button
                              onClick={() => handleToggleStatus(zone.id)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                                zone.is_active ? "bg-blue-600" : "bg-slate-700"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  zone.is_active
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* COMPONENT: EmptyState */
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-4 bg-slate-800 rounded-full text-slate-600">
                    <MapPin size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">
                      No zones created yet
                    </h3>
                    <p className="text-slate-400 mt-1">
                      Start by adding a new civic zone to the system.
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenModal("create")}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                  >
                    <Plus size={18} />
                    Create Zone
                  </button>
                </div>
              )}
            </div>
            {!pagination.isSinglePage && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                isFirstPage={pagination.isFirstPage}
                isLastPage={pagination.isLastPage}
                onPageChange={pagination.goToPage}
              />
            )}
          </main>
        </div>

        {/* COMPONENT: ZoneModal (Create / Edit) */}
        {/* Move to: components/admin/zones/ZoneModal.jsx */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1e1e1e] border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-[#1e1e1e]">
                <h3 className="text-xl font-bold">
                  {modalMode === "create" ? "Create Zone" : "Edit Zone"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="zoneName"
                    className="text-xs font-bold text-slate-500 uppercase tracking-widest"
                  >
                    Zone Name
                  </label>
                  <input
                    id="zoneName"
                    autoFocus
                    type="text"
                    value={zoneName}
                    onChange={(e) => setZoneName(e.target.value)}
                    placeholder="e.g. Kannur"
                    className="w-full bg-[#1e1e1e] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !zoneName.trim()}
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                  >
                    {isSubmitting && (
                      <Loader2 size={18} className="animate-spin" />
                    )}
                    {modalMode === "create" ? "Create Zone" : "Update Zone"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZoneManagementPage;
