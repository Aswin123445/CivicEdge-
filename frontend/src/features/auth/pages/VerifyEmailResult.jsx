import LogoHeader from '../components/LogoHeader';
import logo from '../../../assets/logo.png';
import { useSearchParams } from "react-router-dom";
import { useVerifyEmailQuery } from '../services/authApi';
export default function VerifyEmailResult() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { data, error, isLoading } = useVerifyEmailQuery({ token });
  return (
    <div className="flex flex-col items-center my-6 px-4 text-center">
      <LogoHeader logo={logo} />

      {isLoading && (
        <>
          <h2 className="text-3xl font-bold mt-4">Verifying...</h2>
          <p className="mt-4 text-gray-600">Hold on while we confirm your email address.</p>
        </>
      )}

      {!isLoading && data  && (
        <>
          <h2 className="text-3xl font-bold mt-4">Email Verified 🎉</h2>
          <p className="mt-6 text-gray-700 max-w-md">
            Welcome aboard, <span className="font-semibold">{data?.user?.name || "User"}</span>! Your email has been successfully verified.
          </p>
        </>
      )}

      {error && (
        <>
          <h2 className="text-3xl font-bold mt-4 text-red-500">Verification Failed</h2>
          <p className="mt-6 text-gray-700 max-w-md">
            Sorry, we couldn’t verify your email. This link may be invalid or expired.
          </p>
        </>
      )}
    </div>
  );
}
