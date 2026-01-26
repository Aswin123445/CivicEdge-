import LogoHeader from '../../components/LogoHeader';
import logo from '../../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ResetPasswordConfirmation() {
    const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate()
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
<div className="flex flex-col items-center my-6 px-4 text-center">
  <LogoHeader logo={logo} />
  <h2 className="text-3xl font-bold mt-4">Successful</h2>

  <p className="mt-10 text-gray-700 max-w-md">
    Your password has been <span className="font-bold">Reset Successfully</span>. 
    You can now log in securely with your new password.
  </p>

  <p className="mt-2 text-gray-500 text-sm">
    If you didn’t make this change, please reset your password again immediately or contact support for help.
  </p>

          <button
            onClick={() => navigate('/login')}
            className="bg-sky-400 w-28 text-white px-5 py-1.5 mt-7 rounded-full font-semibold hover:bg-sky-500 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
</div>



  );
}

