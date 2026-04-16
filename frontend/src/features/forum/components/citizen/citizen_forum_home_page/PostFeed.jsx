import React from "react";
import PostCard from "./PostCard";
import { PostFeedSkeleton } from "./PostCardSkeleton";


const PostFeed = ({ posts,handleDetailsClick, isLoading = false, isFetching = false }) => {
  if (isLoading || isFetching) {
    return <PostFeedSkeleton count={3} />;
  }

  const safePosts = Array.isArray(posts) ? posts : [];

  if (safePosts.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-2xl mb-16">
        <p className="text-slate-500">
          No discussions found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background refetch indicator: thin top bar */}
      {isFetching && !isLoading && (
        <div className="absolute -top-3 left-0 right-0 h-0.5 rounded overflow-hidden">
          <div className="h-full bg-blue-400/50 animate-pulse" />
        </div>
      )}
      <div className="flex flex-col gap-4">
        {safePosts.map((post) =>
          post?.id ? <PostCard key={post.id} post={post} handleDetailsClick={handleDetailsClick} /> : null
        )}
      </div>
    </div>
  );
};

export default PostFeed;
