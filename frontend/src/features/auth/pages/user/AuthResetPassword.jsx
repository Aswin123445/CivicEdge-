import { useForm } from 'react-hook-form';
import LogoHeader from '../../components/LogoHeader';
import logo from '../../../../assets/logo.png';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import PasswordField from '../../components/PasswordField';
import Spinner from '../../../../components/ui/Spinner';

export default function AuthResetPassword() {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  console.log(token,'token',uid,'uid')
  const {resetPassword,resetPasswordResult} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch
  } = useForm({
    mode: 'onTouched',
  });
  console.log(uid, token,errors)

  const password = watch('password') || '';
  const conformPassword = watch('confirm_password') || '';
  const unmetCriteria = [];
  const confirmUnmetCriteria = [];
  if (!/[A-Z]/.test(password)) unmetCriteria.push('one uppercase');
  if (!/[a-z]/.test(password)) unmetCriteria.push('one lowercase');
  if (!/[^A-Za-z0-9]/.test(password)) unmetCriteria.push('one special character');
  if (password.length < 7) unmetCriteria.push('minimum 7 characters');
  if (password !== conformPassword) confirmUnmetCriteria.push('passwords do not match');
  const passwordMatch = conformPassword === password;
const onSubmit = async (data) => {
  console.log(data)
  try {
    const credentials = {
      new_password: data.password,
      confirm_password: data.confirm_password
    }
    await resetPassword({uid,token,credentials}).unwrap(); 
    navigate('/reset-confirmation');
  } catch (err) {
    console.error("Forgot password failed:", err);
  }
};
  return (
    <div className="flex flex-col items-center my-3">
      <LogoHeader logo={logo} />
      <h2 className="text-3xl font-bold">Reset Your Password</h2>
      <form
        className="flex flex-col gap-4 w-72 mt-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <PasswordField 
            register={register} 
            errors={errors}  
            touchedFields={touchedFields} 
            unmetCriteria={unmetCriteria}
            label={'New Password'}
            form_control_name={'password'}
            error_prefix={'Password'}

        />
        <PasswordField 
            register={register} 
            errors={errors}  
            touchedFields={touchedFields} 
            unmetCriteria={confirmUnmetCriteria}
            label={'Conform Password'}
            form_control_name={'confirm_password'}
            error_prefix={'Password'}

        />

        {/* Buttons */}
        <div className="flex justify-between items-center mt-2">
          <button type="button" className="text-md font-semibold text-black" disabled = {resetPasswordResult.isLoading || !passwordMatch} onClick={() => window.history.back()}>
            Back
          </button>
          <button
            type="submit"
            // disabled={}
            className={`bg-sky-400 text-white  py-1.5 rounded-full font-semibold hover:bg-sky-500 disabled:cursor-not-allowed w-28`}
          >
              {
                  resetPasswordResult.isLoading ? <Spinner /> : 'Reset'
              }
          </button>
        </div>
      </form>
    </div>
  );
}
