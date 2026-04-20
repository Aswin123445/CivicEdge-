// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Camera, User } from "lucide-react";

export default function EditableAvatar({ avatarUrl, onUpload }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <label className="relative cursor-pointer group block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-32 h-32"
        >
          {/* Outer Ring */}
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600/20 to-indigo-500/20 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500 pointer-events-none" />

          {/* Avatar Wrapper */}
          <div className="relative h-full w-full rounded-[1.8rem] bg-white p-1 shadow-xl ring-1 ring-slate-200 overflow-hidden pointer-events-none">
            <div className="relative h-full w-full rounded-[1.5rem] bg-slate-50 overflow-hidden flex items-center justify-center pointer-events-none">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110 pointer-events-none"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center pointer-events-none">
                  <User className="w-12 h-12 text-slate-400 pointer-events-none" strokeWidth={1.5} />
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                  <Camera className="w-6 h-6 text-white pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform pointer-events-none">
            <Camera className="w-3.5 h-3.5 pointer-events-none" />
          </div>
        </motion.div>

        <input
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            onUpload(file);
            e.target.value = null;
          }}
        />
      </label>
    </div>
  );
}