
import { useSearchParams } from "react-router-dom";
import useListReport from "../../hooks/admin/listReport";
import Pagination from "../../../../components/common/PaginationBar";
import ReportHeader from "../../components/admin/admin_reports_page/ReportHeader";
import EmptyState from "../../components/admin/admin_reports_page/EmptyState";
import EventFiltersBar from "../../components/admin/admin_reports_page/EventFiltersBar";
import ReportTable from "../../components/admin/admin_reports_page/ReportTable";
import TableSkeleton from "../../../issues_execution/components/pending_review_page/TableSkelton";


const AdminReportsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    reports,
    isLoadingReport,
    isFetchingReport,
    pagination,
    totalReport,
    handleViewDetails
  } = useListReport();
  // Mock State for demonstration - in production, this comes from useGetReportsQuery()


  const handleStatusChange = (tab) => {
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
  const handleTypeChange = (tab) => {
    if (tab === "ALL") {
      setSearchParams((pre) => {
        pre.delete("target_type");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("target_type", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  const handleOrderingChange = (tab) => {
    if (tab === "-created_at") {
      setSearchParams((pre) => {
        pre.delete("ordering");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("ordering", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* COMPONENT: PageHeader */}
        <ReportHeader totalReport={totalReport} />
        <EventFiltersBar
          search={pagination.searchValue}
          onSearch={pagination.setSearchValue}
          onStatusChange={handleStatusChange} // The updated generic handler
          // Pass current URL states down
          statusFilter={pagination.searchParams.get("status") || "ALL"}
          typeFilter={pagination.searchParams.get("target_type") || "ALL"}
          onTypeChange={handleTypeChange}
          orderingFilter={
            pagination.searchParams.get("ordering") || "-created_at"
          }
          onOrderingChange={handleOrderingChange}
          setSearchParams={setSearchParams}
        />
        {/* MAIN CONTENT AREA */}
        <main className="grid grid-cols-12 gap-6">
          <section className="col-span-12">
            {isLoadingReport || isFetchingReport ? (
              <TableSkeleton />
            ) : reports.length > 0 ? (
              <div className="bg-[#1e1e1e] border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                {/* COMPONENT: ReportsTable */}
                <ReportTable
                  reports={reports}
                  handleViewDetails={handleViewDetails}
                />
              </div>
            ) : (
              <EmptyState />
            )}
          </section>
        </main>

        {/* FOOTER INFO (Pagination Logic Future Expansion) */}
        <footer className="flex items-center justify-between text-slate-500 text-sm pt-4 border-t border-slate-900">
          <p>Showing {reports.length} moderation requests</p>
          <div className="flex gap-2">
            {/* Pagination buttons would go here */}
          </div>
        </footer>
        {!pagination.isSinglePage && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            isFirstPage={pagination.isFirstPage}
            isLastPage={pagination.isLastPage}
            onPageChange={pagination.goToPage}
          />
        )}
      </div>
    </div>
  );
};

export default AdminReportsPage;
