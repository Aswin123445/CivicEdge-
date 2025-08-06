import React, { useState, useEffect } from "react";
import AuthLayout from "../../../layout/AuthLayout";
import Card from "../../../components/ui/Card";
import logo from "../../../assets/logo.png";
import google_logo from "../../../assets/google_logo.png";
import email_logo from "../../../assets/email_logo.png";
import TabButton from "../../../components/ui/tab_button";
import SocialButton from "../components/SocialButton";
import AuthFooter from "../components/AuthFooter";
import LogoHeader from "../components/LogoHeader";
import useAuthLanding from "../hooks/useAuthLanding";
// animated underline with enter/exit
const AuthLanding = () => {
  const { mode, switchTo, handleGoogle, handleEmail } = useAuthLanding();

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
            <SocialButton onClick={handleGoogle} icon={google_logo} classname1="w-32 h-16 p-1" classname={"pl-0"}>
              {mode === "signUp" ? "Continue with Google" : "Sign in with Google"}
            </SocialButton>

            <SocialButton onClick={handleEmail} icon={email_logo}>
              {mode === "signUp" ? "Continue with Email" : "Sign in with Email"}
            </SocialButton>
          </div>

          <AuthFooter mode={mode} switchTo={switchTo} />
        </div>
  );
};

export default AuthLanding;
