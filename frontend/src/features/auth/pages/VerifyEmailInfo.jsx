import LogoHeader from '../components/LogoHeader';
import logo from '../../../assets/logo.png';

export default function VerifyEmailInfo() {
  return (
<div className="flex flex-col items-center my-6 px-4 text-center">
  <LogoHeader logo={logo} />
  <h2 className="text-3xl font-bold mt-4 ">Verify Your Email</h2>

  <p className="mt-10 text-gray-700 max-w-md ">
    Thanks for signing up, 
    We’ve just sent a verification link to your email. Please check your <span className='font-bold'>inbox</span> and click the link to activate your account.
  </p>

  <p className="mt-2 text-gray-500 text-sm">
    Can’t find the email? It might be hiding in your spam or promotions folder. You can also resend the link if needed.
  </p>
</div>

  );
}

