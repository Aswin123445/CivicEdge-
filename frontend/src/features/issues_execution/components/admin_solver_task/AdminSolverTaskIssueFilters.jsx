import SearchBar from "../../ui/pending_review_page/SearchBar";

const Status = [
    { name: "All", reference_id: "All" },
    { name: "Assigned", reference_id: "ASSIGNED" },
    { name: "Verification Submitted", reference_id: "VERIFICATION_SUBMITTED" },
    { name: "Approved for Execution", reference_id: "APPROVED_FOR_EXECUTION" },
    { name: "In Execution", reference_id: "IN_EXECUTION" },
    { name: "Completion Submitted", reference_id: "COMPLETION_SUBMITTED" },
    { name: "Completed", reference_id: "COMPLETED" },
];

function AdminSolverTaskIssueFilters({searchValue, setSearchValue,activeTab,onTabChange, handleOderingChange,activeSort }) {
  const sorts = ["Newest","Oldest"];


  return (
    <div className="bg-[#1e1e1e] px-3 py-3 rounded-xl border border-[#2a2a2a] space-y-3">

      {/* Category Section */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 uppercase tracking-wide shrink-0">
          Status
        </span>

        <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          {Status.map((item) => (
            <button
              key={item.reference_id}
              onClick={() => onTabChange(item.reference_id)}
              className={`flex-shrink-0 px-3 py-1.5 text-sm rounded-md transition
                ${
                  activeTab === item.reference_id
                    ? "bg-white/5 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Section */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 uppercase tracking-wide shrink-0">
          Sort
        </span>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {sorts.map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === "Newest") {
                  handleOderingChange("-created_at");
                } else {
                  handleOderingChange("created_at");
                }
              }}
              className={`flex-shrink-0 px-3 py-1.5 text-sm rounded-md transition
                ${
                  activeSort === item
                    ? "bg-white/5 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="md:w-1/3">
        <SearchBar search = {searchValue} setSearchValue={setSearchValue } />

        </div>
      </div>

    </div>
  );
}

export default AdminSolverTaskIssueFilters;