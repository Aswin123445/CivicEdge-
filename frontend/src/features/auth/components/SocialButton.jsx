const SocialButton = ({ onClick, icon, children ,classname1, classname }) => {
  return (
    <button
      onClick={onClick}
      className="pr-2 flex items-center justify-center mx-16 border border-1 border-gray-400 rounded-full hover:shadow-sm transition text-sm"
    >
      <div className={`flex items-center mt-auto h-10 w-10  ${classname}`}>
        <img src={icon} alt="" className={`h-6 w-6 ${classname1} `} />
      </div>
      <span className="font-bold text-lg text-gray-700">{children}</span>
    </button>
  );
};
export default SocialButton;