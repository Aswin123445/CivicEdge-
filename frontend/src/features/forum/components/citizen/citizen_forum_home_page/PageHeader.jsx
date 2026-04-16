import React from "react";
import { Plus } from "lucide-react";

/**
 * PageHeader
 * Props:
 *   onCreatePost {function} - Called when "Create Post" is clicked
 */
const PageHeader = ({ onCreatePost }) => (
  <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
    <div className="space-y-1">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
        Community Discussions
      </h1>
      <p className="text-slate-500 text-lg">
        Explore civic issues and discussions in your community.
      </p>
    </div>
    <button
      onClick={onCreatePost}
      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm focus:ring-4 focus:ring-blue-100"
    >
      <Plus size={18} />
      <span>Create Post</span>
    </button>
  </header>
);

export default PageHeader;
