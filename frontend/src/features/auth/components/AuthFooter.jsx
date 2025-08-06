const AuthFooter = ({ mode, switchTo }) => {
  return (
    <div className="text-xs text-gray-600 mt-2">
      {mode === "signIn" ? (
        <span>
          Don’t have an account?{" "}
          <span
            onClick={() => {
              switchTo("signUp");
            }}
            className="text-sky-400 cursor-pointer font-semibold"
          >
            Create One
          </span>
        </span>
      ) : (
        <span>
          Already have an account?{" "}
          <span
            onClick={() => switchTo("signIn")}
            className="text-sky-400 cursor-pointer font-semibold"
          >
            Sign In
          </span>
        </span>
      )}
    </div>
  );
};
export default AuthFooter;