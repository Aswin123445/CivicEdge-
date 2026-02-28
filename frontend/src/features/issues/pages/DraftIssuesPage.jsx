import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DraftHeader from "../components/draft_list/DraftHeader";
import DraftList from "../components/draft_list/DraftList";
import DraftEmptyState from "../components/draft_list/DraftEmptyState";
import DeleteDraftModal from "../components/draft_list/DeleteDraftModal";
import { containerVariants } from "../ui/motion";
import DraftToolbar from "../components/draft_list/DraftToolbar";
import useDraftPageService from "../hooks/draft_page_service";
import Pagination from "../../../components/common/PaginationBar";
import { errorToast, successToast } from "../../../utils/Toaster";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
const DraftIssuesPage = () => {
  const {
    drafts,
    draftsLoading,
    draftsFetching,
    draftsSuccess,
    page,
    pagination,
    searchValue,
    setSearchValue,
    goToPage,
    getPaginationState,
    totalPages,
    isSinglePage,
    isFirstPage,
    isLastPage,
    draftDelete,
    draftDeleteLoading,
  } = useDraftPageService();
  const [activeDraft, setActiveDraft] = useState(null);

  const handleDelete = (draftId) => {
    try {
      draftDelete(draftId).unwrap();
      successToast({
        title: "Draft Deleted",
        description: "The draft has been deleted successfully.",
      });
    } catch (error) {
      const message = extractErrorMessage(error);
      errorToast({ title: "Failed to Delete Draft", description: message });
    }
    setActiveDraft(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        {/* Header */}
        <DraftHeader />
        {/* Search / Toolbar */}
        <DraftToolbar
          searchQuery={searchValue}
          onSearchChange={setSearchValue}
        />
        {drafts?.length > 0 || draftsFetching || draftsLoading ? (
          <>
            {/* Draft List */}
            <motion.div
              key={page}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <DraftList
                onDeleteRequest={setActiveDraft}
                drafts={drafts}
                draftsLoading={draftsLoading}
                draftDeleteLoading={draftDeleteLoading}
                draftsFetching={draftsFetching}
              />
            </motion.div>
          </>
        ) : (
          <DraftEmptyState />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {activeDraft && (
          <DeleteDraftModal
            draft={activeDraft}
            onClose={() => setActiveDraft(null)}
            onConfirm={() => handleDelete(activeDraft.id)}
            draftDeleteLoading={draftDeleteLoading}
          />
        )}
      </AnimatePresence>
      {/* ===================== */}
      {/* PAGINATION */}
      {/* ===================== */}
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
    </div>
  );
};

export default DraftIssuesPage;
