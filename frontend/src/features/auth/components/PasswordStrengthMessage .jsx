const PasswordStrengthMessage = ({ unmetCriteria ,prefix}) => {
  if (unmetCriteria.length === 0) return null;

  return (
    <span className="text-red-500 text-xs ml-1">
      {prefix + ' ' +unmetCriteria.join(', ')}.
    </span>
  );
};

export default PasswordStrengthMessage;
