import { Search } from "lucide-react";

export default function SearchBar({search,setSearchValue}) {
  return (
    <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl px-3 py-3 flex items-center gap-2 ">
      <Search size={16} className="text-gray-400" />
      
      <input
        value={search}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Search by issue ID, title, or location..."
        className="bg-transparent outline-none text-sm text-gray-200 placeholder:text-gray-500 w-full"
      />
    </div>
  );
}