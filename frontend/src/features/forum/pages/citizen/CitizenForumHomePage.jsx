import React, { useState } from "react";
import usePostList from "../../hooks/citizen/postList";
import PageHeader from "../../components/citizen/citizen_forum_home_page/PageHeader";
import CategoryList from "../../components/citizen/citizen_forum_home_page/CategoryList";
import SortBar from "../../components/citizen/citizen_forum_home_page/SortBar";
import PostFeed from "../../components/citizen/citizen_forum_home_page/PostFeed";
import uselistCategory from "../../hooks/citizen/listCategory";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../../../components/common/PaginationBar";


const CitizenForumHomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { posts, isLoadingPosts, isFetchingPosts, pagination } = usePostList();
  const { categories, isLoadingCategory, isFetchingCategory } =
    uselistCategory();

  const handleFilterChange = (tab) => {
    if (tab === null) {
      setSearchParams((pre) => {
        pre.delete("category");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("category", tab);
        pre.set("page", "1");
        return pre;
      });
    }
  };
  const handleOrderingChange = (tab) => {
    if (tab === "Latest") {
      setSearchParams((pre) => {
        pre.delete("ordering");
        return pre;
      });
    } else {
      setSearchParams((pre) => {
        pre.set("ordering", 'created_at');
        pre.set("page", "1");
        return pre;
      });
    }
  };
  // Resolve: use live data if available, fall back to mock

  return (
    <div className=" bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PageHeader onCreatePost={() => {navigate("/forum/posts/create")}} />

        <CategoryList
          categories={isLoadingCategory ? [] : categories}
          activeCategoryName={searchParams.get("category") || null}
          onSelect={handleFilterChange}
          isLoading={isLoadingCategory || isFetchingCategory}
        />

        <SortBar
          postCount={isLoadingPosts ? 0 : posts?.length}
          sortValue={searchParams.get("ordering") || "Latest"}
          onSort={handleOrderingChange}
        />

        <main>
          <PostFeed
            posts={posts}
            isLoading={isLoadingPosts}
            isFetching={isFetchingPosts}
            handleDetailsClick={(id) => navigate(`/forum/posts/${id}`)}
          />
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
    </div>
  );
};

export default CitizenForumHomePage;
