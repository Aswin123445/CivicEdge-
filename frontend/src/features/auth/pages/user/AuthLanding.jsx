
import logo from "../../../../assets/civic_edge.svg";
import google_logo from "../../../../assets/google_logo.svg";
import email_logo from "../../../../assets/email_logo.svg";
import TabButton from "../../../../components/ui/tab_button";
import SocialButton from "../../components/SocialButton";
import AuthFooter from "../../components/AuthFooter";
import LogoHeader from "../../components/LogoHeader";
import useAuthLanding from "../../hooks/useAuthLanding";
import { useGoogleLogin } from "@react-oauth/google";
import { errorToast } from "../../../../utils/Toaster";


// animated underline with enter/exit
const AuthLanding = () => {
    const { mode, switchTo, handleGoogle, handleEmail } = useAuthLanding();
    const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Exchange access token with your backend
        await handleGoogle(tokenResponse.access_token);
      } catch  {
        //already handled in handleGoogle
      }
    },
    onError: (err) => {
      errorToast({ title: "Google Login Failed", description: err.error });
    },
  });
  const handleGoogleLogin = ()=> {
    login();
  }

  return (
        <div className="flex flex-col items-center gap-2 h-full my-9">
          <LogoHeader logo={logo} />
          <h2 className="text-3xl font-bold">Welcome!</h2>

          <div className="flex w-full justify-center gap-4 border-b mb-4 mx-7">
            <TabButton
              label="Sign In"
              active={mode === "signIn"}
              width="w-16"
              onClick={() => switchTo("signIn")}
            />
            <TabButton
              label="Register"
              active={mode === "signUp"}
              width="w-20"
              onClick={() => switchTo("signUp")}
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <SocialButton onClick = {()=> {handleGoogleLogin()}} icon={google_logo}  spinnerColor = "text-sky-400" classname1="h-12 w-12" classname={"pl-0"}>
              {mode === "signUp" ? "Continue with Google" : "Sign in with Google"}
            </SocialButton>

            <SocialButton onClick={handleEmail} icon={email_logo} loadingStatus = "halt">
              {mode === "signUp" ? "Continue with Email" : "Sign in with Email"}
            </SocialButton>
          </div>

          <AuthFooter mode={mode} switchTo={switchTo} />
        </div>
  );
};

export default AuthLanding;
