import { Eye, EyeOff } from "lucide-react";
const StaticFloatingLabelInput = ({
  label,
  type,
  placeholder,
  registerprob,
  error,
  setShowPassword,
  showPassword,
  needShowPasswordToggle = false,
}) => {
  return (
    <div className="relative w-full">
      <label className="absolute -top-3 left-3 bg-white text-sm font-bold text-gray-500 px-3">
        {label}
      </label>
      <input
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        {...registerprob}
        className={`w-full h-9 border ${
          error ? "border-red-500" : "border-gray-500"
        } rounded-xl px-3 py-3 text-sm focus:border-transparent outline-none focus:ring-2 focus:ring-sky-300 placeholder:font-semibold`}
      />
      {/* Icon inside input */}
      {needShowPasswordToggle && <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>}
    </div>
  );
};

export default StaticFloatingLabelInput;
