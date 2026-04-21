import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FileText, User, Calendar, Inbox } from "lucide-react";
import useAdminPostsList from "../../hooks/admin/adminPostsList";
import AdminPostsFilter from "../../components/admin/admin_posts_page/AdminPostsFilter";
import TableSkeleton from "../../../issues_execution/components/pending_review_page/TableSkelton";
import Pagination from "../../../../components/common/PaginationBar";

/**
 * CIVICEDGE ADMIN: POSTS LIST PAGE
 * ---------------------------------------
 * Tech Stack: React, TailwindCSS, Lucide-React
 * * Component Split Guide:
 * - ./components/admin/posts/PageHeader.jsx
 * - ./components/admin/posts/PostsTable.jsx
 * - ./components/admin/posts/PostRow.jsx
 * - ./components/admin/posts/PostSkeleton.jsx
 */

// --- SUB-COMPONENT: LOADING SKELETON ---


// --- SUB-COMPONENT: EMPTY STATE ---
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 bg-[#1e1e1e] border border-dashed border-slate-800 rounded-2xl text-center">
    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
      <Inbox className="text-slate-500 w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-slate-100">No posts found</h3>
    <p className="text-slate-400 mt-2">
      There are currently no discussions in the system.
    </p>
  </div>
);

// --- SUB-COMPONENT: POST ROW ---
const PostRow = ({ post, onView }) => {
  const statusStyles = {
    active: "bg-green-500/10 text-green-400 border-green-500/20",
    hidden: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    removed: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  const title = post.title.slice(0, 20);
  return (
    <tr
      onClick={() => {
        onView(post?.id);
      }}
      className="group border-b border-slate-800 last:border-0 hover:bg-slate-800/40 transition-colors cursor-pointer"
    >
      {/* Title & Preview */}
      <td className="py-4 px-6 max-w-md">
        <div className="space-y-0.5">
          <p className="text-sm font-bold text-slate-100 truncate">
            {post.reference_id}
          </p>
        </div>
      </td>

      {/* Author */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-2 text-slate-300">
          <User size={14} className="text-slate-500" />
          <span className="text-sm whitespace-nowrap">{post.user.name}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="text-xs font-medium text-green-400 bg-blue-500/5 px-2 py-1 rounded border border-blue-500/10 whitespace-nowrap">
          {title}
        </span>
      </td>
      {/* Category */}
      <td className="py-4 px-6">
        <span className="text-xs font-medium text-blue-400 bg-blue-500/5 px-2 py-1 rounded border border-blue-500/10 whitespace-nowrap">
          {post.category.name}
        </span>
      </td>

      {/* Date */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-2 text-slate-500 whitespace-nowrap">
          <Calendar size={13} />
          <span className="text-xs">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-6">
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusStyles[post.status]}`}
        >
          {post.status}
        </span>
      </td>

      {/* Highlight Toggle */}
    </tr>
  );
};

// --- MAIN PAGE COMPONENT ---
const AdminPostsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { posts, isLoadingPosts, isFetchingPosts, pagination } =
    useAdminPostsList();

  const isLoading = isLoadingPosts || isFetchingPosts;

  const handleView = (id) => navigate(`/dashboard/forum/posts/${id}`);
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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* COMPONENT: PageHeader */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
            <p className="text-slate-400 flex items-center gap-2 text-sm">
              <FileText size={16} className="text-blue-500" />
              Monitor, manage, and moderate all community discussions.
            </p>
          </div>

          <div className="flex items-center gap-3"></div>
        </header>
        <AdminPostsFilter
          search={pagination.searchValue}
          onSearch={pagination.setSearchValue}
          onStatusChange={handleStatusChange}
          statusFilter={pagination.searchParams.get("status") || "ALL"}
          orderingFilter={
            pagination.searchParams.get("ordering") || "-created_at"
          }
          onOrderingChange={handleOrderingChange}
          setSearchParams={setSearchParams}
        />
        {/* MAIN TABLE AREA */}
        <main className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            {isLoading ? (
              <TableSkeleton />
            ) : posts?.length > 0 ? (
              <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#1e1e1e]/50 border-b border-slate-800">
                        <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Reference ID
                        </th>
                        <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {posts?.map((post) => (
                        <PostRow
                          key={post.id}
                          post={post}
                          onView={handleView}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </main>
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

export default AdminPostsPage;
