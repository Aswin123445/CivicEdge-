import { useParams } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePostDetailsHook from "../../hooks/citizen/postDetails";
import useCommentListHook from "../../hooks/citizen/commentList";
import {
  CommentCountSkeleton,
  CommentListSkeleton,
  PostDetailSkeleton,
} from "../../components/citizen/post_detail_page/PostDetailSkeleton";
import PostHeader from "../../components/citizen/post_detail_page/PostHeader";
import MediaGrid from "../../components/citizen/post_detail_page/MediaGrid";
import ReactionBar from "../../components/citizen/post_detail_page/ReactionBar";
import CommentForm from "../../components/citizen/post_detail_page/CommentForm";
import CommentItem from "../../components/citizen/post_detail_page/CommentItem(1)";
import Pagination from "../../../../components/common/PaginationBar";
import useCreateCommentHook from "../../hooks/citizen/createComment";
import usePostReact from "../../hooks/citizen/postReact";
import useReportContent from "../../hooks/citizen/reportContent";
import ReportCommentModal from "../../ui/ReportCommentModal";
import useUpdatePost from "../../hooks/citizen/updatePost";
import UpdatePostModal from "../../ui/UpdatePostModal";
import useDeletePost from "../../hooks/citizen/deletePost";
import DeleteConfirmModal from "../../ui/DeleteConfirmModal";
import useUpdateComment from "../../hooks/citizen/commentUpdate";
import UpdateCommentModal from "../../ui/UpdateCommentModal";
import useDeleteComment from "../../hooks/citizen/commentDelete";
import DeleteCommentConfirmModal from "../../ui/DeleteCommentConfirmModal";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    post,
    postLoading,
    postFetching,
    isOwnPost,
    user,
    isModalOpen,
    setIsModalOpen,
    isCommentModalOpen,
    setIsCommentModalOpen,
  } = usePostDetailsHook(id);

  const { handleReport, reportContentLoading, setPayload, payload } =
    useReportContent();

  const {
    newComment,
    setNewComment,
    handleCommentSubmit,
    commentLoading,
    commentFetching,
    activeCommentId,
    setActiveCommentId,
  } = useCreateCommentHook(id);
  const {
    comments,
    commentsLoading,
    commentsFetching,
    pagination,
    total_comments,
  } = useCommentListHook(id);

  const { handleReact } = usePostReact(id);

  const resolvedPost = post ?? [];

  const {
    updatePostLoading,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    handleUpdatePost,
  } = useUpdatePost(id);

  const {
    deletePostLoading,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleDeletePost,
  } = useDeletePost(id);

  const {
    updateCommentLoading,
    isCommentUpdateModalOpen,
    setIsCommentUpdateModalOpen,
    updateCommentId,
    setUpdateCommentId,
    updateCommentInitialContent,
    setUpdateCommentInitialContent,
    handleUpdateComment,
  } = useUpdateComment();

  const {
    deleteComment,
    deleteCommentLoading,
    isCommentDeleteModalOpen,
    setIsCommentDeleteModalOpen,
    deleteCommentId,
    setDeleteCommentId,
    handleDeleteComment
  } = useDeleteComment();
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* ── Post section ─────────────────────────────────────────────── */}
        {postLoading ? (
          <PostDetailSkeleton />
        ) : (
          <section className="space-y-6">
            {/* Subtle refetch indicator */}
            {postFetching && (
              <div className="h-0.5 w-full rounded bg-blue-400/40 animate-pulse" />
            )}

            <PostHeader
              navigate = {navigate}
              title={resolvedPost?.title}
              category={resolvedPost?.category}
              time={resolvedPost?.created_at}
              onBack={() => {
                navigate("/forum/home");}}
              isOwnPost={isOwnPost}
              user={user}
              onReport={handleReport}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              id={resolvedPost?.id}
              setPayload={setPayload}
              payload={payload}
              isUpdateModalOpen={isUpdateModalOpen}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              updatePostLoading={updatePostLoading}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
            />

            <p className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap">
              {resolvedPost?.content}
            </p>

            <MediaGrid media={resolvedPost?.media} />

            <ReactionBar
              summary={resolvedPost?.reaction_summary}
              userReaction={resolvedPost?.user_reaction}
              onReact={handleReact}
            />
          </section>
        )}

        {/* ── Comments section ─────────────────────────────────────────── */}
        <section className="pt-2 space-y-5">
          {/* Section heading */}
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
            <MessageSquare className="w-5 h-5 text-slate-400" />
            Comments
            {commentsLoading ? (
              <CommentCountSkeleton />
            ) : (
              <span className="text-slate-500 font-normal text-base">
                ({total_comments ?? 0})
              </span>
            )}
          </div>

          {/* Add comment */}
          <CommentForm
            value={newComment}
            onChange={setNewComment}
            onSubmit={handleCommentSubmit}
          />

          {/* Comment list */}
          {commentsLoading ? (
            <CommentListSkeleton count={3} />
          ) : (
            <div className="relative">
              {/* Background refetch indicator */}
              {commentsFetching && (
                <div className="absolute -top-2 left-0 right-0 h-0.5 rounded bg-blue-400/40 animate-pulse" />
              )}

              {comments?.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {comments?.map((comment) =>
                    comment?.id ? (
                      <CommentItem
                        key={comment.id}
                        comment={comment}
                        isModalOpen={isCommentModalOpen}
                        setIsModalOpen={setIsCommentModalOpen}
                        payload={payload}
                        setPayload={setPayload}
                        onReport={handleReport}
                        onReportClick={(id) => {
                          setActiveCommentId(id);
                          setIsModalOpen(true);
                        }}
                        setIsCommentUpdateModalOpen={
                          setIsCommentUpdateModalOpen
                        }
                        updateCommentId={updateCommentId}
                        setUpdateCommentId={setUpdateCommentId}
                        updateCommentInitialContent={
                          updateCommentInitialContent
                        }
                        setUpdateCommentInitialContent={
                          setUpdateCommentInitialContent
                        }
                        setIsCommentDeleteModalOpen = {setIsCommentDeleteModalOpen}
                        setDeleteCommentId = {setDeleteCommentId}
                      />
                    ) : null,
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
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
                  <p className="text-slate-400 text-sm">
                    No comments yet. Be the first to share your thoughts.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      {/* Mobile bottom spacer */}
      <div className="h-16 sm:hidden" />
      <ReportCommentModal
        type="comment"
        id={activeCommentId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReport}
        payload={payload}
        setPayload={setPayload}
      />
      <UpdatePostModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdatePost}
        initialData={resolvedPost}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePost}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone and all associated data will be permanently removed."
      />
      <UpdateCommentModal
        isOpen={isCommentUpdateModalOpen}
        onClose={() => setIsCommentUpdateModalOpen(false)}
        onSubmit={handleUpdateComment}
        initialContent={updateCommentInitialContent}
        setInitialContent={setUpdateCommentInitialContent}
      />
      <DeleteCommentConfirmModal
        isOpen={isCommentDeleteModalOpen}
        onClose={() => setIsCommentDeleteModalOpen(false)}
        onConfirm={handleDeleteComment}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone and all associated data will be permanently removed."
      />
    </div>
  );
};

export default PostDetailPage;
