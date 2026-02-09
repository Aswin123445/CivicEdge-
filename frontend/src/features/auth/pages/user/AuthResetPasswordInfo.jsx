import LogoHeader from '../../components/LogoHeader';
import logo from '../../../../assets/civic_edge.svg';
import BackArrow from '../../../../components/ui/BackArrow';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthResetPasswordInfo() {
    const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate()
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
<div className="flex flex-col items-center my-6 px-4 text-center">
  <LogoHeader logo={logo} />
  <h2 className="text-3xl font-bold mt-4">Reset Password</h2>

  <p className="mt-10 text-gray-700 max-w-md">
    We’ve just sent a password reset link to your email. 
    Please check your <span className="font-bold">inbox</span> and click the link to set a new password.
  </p>

  <p className="mt-2 text-gray-500 text-sm">
    Can’t find the email? It might be in your spam or promotions folder. 
    You can also request a new link if needed.
  </p>

  <div
    onClick={() => navigate('/landing')}
    className="mt-6 text-sky-400 cursor-pointer font-bold text-lg"
  >
    <BackArrow />
  </div>
</div>


  );
}

