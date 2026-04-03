// pages/citizen/MyRecognitionsPage.jsx
import Pagination from "../../../../components/common/PaginationBar";
import RecognitionCard from "../../components/my_recognitions/RecognitionCard";
import { RecognitionGridSkeleton } from "../../components/my_recognitions/RecognitionCardSkeleton";
import RecognitionsEmptyState from "../../components/my_recognitions/RecognitionsEmptyState";
import RecognitionsHeader from "../../components/my_recognitions/RecognitionsHeader";
import useMyRecognition from "../../hooks/citizen/myRecognition";

const MyRecognitionsPage = () => {
  const {
    myRecognitionData,
    myRecognitionLoading,
    myRecognitionFetching,
    pagination,
    total,
  } = useMyRecognition();
  const showSkeleton = myRecognitionFetching || myRecognitionLoading;

  const hasData = !showSkeleton && (myRecognitionData?.length ?? 0) > 0;

  return (
    <div className=" bg-white pb-2 mb-3">
      {/* Header — own skeleton for count badge */}
      <RecognitionsHeader count={total} isLoading={showSkeleton} />

      {/* Main grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {showSkeleton ? (
          <RecognitionGridSkeleton count={3} />
        ) : hasData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {myRecognitionData.map((item) => (
              <RecognitionCard key={item?.id} recognition={item} />
            ))}
          </div>
        ) : (
          <RecognitionsEmptyState />
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

      {/* Footer accent */}
      {hasData && (
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-1 opacity-40 mb-3">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            Building Trust • Powered by CivicEdge Protocol
          </p>
        </footer>
      )}
    </div>
  );
};

export default MyRecognitionsPage;
