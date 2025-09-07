
import logo from "../../../assets/logo.png";
import google_logo from "../../../assets/google_logo.png";
import email_logo from "../../../assets/email_logo.png";
import TabButton from "../../../components/ui/tab_button";
import SocialButton from "../components/SocialButton";
import AuthFooter from "../components/AuthFooter";
import LogoHeader from "../components/LogoHeader";
import useAuthLanding from "../hooks/useAuthLanding";
import { useGoogleLogin } from "@react-oauth/google";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


// animated underline with enter/exit
const AuthLanding = () => {
    const data = useSelector((state) => state.auth);
    console.log(data)
    const { user } = useSelector((state) => state.auth);
    const { mode, switchTo, handleGoogle, handleEmail } = useAuthLanding();
    const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Exchange access token with your backend
        handleGoogle(tokenResponse.access_token);
      } catch (err) {
        console.error(err);
        alert("Login failed");
      }
    },
    onError: (err) => {
      console.log(err)
      alert("Login failed");
    },
  });
  const handleGoogleLogin = async()=> {
    await login();
  }
  if (user) {
    return <Navigate to="/dashboard" replace />;
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
