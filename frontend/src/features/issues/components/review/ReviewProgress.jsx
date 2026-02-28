// ReviewProgress.jsx
export default function ReviewProgress() {
  const steps = [
    "Issue Details",
    "Add Photos",
    "Mark Location",
    "A Few Questions",
    "Review Issue",
  ];

  return (
    <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-50 via-blue-100/60 to-white border border-blue-200/60 shadow-lg mb-12">
      <div className="grid grid-cols-5 gap-3">
        {steps.map((step) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className="h-1.5 w-full rounded-full bg-blue-600" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 text-center">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}