const CitizenBellIconNotification = ({ count = 0, onClick ,className = ""}) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 rounded-full hover:bg-blue-700/50 active:scale-95 transition-all duration-200 ${className}`}
    >
      {/* Bell Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405C18.79 15.21 18 13.705 18 12V8a6 6 0 10-12 0v4c0 1.705-.79 3.21-1.595 3.595L4 17h5m6 0a3 3 0 11-6 0m6 0H9"
        />
      </svg>

      {count > 0 && (
        <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5 leading-none">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
};

export default CitizenBellIconNotification;