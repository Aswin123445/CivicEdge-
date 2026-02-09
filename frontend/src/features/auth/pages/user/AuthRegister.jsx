import { useForm } from 'react-hook-form';
import LogoHeader from '../../components/LogoHeader';
import logo from '../../../../assets/civic_edge.svg';
import EmailField from '../../components/EmailField';
import PasswordField from '../../components/PasswordField';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../../../components/ui/Spinner';

export default function AuthRegister() {
  const { signupStatus,onSignUpSubmit } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
  } = useForm({
    mode: 'onTouched',
  });
  const password = watch('password') || '';
  const confirmPassword = watch('confirm_password') || '';
  const unmetCriteria = [];
  const confirmUnmetCriteria = [];
  if (!/[A-Z]/.test(password)) unmetCriteria.push('one uppercase');
  if (!/[a-z]/.test(password)) unmetCriteria.push('one lowercase');
  if (!/[^A-Za-z0-9]/.test(password)) unmetCriteria.push('one special character');
  if (password.length < 7) unmetCriteria.push('minimum 7 characters');
  if (password !== confirmPassword) confirmUnmetCriteria.push('passwords do not match');
  const passwordMatch = confirmPassword === password;

  return (
    <div className="flex flex-col items-center my-3">
      <LogoHeader logo={logo} />
      <h2 className="text-3xl font-bold">Sign Up</h2>
      <form
        className="flex flex-col gap-4 w-72 mt-8"
        onSubmit={handleSubmit(onSignUpSubmit)}
        noValidate
      >
        <EmailField register={register} errors={errors} touchedFields={touchedFields} />
        <PasswordField
          register={register}
          errors={errors}
          touchedFields={touchedFields}
          unmetCriteria={unmetCriteria}
          label={'Password'}
          form_control_name="password"
          error_prefix ={"Password must contain"}
        />
        <PasswordField
          register={register}
          errors={errors}
          touchedFields={touchedFields}
          unmetCriteria={confirmUnmetCriteria}
          label={'Confirm Password'}
          form_control_name="confirm_password"
          error_prefix={""}
        />



        {/* Buttons */}
        <div className="flex justify-between items-center mt-2">
          <button type="button" className="text-md font-semibold text-black" onClick={() => window.history.back()}>
            Back
          </button>
          <button
            type="submit"
            disabled={!isValid || !passwordMatch || unmetCriteria.length > 0 || signupStatus.isLoading}
            className={`bg-sky-400 text-white  py-1.5 rounded-full font-semibold hover:bg-sky-500 disabled:cursor-not-allowed w-28  ${signupStatus.isLoading ? 'cursor-not-allowed px-auto'  : 'px-5'}`}
          >
            {signupStatus.isLoading ? <Spinner /> : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
}
