import { User } from "lucide-react";

export default function UserCard({ user, setSelectedCard, setIsFlagModalUser,role = null }) {
  return (
    <div
      key={user.id}
      className="flex justify-between items-center p-4 border border-gray-700 rounded-md bg-[#1e1e1e]"
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <div className="bg-gray-700 rounded-full hidden md:block h-12 w-12">
          {user?.profile ? (
            <img
              src={user.profile}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 ml-2 mt-1" />
          )}
        </div>
        <div>
          <h3 className="font-semibold">{user.name || "N/A"}</h3>
          <p className="text-sm text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-400">
            ID: {user.id?.slice(-6)}

          </p>
          <p className="text-sm text-gray-400">Zone: {user.zone || "N/A"}</p>
          <p className="text-sm text-gray-400">Phone: {user.phone || "N/A"}</p>
        </div>
      </div>

      {/* Right side */}
      <div className="text-right">
        <p className="font-semibold">{user.role}</p>
        <p className="text-sm text-gray-400">
          Member Since: {user.created_at?.substring(0, 10)}
        </p>
        <p className="text-sm text-gray-400">
          Status: {user.is_active ? "Active" : "Suspended"}
        </p>

        {/* Buttons (large screens) */}
        { role !== 'admin' &&
        <div className="hidden md:flex justify-end gap-2 mt-2">
          <button
            className="px-2 py-1 font-semibold text-sm rounded bg-cyan-500 hover:bg-cyan-600 text-white"
            onClick={() => setSelectedCard(user)}
          >
            Update
          </button>
          <button
            className="px-2 py-1 rounded font-semibold text-sm bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setIsFlagModalUser(user)}
          >
            Flag
          </button>
        </div>
        }

        {/* Dropdown (small screens) */}
        {role !== 'admin' &&
        <div className="md:hidden relative mt-2">
          <details className="inline-block">
            <summary className="cursor-pointer px-3 py-1 rounded bg-gray-700 text-white">
              ⋮
            </summary>
            <div className="absolute right-0 mt-1 w-28 bg-[#2a2a2a] border border-gray-700 rounded shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                onClick={() => setSelectedCard(user)}
              >
                Update
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600"
                onClick={() => setIsFlagModalUser(user)}
              >
                Flag
              </button>
            </div>

          </details>
        </div>
        }
      </div>
    </div>
  );
}
