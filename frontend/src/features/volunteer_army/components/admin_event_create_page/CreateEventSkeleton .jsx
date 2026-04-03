const CreateEventSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">

      {/* Header */}
      <div className="space-y-3">
        <div className="h-8 w-64 bg-gray-900 rounded" />
        <div className="h-4 w-96 bg-gray-900 rounded" />
      </div>

      {/* SECTION 1 */}
      <div className="bg-[#1e1e1e] rounded-2xl p-6 space-y-6 border border-slate-800">
        
        {/* Section Title */}
        <div className="space-y-2">
          <div className="h-5 w-40 bg-gray-900 rounded" />
          <div className="h-3 w-72 bg-gray-900 rounded" />
        </div>

        {/* Dropdown */}
        <div className="space-y-2">
          <div className="h-3 w-32 bg-gray-900 rounded" />
          <div className="h-12 w-full bg-gray-900 rounded-xl" />
        </div>

        {/* Input */}
        <div className="space-y-2">
          <div className="h-3 w-32 bg-gray-900 rounded" />
          <div className="h-12 w-full bg-gray-900 rounded-xl" />
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="bg-[#1e1e1e] rounded-2xl p-6 space-y-6 border border-slate-800">
        
        <div className="space-y-2">
          <div className="h-5 w-40 bg-gray-900 rounded" />
          <div className="h-3 w-72 bg-gray-900 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-900 rounded" />
            <div className="h-12 w-full bg-gray-900 rounded-xl" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-900 rounded" />
            <div className="h-12 w-full bg-gray-900 rounded-xl" />
          </div>
        </div>
      </div>

      {/* SECTION 3 (Timeline) */}
      <div className="bg-[#1e1e1e] rounded-2xl p-6 space-y-6 border border-slate-800">

        <div className="space-y-2">
          <div className="h-5 w-40 bg-gray-900 rounded" />
          <div className="h-3 w-72 bg-gray-900 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-3 w-28 bg-gray-900 rounded" />
            <div className="h-12 bg-gray-900 rounded-xl" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-28 bg-gray-900 rounded" />
            <div className="h-12 bg-gray-900 rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-3 w-28 bg-gray-900 rounded" />
            <div className="h-12 bg-gray-900 rounded-xl" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-28 bg-gray-900 rounded" />
            <div className="h-12 bg-gray-900 rounded-xl" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default CreateEventSkeleton