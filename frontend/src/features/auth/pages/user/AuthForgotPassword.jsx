import { useForm } from "react-hook-form";
import LogoHeader from "../../components/LogoHeader";
import logo from "../../../../assets/civic_edge.svg";
import EmailField from "../../components/EmailField";
import Spinner from "../../../../components/ui/Spinner";
import { useAuth } from "../../hooks/useAuth";

export default function AuthForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: "onTouched",
  });
  const { forgotPasswordResult, forgotPasswordOnSubmit } = useAuth();

  return (
    <div className="flex flex-col items-center my-3">
      <LogoHeader logo={logo} />
      <h2 className="text-3xl font-bold">Reset Your Password</h2>
      <form
        className="flex flex-col gap-4 w-72 mt-8"
        onSubmit={handleSubmit(forgotPasswordOnSubmit)}
        noValidate
      >
        <EmailField
          register={register}
          errors={errors}
          disabled={forgotPasswordResult.isLoading}
          touchedFields={touchedFields}
        />

        {/* Buttons */}
        <div className="flex justify-between items-center mt-2">
          <button
            type="button"
            className="text-md font-semibold text-black"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button
            type="submit"
            // disabled={}
            className={`bg-sky-400 text-white  py-1.5 rounded-full font-semibold hover:bg-sky-500 disabled:cursor-not-allowed w-28`}
          >
            {forgotPasswordResult.isLoading ? <Spinner /> : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
