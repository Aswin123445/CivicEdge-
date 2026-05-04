import React, { useState } from "react";
import ComplaintHeader from "../components/list_complaint/ComplaintHeader";
import ComplaintFilters from "../components/list_complaint/ComplaintFilters";
import ComplaintList from "../components/list_complaint/ComplaintList";
import useComplaintService from "../hooks/complaintService";
import ComplaintListSkeleton from "../ui/skeltons/ComplaintListSkeleton";
import Pagination from "../../../components/common/PaginationBar";

const ComplaintListPage = () => {
  const {
    complaints,
    complaintsLoading,
    complaintsFetching,
    complaintsSuccess,
    totalPages,
    isSinglePage,
    isFirstPage,
    isLastPage,
    isEmpty,
    page,
    searchValue,
    setSearchValue,
    goToPage,
    setActiveTab,
    activeTab,
    searchParams,
    setSearchParams,
  } = useComplaintService();
  console.log(complaints)
  const handleFilterChange = (tab) => {
    if (tab === "All") {
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
    <div className="min-h-screen bg-slate-50 pb-4">
      <ComplaintHeader />

      <main className="max-w-5xl mx-auto px-6">
        <ComplaintFilters
          activeTab={searchParams.get("status") ?? "All"}
          onTabChange={(tab) => handleFilterChange(tab)}
          searchQuery={searchValue}
          onSearchChange={setSearchValue}
        />

        {complaintsLoading || complaintsFetching ? (
          <ComplaintListSkeleton />
        ) : (
          <ComplaintList
            activeTab={activeTab}
            searchQuery={searchValue}
            complaints={complaints?.results}
          />
        )}
        {!isSinglePage && (
          <div className=" bottom-0 mt-6 py-4 ">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              isFirstPage={isFirstPage}
              isLastPage={isLastPage}
              onPageChange={goToPage}
              className="
    bg-white border border-slate-200
    shadow-sm
  "
              buttonClassName="
  text-blue-700
  hover:bg-blue-50 hover:text-blue-400
"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default ComplaintListPage;
