export default function VerifyBadge({ label = "Verified" }) {
  return (
    <span
      className="
        inline-flex items-center
        gap-1.5
        px-2.5 py-0.5
        rounded-md
        bg-emerald-50
        text-emerald-700
        text-xs
        font-bold
        uppercase
        tracking-wide
        border border-emerald-200
      "
    >
      {label}
    </span>
  );
}
