const StaticFloatingLabelInput = ({
  label,
  type,
  placeholder,
  registerprob,
  error,
}) => {
  return (
    <div className="relative w-full">
      <label className="absolute -top-3 left-3 bg-white text-sm font-bold text-gray-500 px-3">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...registerprob}
        className={`w-full h-9 border ${
          error ? 'border-red-500' : 'border-gray-500'
        } rounded-xl px-3 py-3 text-sm focus:border-transparent outline-none focus:ring-2 focus:ring-sky-300 placeholder:font-semibold`}
      />
    </div>
  );
};

export default StaticFloatingLabelInput;
