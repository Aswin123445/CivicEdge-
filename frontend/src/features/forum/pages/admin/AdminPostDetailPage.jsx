import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Tag,
  MessageSquare,
  ThumbsUp,
  Award,
  Pin,
  Star,
  ShieldAlert,
  Image as ImageIcon,
  Loader2,
  XCircle,
  EyeOff,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { useParams } from "react-router-dom";
import usePostDetails from "../../hooks/admin/postDetails";
import useToggleHighlight from "../../hooks/admin/toggleHighlight";
import useModeratePosts from "../../hooks/admin/moderatePosts";
import PostDetailsSkeleton from "../../components/admin/admin_posts_details/PostDetailsSkeleton";

/**
 * CIVICEDGE ADMIN: POST DETAIL PAGE
 * ---------------------------------------
 * Component Split Guide:
 * - ./components/admin/posts/PageHeader.jsx
 * - ./components/admin/posts/PostMainContent.jsx (User, Metadata, Content, Media)
 * - ./components/admin/posts/EngagementStats.jsx
 * - ./components/admin/posts/ControlPanel.jsx
 * - ./components/admin/posts/ModerationModal.jsx
 */

// --- SUB-COMPONENT: LOADING SKELETON ---

// --- MAIN PAGE COMPONENT ---
const AdminPostDetailPage = () => {
  const { id } = useParams();
  const { post, postLoading, postFetching } = usePostDetails(id);
  const { handleHighlightToggle, toggleHighlightLoading } =
    useToggleHighlight();
  const {
    modalOpen,
    setModalOpen,
    modAction,
    setModAction,
    modReason,
    setModReason,
    modError,
    handleModeration,
    moderatePostsLoading,
  } = useModeratePosts(id);
  const navigate = useNavigate();
  const isLoading = postLoading || postFetching;

  if (isLoading) return <PostDetailsSkeleton />;
  if (!post)
    return (
      <div className="text-center py-20 text-slate-400">
        Post not found or removed
      </div>
    );

  return (
    <div className=" bg-[#1e1e1e] text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* SECTION: PageHeader */}
        <header className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/forum/posts")}
            className="p-2 bg-[#1e1e1e] border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Post Details</h1>
        </header>

        <main className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN: Post Inspection (col-span-8) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* SECTION: UserInfoSection & Metadata */}
            <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-6 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={post?.user?.profile}
                  alt={post?.user.name}
                  className="w-14 h-14 rounded-full border-2 border-slate-800"
                />
                <div>
                  <h3 className="text-lg font-bold">{post?.user.name}</h3>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Mail size={14} />
                    {post?.user.email}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Category
                  </p>
                  <div className="flex items-center gap-2 text-blue-400 font-semibold justify-end">
                    <Tag size={14} />
                    {post?.category.name}
                  </div>
                </div>
                <div className="text-right border-l border-slate-800 pl-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Posted On
                  </p>
                  <div className="flex items-center gap-2 text-slate-300 justify-end">
                    <Calendar size={14} />
                    {new Date(post?.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION: PostContentSection */}
            <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-8 space-y-6">
              <h2 className="text-3xl font-extrabold leading-tight text-slate-50">
                {post?.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {post?.content}
                </p>
              </div>

              {/* SECTION: MediaGallery */}
              {post?.media?.length > 0 && (
                <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post?.media.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video rounded-lg overflow-hidden border border-slate-700 group"
                    >
                      <img
                        src={img.url}
                        alt="Post media"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION: EngagementStats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "Comments",
                  value: post.comments_count,
                  icon: MessageSquare,
                  color: "text-blue-400",
                },
                {
                  label: "Likes",
                  value: post.reaction_summary.like || 0,
                  icon: ThumbsUp,
                  color: "text-green-400",
                },
                {
                  label: "Appreciates",
                  value: post.reaction_summary.appreciate || 0,
                  icon: Award,
                  color: "text-purple-400",
                },
                {
                  label: "Important",
                  value: post.reaction_summary.important || 0,
                  icon: Pin,
                  color: "text-orange-400",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#1e1e1e] border border-slate-800 p-4 rounded-xl text-center space-y-1"
                >
                  <stat.icon
                    size={20}
                    className={`${stat.color} mx-auto mb-2`}
                  />
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Control Panel (col-span-4) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-[#1e1e1e] border border-slate-800 rounded-xl p-6 sticky top-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ShieldAlert size={18} className="text-blue-500" />
                  Moderation Controls
                </h3>
                <div className="p-3 bg-[#1e1e1e] border border-slate-800 rounded-lg mb-6">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">
                    Current Status
                  </p>
                  <span
                    className={`px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[10px] font-bold ${post.status === "removed" ? "text-red-400" : ""} ${post.status === "hidden" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : ""} ${post.status === "removed" ? "bg-red-500/10 text-red-400 border-red-500/20" : ""}`}
                  >
                    {post?.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    handleHighlightToggle(post?.id);
                  }}
                  disabled={toggleHighlightLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all border border-slate-700"
                >
                  <Star
                    size={18}
                    className={`text-yellow-500 ${post?.is_highlighted ? "fill-yellow-500" : ""}`}
                  />
                  Highlight Post
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                >
                  Moderate Post
                </button>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  Quick Insights
                </p>
                <ul className="space-y-3">
                  <li className="flex justify-between text-sm">
                    <span className="text-slate-400">Media Count</span>
                    <span className="font-bold">
                      {post?.media.length} Images
                    </span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg. Reaction Rate</span>
                    <span className="font-bold">High</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* COMPONENT: ModerationModal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1e1e]/90 backdrop-blur-sm">
          <div className="bg-[#1e1e1e] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldAlert size={20} className="text-blue-500" />
                Moderate Post
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "hide",
                    label: "Hide Post",
                    icon: EyeOff,
                    color: "hover:border-yellow-500/50",
                  },
                  {
                    id: "remove",
                    label: "Remove",
                    icon: Trash2,
                    color: "hover:border-red-500/50",
                  },
                  {
                    id: "restore",
                    label: "Restore",
                    icon: RotateCcw,
                    color: "hover:border-green-500/50",
                  },
                ].map((action) => (
                  <button
                    key={action.id}
                    onClick={() => setModAction(action.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                      modAction === action.id
                        ? "bg-blue-600/10 border-blue-600 text-blue-400"
                        : "bg-[#1e1e1e] border-slate-800 text-slate-500 " +
                          action.color
                    }`}
                  >
                    <action.icon size={20} />
                    <span className="text-xs font-bold">{action.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Internal Reason / Note
                </label>
                <textarea
                  value={modReason}
                  onChange={(e) => setModReason(e.target.value)}
                  placeholder="Explain the reason for this moderation action..."
                  className={`w-full bg-[#1e1e1e] border ${modError ? "border-red-500" : "border-slate-800"} rounded-lg p-3 text-sm text-slate-200 focus:border-blue-500 outline-none h-28 resize-none transition-all`}
                />
                {modError && (
                  <p className="text-red-500 text-[10px] font-bold">
                    {modError}
                  </p>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleModeration}
                disabled={moderatePostsLoading || !modAction || !modReason}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
              >
                {moderatePostsLoading && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPostDetailPage;
