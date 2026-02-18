import getInitial from '../utils';

const NameUrlGet = ({ name, avatarUrl,classname = "",classname2="" }) => {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name || "User avatar"}
        className={` rounded-full object-cover ${classname}`}
      />
    );
  }

  return (
    <div className={`w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 text-sm font-semibold${classname2}`}>
      {getInitial(name)}
    </div>
  );
}

export default NameUrlGet
