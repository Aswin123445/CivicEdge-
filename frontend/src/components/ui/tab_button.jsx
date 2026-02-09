import Underline from "./Underline";
const TabButton = ({ label, active, width, onClick }) => {
  return (
    <div className="mt-3 flex flex-col items-center w-16">
      <button
        className={`text-center font-semibold text-xl  ${
          active ? "text-gray-900" : "text-gray-500"
        }`}
        onClick={onClick}
        aria-selected={active}
      >
        {label}
      </button>
      <Underline active={active} width={width} />
    </div>
  );
};
export default TabButton;