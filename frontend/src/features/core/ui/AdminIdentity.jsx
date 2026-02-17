import { ShieldCheck } from "lucide-react";

export default function AdminIdentity({ user }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#181818] border border-slate-800">
      
      {/* Avatar Container */}
      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user?.name || "Admin"}
            className="w-full h-full object-cover"
          />
        ) : (
          <ShieldCheck className="w-5 h-5 text-blue-400" />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm text-slate-400">Administrator</span>
        <span className="text-base font-semibold text-slate-100">
          {user?.name || "Admin"}
        </span>
      </div>
    </div>
  );
}
