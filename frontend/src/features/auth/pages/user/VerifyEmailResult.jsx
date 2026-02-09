import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyEmailQuery } from "../../services/authApi";
import { Loader2 } from "lucide-react";
import LogoHeader from "../../components/LogoHeader";
import BackArrow from "../../../../components/ui/BackArrow";
import logo from "../../../../assets/civic_edge.svg";


export default function VerifyEmailResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { data, error, isLoading } = useVerifyEmailQuery({ token });

  return (
    <div className="flex flex-col items-center my-6 px-4 text-center">
      <LogoHeader logo={logo} />
      <h2 className="text-3xl font-bold">Email Verification</h2>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4 animate-in fade-in duration-300">
          <Loader2 className="w-10 h-10 text-sky-400 animate-spin" />
          <p className="text-gray-600 text-sm text-center">
            Hold on while we confirm your email address.
          </p>
        </div>
      )}

      {/* Success State */}
      {!isLoading && data && (
        <>
          <p className="mt-16 text-gray-700 max-w-md">
            Welcome aboard,{" "}
            <span className="font-semibold">
              {data?.user?.name || "User"}
            </span>
            ! Your email has been{" "}
            <span className="text-green-500 font-bold">successfully verified.</span>
          </p>

          <div className="flex w-full items-center justify-between">
            <div
              onClick={() => navigate("/landing")}
              className="mt-9 text-gray-700 cursor-pointer font-bold text-lg"
            >
              <BackArrow />
            </div>
            <div>
              <button
                onClick={() => navigate("/login")}
                className="bg-sky-400 text-white mt-8 py-1.5 rounded-full font-semibold hover:bg-sky-500 disabled:cursor-not-allowed w-28"
              >
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Error State */}
      {error && (
        <>
          <h2 className="text-xl font-bold mt-20 text-red-500">
            Verification Failed
          </h2>
          <p className="mt-3 text-gray-700 max-w-md">
            Sorry, we couldn’t verify your email. This link may be invalid or expired.
          </p>
          <div
            onClick={() => navigate("/landing")}
            className="mt-6 text-sky-400 cursor-pointer font-bold text-lg"
          >
            <BackArrow />
          </div>
        </>
      )}
    </div>
  );
}
