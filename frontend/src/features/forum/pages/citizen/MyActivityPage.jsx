import Pagination from "../../../../components/common/PaginationBar";
import ActivityCard from "../../components/citizen/my_activity_page/ActivityCard";
import EmptyState from "../../components/citizen/my_activity_page/EmptyState";
import FetchingBar from "../../components/citizen/my_activity_page/FetchingBar";
import PageHeader from "../../components/citizen/my_activity_page/PageHeader";
import { SkeletonGrid } from "../../components/citizen/my_activity_page/SkeletonLoader";
import TabsSection from "../../components/citizen/my_activity_page/TabsSection";
import useMyActivity from "../../hooks/citizen/myActivity";
import { useNavigate } from "react-router-dom";

const MyActivityPage = () => {
  const navigate = useNavigate();
  const { myActivity, myActivityLoading, myActivityFetching, pagination } =
    useMyActivity();
    console.log(myActivity)

  // Null-safe: always work with an array
  const posts = Array.isArray(myActivity) ? myActivity : [];

  const handleCardClick = (id) => {
    navigate(`/forum/posts/${id}`);
  };

  const handleStartDiscussion = () => {
    // e.g. navigate("/forum/new")
    console.log("Navigating to create post page");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen bg-white">
      <PageHeader />
      {/*
        FetchingBar: only shown during background refetch (not initial load).
        Sits above stale data so the user knows an update is coming.
      */}
      {myActivityFetching && !myActivityLoading && <FetchingBar />}

      <div className="space-y-4 mb-3">
        {myActivityLoading ? (
          // Initial load → shimmer skeletons
          <SkeletonGrid count={4} />
        ) : posts.length > 0 ? (
          // Data available → activity cards
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <ActivityCard
                key={post?.id ?? Math.random()}
                post={post}
                onClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          // No data → prompt to create first discussion
          <EmptyState onAction={handleStartDiscussion} />
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
    </div>
  );
};

export default MyActivityPage;
