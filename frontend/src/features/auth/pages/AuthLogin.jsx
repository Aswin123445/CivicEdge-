import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import LogoHeader from '../components/LogoHeader';
import logo from '../../../assets/logo.png';
import EmailField from '../components/EmailField ';
import PasswordField from '../components/PasswordField';

export default function AuthLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  const password = watch('password') || '';
  const unmetCriteria = [];
  if (!/[A-Z]/.test(password)) unmetCriteria.push('one uppercase');
  if (!/[a-z]/.test(password)) unmetCriteria.push('one lowercase');
  if (!/[^A-Za-z0-9]/.test(password)) unmetCriteria.push('one special character');
  if (password.length < 9) unmetCriteria.push('minimum 8 characters');

  return (
    <div className="flex flex-col items-center my-3">
      <LogoHeader logo={logo} />
      <h2 className="text-3xl font-bold">Sign In</h2>
      <form
        className="flex flex-col gap-4 w-72 mt-8"
        onSubmit={handleSubmit(onSubmit)}
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

        {/* Forgot Password */}
        <div className="text-xs text-center text-gray-500">
          Forgot{' '}
          <Link to="/auth/reset" className="text-blue-500 hover:underline">
            Password
          </Link>
          ?
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-2">
          <button type="button" className="text-md font-semibold text-black" onClick={() => window.history.back()}>
            Back
          </button>
          <button
            type="submit"
            disabled={!isValid || unmetCriteria.length > 0}
            className="bg-sky-400 text-white px-5 py-1.5 rounded-full font-semibold hover:bg-sky-500 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
